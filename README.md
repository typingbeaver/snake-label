# [![`snake_label`](/img/snake_label_header.webp)](https://snake-label.de)
Converts large format shipping labels to 62mm `snake_labels` for label printers e. g. Brother QL printers.

## Features and benefits
- **smaller and handier**: sticky labels instead of giant plain paper pages
- **as short as possible**: more labels for your money!
- **sharp 2D-/barcodes**: for best scanability
- **without backend**: crops completely locally via JS (keep your address safe!)
- optimized for 300dpi
- optimised PNGs for direct printing via [brother_ql](https://github.com/pklaus/brother_ql)


Currently available labels
---------------------------

### DHL

#### `dhl_national_privat`
- **Size:** 62x145mm
- **Note:** Zusatzleistungen and Warnings are not included in these labels (yet?).

![Sample Image](/img/samples/dhl_privat.png)

#### `dhl_international_eu_privat`
- **Size:** 62x195mm

*No sample image yet.*
<!-- ![Sample Image]() -->

#### `dhl_international_eu_dhl_native_privat`
[DHL native countries, eg. NL]
- **Size:** 62x165mm
- **Note:** *Zusatzleistungen and Warnings are not included in these labels (yet?).*

![Sample Image](/img/samples/dhl_international_eu_native_privat.png)

#### `dhl_retoure` (Deutschland)
- **Size:** 62x145mm

International returns are most probably better on a real paper sheet/A5 Label.

![Sample Image](img/samples/dhl_retoure.png)

### Hermes

#### `hermes_privat (V 1.0.2)`
- **Size:** 62x150mm

![Sample Image](img/samples/hermes_privat.png)

### Seller Returns

#### `adidas_retoure [dhl]`
- **Size:** 62x120mm

#### `mediamarkt_saturn_retoure [dhl]`
- **Size:** 62x145mm


---
## Dependencies & Licenses
`snake_label` is licensed under [GPL-3.0](LICENSE).

Made possible by [@catSIXe](https://github.com/cheetahdotcat). :octocat:

### Dependencies
- [PDF-LIB](https://github.com/Hopding/pdf-lib) (c) Andrew Dillon | MIT License
- [PDF.js](https://github.com/mozilla/pdf.js) (c) Mozilla Foundation | Apache-2.0 License
- [FileSaver.js](https://github.com/eligrey/FileSaver.js) (c) Eli Grey | MIT License
- [Vite](https://github.com/vitejs/vite) (c) Evan You | MIT License
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) (c) Tailwind Labs, Inc. | MIT License

### Theming
- [Fira Mono](https://github.com/bBoxType/FiraSans) (c) Mozilla Foundation, Telefonica S.A., Carrois Corporate GbR and bBox Type GmbH | OFL
- [Heroicons](https://github.com/tailwindlabs/heroicons) (c) Refactoring UI Inc. | MIT License

### Logo
 - Share Tech Mono (c) Carrois Apostrophe | OFL
 - [Twitter Emoji (Twemoji)](https://github.com/twitter/twemoji) (c) Twitter, Inc | CC-BY 4.0 [modified]
