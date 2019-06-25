import { h } from "superfine";
import scope from "scope-css";

const getRandomTag = () => "element-" + Math.random().toString(32).split(".").pop();

const getStylesheet = (tag, str) => {
    const clearStr = str.replace(/(\r\n|\n|\r)/gm, "");
    const scopedStylesheet = scope(clearStr, tag);

    return h("style", { scoped: true }, scopedStylesheet);
};

const build = style => func => (...args) => {
    if(typeof style === "function") style = style(...args);
    const tag = func.__eltag ? func.__eltag: func.__eltag = getRandomTag();
    const stylesheetNode = getStylesheet(tag, style);
    return h(tag, null, [ func(...args), stylesheetNode ]);
};

export default (styles, functional) => build(styles)(functional);
