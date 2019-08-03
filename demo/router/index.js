import { render } from "superpie";
import { Router, Link } from "./router.js"

const Main = () => (
  <section>
    <div>
      <Link to="/">index</Link>
    </div>
    <div>
      <Link to="/profile/123">profile 123</Link>
    </div>
    <div>
      <Link to="/profile/423">profile 423</Link>
    </div>
    <hr />
    <Router>
      <page render={() => (
        <p>not found :(</p>
      )} />
      <page route="/" render={() => (
        <p>home</p>
      )} />
      <page route="/profile/:uid" render={(params) => (
        <p>profile {params.uid}</p>
      )} />
    </Router>
  </section>
)

render(Main, document.getElementById("app"));
