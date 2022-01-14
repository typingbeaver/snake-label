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
                let outputCanvas = document.createElement('canvas'), ctx = outputCanvas.getContext('2d')
                outputCanvas.width = 2040
                outputCanvas.height = 702
                ctx.clearRect(0, 0, outputCanvas.width, outputCanvas.height)
                ctx.fillStyle = 'white'
                ctx.fillRect(0, 0, outputCanvas.width, outputCanvas.height)

                ctx.drawImage($image, 1936, 85, 562, 128 + 2, 15, 8, 430, 102 + 2)  // Paket bis x kg
                ctx.drawImage($image, 2743, 105, 344, 95 - 6, 621, 30, 259, 71 - 4)       // DHL Logo

                ctx.drawImage($image, 1963, 204, 800, 204, 32, 103, 607, 155)         // Von:
                ctx.drawImage($image, 1964, 410, 800, 425, 38, 263, 519, 275)         // An:

                ctx.drawImage($image, 1964, 934, 1123, 150, 36, 552, 842, 113)        // Sendungsnummer, Entgelt Bezahlt

                ctx.strokeStyle = 'black'
                ctx.lineWidth = 2
                ctx.beginPath(); ctx.moveTo(36, 99); ctx.lineTo(36 + 845, 99); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(946, 18); ctx.lineTo(946, 18 + 648); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(1202, 18); ctx.lineTo(1202, 18 + 648); ctx.stroke();

                ctx.drawImage($image, 2766, 215, 328, 294, 590, 120, 328, 294)        // Sicherheitscode
                ctx.drawImage($image, 2148, 1960, 786, 300, 1238, 366, 787, 300)     // Identcode
                ctx.drawImage($image, 2148, 1552, 786, 300, 1238, 38, 786, 300)       // Leitcode

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