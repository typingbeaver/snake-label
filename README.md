# [![`snake_label`](/img/snake_label_header.webp)](https://snake-label.de)
Converts large format shipping labels to 62mm `snake_labels` for label printers e. g. Brother QL printers. - And this without sending your labels to a server, instead your browser will do all the work!

If you want to use `snake_label` offline, download the latest distribution files and open `index.html` in your favorite browser: \
 **[[ Download snake_label ]](https://github.com/typingbeaver/snake-label/archive/refs/heads/dist.zip)**

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

#### `dhl_privat`
- **Size:** 62x145mm
- **Note:** Zusatzleistungen and Warnings are not included in these labels (yet?).

![Sample Image](/samples/dhl/dhl_privat.png) \
[Sample PDF](/samples/dhl/dhl_privat.pdf)

#### `dhl_international_eu_privat`
- **Size:** 62x195mm

![Sample Image](/samples/dhl/dhl_international_eu_privat.png) \
[Sample PDF](/samples/dhl/dhl_international_eu_privat.pdf)

#### `dhl_international_eu_dhl_native_privat`
[DHL native countries, eg. NL]
- **Size:** 62x165mm
- **Note:** *Zusatzleistungen and Warnings are not included in these labels (yet?).*

![Sample Image](/samples/dhl/dhl_international_eu_native_privat.png)
<!-- [Sample PDF]() -->

#### `dhl_retoure` (Deutschland)
- **Size:** 62x145mm

International returns are most probably better on a real paper sheet/A5 Label.

![Sample Image](/samples/dhl/dhl_retoure.png)
<!-- [Sample PDF]() -->

### Deutsche Post

#### `briefmarke`
- **Size:** 62x40mm

![Sample Image](/samples/deutsche_post/briefmarke.png) \
[Sample PDF](/samples/deutsche_post/briefmarke.pdf)

#### `briefmarke_short`
- **Size:** 62x30mm
- **Note:** *Not suited for e. g. "Einschreiben International".*

![Sample Image](/samples/deutsche_post/briefmarke_short.png) \
[Sample PDF](/samples/deutsche_post/briefmarke_short.pdf)

#### `briefmarke_adresse`
- **Size:** 62x80mm

![Sample Image](/samples/deutsche_post/briefmarke_adresse.png) \
[Sample PDF](/samples/deutsche_post/briefmarke_adresse.pdf)

### Hermes

#### `hermes_privat [V 1.0.2]`
- **Size:** 62x150mm

![Sample Image](/samples/hermes/hermes_privat.png)
<!-- [Sample PDF]() -->

### Seller Returns

#### `adidas_retoure [dhl]`
- **Size:** 62x120mm

<!-- ![Sample Image]() -->
<!-- [Sample PDF]() -->

#### `mediamarkt_saturn_retoure [dhl]`
- **Size:** 62x145mm

<!-- ![Sample Image]() -->
<!-- [Sample PDF]() -->


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
