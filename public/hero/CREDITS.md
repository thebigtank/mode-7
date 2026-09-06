# Homepage imagery — provenance

All images are **CC0 (public domain)**, sourced from StockSnap.io via the
Openverse API with an explicit `license=cc0` filter. CC0 imposes no attribution
requirement, so nothing needs crediting on the page; this file exists so the
provenance stays recoverable. Source page for any ID: `https://stocksnap.io/photo/<ID>`

## Scenes
| file | used by | StockSnap ID |
|---|---|---|
| `interior.webp`   | Hero — inline strip in the headline      | KWRZNZ6DC6 |
| `devices.webp`    | Hero — "Premium Devices"                 | 4O4FZUVSIU |
| `refurb.webp`     | Hero — "Certified Refurbished"           | ONCJB6GHAY |
| `smarthome.webp`  | Hero — "Smart Home Automation"           | 0NX3NZ7SDW |
| `solar.webp`      | Hero — "Solar & Green Energy"            | EFYB8VJXNT |
| `access.webp`     | Hero — "Accessories"                     | WM2HLLDW0K |
| `bleed.webp`      | Full-bleed lifestyle band                | HIH67XC5G0 |
| `customer.webp`   | Full-bleed — glass stat card thumbnail   | HIOJW30YKD |
| `workshop.webp`   | Mission — team / workshop frame          | PUWNNLCU1C |
| `ecosystem.webp`  | Ecosystem — one image across two panels  | QK8UF7C718 |
| `cap-tradein.webp`| Capabilities — Trade-In & Upgrade Portal | ODN23L0AC9 |
| `cap-chat.webp`   | Capabilities — WhatsApp Concierge        | JXOLOKSWX2 |
| `cap-solar.webp`  | Capabilities — Smart Home & Solar        | VZK8YEAJDO |

## People
`team-1..8.webp` (480x480) — Team grid.
IDs: T8VNJRQH7F, 3LMPSCJQGQ, XKAZLYB5NV, LERRJPTMHP, 4Q1S53WMQ6, 7BQNRHB6EX, HIOJW30YKD, STXDKVUDL5

`av-1..4.webp` (132x132) — Testimonial avatars, in `testimonials` order
(Daniel Okafor, Amara Eze, Tunde Bello, Grace Adeyemi).
IDs: ITSOCGEJFY, CRHFNXOZMG, XYQ5LBSIPZ, W6GFOSFAXA

> **These are stock models, not real Mode 7 staff or customers.** The names and
> quotes beside them are placeholder copy. CC0 permits this use, but pairing a
> real person's face with an invented testimonial should not ship to production
> — replace the team and testimonial imagery with real people before launch.

Sizes are cut to what each slot actually renders; re-export from the source IDs
rather than upscaling these if a slot ever needs to be larger.

## About page imagery

Unsplash/Pexels/Pixabay and StockSnap itself were unreachable for direct
sourcing in this pass (Unsplash and StockSnap return an anti-bot challenge to
automated fetches; Pexels and Pixabay likewise; the Openverse API's
`license=cc0` filter was timing out server-side at the time). Both images below
were instead sourced via **Wikimedia Commons**, whose API confirms CC0
independently (checked via `imageinfo` `extmetadata.LicenseShortName`) — one is
a Commons-hosted mirror of an original CC0 Unsplash photo, the other is a
Commons contributor's own CC0-dedicated work. Re-export from the source URLs
below rather than upscaling if a slot ever needs to be larger.

| file | used by | source | licence |
|---|---|---|---|
| `workshop-bench.webp` | About hero — "Workshop — intake & verification bench" band | [Teardown of MacBook Pro 16 inch laptop.jpg](https://commons.wikimedia.org/wiki/File:Teardown_of_MacBook_Pro_16_inch_laptop.jpg), own work by Netha Hussain | CC0 (Wikimedia Commons) |
| `devices-flatlay.webp` | About "What We Focus On" — Premium Devices bento cell | [Gadgets on a desk (Unsplash).jpg](https://commons.wikimedia.org/wiki/File:Gadgets_on_a_desk_(Unsplash).jpg), original: [unsplash.com/photos/rhVD9wlnO_I](https://unsplash.com/photos/rhVD9wlnO_I) by Niklas Veenhuis | CC0 (Unsplash, mirrored & confirmed CC0 on Wikimedia Commons) |

Both are crops of the original (landscape slices taken from a larger frame) —
see the crop reasoning in the About page diff if re-deriving. Neither depicts
an identifiable person: the MacBook shot is internals-only against a plain
background, and the desk shot shows only a knee/leg fragment in one corner,
consistent with the "unidentifiable hands/objects" allowance in CLAUDE.md's
content rules.

## Known gap — `lifecycle-*.webp` (unattributed)

`lifecycle-devices.webp`, `lifecycle-refurb.webp`, `lifecycle-smarthome.webp`
and `lifecycle-solar.webp` (used by `LifecycleV2` and `CapabilityGridV2`) have
**no entry here and no recorded provenance**. This was flagged rather than
papered over: no attribution has been invented for them. **A human needs to
either locate their original source and licence, or replace them,** before
they can be treated as cleared for commercial use.
