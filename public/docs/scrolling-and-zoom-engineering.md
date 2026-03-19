# Fixing Scroll Hijack in a 3D Hero: A Practical Engineering Story

The core issue was simple to describe and mildly rage-inducing to use: scrolling over the hero section was zooming the 3D model instead of moving the page.

This article is framed around that problem and how we solved it without sacrificing interaction quality. The 3D model and visual polish matter, but they are supporting context. The primary goal was input correctness and smooth UX.

## Problem Statement

Users expected two-finger trackpad scroll (or mouse wheel) to scroll the page.

Instead, while the cursor was over the hero canvas:

- wheel input was captured by orbit controls,
- camera zoom changed,
- page scroll felt blocked or inconsistent.

This is a classic interaction conflict in mixed DOM + WebGL surfaces: two systems both believe they own wheel input, and neither wants to share.

## Success Criteria

We defined success with three explicit constraints:

1. Default page scrolling must feel natural everywhere, including over the hero.
2. Zoom functionality must remain available for intentional interaction.
3. The solution should not introduce extra rendering overhead.

## Solution: Intent-Gated Zoom

We changed zoom from "always on" to "intentional only."

The behavior now is:

- Normal scroll => page scroll.
- Ctrl/Cmd + scroll => 3D zoom.

This pattern keeps expert control while removing accidental zoom hijack for everyone else. In short: no more surprise camera dives when all you wanted was to read the next section.

### Why this solved the root problem

- It separates navigation intent from model-manipulation intent.
- It aligns with user expectation: unmodified wheel should scroll content.
- It preserves advanced interaction instead of removing it.

## Engineering the Hint Component

After gating zoom, we needed discoverability. Users should learn the shortcut, but only when relevant.

Because shipping "guess the hidden gesture" as UX is a bold strategy.

### UX behavior we implemented

- Hint appears only when hovering the model region.
- Appearance is delayed to detect intentional hover.
- Hint hides immediately on hover out.
- Hint is hidden on device classes where zoom is not available.

### Why delayed show + instant hide

- Delayed show filters accidental pointer passes.
- Instant hide keeps the canvas area visually clean.

Think of it as a polite tooltip: it speaks only when spoken to.

### Race condition we handled

Quick hover-in/hover-out can leave delayed timers running. If not canceled, the hint may appear after pointer exit.

We prevented that by:

- tracking current hover intent,
- canceling pending delayed animations on leave,
- guarding delayed callbacks before reveal.

This made hint behavior deterministic even under fast cursor movement and caffeinated QA testing.

## Performance Enhancements (Supporting Layer)

Once input behavior was fixed, we tuned rendering cost to keep motion smooth on weaker devices.

Optimizations included:

- capping DPR to avoid excessive GPU load on high-density screens,
- adapting particle counts by breakpoint,
- lowering per-frame particle update cost,
- memoizing expensive light/object setup.

These do not change the main interaction model, but they reduce frame-time spikes and improve perceived fluidity. Translation: your laptop fan gets to stay slightly less dramatic.

## Final Outcome

The hero now behaves correctly first, beautifully second:

- scrolling is reliable across the page,
- model zoom remains available when intentionally requested,
- contextual hinting teaches the interaction without clutter,
- performance remains stable with the existing visual language.

The key takeaway is that this was not a "3D feature" task. It was an input-system design problem wearing a cool 3D jacket. Once that framing was clear, the right solution path became straightforward.
