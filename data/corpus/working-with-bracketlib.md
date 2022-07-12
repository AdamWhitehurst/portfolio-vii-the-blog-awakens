---
title: WASM Saving and Loading With Bracket-Lib
date: 2020-11-09T05:13:17.509Z
category: 'Rust'
article: true
template: 'post'
description: 'Implementing saving and loading in WASM'
image: roguies.png
caption:
tags:
  - 'Rust'
  - 'Roguie'
---

I recently published my work from following the [Roguelike Tutorial](https://bfnightly.bracketproductions.com/rustbook/chapter_0.html). I'm a huge fan of this tutorial because of its straightforward, clear instruction that doesn't hold your hand. While some of the implementation approaches taken make me raise an eyebrow, I think it illustrates idiomatic Rust pretty well.

If you follow the tutorial with the same goal in mind (a wasm package) you'll encounter some issues in the Saving and Loading section. Here, the author kind of leaves us hanging with respect to saving and loading in-browser, since it's not as straightforward in browsers to load and save files between wasm.

Well as you may have noticed, I was able to get that working. So later I plan to post a blog (when markdown editing is more developed).
