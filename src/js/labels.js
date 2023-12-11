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
        case 'amazon-dhl': return amazonRetoureDhl;
        case 'mediamarkt-saturn': return mediamarktSaturnRetoure;
        case 'nike-dhl': return nikeRetoureDhl;
        case 'dpd-packlink': return dpdPacklink;
        case 'gls-return': return glsReturn;
        case 'dhl-nl-4-4': return dhlNL44;
        case 'dhl-nl-4-5': return dhlNL45;
        case 'dhl-nl-5-4': return dhlNL54;
        case 'dhl-nl-5-5': return dhlNL55;
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
            1964, 106, 1124, 94,
            0, 0, 890, 74);

        ctx.drawImage(image,   // Adresse
            1964, 210, 785, 625,
            0, 95, 580, 465);

        let scSize = 296;
        ctx.drawImage(image,   // Sicherheitscode
            2763, 215, scSize, scSize,
            594, 90, scSize, scSize);

        ctx.rotate(-Math.PI / 2);
        ctx.drawImage(image,   // Sicherheitscode Text
            3075, 244, 20, 194,
            -395, 645, -20, 194);
        ctx.rotate(Math.PI / 2);

        ctx.drawImage(image,   // Bahntransport
            2802, 679, 234, 154,
            666, 465, 152, 100);

        ctx.drawImage(image,   // Sendungsdaten
            1964, 933, 1124, 152,
            0, 576, 890, 120);

        ctx.beginPath(); ctx.moveTo(910, 0); ctx.lineTo(910, outputCanvas.height); ctx.stroke();

        let barcodeSizeX = 710,
            barcodeSizeY = 320;
        ctx.drawImage(image,   // Leitcode/Routingcode
            2181, 1526, barcodeSizeX, barcodeSizeY,
            930, 20, barcodeSizeX, barcodeSizeY);
        ctx.drawImage(image,   // Identcode/Sendungsnummer
            2181, 1940, barcodeSizeX, barcodeSizeY,
            930, 376, barcodeSizeX, barcodeSizeY);
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
            594, 90, scSize, scSize);

        ctx.rotate(-Math.PI / 2);
        ctx.drawImage(image,   // Sicherheitscode Text
            3075, 244, 20, 194,
            -395, 645, -20, 194);
        ctx.rotate(Math.PI / 2);

        ctx.drawImage(image,   // Telefonnummer & E-Mail
            2768, 743, 300, 60,
            590, 495, 300, 60);

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
            0, 90, 580, 465);

        let scSize = 296;
        ctx.drawImage(image,   // Sicherheitscode
            2763, 215, scSize, scSize,
            594, 95, scSize, scSize);

        ctx.rotate(-Math.PI / 2);
        ctx.drawImage(image,   // Sicherheitscode Text
            3075, 244, 20, 194,
            -395, 645, -20, 194);
        ctx.rotate(Math.PI / 2);

        ctx.drawImage(image,   // Telefonnummer & E-Mail
            2768, 743, 300, 60,
            590, 495, 300, 60);

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
        rotation: 90
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
        rotation: 90
    },
    scale: 4.1666,
    width: 283,    // 24mm (=> 30mm)
    crop(outputCanvas, ctx, image) {
        ctx.drawImage(image,
            136, 11, 283, 696,
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

const amazonRetoureDhl = {
    file: {
        type: 'gif',
    },
    width: 1346,    // 114mm (=> 120mm)
    crop(outputCanvas, ctx, image) {
        ctx.rotate(Math.PI / 2)

        ctx.drawImage(image,   // Kopf Logo
            15, 0, 80, 370,
            0, -20, 80, -370);
        ctx.drawImage(image,   // Adressdaten
            0, 605, 580, 460,
            80, 0, 580, -460);

        ctx.beginPath(); ctx.moveTo(12, -470); ctx.lineTo(outputCanvas.height - 12, -470); ctx.stroke();

        ctx.drawImage(image,   // Auftragsnummer
            730, 150, 160, 800,
            15, -520, 160, -800);

        let barcodeSizeX = 220,
            barcodeSizeY = 600;
        ctx.drawImage(image,   // Leitcode/Routingcode
            1110, 280, barcodeSizeX, barcodeSizeY,
            220, -620, barcodeSizeX, -barcodeSizeY);
        ctx.drawImage(image,   // Identcode/Sendungsnummer
            1540, 290, barcodeSizeX, barcodeSizeY,
            465, -660, barcodeSizeX, -barcodeSizeY);
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

const nikeRetoureDhl = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 0
    },
    width: 1819,    // 154mm (=> 160mm)
    crop(outputCanvas, ctx, image) {
        ctx.drawImage(image,   // Adresse
            264, 386, 1110, 784,
            0, 0, 985, 696);

        ctx.beginPath(); ctx.moveTo(1000, 0); ctx.lineTo(1000, outputCanvas.height); ctx.stroke();

        let barcodeSizeX = 600,
            barcodeSizeY = 240;
        ctx.drawImage(image,   // Barcode Returennummer
            272, 1894, barcodeSizeX, 120,
            1020, 0, barcodeSizeX, 120);

        ctx.drawImage(image,   // Leitcode/Routingcode
            272, 1264, barcodeSizeX, barcodeSizeY,
            1020, 180, barcodeSizeX, barcodeSizeY);
        ctx.drawImage(image,   // Identcode/Sendungsnummer
            272, 1604, barcodeSizeX, barcodeSizeY,
            1020, 450, barcodeSizeX, barcodeSizeY);

        ctx.drawImage(image,   // Cycleon Code
            1222, 1350, 155, 575,
            1660, 0, 155, 575);
    }
};

const dpdPacklink = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 0
    },
    width: 2043,    // 173mm (=> 180mm)
    crop(outputCanvas, ctx, image) {
        ctx.lineWidth = 4;

        ctx.beginPath(); ctx.moveTo(2, 58); ctx.lineTo(2, outputCanvas.height); ctx.stroke();

        ctx.drawImage(image,   // Adresse
            57, 78, 1112, 882,
            4, 0, 878, 696);

        ctx.beginPath(); ctx.moveTo(883, 58); ctx.lineTo(883, outputCanvas.height); ctx.stroke();

        ctx.drawImage(image,   // Barcode
            57, 962, 1112, 696,
            926, 0, 1112, 696);
    }
}

const glsReturn = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 90
    },
    width: 1642,    // 139mm (=> 145mm)
    crop(outputCanvas, ctx, image) {
        ctx.drawImage(image,   // Barcode
            2303, 320, 690, 720,
            0, 0, 667, 696);

        ctx.drawImage(image,   // Adresse
            2107, 1155, 1109, 813,
            690, 0, 949, 696);

        ctx.drawImage(image,   // GLS Logo
            3035, 2079, 182, 63,
            1280, 8, 182, 63);
    }
}

const dhlNL44 = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 0
    },
    width: 1217,    // 103mm (=> 110mm)
    crop(outputCanvas, ctx, image) {
        ctx.drawImage(image,   // Header & From
            55, 95, 1078, 211,
            0, 0, 900, 176);

        ctx.drawImage(image,   // To
            55, 367, 1078, 325,
            0, 210, 900, 271);

        ctx.drawImage(image,   // Shipment Info
            55, 753, 1078, 202,
            0, 527, 900, 169);

        // ctx.drawImage(image,   // Label Version
        //     55, 1304, 1078, 42,
        //     0, 0, 900, 35);

        ctx.beginPath(); ctx.moveTo(920, 0); ctx.lineTo(920, 696); ctx.stroke();

        ctx.rotate(-Math.PI / 2)
        ctx.drawImage(image,   // Barcode
            246, 1036, 696, 250,
            0, 960, -696, 250);
        ctx.rotate(Math.PI / 2)
    }
};

const dhlNL45 = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 0
    },
    width: 1217,    // 103mm (=> 110mm)
    crop(outputCanvas, ctx, image) {
        ctx.drawImage(image,   // Header & From
            55, 95, 1078, 211,
            0, 0, 900, 176);

        ctx.drawImage(image,   // To
            55, 367, 1078, 325+40,
            0, 200, 900, 305);

        ctx.drawImage(image,   // Shipment Info
            55, 753+40, 1078, 202,
            0, 527, 900, 169);

        // ctx.drawImage(image,   // Label Version
        //     55, 1304+40, 1078, 42,
        //     0, 0, 900, 35);

        ctx.beginPath(); ctx.moveTo(920, 0); ctx.lineTo(920, 696); ctx.stroke();

        ctx.rotate(-Math.PI / 2)
        ctx.drawImage(image,   // Barcode
            246, 1036+40, 696, 250,
            0, 960, -696, 250);
        ctx.rotate(Math.PI / 2)
    }
};

const dhlNL54 = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 0
    },
    width: 1217,    // 103mm (=> 110mm)
    crop(outputCanvas, ctx, image) {
        ctx.drawImage(image,   // Header & From
            55, 95, 1078, 211+32,
            0, 0, 900, 203);

        ctx.drawImage(image,   // To
            55, 367+32, 1078, 325,
            0, 230, 900, 271);

        ctx.drawImage(image,   // Shipment Info
            55, 753+32, 1078, 202,
            0, 527, 900, 169);

        // ctx.drawImage(image,   // Label Version
        //     55, 1304+32, 1078, 42,
        //     0, 0, 900, 35);

        ctx.beginPath(); ctx.moveTo(920, 0); ctx.lineTo(920, 696); ctx.stroke();

        ctx.rotate(-Math.PI / 2)
        ctx.drawImage(image,   // Barcode
            246, 1036+32, 696, 250,
            0, 960, -696, 250);
        ctx.rotate(Math.PI / 2)
    }
};

const dhlNL55 = {
    file: {
        type: 'pdf',
        page: 1,
        rotation: 0
    },
    width: 1217,    // 103mm (=> 110mm)
    crop(outputCanvas, ctx, image) {
        ctx.drawImage(image,   // Header & From
            55, 95, 1078, 211+32,
            0, 0, 900, 203);

        ctx.drawImage(image,   // To
            55, 367+32, 1078, 365,
            0, 210, 900, 305);

        ctx.drawImage(image,   // Shipment Info
            55, 753+40+32, 1078, 202,
            0, 527, 900, 169);

        // ctx.drawImage(image,   // Label Version
        //     55, 1304+40+32, 1078, 42,
        //     0, 0, 900, 35);

        ctx.beginPath(); ctx.moveTo(920, 0); ctx.lineTo(920, 696); ctx.stroke();

        ctx.rotate(-Math.PI / 2)
        ctx.drawImage(image,   // Barcode
            246, 1036+40+32, 696, 250,
            0, 960, -696, 250);
        ctx.rotate(Math.PI / 2)
    }
};