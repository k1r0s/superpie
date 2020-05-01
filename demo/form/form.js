import { stylefine } from "superpie";

const FORM_BIND_PROP = "data-field";
const FORM_OBJ_PROP = "from";

export { Form }

const Form = props => {
    const form = props[FORM_OBJ_PROP] || {};
    const mapChilren = children => children.map(child => {
        if(!child) return null;
        if(FORM_BIND_PROP in child.props) {
            Object.assign(child.props, {
                onchange: evt => props.onchange({ [child.props[FORM_BIND_PROP]]: evt.target.value }),
                value: form[child.props[FORM_BIND_PROP]]
            })
        }
        if(child.children) {
            child.children = mapChilren(child.children);
        }
        return child;
    });

    return (
        <form>{mapChilren(props.children)}</form>
    );
}
