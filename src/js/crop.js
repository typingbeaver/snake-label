import getLabel from './labels'

import { PDFDocument } from 'pdf-lib';
import { getDocument } from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';
import { saveAs } from 'file-saver';

const debug = false;
// debug && readFile();
console.log('Application loaded. debug =', debug);

const viewImg = document.getElementById('view');
let label,
    labelArrayBuffer;

convertLabel.addEventListener('click', readFile, false);
downloadLabel.addEventListener('click', saveLabel, false);
downloadLabelIMG.addEventListener('click', savePNG, false);

function savePNG() {
    saveAs(
        new Blob([labelArrayBuffer], { type: 'image/png' }),
        document.getElementById('file-input').files[0].name.replace(/(.pdf|.gif)/g,'') + '-Label.png'
    );
}

async function saveLabel() {
    const pdfBytes = await generatePDF();
    saveAs(
        new Blob([pdfBytes], { type: 'application/pdf' }),
        document.getElementById('file-input').files[0].name.replace(/(.pdf|.gif)/g,'') + '-Label.pdf'
    );
}

async function generatePDF() {
    const pdfDoc = await PDFDocument.create();

    // size in 72dpi
    // page borders: ends 3mm, top/bottom 1.5mm
    const width = pxTo72Dpi(label.width) + mmTo72Dpi(6),
        height = mmTo72Dpi(62);
    const page = pdfDoc.addPage([width, height]);

    const labelImage = await pdfDoc.embedPng(labelArrayBuffer);
    page.drawImage(labelImage, {
        x: mmTo72Dpi(3),
        y: mmTo72Dpi(1.5),
        width: width - mmTo72Dpi(6),
        height: height - mmTo72Dpi(3),
    });

    return pdfDoc.save();

    // helper functions
    function mmTo72Dpi(length) { return length * 0.03937007874 * 72; }; // mm -> 72dpi
    function pxTo72Dpi(pixels) { return pixels * 72 / 300. };           // 300dpi px -> 72dpi
}

function readFile() {
    label = getLabel(document.getElementById('label-type').value);

    const reader = new FileReader();
    console.log('Reading file.');
    switch(label.file.type) {
        case 'pdf':
            reader.readAsArrayBuffer(document.getElementById('file-input').files[0]);
            break;
        case 'gif':
            reader.readAsDataURL(document.getElementById('file-input').files[0]);
            break;
    }

    reader.onload = async (e) => {
        var labelData = {
            image: new Image(),
        };

        switch(label.file.type) {
            case 'pdf':
             // read PDF
            labelData.pdf = await getDocument(reader.result).promise;
            console.log('PDF loaded.', labelData.pdf);

            // get page
            labelData.page = await labelData.pdf.getPage(label.file.page);

            // render page on canvas
            labelData.canvas = document.createElement('canvas');
            const viewport = labelData.page.getViewport({
                    scale: label.scale || 4,
                    rotation: label.file.rotation
                });
            labelData.canvas.width = viewport.width;
            labelData.canvas.height = viewport.height;
            await labelData.page.render({
                canvasContext: labelData.canvas.getContext('2d'),
                viewport: viewport
            }).promise;

            // convert canvas to image
            const p = new Promise(r => labelData.image.onload = r);
            labelData.image.src = labelData.canvas.toDataURL();
            await p;
            break;

            case 'gif':
                labelData.image.src = reader.result;
            break;
        }

        await new Promise(r => setTimeout(r, 1e2)); // small delay helps

        // generate output canvas
        const outputCanvas = document.createElement('canvas'),
            ctx = outputCanvas.getContext('2d');
        outputCanvas.width = label.width;
        outputCanvas.height = 696; // 59mm print width for QL-Printers

        if (debug) {
            ctx.fillStyle = 'lightgreen'; // background
            ctx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);
            ctx.fillStyle = 'pink'; // 1mm 'safety zone' top/bottom
            ctx.fillRect(0, 0, outputCanvas.width, 12);
            ctx.fillRect(0, outputCanvas.height - 12, outputCanvas.width, outputCanvas.height);
        } else {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);
        }
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;

        // crop label
        label.crop(outputCanvas, ctx, labelData.image);
        console.log('Label cropped.');

        // show label
        view.classList.add('invisible');
        labelImg.src = outputCanvas.toDataURL();
        outputCanvas.toBlob((blob) => {
            const reader = new FileReader();
            reader.addEventListener('loadend', () => {
                labelArrayBuffer = reader.result;
                view.classList.remove('invisible');
            });
            reader.readAsArrayBuffer(blob);
        }, 'image/png');
        console.log('Finished.');
    };
}