### SUPERPIE

> this readme is not completed yet

Lightweight library based on [superfine](https://github.com/jorgebucaran/superfine).

```jsx
import { h } from "superfine";
import { render } from "superpie";

const Main = () => (
  <h2>Superfine on steroids</h2>
)

render(Main, document.getElementById("app"));
```

What does it include?

- self state management

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
