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

export default (...args) => (props) => {
    const comp = [...args].pop();
    const tag = comp.__eltag ? comp.__eltag: comp.__eltag = getRandomTag();
    const { children, ...rest } = props;

    return h(tag, {
        ...rest,
        oncreate: (element) => {
            const statefine = element.$$statefine = {};
            const setState = bindSetState(statefine);
            const state = args.length === 2 ? [...args].shift(): undefined;
            statefine.ctx = { state, props: rest, setState };
            statefine.ctx.props.children = children;
            statefine.selfRender = app(comp, element);
            statefine.selfRender(statefine.ctx);
        },
        onupdate: (element) => {
            const statefine = element.$$statefine;
            statefine.ctx.oprops = statefine.ctx.props;
            statefine.ctx.props = rest;
            statefine.ctx.props.children = children;
            statefine.selfRender(statefine.ctx);
        },
        ondestroy: (element) => {
            const statefine = element.$$statefine;
            statefine.selfRender(null, EMPTY_TAG);
        }
    });
};
