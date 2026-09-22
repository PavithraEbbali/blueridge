# Image Manifest

## Current state

Eight images are delivered, processed and live. They arrived as 1408×768
PNG; each was cropped to remove Gemini's visible sparkle watermark from the
bottom-right corner, then converted to WebP (17.5MB → 727KB). Untouched
originals are kept in `_source/`.

| Live file | Size | Placement |
|---|---|---|
| `fiber-installation.webp` | 1408×618 | Fiber — supporting column |
| `cable-work-from-home.webp` | 1408×618 | Cable — beside heading |
| `tv-voice-remote.webp` | 1408×618 | TV — Blue Ridge Stream card |
| `tv-family-evening.webp` | 1408×618 | TV — Stream+ Live TV card |
| `local-technician-porch.webp` | 1408×618 | Why Us — local service card |
| `homefi-shelf.webp` | 1408×618 | Why Us — HomeFi card |
| `mobile-main-street.webp` | 1230×768 | Mobile — beside heading |
| `phone-kitchen-counter.webp` | 1230×768 | Home phone — supporting column |
| `hero-ridges-dusk.webp` | 2752×1236 | Hero background (full-bleed) |

All nine are delivered and live. The hero was additionally enlarged to 2x
with lanczos3, because a 1376px source left the browser upscaling on a
high-DPI display.

To replace any image: drop the new file in as `<name>.webp` at a similar
aspect ratio. Everything is wired through `lib/content.ts` (the hero
through `components/HeroBackdrop.tsx`), so no layout work is needed.

---

## Original brief (for generating replacements)

Drop generated images into this folder (`public/images/`) using the exact
filenames below. Once they are here, they get wired into the components
listed in the "Slot" column.

## Global rules for every image

1. **No logos, no brand marks, no company names** on clothing, vehicles,
   equipment or signage. This site is an authorized retailer — generating
   Blue Ridge–branded uniforms or vans would be fabricating carrier assets.
   Every technician shirt stays plain.
2. **No readable text anywhere** — no screen content, no signage, no
   notepads with legible writing. Garbled text is the single biggest
   AI giveaway.
3. **No screens showing a recognizable interface.** TVs and phones are
   angled away, out of focus, or showing only ambient glow.
4. **Nobody looking at the camera.** Every shot is candid and unposed.
5. **Format:** JPG, quality ~85. WebP also fine. PNG works but is heavier.
6. **Resolution:** hit the listed dimensions, or the nearest the generator
   allows at the correct aspect ratio. Minimum 1600px wide for banners,
   1200px for cards — I handle responsive sizing from there.

## Reject and regenerate if you see

- Warped or extra fingers, malformed hands
- Any garbled or nonsense text
- Waxy, poreless, plastic-looking skin
- Impossible or contradictory lighting/shadow directions
- Perfectly symmetrical composition, showroom-clean rooms
- Unnaturally white, perfectly even teeth
- Oversaturated HDR "stock photo" look

## Files

| # | Slot | Filename | Dimensions | Aspect |
|---|------|----------|------------|--------|
| A | Hero background | `hero-ridges-dusk.jpg` | 2560 × 1440 | 16:9 |
| B | Fiber — supporting column | `fiber-installation.jpg` | 1800 × 1200 | 3:2 |
| C | Cable — section banner | `cable-work-from-home.jpg` | 2400 × 1200 | 2:1 |
| D | TV — Blue Ridge Stream card | `tv-family-evening.jpg` | 1600 × 800 | 2:1 |
| E | TV — Stream+ Live TV card | `tv-voice-remote.jpg` | 1600 × 800 | 2:1 |
| F | Mobile — section banner | `mobile-main-street.jpg` | 2400 × 1000 | 12:5 |
| G | Phone — supporting column | `phone-kitchen-counter.jpg` | 1800 × 1200 | 3:2 |
| H | Why Us — wide feature card | `local-technician-porch.jpg` | 1600 × 1000 | 8:5 |
| I | Optional — HomeFi equipment | `homefi-shelf.jpg` | 1400 × 1400 | 1:1 |

A, B, D, E, H are the priority set. C, F, G, I round it out.
