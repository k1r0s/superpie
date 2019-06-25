import { patch } from "superfine";
import statefine from "./statefine";
import stylefine from "./stylefine";
import cyclefine from "./cyclefine";

const render = (view, root) => {
  const app = (view, container, node) => state => {
    node = patch(node, view(state), container)
  }

  app(view, root)(0);
}

export { render, statefine, stylefine, cyclefine };
