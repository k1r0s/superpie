import { render, statefine } from "superpie";
import { Form } from "./form";

const TestState = statefine((ctx) => {
  const { children, ...rest } = ctx.props;
  return (
    <div>
      {children}
      <input { ...rest }/>
    </div>
  )
})

const TestOrdinary = (props) => {
  const { children, ...rest } = props;
  return (
    <div>
      {children}
      <input { ...rest }/>
    </div>
  )
}

const Main = statefine({ name: "", surname: "" }, ({ state, setState }) => (
  <Form from={state} oninput={setState}>
    <TestState data-field="name">
      <label>Name</label>
      <label>value: {state.name}</label>
    </TestState>
    <TestOrdinary data-field="surname">
      <label>Surname</label>
      <label>value: {state.surname}</label>
    </TestOrdinary>
    <pre>{JSON.stringify(state, null, 2)}</pre>
  </Form>
))

render(Main, document.getElementById("app"));
