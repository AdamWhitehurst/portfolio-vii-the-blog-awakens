---
title: Binary Space Partitioning Map
date: 2020-12-07T21:01:46.163Z
category: 'Rust'
article: true
template: 'post'
description: 'Map generation using Binary Space Partitioning'
image: roguies.png
caption:
tags:
  - 'Rust'
  - 'Roguie'
---

Today I added a map builder that uses [Binary Space Partitioning](https://en.wikipedia.org/wiki/Binary_space_partitioning) to create interior-type maps. This basically means the map is split in half over and over until some minimum dimension is reached, then all the rooms are connected.

I find the generation visualization so satisfying. More to come.

![Binary Space Partitionaing Map Generation Visualization](https://i.imgur.com/5TAbxcy.gif)
