---
title: Basic Babel Setup for Node
date: 2020-12-19T21:13:54.902Z
category: 'JavaScript'
article: true
template: 'post'
description: 'How to set up a Node environment with babel'
image: js.png
caption:
tags:
  - 'JavaScript'
  - 'Node'
---I spent a week (on and off) trying to get babel to transpile a node server so I could write modern JS. For some reason I had no luck and it seemed like everything I read was telling me to do what I'd done. So anyway, I started over today and it worked right away. 🤷‍♂️ Here's how I did it:

1. `npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node`

2. `npm install --save-dev nodemon`

3. Create `.babelrc` file and inside: `{ "presets": ["@babel/preset-env"] }`

4. In `package.json`, under `"scripts"` add `"start": "nodemon --exec babel-node lib/index.js",`

5. `npm run start`
