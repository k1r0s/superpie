import { render, statefine, cyclefine } from "superpie";
import { Select } from "./select";

const cities = ["", "Alicante", "Valencia", "Castellón"];

const Main = statefine(({ state = { city: "Alicante" }, setState }) => (
  <div>
    <Select options={cities} value={state.city} onchange={evt => setState({ city: evt.target.value })}/>
    <pre>{JSON.stringify(state, null, 2)}</pre>
  </div>
))

render(Main, document.getElementById("app"));
