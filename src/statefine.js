import { h, patch } from "superfine";

const EMPTY_TAG = {
    children: [],
    props: {}
};

const app = (view, container, node) => !container ? () => !0: state => node = patch(node, state ? view(state): EMPTY_TAG, container);

const getRandomTag = () => "state-" + Math.random().toString(32).split(".").pop();

const bindSetState = statefine => ss => {
    if(typeof ss === "function") {
        statefine.ctx.state = ss({ ...statefine.ctx.state });
    } else if (typeof ss === "object") {
        statefine.ctx.state = { ...statefine.ctx.state, ...ss };
    } else {
        throw new Error("setState can only accept an object or function");
    }
    setTimeout(() => statefine.selfRender(statefine.ctx));
};

export default (comp) => (props) => {
    const tag = comp.__eltag ? comp.__eltag: comp.__eltag = getRandomTag();
    return h(tag, {
        oncreate: (element) => {
            const statefine = element.$$statefine = {};
            const setState = bindSetState(statefine);
            const state = {};
            statefine.ctx = { props, state, setState };
            statefine.selfRender = app(comp, element);
            statefine.selfRender(statefine.ctx);
        },
        onupdate: (element) => {
            const statefine = element.$$statefine;
            statefine.ctx.oprops = statefine.ctx.props;
            statefine.ctx.props = props;
            statefine.selfRender(statefine.ctx);
        },
        ondestroy: (element) => {
            const statefine = element.$$statefine;
            statefine.selfRender(null, EMPTY_TAG);
        }
    });
};
