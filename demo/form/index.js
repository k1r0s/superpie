import { render, statefine } from "superpie";
import { Form, FormField } from "./form";

const Main = statefine(({ state, setState }) => (
  <Form from={state} oninput={setState}>
    <FormField label="Name" name="name"/>
    <FormField label="Surname" name="surname"/>
    <pre>{JSON.stringify(state, null, 2)}</pre>
  </Form>
))

render(Main, document.getElementById("app"));
