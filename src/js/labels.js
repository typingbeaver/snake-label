export default function (labelType) {
    switch (labelType) {
        case 'dhl-privat': return dhlPrivat;
        case 'dhl-privat-international': return dhlPrivatInternational;
        case 'dhl-privat-international-native': return dhlPrivatInternationalNative;
        case 'dhl-retoure': return dhlRetoure;
        case 'dp-briefmarke': return dpBriefmarke;
        case 'dp-briefmarke-short': return dpBriefmarkeShort
        case 'dp-briefmarke-adresse': return dpBriefmarkeAdresse;
        case 'hermes-privat-v102': return hermesPrivatV102;
        case 'adidas': return adidasRetoure;
        case 'mediamarkt-saturn': return mediamarktSaturnRetoure;
        default: console.error("Unknown label type.");
    };
}

const template = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 0
    },
    // scale: 4,    // optional, defaults to 4 (288dpi) -- 4.1666 for 300dpi
    width: 0,
    crop(outputCanvas, ctx, image) { }
}

const dhlPrivat = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 90
    },
    width: 1642,    // 139mm (=> 145mm)
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

        ctx.drawImage(image,   // Bahntransport
            2802, 679, 234, 154,
            666, 455, 152, 100);

        ctx.drawImage(image,   // Sendungsdaten
            1964, 933, 1124, 152,
            0, 565, 890, 120);

        ctx.beginPath(); ctx.moveTo(910, 12); ctx.lineTo(910, outputCanvas.height - 12); ctx.stroke();

        let barcodeSizeX = 676,
            barcodeSizeY = 300;
        ctx.drawImage(image,   // Leitcode/Routingcode
            2198, 1546, barcodeSizeX, barcodeSizeY,
            950, 30, barcodeSizeX, barcodeSizeY);
        ctx.drawImage(image,   // Identcode/Sendungsnummer
            2198, 1960, barcodeSizeX, barcodeSizeY,
            950, 380, barcodeSizeX, barcodeSizeY);
    }
};

const dhlPrivatInternational = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 90
    },
    width:  2232,    // 189mm (=> 195mm)
    crop(outputCanvas, ctx, image) {
        ctx.drawImage(image,   // Kopf
            1964, 106, 1124, 94,
            0, 0, 890, 74);

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
            0, 576, 890, 120);

        ctx.beginPath(); ctx.moveTo(910, 0); ctx.lineTo(910, outputCanvas.height); ctx.stroke();

        ctx.rotate(-Math.PI / 2);
        ctx.drawImage(image,   // Icons / Go Green
            1964, 854, 1124, 70,
            -696, 920, 696, 43);    // too long, could glitch!

        ctx.drawImage(image,   // Tracked
            1964, 1197, 1124, 122,
            -696, 986, 696, 76);    // too long, could glitch!
        ctx.rotate(Math.PI / 2);

        ctx.drawImage(image,   // Tracked Icon
            2846, 530, 130, 202,
            930, 10, 130, 202);

        ctx.beginPath(); ctx.moveTo(920, 230); ctx.lineTo(1070, 230); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(970, 240); ctx.lineTo(970, outputCanvas.height); ctx.stroke();

        ctx.beginPath(); ctx.moveTo(1080, 0); ctx.lineTo(1080, outputCanvas.height); ctx.stroke();

        let barcodeSizeX = 1124,
            barcodeSizeY = 280;
        ctx.drawImage(image,   // Unzustellbarkeit
            1964, 1422, barcodeSizeX, 70,
            1100, 4, barcodeSizeX, 70);

        ctx.drawImage(image,   // Leitcode/Routingcode
            1964, 1634, barcodeSizeX, barcodeSizeY,
            1100, 100, barcodeSizeX, barcodeSizeY);

        ctx.drawImage(image,   // Category Letter
            1964, 2000, 160, barcodeSizeY-20,
            1100, 416, 160, barcodeSizeY-20);
        ctx.drawImage(image,   // Identcode/Sendungsnummer
            1964, 2048+260, 160, 20,
            1100, 416+260, 160, 20);

        ctx.drawImage(image,   // Identcode/Sendungsnummer
            1964+160, 2048, barcodeSizeX-160, barcodeSizeY,
            1100+160, 416, barcodeSizeX-160, barcodeSizeY);
    }
};

const dhlPrivatInternationalNative = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 90
    },
    width: 1878,    // 159mm (=> 165mm)
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

        let barcodeSizeX = 940,
            barcodeSizeY = 270;
        ctx.drawImage(image,   // Unzustellbarkeit
            1964, 1422, barcodeSizeX, 70,
            930, 15, barcodeSizeX, 70);

        ctx.drawImage(image,   // Leitcode/Routingcode
            2066, 1644, barcodeSizeX, barcodeSizeY,
            936, 110, barcodeSizeX, barcodeSizeY);
        ctx.drawImage(image,   // Identcode/Sendungsnummer
            2066, 2058, barcodeSizeX, barcodeSizeY,
            936, 416, barcodeSizeX, barcodeSizeY);
    }
};

const dhlRetoure = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 90
    },
    width: 1642,    // 139mm (=> 145mm)
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
            686, 15, barcodeSizeX, 120);

        ctx.drawImage(image,   // Leitcode/Routingcode
            2030, 1460, barcodeSizeX, barcodeSizeY,
            686, 170, barcodeSizeX, barcodeSizeY);
        ctx.drawImage(image,   // Identcode/Sendungsnummer
            2030, 1810, barcodeSizeX, barcodeSizeY,
            686, 445, barcodeSizeX, barcodeSizeY);
    }
};

const dpBriefmarke = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 270
    },
    scale: 4.1666,
    width: 402,    // 34mm (=> 40mm)
    crop(outputCanvas, ctx, image) {
        ctx.drawImage(image,
            17, 11, 402, 696,
            0, 0, 402, 696);
    }
};

const dpBriefmarkeShort = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 270
    },
    scale: 4.1666,
    width: 283,    // 24mm (=> 30mm)
    crop(outputCanvas, ctx, image) {
        ctx.drawImage(image,
            17, 11, 283, 696,
            0, 0, 283, 696);
    }
};

const dpBriefmarkeAdresse = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 90
    },
    scale: 4.1666,
    width: 874,    // 74mm (=> 80mm)
    crop(outputCanvas, ctx, image) {
        ctx.drawImage(image,
            64, 18, 874, 696,
            0, 0, 874, 696);
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
    width: 1346,    // 114mm (=> 120mm)
    crop(outputCanvas, ctx, image) {
        ctx.drawImage(image,   // Kopf "DHL Retoure"
            354, 63, 824, 54,
            0, 12, 648, 42);

        ctx.beginPath(); ctx.moveTo(0, 65); ctx.lineTo(650, 65); ctx.stroke();

        ctx.drawImage(image,   // From
            86, 128, 648, 190,
            0, 90, 648, 190);

        ctx.drawImage(image,   // To
            86, 319, 527, 262,
            0, 280, 527, 262);
        ctx.drawImage(image,   // rechte Klammer
            785, 319, 121, 262,
            527, 280, 121, 262);

        ctx.beginPath(); ctx.moveTo(0, 580); ctx.lineTo(650, 580); ctx.stroke();

        ctx.drawImage(image,   // Sendungsdaten
            96, 680, 1010, 140,
            0, 590, 648, 90);

        ctx.beginPath(); ctx.moveTo(665, 12); ctx.lineTo(665, outputCanvas.height - 12); ctx.stroke();

        let barcodeSizeX = 610,
            barcodeSizeY = 240;
        ctx.drawImage(image,   // Barcode Returennummer
            1390, 616, barcodeSizeX, 80,
            715, 15, barcodeSizeX, 80);
        ctx.drawImage(image,   // Retourennummer
            1400, 816, 420, 54,
            735, 100, 311, 40);

        ctx.drawImage(image,   // Leitcode/Routingcode
            170, 952, barcodeSizeX, barcodeSizeY,
            715, 180, barcodeSizeX, barcodeSizeY);
        ctx.drawImage(image,   // Identcode/Sendungsnummer
            170, 1326, barcodeSizeX, barcodeSizeY,
            715, 445, barcodeSizeX, barcodeSizeY);
    }
};

const mediamarktSaturnRetoure = {
    file: {
        type: 'pdf',
        page: 3,
        rotation: 90
    },
    width: 1642,    // 139mm (=> 145mm)
    crop(outputCanvas, ctx, image) {
        ctx.drawImage(image,   // Kopf "DHL Retoure"
            2188, 243, 1010, 60,
            0, 12, 900, 53);

        ctx.beginPath(); ctx.moveTo(0, 75); ctx.lineTo(900, 75); ctx.stroke();

        ctx.drawImage(image,   // Von / An
            2197, 361, 150, 376,
            0, 100, 150, 376);
        ctx.drawImage(image,
            2419, 361, 750, 376,
            150, 100, 750, 376);

        ctx.beginPath(); ctx.moveTo(0, 520); ctx.lineTo(900, 520); ctx.stroke();

        ctx.drawImage(image,   // Sendungsdaten
            2180, 875, 1010, 165,
            0, 530, 900, 147);

        ctx.beginPath(); ctx.moveTo(920, 0); ctx.lineTo(920, 696); ctx.stroke();

        let barcodeSizeX = 660,
            barcodeSizeY = 240;

        ctx.drawImage(image,   // Auftragsnummer
            2492, 1181, 400, 100,
            1095, 20, 400, 100);

        ctx.drawImage(image,   // Leitcode/Routingcode
            2362, 1360, barcodeSizeX, barcodeSizeY,
            965, 180, barcodeSizeX, barcodeSizeY);
        ctx.drawImage(image,   // Identcode/Sendungsnummer
            2362, 1685, barcodeSizeX, barcodeSizeY,
            965, 450, barcodeSizeX, barcodeSizeY);
    }
};