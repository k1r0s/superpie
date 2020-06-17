import { h } from "../custom-superfine";

import statefine from "./statefine";

const getRandomTag = () => "cycle-" + Math.random().toString(32).split(".").pop();

export default (...args) => {
  const methods = [...args].pop();
  const dispatchArr = [ctx => {
    for (let key in methods) {
        ctx[key] = typeof methods[key] === "function" ? methods[key].bind(ctx): methods[key];
    }
    const tag = methods.__eltag ? methods.__eltag: methods.__eltag = getRandomTag();
    return h(tag, ctx, ctx.onrender());
  }];

  if(args.length === 2) {
    const istate = [...args].shift();
    dispatchArr.unshift(istate);
  }
  return statefine(...dispatchArr);
}
