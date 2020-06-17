import { h, patch } from "../custom-superfine";

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
        oncreate: function (element, cprops) {
            const statefine = element.$$statefine = {};
            const setState = bindSetState(statefine);
            const state = args.length === 2 ? [...args].shift(): undefined;
            statefine.ctx = {};
            statefine.ctx.state = state;
            statefine.ctx.props = cprops;
            statefine.ctx.props.children = children;
            statefine.ctx.setState = setState;
            statefine.selfRender = app(comp, element);
            statefine.selfRender(statefine.ctx);
        },
        onupdate: (element, oprops, nprops) => {
            const statefine = element.$$statefine;
            statefine.ctx.oprops = oprops;
            statefine.ctx.props = nprops;
            statefine.ctx.props.children = children;
            statefine.selfRender(statefine.ctx);
        },
        ondestroy: (element) => {
            const statefine = element.$$statefine;
            statefine.selfRender(null, EMPTY_TAG);
        }
    });
};
