import { statefine, stylefine } from "superpie";
import Navaid from "navaid";

export { Link, Router }

const r = new Navaid;
r.listen();

const Link = stylefine(
  `a { text-decoration: underline; color: blue; cursor: pointer; }`,
  ({ to, children }) => (
  <a onclick={() => r.route(to)}>{children}</a>
))

const Router = statefine(({ state = {}, setState, props }) => (
  <rou oncreate={() => {
    props.children.forEach(child => r.on(child.props.route, params => setState({ params, current: child.props.render })))
    r.route(location.pathname);
  }}>
    {state.current && state.current(state.params)}
  </rou>
))
