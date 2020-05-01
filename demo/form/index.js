import { render, statefine } from "superpie";
import { Form } from "./form";
import { Select } from "../select/select";

const Main = statefine({ name: "", city: "" }, ({ state, setState }) => (
  <Form from={state} onchange={setState}>
    <div>
      <label>name: </label>
      <input data-field="name" />
    </div>
    <div>
      <label>city: </label>
      <Select data-field="city" options={["", "Alicante", "Valencia", "Castellón"]}/>
    </div>
    <pre>{JSON.stringify(state, null, 2)}</pre>
  </Form>
))

render(Main, document.getElementById("app"));
