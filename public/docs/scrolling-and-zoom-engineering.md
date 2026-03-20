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

From an interaction-design perspective, this is an ownership problem:

- The page thinks wheel means vertical navigation.
- Orbit controls think wheel means camera zoom.
- The user thinks the app is broken.

Everyone is technically correct, except only one behavior can win.

## Success Criteria

We defined success with three explicit constraints:

1. Default page scrolling must feel natural everywhere, including over the hero.
2. Zoom functionality must remain available for intentional interaction.
3. The solution should not introduce extra rendering overhead.

We also added two practical engineering constraints:

1. The behavior should be predictable across mouse and trackpad devices.
2. The hint/explanation layer must be subtle and not cause rerender churn in the heavy 3D path.

## Solution: Intent-Gated Zoom

We changed zoom from "always on" to "intentional only."

The behavior now is:

- Normal scroll => page scroll.
- Ctrl/Cmd + scroll => 3D zoom.

This pattern keeps expert control while removing accidental zoom hijack for everyone else. In short: no more surprise camera dives when all you wanted was to read the next section.

Implementation-wise, the control gate is very small but very effective:

- Track whether Ctrl or Cmd is currently pressed.
- Feed that state into orbit controls.
- Allow zoom only when the modifier is active.

That means wheel input remains available to the document in default usage, which restores natural scrolling behavior.

### Why this solved the root problem

- It separates navigation intent from model-manipulation intent.
- It aligns with user expectation: unmodified wheel should scroll content.
- It preserves advanced interaction instead of removing it.

## Why We Did Not Choose Other Options

Before implementing, we evaluated alternatives:

1. Disable zoom entirely.
    - Pro: eliminates conflict.
    - Con: removes useful interaction and makes the model feel static.

2. Disable page scroll while cursor is over canvas.
    - Pro: keeps model controls simple.
    - Con: feels hostile to normal browsing, especially on laptops.

3. Add a custom wheel proxy with manual routing.
    - Pro: highly configurable.
    - Con: more complexity, more edge cases, more maintenance.

Modifier-gated zoom gave the best signal-to-complexity ratio.

## Engineering the Hint Component

After gating zoom, we needed discoverability. Users should learn the shortcut, but only when relevant.

Because shipping "guess the hidden gesture" as UX is a bold strategy.

### UX behavior we implemented

- Hint appears only when hovering the model region.
- Appearance is delayed to detect intentional hover.
- Hint hides immediately on hover out.
- Hint is hidden on device classes where zoom is not available.

In practice, this behavior avoids both extremes:

- No hint at all (users miss the feature).
- Always visible hint (UI noise and banner blindness).

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

The important engineering pattern here is cancellation-first UI logic:

- Start delayed work only when intent appears valid.
- Cancel pending work as soon as intent disappears.
- Guard execution paths so stale callbacks cannot mutate visible state.

This pattern is reusable for tooltips, menus, hover previews, and any deferred UI reveal.

## Performance Impact of the Interaction Fix

The zoom-gating fix itself is lightweight, but surrounding behavior can still hurt smoothness if implemented carelessly.

Two common pitfalls were avoided:

1. Running high-frequency state updates from hover/scroll.
2. Triggering rerenders in the 3D subtree for non-visual state changes.

To avoid those, we kept expensive paths stable and used minimal imperative updates where appropriate.

## Performance Enhancements (Supporting Layer)

Once input behavior was fixed, we tuned rendering cost to keep motion smooth on weaker devices.

Optimizations included:

- capping DPR to avoid excessive GPU load on high-density screens,
- adapting particle counts by breakpoint,
- lowering per-frame particle update cost,
- memoizing expensive light/object setup.

These do not change the main interaction model, but they reduce frame-time spikes and improve perceived fluidity. Translation: your laptop fan gets to stay slightly less dramatic.

### Why these optimizations matter for input feel

Even when input mapping is correct, dropped frames make controls feel wrong.

In other words:

- Correct logic + poor frame pacing = still feels janky.
- Correct logic + stable frame pacing = feels intentional and premium.

This is why interaction fixes and render optimizations should be treated as one user-facing outcome.

## Final Outcome

The hero now behaves correctly first, beautifully second:

- scrolling is reliable across the page,
- model zoom remains available when intentionally requested,
- contextual hinting teaches the interaction without clutter,
- performance remains stable with the existing visual language.

The key takeaway is that this was not a "3D feature" task. It was an input-system design problem wearing a cool 3D jacket. Once that framing was clear, the right solution path became straightforward.
