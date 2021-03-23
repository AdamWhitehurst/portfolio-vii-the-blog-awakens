---

title: 'TLDR: robots.txt'
date: 2021-03-23T10:37:24-07:00
category: ''
template: 'post'
description: 'What is robots.txt and how do I use it?'
article: true'
image: robot.png
tags:
  - '#seo'
  
---

## Overview

Part of the [Robot Exclusion Standard](https://en.wikipedia.org/wiki/Robots_exclusion_standard), `robots.txt` is a file that websites expose to search-engine crawler robots that regulates how and what the robots can crawl your site.

You can specify which `user-agent`s (such as `Googlebot` or `msnbot`) are `Disallow`ed from crawling certain routes on your site.

## Format
```text
User-agent: [user-agent name]
Crawl-delay: [(Optional) How many second a crawler should wait before loading and crawling page content]
Sitemap: [(Optional) Points to location of XML sitemap for this url]
Disallow: [URL string not to be crawled]
```

## Pattern-Matching
Basic pattern-matching applies, meaning you can use the following characters:
-   `\*` is a wildcard that represents any sequence of characters
-   `$`  matches the end of the URL

## Where to Put It
In order to ensure your robots.txt file is found, always include it in your main directory or root domain e.g. `adamwhitehur.st/robots.txt`

## Okay But Now I Wanna Know More
[Find the docs and examples here 😊](https://developers.google.com/search/docs/advanced/robots/create-robots-txt?hl=en&visit_id=637521186352872813-733671151&rd=1#format-and-location)