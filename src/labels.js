export default function (labelType) {
    switch (labelType) {
        case 'dhl-privat': return dhlPrivat;
        case 'dhl-privat-international': return dhlPrivatInternational;
        case 'dhl-retoure': return dhlRetoure;
        case 'hermes-privat-v102': return hermesPrivatV102;
        case 'adidas': return adidasRetoure;
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
    width: 1606,    // 136mm (=> 142mm)
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
            3075, 244, 20, 194,
            -395, 645, -20, 194);
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
    width: 1866,    // 158mm (=> 164mm)
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
            3075, 244, 20, 194,
            -395, 645, -20, 194);
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

const dhlRetoure = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 90
    },
    width: 1630,    // 138mm (=> 144mm)
    crop(outputCanvas, ctx, image) {
        ctx.drawImage(image,   // Kopf "DHL Retoure"
            2020, 85, 500, 70,
            0, 12, 450, 63);
        ctx.drawImage(image,   // Kopf Logo
            2780, 85, 250, 70,
            425, 12, 225, 63);

        ctx.drawImage(image,   // From
            2020, 162, 720, 200,
            0, 90, 648, 180);

        ctx.drawImage(image,   // To
            2020, 435, 720, 270,
            0, 280, 648, 243);

        ctx.beginPath(); ctx.moveTo(0, 580); ctx.lineTo(650, 580); ctx.stroke();

        ctx.drawImage(image,   // Sendungsdaten
            2020, 745, 720, 110,
            0, 590, 648, 99);

        ctx.beginPath(); ctx.moveTo(665, 12); ctx.lineTo(665, outputCanvas.height - 12); ctx.stroke();

        let barcodeSizeX = 950,
            barcodeSizeY = 240;
        ctx.drawImage(image,   // Auftragsnummer
            2030, 1230, barcodeSizeX, 120,
            680, 15, barcodeSizeX, 120);

        ctx.drawImage(image,   // Leitcode/Routingcode
            2030, 1460, barcodeSizeX, barcodeSizeY,
            680, 180, barcodeSizeX, barcodeSizeY);
        ctx.drawImage(image,   // Identcode/Sendungsnummer
            2030, 1810, barcodeSizeX, barcodeSizeY,
            680, 440, barcodeSizeX, barcodeSizeY);
    }
};

const hermesPrivatV102 = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 0
    },
    width: 1701,    // 144mm  (=> 150mm)
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
};

const adidasRetoure = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 0
    },
    width: 1287,    // 109mm (=> 115mm)
    crop(outputCanvas, ctx, image) {
        ctx.drawImage(image,   // Kopf "DHL Retoure"
            354, 46, 824, 54,
            0, 12, 648, 42);

        ctx.beginPath(); ctx.moveTo(0, 70); ctx.lineTo(650, 70); ctx.stroke();

        ctx.drawImage(image,   // From
            86, 110, 648, 190,
            0, 90, 648, 190);

        ctx.drawImage(image,   // To
            86, 302, 520, 262,
            0, 290, 520, 262);
        ctx.drawImage(image,   // rechte Klammer
            778, 302, 128, 262,
            520, 290, 128, 262);

        ctx.beginPath(); ctx.moveTo(0, 580); ctx.lineTo(650, 580); ctx.stroke();

        ctx.drawImage(image,   // Sendungsdaten
            96, 664, 1010, 140,
            0, 590, 648, 90);

        ctx.beginPath(); ctx.moveTo(665, 12); ctx.lineTo(665, outputCanvas.height - 12); ctx.stroke();

        let barcodeSizeX = 600,
            barcodeSizeY = 240;
        ctx.drawImage(image,   // Barcode Returennummer
            1370, 600, barcodeSizeX, 80,
            687, 15, barcodeSizeX, 80);
        ctx.drawImage(image,   // Retourennummer
            1400, 800, 420, 54,
            720, 100, 311, 40);

        ctx.drawImage(image,   // Leitcode/Routingcode
            150, 946, barcodeSizeX, barcodeSizeY,
            687, 180, barcodeSizeX, barcodeSizeY);
        ctx.drawImage(image,   // Identcode/Sendungsnummer
            150, 1320, barcodeSizeX, barcodeSizeY,
            687, 440, barcodeSizeX, barcodeSizeY);
}
};

const amazonRetoureDhl = {
    file: {
        type: 'gif',
        rotation: 90
    },
    width: 1701,
    crop(outputCanvas, ctx, image) {

        ctx.drawImage(image, 0, 0)

    }
}