---
title: Making Refactoring Look Regexy
date: 2020-12-06T02:13:20.309Z
category: 'JavaScript'
article: true
template: 'post'
description: 'Using regex to do a large refactor in one click'
image: js.png
caption:
tags:
  - 'JavaScript'
  - 'Functional Programming'
---

I don't understand why people love to hate regex. I know it's kinda scary to look at someone else's regex because it's not immediately obvious what it does. It's not meant to be readable, it's meant to be powerful!

If someone genuinely feels like regex is hard to learn, to that I would say they just haven't learned how to write a regex line the right way. Since I love regex, I thought I'd share a example of how I implement regex to make refactoring regexy 😎

## The Problem 🐜

Recently, I was doing some refactoring in a [typescript project](https://github.com/adamwhitehurst/bad-evan-bot) that I have, and I have a type called a `WeightedTable` which allows me to define the weights (probabilities) of randomly choosing a particular entry when taking a random sample. For example, if I have:

```js
const weightTable = [
  ['entryOne', 4],
  ['entryTwo', 6]
]
```

and I say `getRandomEntryFrom(weightedTable)` 10 times, on average I will get `'entryOne'` 4 times, and `'entryTwo'` 6 times.

However, I decided that it was _way better looking_ if I put the weight first, then whatever output I want. In other words, I wanted to change every `[ any, number ]` line to `[ number, any ]`.

Sounds fine. Until I looked at my [`responseTables.ts` file](https://github.com/AdamWhitehurst/bad-evan-bot/blob/main/src/responseTables.ts) and realized I had about 80 of these lines. 😅 No small change to make by hand!

**But when you want to change one pattern to another pattern, thats when you reach for regex.**

## The Tools 🛠

When I write a regex line, I only really need [debuggex](https://debuggex.com/) (it's the most simple, robust prototyping site that I've found) and [VS Code](https://code.visualstudio.com/).

If you didn't know, VS Codes find-and-replace popup (Default hotkey: `CTRL+H`) supports matching based on regex patterns if you hit the farthest-right icon inside the find input that looks like: `.*`. This is incredibly powerful when you realize it also supports [capture groups](https://docs.microsoft.com/en-us/visualstudio/ide/using-regular-expressions-in-visual-studio?view=vs-2019#capture-groups-and-replacement-patterns) for replacement.

## The Process 🔢

### Step Zero - Knowing the Symbols

Before we start, I have to assume that you are at least somewhat familiar with what the symbols in regex mean. Really, you just need a reference cheatsheet.

If you are useing [debuggex](https://debuggex.com/), you should click the "Show cheatsheet" link at the bottom of the page and spend a few minutes looking at and familiarizing yourself with what each symbol corresponds to. Don't worry about understanding what a 'positive lookahead capture group' actually does; you just need to understand that the `(?=...)` pattern _is_ a 'positive lookahead capture group'.

### Step One - Getting Examples

Okay, so I'm gonna write a regex line to refactor every `[ any, number ]` line to `[ number, any ]`. First thing I'm gonna need is some examples of the `[ any, number ]` lines (please ignore the meaning of the content, my bot was written to insult people):

```js
  [mockingReply, 3],
  ["Sometimes you say stuff and I just laugh.", 1],
  ["✨", 2],
  ["How could you think you would be right about ANYTHING?? 😂", 1],
```

I need these examples so I can paste them into the "Result" area in [debuggex](https://debuggex.com/). This result area will highlight all the useful regions that our soon-to-be-written regex matches, so that we know where the regex is working and where it isn't. It doesn't look to pretty when you first paste in the examples, but don't run away just yet!

![img 0](https://i.imgur.com/YxVgFkW.jpeg)

### Step Two - Prototyping

Okay, we are _really_ gonna write some regex now! 😬😁

The first part of writing our regex replacement is simply to recognize all the _parts_ of the line. We will worry about capturing and swaping those parts later. So, I am just going to take it one character at a time (like the regex parser does 😏).

I see in our examples that each line starts with some number of spaces (or tabs if that's your thing). This is fine, if you read the cheatsheet, you can see that `\s` corresponds to "a whitespace character", and both tabs and spaces are considered whitespace.

So we put `\s` into our regex input and see that _every_ whitespace character gets highlighted 😱.

![img 1](https://i.imgur.com/iutcJrJ.jpg)

That's because we haven't told regex the bounds of our pattern yet! We need to tell regex that we want to start matching from each "beginning of the string", by adding the `^` to the start of the regex. 😏

![img 2](https://i.imgur.com/4wWGldi.jpeg)

Great, now we _only_ have the first whitespace character highlight. Right! Because we _only said_ to find a single "beginning of the string", then a single "whitespace character". This is when we want to declare "I want to match this regex on every line individually." To do this, we select the "^ and \$ match lines (m)" option in the "Flags" dropdown. If we were writing a regex in javascript code this would look like `/.../m` and you can learn more about flags [here.](https://javascript.info/regexp-introduction#flags) Just know that the `m` flag makes our prototype behave more like how VS Code's replacement works.

Great! Now we have _every first whitespace character_ highlighted on each line. But we have multiple of those `\s` characters! So we say that we want "any number of whiespace characters" by adding an `*`, like so: `\s*`:

![img 3](https://i.imgur.com/4hcOjfk.jpeg)

And this will handle any number, so if we have more or less than two spaces in some lines, that's handled.

Next we have the `[` character to capture. This is a little tricky, only because `[` itself is reserved by regex to denote a set of possible matches in one character like. So if you specify `[0-9]`, we are saying "the next character can be any digit between 0 and 9". That's not what we want here. What we want is _explicitly_ the character `[`. To say that, we add a `\` before the `[` (which is called "escaping the character"). So now we have:

![img 4](https://i.imgur.com/5OgsThi.jpeg)

Awesome. Now we get to the interesting part. At this point, the lines vary. Some have `"`, some just have an alphanumeric. But exapdn your view from just the next character.

We see that we have a series of characters, _until we get to a comma_. That's the trick here. We don't actually care about the characters between the `[` and the `,`. So we say that by adding: `.*,`, this is saying "take every character until you get to a comma".

![img 5](https://i.imgur.com/hlbiZBI.jpeg)

What gives! Suddenly everything is highlighted! Yepp, that makes sense. Why? Because `.*` is greedy. The way regex interprets this is "take all the characters until _the last comma you find_". So here, it's going past the first comma all the way to the end of each line, because the end of each line also has a comma!

So what do we do? Nothing.

As we continue being more specific about what comes next, regex will figure out we didn't mean the comma at the end, but the first one. 😏 In fact, we know that there is always a space right after that first comma, so let's write that (and fix our issue)!

![img 6](https://i.imgur.com/qVhaK0R.jpeg)

So next we look at what is between the `,` and the closing `]`. Well, it should always be some amount of numbers (usually one). We can say with a `\d*`, which tells regex "Any number of digit characters," but let's be a little more general and go with another `.*` since we don't actually care if the types are correct, we just want to swap the places of the entries.

Again, it will highlight all the way to the end of the line until you add the `\],` the regex.

But now we have the regex happily matching all our lines, and we are sure that it know what the parts of the line are! If we read our regex, it says "From the start of a line, find any number of whitespace, then a `[`, then any number of characters until you find a comma. Then find any number of characters until you find a `],`."

Now we can actually capture and swap the parts of this pattern. We won't walk through the nest section as slowly as this one, so Let me just warn you of a one thing.

At the end of each line there is a hidden "newline" character that tells text parsers that the current line has ended and what follows is the start of a new line. That's the `\n` if you look at the regex cheatsheet. We want to add this to the regex pattern just for safety, and we will do it like: `\n?` to say "There may or may not be a newline character after the last comma."

![img 7](https://i.imgur.com/fL4ZKHX.jpeg)

### Step Three - Capturing

Great, we have the regex matching, but this won't be able to swap the two entries inside the `[ ]` 😬. I purposely handle the capturing and swapping part afterward because it can get a little hard to read when trying to write the matching part and the capturing part before you know the matching works.

Really, capturing and swapping is just a matter of wrapping the pieces you want to rearrange in `( )`. So let's look at our regex:

```
^\s*\[.*, .*\],\n?
```

I see four parts to this match. The parts are:

1. `\s*` : We have some amount of whitespace at the start of each line that we want to carry over.
2. `.*` : The first entry inside the array, that will become the second
3. `.*` : The second entry inside the array, that will become the first
4. `\n?` : Possibly a newline character.

The rest of the match is hardcoded so we don't really need to worry about capturing it, since we can rewrite that in the replacement pattern.

Therefore, to capture what we need, we just wrap each part in `( )`:

```
^(\s*)\[(.*), (.*)\],(\n?)
```

And now debuggex is also highlighting each captured group. Neat! Notice how it even tells you the group numbers, and what isn't part of a group:

![img 8](https://i.imgur.com/kTDRnlC.jpg)

### Step Four - Replacement

In order to write the replacement pattern, you need to know about how VS Code handles capture groups. It's a little different that the debuggex cheatsheet implies. In VS Code's find-and-replace menu, you use capture groups from the regex you matched on by using the `$` followed by the number of the capture group you want to use (starting at 1) - Don't worry if that doesn't make sense yet, you'll see what I mean.

We have four captured groups in our regex pattern. So `$1` is the first group, the whitespace. `$2` is the first entry in the array. `$3` is the second. `$4` is the newline that may or may not exist.

So our replacement pattern is pretty straightforward, we take `$2` and `$3` and switch them around, and leave `$1` and `$4` where they are. Then we hardcode the rest of it and bam! We have:

```
$1[$3, $2],$4
```

Note that the replacement pattern isn't _true regex_ so we don't escape characters like `[`.

Now if we plug that into vs code...

![img 9](https://i.imgur.com/FToRgn6.jpeg)

And hit the "Replace All" ..

![img 10](https://i.imgur.com/Obun3pv.jpeg)

Magic. One click and they're all fixed.

If the regex didn't quite work out like you'd wanted, no worries! `CTRL+Z` and undo that one click. So feel free to use trial-and-error if that's your thing!

Hopefully, this showed you that regex isn't some archaeic language written by demons. Rather, it's an incredibly powerful tool to have in your toolbelt. 😎🛠

Please! Let me know if you got this far, and if you have any cool regex lines that you wrote!
