import { cyclefine, stylefine } from "superpie";

export { Select }

const ISTATE = { tooltip: false, typing: false, value: "" };

const Select = stylefine(
  `
    [dselector-root] {
      display: inline-block;
      position: relative;
    }

    [dselector-tooltip] {
      background-color: buttonface;
      align-items: center;
      border-radius: 0px;
      border-color: lightgrey;
      position: absolute;
      width: 100%;
      max-height: 10rem;
      overflow-y: scroll;
    }

    [dselector-option] {
      display: list-item;
    }

    [dselector-option]:hover {
      cursor: pointer;
      color: white;
      background-color: grey;
    }
  `,
  cyclefine(ISTATE, {

    oncreate(ref) {
      this.ref = ref;
      this.onWindowClick = this.onWindowClick.bind(this);
    },

    closeTooltip () {
      window.removeEventListener("click", this.onWindowClick);
      this.setState(ISTATE);
    },

    onWindowClick(evt) {
      if(!this.ref.contains(evt.target))
        this.closeTooltip();
    },

    handleFocus(evt) {
      evt.target.select();
      if(this.state.tooltip) return;
      window.addEventListener("click", this.onWindowClick);
      this.setState({ tooltip: true, typing: true });
    },

    getFilter(value) {
      function useFilter (opt) {
        return opt.toUpperCase().includes(value.toUpperCase());
      }

      return value ? useFilter: () => true;
    },

    handleInput(evt) {
      this.setState({ value: evt.target.value });
    },

    selectValue(opt) {
      const fakeEvt = {}
      fakeEvt.target = {}
      fakeEvt.target.value = opt;
      this.props.onchange(fakeEvt);
      this.closeTooltip();
    },

    onrender() {
      const { value, typing, tooltip } = this.state;

      return (
        <div dselector-root>
          <div dselector-display>
            <input
              onfocus={evt => this.handleFocus(evt)}
              oninput={evt => this.handleInput(evt)}
              value={typing ? value: this.props.value} />
          </div>
          <div dselector-tooltip hidden={!tooltip}>
            {this.props.options.filter(this.getFilter(value)).map(opt => (
              <div dselector-option onclick={() => this.selectValue(opt)}>
                {opt}
              </div>
            ))}
          </div>
        </div>
      )
    }
  })
);
