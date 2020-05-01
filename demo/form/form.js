import { stylefine } from "superpie";

const FORM_BIND_PROP = "data-field";
const FORM_OBJ_PROP = "from";

export { Form }

const Form = props => {
    const form = props[FORM_OBJ_PROP] || {};
    const mapChilren = children => children.map(child => {
        if(!child) return null;
        return {
          ...child,
          props: FORM_BIND_PROP in child.props ? {
            ...child.props,
            oninput: evt => props.oninput({ [child.props[FORM_BIND_PROP]]: evt.target.value }),
            value: form[child.props[FORM_BIND_PROP]]
          }: child.props,
          children: child.children && mapChilren(child.children)
        }
    });

    return (
      <form>{mapChilren(props.children)}</form>
    );
}
