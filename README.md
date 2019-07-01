### SUPERPIE for superfine v6

> this readme is not completed yet

Lightweight library based on [superfine](https://github.com/jorgebucaran/superfine).

##### Why?

Superfine is tiny vdom library used to build web interfaces. It comes with the minimum features to provide flexibility and simplicity. But when facing any serious development you need at least to add several features such as state management and styling.

This library size is only 717 Bytes and is the perfect complement to superfine if you want to quickly develop simple and blazing fast web apps.

##### Samples

- [Form](/demo/form)
- [Router](/demo/router)

##### What does it include?

- scoped state

```jsx
import { h } from 'superfine';
import { statefine } from "superpie";

const Counter = statefine(({ state, setState }) => (
  <div oncreate={() => setState({ amount: 0 })}>
    <p>
      <span>{state.amount}</span>
      <a onclick={() => setState(prev => ({ amount: prev.amount + 1 }))}>+</a>
    </p>
  <div>
))

```

- scoped css

```jsx
import { h } from 'superfine';
import { stylefine } from "superpie";

const FancyButton = stylefine(
  `
    button {
      cursor: pointer;
      border-style: none;
      padding: .5rem;
      margin: 0 .5rem .5rem 0;
    }

  `,
  ({ children, ...props }) => (
    <button {...props}>{children}</button>
  )
)
```

- cheap classy syntax

```jsx
import { h } from 'superfine';
import { cyclefine } from "superpie";

const DisplayMessage = cyclefine({
  // this is a superfine component hook
  oncreate() {
    SomeService.fetch().then(res =>
      this.setState({ message: res.message }));
  },
  onrender() {
    const message = this.state && this.state.message
    return (
      <div>
        {message}
      </div>
    )
  }
})

```
