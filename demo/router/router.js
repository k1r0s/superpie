import { statefine, stylefine } from "superpie";
import Navaid from "navaid";

export { Link, Router }

const Link = stylefine(
  `a { text-decoration: underline; color: blue; cursor: pointer; }`,
  ({ to, children }) => (
  <a onclick={() => history.pushState(null, null, to)}>{children}</a>
))

const Default404 = (
  <page render={() => (
    <p>not found</p>
  )} />
)

const initialize = (state, setState, props) => {
  const notFound = props.children.find(child => !child.props.route) || Default404;
  const r = new Navaid("/", () => setState({ render: notFound.props.render, params: null }));
  props.children.filter(child => !!child.props.route).forEach(child => r.on(child.props.route, params => setState({ params, render: child.props.render })));
  r.listen();
  r.route(location.pathname);
}

const Router = statefine(({ state = {}, setState, props }) => (
  <rou oncreate={() => initialize(state, setState, props)}>
    {state.render && state.render(state.params)}
  </rou>
))
