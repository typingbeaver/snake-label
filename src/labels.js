export default function (labelType) {
    switch (labelType) {
        case 'dhl-privat': return dhlPrivat;
        case 'dhl-privat-international': return dhlPrivatInternational;
        default: console.error("Unknown label type.");
    };
}

const template = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 0
    },
    width: 0,
    crop(outputCanvas, ctx, image) { }
}

const dhlPrivat = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 90
    },
    width: 1606,    // 138mm
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
};

const dhlPrivatInternational = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 90
    },
    width: 1866,    // 158mm
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

        ctx.beginPath(); ctx.moveTo(910, 12); ctx.lineTo(910, outputCanvas.height - 12); ctx.stroke();

        let barcodeSizeX = 936,
            barcodeSizeY = 280;
        ctx.drawImage(image,   // Unzustellbarkeit
            1964, 1422, barcodeSizeX, 70,
            930, 15, barcodeSizeX, 70);

        ctx.drawImage(image,   // Leitcode/Routingcode
            2068, 1634, barcodeSizeX, barcodeSizeY,
            930, 100, barcodeSizeX, barcodeSizeY);
        ctx.drawImage(image,   // Identcode/Sendungsnummer
            2068, 2048, barcodeSizeX, barcodeSizeY,
            930, 404, barcodeSizeX, barcodeSizeY);
    }
};