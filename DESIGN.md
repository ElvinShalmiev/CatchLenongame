---
version: alpha
name: "Catch Lennon"
description: "A playful black-and-white photo hunt built around one real dog and his escape-artist personality."
colors:
  primary: "#111111"
  ink: "#111111"
  paper: "#ffffff"
  wash: "#f3f3f3"
  muted: "#626262"
  line: "#d7d7d7"
typography:
  body:
    fontFamily: "Rubik, Arial, sans-serif"
  hebrew-display:
    fontFamily: "Amatic SC, Rubik, Arial, sans-serif"
rounded:
  DEFAULT: "1.5rem"
  pill: "999px"
spacing:
  content-gap: "1.5rem"
  page-max: "70rem"
components:
  button: { }
  game-arena: { }
  sticker: { }
---

# Catch Lennon Design System

## Overview

### Creative North Star

An independent black-and-white photo zine about a mischievous dog, turned into a fast phone game. The real photographs carry the personality; the interface stays quiet, high contrast, and symmetric.

### Product context and register

- **Audience and primary job:** Friends and family choose Hebrew, Russian, or English and immediately play a short “catch the dog” round.
- **Target market and evidence:** Personal, international audience specified in the brief; no market-specific business rules.
- **Locale and language policy:** Complete Hebrew RTL, Russian, and English interface. All interface and accessibility copy changes with the active language.
- **Usage scene:** Primarily touch phones, often played casually and repeatedly; desktop remains supported.
- **Register:** Product with playful brand expression on the language, start, caught, and replay moments.
- **Memorable signature:** Lennon’s real cut-out faces jump between believable monochrome locations and change expression after every escape.
- **Restraint:** One accent only: black. Motion is short and tied to escape, capture, or a control state.
- **Anti-references:** No colorful arcade chrome, card dashboard, gradients, fake 3D illustration, or generic paw-print decoration.
- **Token ownership/runtime mapping:** `style.css :root` is the canonical runtime token source. This file mirrors its durable values and explains their use. Shared consumers use the CSS custom properties directly.

## Colors

`ink` and `paper` own all high-emphasis content and controls. `wash` separates quiet surfaces and loading states. `muted` is reserved for secondary text; `line` supplies structure. The grayscale photo treatment lets Lennon remain visually consistent across unrelated locations. Forced-colors mode returns scrollbars and controls to system colors.

## Typography

Rubik supports Hebrew, Cyrillic, and Latin across UI copy. Amatic SC gives Hebrew display lines a hand-lettered, poster-like voice. Body text stays at 14–16 px or larger for frequent reading; large display type may wrap but never clip. Fonts are stored locally with SIL OFL license files.

## Layout

The page is a centered `70rem` canvas with a fixed visual rhythm: masthead, one active screen, footer. The game arena owns its responsive height and clips only the moving target and photograph. Phone controls remain reachable above the safe-area inset, and the dog target stays clear of the location tag and lower toast.

## Elevation & Depth

Depth comes from photographic planes, thick outlines, and small hard shadows. Static interface surfaces are flat. Lennon’s sticker can use a short drop shadow to separate it from complex photographs.

## Shapes

Round pills belong to actions, settings, labels, and the logo. The game arena uses the `DEFAULT` 1.5rem radius. Sticker silhouettes may be irregular because they come from real photos.

## Components

### Foundational visual states

Every button has visible hover, pressed, keyboard focus, and disabled states. Loading reserves the arena’s full geometry. Missing scene photos expose a plain fallback surface and a localized status message. Reduced-motion users receive immediate state changes without animation.

### Buttons and actions

Primary actions are black pill buttons with white labels. Utility controls are outlined pills. Button labels use the active locale and keep their geometry stable across language and sound states.

### Navigation and data display

There is one linear flow: language → introduction → play → caught → replay. The masthead logo returns to the introduction; the language control returns to language selection. Attempts and elapsed time use stable-width numerals.

### Forms and overlays

The experience contains no forms or modal overlays. Escape feedback uses an in-arena live status pill that never blocks the target.

### Iconography

Two simple line icons communicate language and sound. Labels remain visible beside unfamiliar icons where space permits.

### Motion

Sticker relocation uses one short pop. Escape messages rise into view. Capture uses a five-second countdown. All timers pause safely when the page is hidden; `prefers-reduced-motion` removes decorative transitions.

### Content and data visualization

The voice is short, funny, and specific to Lennon. The translations preserve the joke rather than mirroring sentence structure word for word.

## Do's and Don'ts

- **Do:** Use actual Lennon photos and real locations.
- **Do:** Keep all three languages complete, including accessible labels and status messages.
- **Don't:** Introduce color beyond the photographs’ original data before the CSS grayscale treatment.
- **Don't:** shrink the touch target below 64 px or hide keyboard focus.
