export default function (labelType) {
    switch (labelType) {
        case 'dhl-privat': return dhlPrivat;
        case 'dhl-privat-international': return dhlPrivatInternational;
        case 'hermes-privat-v102': return hermesPrivatV102;
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

const hermesPrivatV102 = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 0
    },
    width: 1701,    // 144mm
    crop(outputCanvas, ctx, image) {
        ctx.drawImage(image,    // Titel
            185, 180, 915, 45,
            20, 20, 915, 45);

        ctx.drawImage(image,    // Zahlungscode
            200, 1115, 770, 350,
            20, 80, 770, 350);

        ctx.drawImage(image,    // Logo
            1625, 165, 485, 80,
            40, 460, 364, 60);
        ctx.drawImage(image,    // Sendungs-ID
            1100, 280, 350, 95,
            130, 540, 313, 85);
        // ctx.drawImage(image,    // 'WE DO!' Logo
        //     1889, 479, 206, 310,
        //     415, 460, 103, 155);

        ctx.rotate(Math.PI / 2)
        ctx.drawImage(image,    // PaketShop-Hinweis
            2140, 350, 70, 1020,
            650, -20, 35, -510);
        ctx.rotate(-Math.PI / 2)

        ctx.drawImage(image,    // Absender
            1100, 425, 580, 260,
            810, 100, 493, 221);


        ctx.drawImage(image,    // Empfänger Code
            780, 870, 250, 220,
            560, 370, 225, 198);
        ctx.drawImage(image,    // Empfänger
            1100, 865, 580, 260,
            810, 370, 493, 221);
        ctx.drawImage(image,    // Empfänger Land
            1100, 1245, 580, 40,
            810, 630, 493, 34);

        ctx.drawImage(image,    // Zusatz EU
            1850, 1325, 230, 140,
            645, 600, 138, 84);
        ctx.drawImage(image,    // Zusatz Sperrig (P)
            1640, 1330, 110, 140,
            560, 600, 66, 84);

        ctx.drawImage(image,    // Sendungsnummer
            210, 370, 370, 640,
            1320, 28, 370, 640);

        // border
        ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(0, 2); ctx.lineTo(this.width, 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, outputCanvas.height - 2); ctx.lineTo(this.width, outputCanvas.height - 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(2, 4); ctx.lineTo(2, outputCanvas.height - 4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(this.width - 2, 4); ctx.lineTo(this.width - 2, outputCanvas.height - 4); ctx.stroke();
    }
}