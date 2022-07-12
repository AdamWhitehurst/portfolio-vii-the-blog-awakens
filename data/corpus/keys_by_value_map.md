---
title: Keys By Value Map
date: 2020-12-09T23:15:41.716Z
category: 'JavaScript'
template: 'post'
article: true
description: "Joining an object's keys based on their values"
image: js.png
caption:
tags:
  - 'JavaScript'
  - 'Functional Programming'
---

I had an interesting data problem today with a cool [functional solution](https://en.wikipedia.org/wiki/Functional_programming) that I wanted to share. 😊

## The Problem

Give the user a set of `option`s, and use the selected `option`s to filter `results` data.

I had this data:

```js
const filterOptions = {
  filter1: 'option1',
  filter2: 'option2',
  filter3: 'option2',
  filter4: 'option3',
  filter5: 'option4'
}

const results = [
  { id: filter1 /*...*/ },
  { id: filter2 /*...*/ },
  { id: filter3 /*...*/ },
  { id: filter4 /*...*/ },
  { id: filter5 /*...*/ }
]
```

This this data was kinda backwards. I needed to display a checkbox for each `option`, which are the values of the `filterOptions` map, but filter the `results` on the all the keys (aka fields) with values of the `options` the user selected.

## The Goal

What I needed was a map from `option`s to `filter` keys. In other words, I needed to be able to get all the keys that have the same value, i.e.

```js
const keysByValue: {
    option1: [ 'filter1' ],
    option2: [ 'filter2', 'filter3' ],
    option3: [ 'filter4' ],
    option4: [ 'filter5' ],
}
```

🤔 Hmm, how to transform `filterOptions` into `keysByValue`? Sounds like a job for [`reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)!

How do you know when to use `reduce`? The trick is to notice when we need to _accumulate_ data inside an array... And an object in JS is really just an array, if you look at it in the right way. 😎

### Array.prototype.reduce()

If you aren't familiar with how `reduce` works, it iterates over and array and accumulates a return value. It takes two parameters: a `callback` function and an `initialValue` i.e. `reduce(callback, initialValue)`. The `callback` function will be given two parameters (there are more than two but we don't care about those right now, read the MDN for more):

1. `accumulator`: This starts out as the `initialValue` that you return that at the end of the `callback`, and it's passed to the next iteration. Once `reduce` has iterated over every entry in the array, this is returned as the final value.
2. `currentValue`: Is the current iteration entry taken from the array you are reducing.

### Map vs. Reduce

I like to think of `reduce` as `map`'s big brother. This is because, when the transformation is 1-to-1, then it's a job for `map`. Like if we just wanted to swap the `filterOptions`' keys and values i.e. `filter1: 'option1'` into `option1: 'filter1'`, then all we need is `map`. But in this case, we want to _accumulate_ all the keys with the same value into individual arrays, thus, `reduce`.

In Functional Programming, `reduce` is also known as `fold`. Some languages also have separate `accumulate` and `reduce` functions, but like with most things in JS, we don't worry about the details too much so it's the same. :) You can read more about the differences [here.](https://en.wikipedia.org/wiki/Fold_%28higher-order_function%29)

## The Solution

Not so fast, how do we turn an `Object` into an `Array` so we can use `reduce` in the first place? We have two options:

- [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [`Object.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)

The former takes an object and gives you an array of all the _keys_ in that object as strings. The latter gives you an array of all the _values_.

What we want here is to iterate over all the keys, and put those into final object:

```js
const keys = Object.key(filterOption)

/**
keys = [ 'filter1', 'filter2', 'filter3', 'filterr4', 'filter5' ]
*/
```

We want to take those `keys`, and figure out where to put them in the final output. Let's get the basic scaffold out of the way:

```js
const keysByValue = Object.keys(filterOptions).reduce((acc, key) => {
  // todo return newAcc
}, {})
```

A quick recap:

- Since `Object.keys()` returns an array, we can chain that with array's `reduce` function and pass that our two arguments, the callback and our initialValue
- The callback is an anonymous arrow function that takes two parameters: the accumulator `acc`, and the `key` entry. It is expected to return the updated accumulator `newAcc`
- `{}` is our initialValue, an empty object. This will become `keysByValue` in the end.

First, we need the `value` for each `key` because that `value` is the key in `acc` where we put that `key`. We will make a copy of `acc` called `newAcc` to avoid mutation:

```js
const keysByValue = Object.keys(filterOptions).reduce((acc, key) => {
  let newAcc = acc
  let value = filterOptions[key]
  newAcc[value] = key

  return newAcc
}, {})
```

However, we need to keep _all_ the `key`s with that `value` by using another array. But we don't want to overwrite the old `key`s that were added to `acc[value]`'s array, so we spread in the existing entries: `acc[value] = [...acc[value], key]`

```js
const keysByValue = Object.keys(filterOptions).reduce((acc, key) => {
  let newAcc = acc
  let value = filterOptions[key]
  newAcc[value] = [...acc[value], key]

  return newAcc
}, {})
```

Third, `acc[value]` starts out as `undefined`, and if you try to spread `undefined`, it will throw an error. So, we have to check and initialize it before spreading:

```js
const keysByValue = Object.keys(filterOptions).reduce((acc, key) => {
  let newAcc = acc
  let value = filterOptions[key]

  if (!newAcc[value]) newAcc[value] = []

  newAcc[value] = [...acc[value], key]

  return newAcc
}, {})
```

And at this point, we can call this `reduce` done! But what if I told you we could do this in a single line...

## Bonus: One-liner

```js
const keysByValue = Object.keys(filterOptions).reduce(
  (acc, key) => ({
    ...acc,
    [filterOptions[key]]: [...(acc[filterOptions[key]] || []), key]
  }),
  {}
)
```

Wait, what?! 😱 Where'd all that stuff about 'avoiding' mutation, and 'intialization' go?? There isn't even a `return` in there! Here's the breakdown:

- An arrow function can implicitly return an object like `() => object`. But if you want to return and unnamed object, you have to wrap the object in parenthesis like: `() => ({})` so the interpreter knows you aren't trying to open a new scope.
- `{...acc, }` works like `const newAcc = acc;` because it is actually creating a new object with all of `acc`'s field.
- We turn every occurrence of `value` but into `filterOptions[key]`
- We initialize an empty array by adding `|| []`, which says "if `acc[filterOptions[key]]` is undefined, use `[]` instead."

And there you have it, to accumulate all of an object's keys by their values, you can do it in one line. 😁

## Extra Bonus: Functional Programming?

Are you curious about why or how Functional Programming is _obviously, objectively superior_ to Imperative Programming? Not even sure what I'm talking about? I highly recommend you give this [video a watch](https://www.youtube.com/watch?v=QyJZzq0v7Z4), it's a 🤯. If you want to lean how to start applying Functional Programming principles into JavaScript, then I also recommend [this video.](https://www.youtube.com/watch?v=e-5obm1G_FY&t=147s) ✨ Enjoy!
