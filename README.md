# snake_label
Converts large format shipping labels to 62mm `snake_labels` for label printers.

## Currently available labels:
- DHL National (Privatkunden) to 62x142mm
- DHL International EU (Privatkunden) [DHL native countries, eg. NL] to 62x164mm

(Note: Zusatzleistungen and Warnings are not included in these labels (yet)!)
- Hermes Privatservice (V 1.0.2) to 62x144mm

## Features and benefits
- **smaller and handier**: sticky labels instead of giant plain paper pages
- **as short as possible**: more labels for your money!
- **unscaled 2D-/barcodes**: for best scanability
- **without backend**: crops completely locally via JS (keep your address safe!)
- optimized for 300dpi
- optimised PNGs for direct printing via [brother_ql](https://github.com/pklaus/brother_ql)

## ToDos
- page styling
- multi-file processing
- more labels...
- cli / electron app

---
## Dependencies & Licenses
`snake_label` is licensed under [GPL-3.0](LICENSE).

- [PDF-LIB](https://github.com/Hopding/pdf-lib) (c) Andrew Dillon | MIT License
- [PDF.js](https://github.com/mozilla/pdf.js) (c) Mozilla Foundation | Apache-2.0 License
- [downloadjs](https://github.com/rndme/download) (c) dandavis | MIT License

Made possible by [@catSIXe](https://github.com/cheetahdotcat). :octocat:
