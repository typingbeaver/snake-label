const viewImg = document.getElementById('view')
const { PDFDocument, StandardFonts, rgb } = PDFLib
let labelArrayBuffer = null

function savePNG() {
    download(labelArrayBuffer, document.getElementById('pdfFile').files[0].name.replace('.pdf', '') + "-Label.png", "image/png")
}

async function saveLabel() {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([510.24, 175.68])
    const { width, height } = page.getSize()
    const labelImage = await pdfDoc.embedPng(labelArrayBuffer)
    page.drawImage(labelImage, {
        x: 0,
        y: 0,
        width: width,
        height: height,
    })

    const pdfBytes = await pdfDoc.save()
    download(pdfBytes, document.getElementById('pdfFile').files[0].name.replace('.pdf', '') + "-Label.pdf", "application/pdf")
}

function readFile() {
    const reader = new FileReader()
    console.log('reading file')
    reader.onload = async function (e) {
        const arrayBuffer = reader.result
        const loadingTask = PDFJS.getDocument(reader.result)
        let canvas, viewPort
        loadingTask.promise.then(doc => {
            console.log('doc=', doc)
            return doc.getPage(1)
        })
            .then((page) => {
                $page = page
                canvas = document.createElement('canvas'), viewPort = page.getViewport(4, 90)
                canvas.width = viewPort.width
                canvas.height = viewPort.height
                return page.render({
                    canvasContext: canvas.getContext('2d'),
                    viewport: viewPort
                }).then(_ => viewPort)
            })
            .then(async viewPort => {
                let $image = new Image()
                let p = new Promise(r => $image.onload = r)
                $image.src = canvas.toDataURL()
                await p
                await new Promise(r => setTimeout(r, 1e2)) // small delay helps

                let outputCanvas = document.createElement('canvas'),
                    ctx = outputCanvas.getContext('2d')
                outputCanvas.width = 1606   // 12px = 1mm
                outputCanvas.height = 696   // 59mm print width for QL-Printers

                ctx.fillStyle = 'white'
                ctx.fillRect(0, 0, outputCanvas.width, outputCanvas.height)
                ctx.strokeStyle = 'black'
                ctx.lineWidth = 2

                ctx.drawImage($image,   // Kopf
                    1964, 108, 1124, 92,
                    0, 12, 890, 73)

                ctx.drawImage($image,   // Adresse
                    1964, 210, 785, 625,
                    0, 95, 580, 465)

                let scSize = 296;
                ctx.drawImage($image,   // Sicherheitscode
                    2763, 215, scSize, scSize,
                    594, 95, scSize, scSize)

                ctx.drawImage($image,   // Sendungsdaten
                    1964, 933, 1124, 152,
                    0, 565, 890, 120)

                ctx.beginPath(); ctx.moveTo(910, 12); ctx.lineTo(910, outputCanvas.height - 12); ctx.stroke();

                let barcodeSizeX = 676,
                    barcodeSizeY = 320;
                ctx.drawImage($image,   // Leitcode/Routingcode
                    2198, 1526, barcodeSizeX, barcodeSizeY,
                    930, 20, barcodeSizeX, barcodeSizeY)
                ctx.drawImage($image,   // Identcode/Sendungsnummer
                    2198, 1940, barcodeSizeX, barcodeSizeY,
                    930, 364, barcodeSizeX, barcodeSizeY)

                viewImg.src = outputCanvas.toDataURL()
                downloadLabel.disabled = downloadLabelIMG.disabled = true
                outputCanvas.toBlob((blob) => {
                    const reader = new FileReader()
                    reader.addEventListener('loadend', () => {
                        labelArrayBuffer = reader.result
                        downloadLabel.disabled = downloadLabelIMG.disabled = false
                    })
                    reader.readAsArrayBuffer(blob)
                }, 'image/png')
            })
    }
    reader.readAsArrayBuffer(document.getElementById('pdfFile').files[0])
}