import { PDFDocument } from 'pdf-lib';
const download = require("downloadjs");

const debug = false;
const viewImg = document.getElementById('view')
let labelArrayBuffer = null
let label;

convertLabel.addEventListener("click", readFile, false);
downloadLabel.addEventListener("click", saveLabel, false);
downloadLabelIMG.addEventListener("click", savePNG, false);

function savePNG() {
    download(labelArrayBuffer, document.getElementById('pdfFile').files[0].name.replace('.pdf', '') + "-Label.png", "image/png")
}

async function saveLabel() {
    const pdfDoc = await PDFDocument.create()
    // size in 72dpi
    // page borders: ends 3mm, top/bottom 1.5mm
    const width = pxTo72Dpi(label.width) + mmTo72Dpi(6),
        height = mmTo72Dpi(62);
    const page = pdfDoc.addPage([width, height])

    const labelImage = await pdfDoc.embedPng(labelArrayBuffer)
    page.drawImage(labelImage, {
        x: mmTo72Dpi(3),
        y: mmTo72Dpi(1.5),
        width: width - mmTo72Dpi(6),
        height: height - mmTo72Dpi(3),
    })

    const pdfBytes = await pdfDoc.save()
    download(pdfBytes, document.getElementById('pdfFile').files[0].name.replace('.pdf', '') + "-Label.pdf", "application/pdf")

    function mmTo72Dpi(length) { return length * 0.03937007874 * 72; }  // mm -> 72dpi
    function pxTo72Dpi(pixels) { return pixels * 72 / 300. }    // 300dpi px -> 72dpi
}

function readFile() {
    label = getLabelType();
    const reader = new FileReader()
    console.log('reading file')
    reader.onload = async function (e) {
        const loadingTask = PDFJS.getDocument(reader.result)
        let canvas, viewPort
        loadingTask.promise.then(doc => {
            console.log('doc=', doc)
            return doc.getPage(1)
        })
            .then((page) => {
                canvas = document.createElement('canvas'), viewPort = page.getViewport(4, 90)
                canvas.width = viewPort.width
                canvas.height = viewPort.height
                return page.render({
                    canvasContext: canvas.getContext('2d'),
                    viewport: viewPort
                }).then(_ => viewPort)
            })
            .then(async viewPort => {
                let image = new Image()
                let p = new Promise(r => image.onload = r)
                image.src = canvas.toDataURL()
                await p
                await new Promise(r => setTimeout(r, 1e2)) // small delay helps

                let outputCanvas = document.createElement('canvas'),
                    ctx = outputCanvas.getContext('2d')
                outputCanvas.width = label.width  // 12px = 1mm
                outputCanvas.height = 696   // 59mm print width for QL-Printers

                if (debug) {
                    ctx.fillStyle = 'lightgreen'    // background
                    ctx.fillRect(0, 0, outputCanvas.width, outputCanvas.height)
                    ctx.fillStyle = 'pink'  // 1mm "safety zone" top/bottom
                    ctx.fillRect(0, 0, outputCanvas.width, 12)
                    ctx.fillRect(0, outputCanvas.height - 12, outputCanvas.width, outputCanvas.height)
                } else {
                    ctx.fillStyle = 'white'
                    ctx.fillRect(0, 0, outputCanvas.width, outputCanvas.height)
                }
                ctx.strokeStyle = 'black'
                ctx.lineWidth = 2

                label.crop(outputCanvas, ctx, image)

                viewImg.src = outputCanvas.toDataURL()
                viewImg.hidden = true
                downloadLabel.disabled = downloadLabelIMG.disabled = true
                outputCanvas.toBlob((blob) => {
                    const reader = new FileReader()
                    reader.addEventListener('loadend', () => {
                        labelArrayBuffer = reader.result
                        viewImg.hidden = false
                        downloadLabel.disabled = downloadLabelIMG.disabled = false
                    })
                    reader.readAsArrayBuffer(blob)
                }, 'image/png')
            })
    }
    reader.readAsArrayBuffer(document.getElementById('pdfFile').files[0])
}

function getLabelType() {
    switch (document.getElementById('label-type').value) {
        case "dhl-privat":
            return dhlPrivat;

        case "dhl-privat-international":
            return dhlPrivatInternational;
    }
}

const dhlPrivat = {
    width: 1606,
    async crop(outputCanvas, ctx, image) {
        ctx.drawImage(image,   // Kopf
            1964, 108, 1124, 92,
            0, 12, 890, 73);

        ctx.drawImage(image,   // Adresse
            1964, 210, 785, 625,
            0, 95, 580, 465);

        let scSize = 296;
        ctx.drawImage(image,   // Sicherheitscode
            2763, 215, scSize, scSize,
            594, 95, scSize, scSize);

        ctx.rotate(-Math.PI / 2);
        ctx.drawImage(image,   // Sicherheitscode Text
            3075, 240, 20, 190,
            -395, 647, -20, 190);
        ctx.rotate(Math.PI / 2);

        ctx.drawImage(image,   // Sendungsdaten
            1964, 933, 1124, 152,
            0, 565, 890, 120);

        ctx.beginPath(); ctx.moveTo(910, 12); ctx.lineTo(910, outputCanvas.height - 12); ctx.stroke();

        let barcodeSizeX = 676,
            barcodeSizeY = 320;
        ctx.drawImage(image,   // Leitcode/Routingcode
            2198, 1526, barcodeSizeX, barcodeSizeY,
            930, 20, barcodeSizeX, barcodeSizeY);
        ctx.drawImage(image,   // Identcode/Sendungsnummer
            2198, 1940, barcodeSizeX, barcodeSizeY,
            930, 364, barcodeSizeX, barcodeSizeY);
    }

}

const dhlPrivatInternational = {
    width: 1870,
    crop(outputCanvas, ctx, image) {
        ctx.drawImage(image,   // Kopf
            1964, 108, 1124, 92,
            0, 12, 890, 73);

        ctx.drawImage(image,   // Adresse
            1964, 210, 785, 625,
            0, 95, 580, 465);

        let scSize = 296;
        ctx.drawImage(image,   // Sicherheitscode
            2763, 215, scSize, scSize,
            594, 95, scSize, scSize);

        ctx.rotate(-Math.PI / 2);
        ctx.drawImage(image,   // Sicherheitscode Text
            3075, 240, 20, 190,
            -395, 647, -20, 190);
        ctx.rotate(Math.PI / 2);

        ctx.drawImage(image,   // Telefonnummer
            2770, 740, 300, 35,
            590, 520, 300, 35);

        ctx.drawImage(image,   // Sendungsdaten
            1964, 933, 1124, 152,
            0, 565, 890, 120);

        ctx.beginPath(); ctx.moveTo(910, 12); ctx.lineTo(910, outputCanvas.height - 12); ctx.stroke(); // vertical

        let barcodeSizeX = 940,
            barcodeSizeY = 280;

        ctx.drawImage(image,   // Unzustellbarkeit
            1964, 1422, barcodeSizeX, 70,
            930, 15, barcodeSizeX, 70);

        ctx.drawImage(image,   // Leitcode/Routingcode
            2070, 1634, barcodeSizeX, barcodeSizeY,
            930, 100, barcodeSizeX, barcodeSizeY);
        ctx.drawImage(image,   // Identcode/Sendungsnummer
            2070, 2048, barcodeSizeX, barcodeSizeY,
            930, 404, barcodeSizeX, barcodeSizeY);
    }

}