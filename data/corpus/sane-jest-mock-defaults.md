---
title: Sane Jest Mock Defaults
date: 2020-12-10T19:22:32.810Z
category: 'Testing'
article: true
template: 'post'
description: 'Writing sane default mocks for jest modules'
image: js.png
caption:
tags:
  - 'React'
  - 'Jest'
  - 'JavaScript'
---

## Motivation

While I was doing some refactoring of our permission-checking hook `useRoles()`, I added two functions to make permission-checking faster and cleaner: `hasRole()` and `isOnTeam()`. We can use these like:

```js
import useRoles, { roleCodes } from '../../../utility/UseRoles'
// ...
const { hasRole } = useRoles()
const userCanEdit = hasRole(roleCodes.oppOwner, roleCodes.bidManager)
```

But with that, I was going to change a whole bunch of test that were mocking `useRoles()` by hand. So I wanted to find a way to mock `useRoles()` automatically in tests. Here's how I did it.

## Implementation

Following https://jestjs.io/docs/en/manual-mocks, I made a `__mocks__/UseRoles.jsx`:

```js
// Re export the actual code dictionaries so spread operations don't throw.
const { roleCodes: rc, teamCodes: tc } = jest.requireActual('../UseRoles')
export const roleCodes = rc
export const teamCodes = tc

export default jest.fn().mockImplementation(() => ({
  hasRole: jest.fn().mockImplementation(() => {
    return true
  }),
  isOnTeam: jest.fn().mockImplementation(() => {
    return true
  })
}))
```

And in [`src/setupTests.js`](https://create-react-app.dev/docs/running-tests/#srcsetuptestsjs) I added `jest.mock('./utility/UseRoles.jsx')`.

## Usage

Now, `useRoles` is mocked by default and allows all permissions by default. Why this default behavior? It's easier to write tests assuming all functionality is available, then write small set of tests that ensure a user can't do stuff when they don't have permission (e.g. Edit Btn's are not present when user can't edit).

So now in tests we don't even have to say `jest.mock('../../../utility/UseRoles)`. If we want to restrict behavior we can `import useRoles from '../../../utility/UseRoles';` then write `useRoles.mockImplementation(...)` in the specific test with different behavior!

P.S. Need to use the actual module and not the mocked one? `jest.unmock('../../../utility/UseRoles');`

## Conclusion

When writing default mocks, the main question you need to ask is: "What behavior will cover the most amount of testing scenarios?" That way, we write less actual lines of code in tests.
