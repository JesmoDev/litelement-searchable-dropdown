import { LitElement, html, css, property, state } from 'lit-element';

class SearchableDropdownElement extends LitElement {
  @property()
  options: string[];

  @state() open: boolean = false;
  @state() selectedOption: string = 'Select Option';
  @state() index: number = 0;
  @state() search: string = '';

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        justify-self: center;
        font-size: 1rem;
      }

      input {
        display: block;
        width: 100%;
        box-sizing: border-box;
        border: none;
        background: none;
        margin-top: auto;
        font-size: inherit;
      }

      .select-input {
        display: flex;
        box-sizing: border-box;
        justify-content: space-between;
      }

      .header,
      input {
        padding: 1rem 2rem;
        width: 100%;
      }

      .select-input:focus-within {
        border: 1px solid #007ccf;
        border-radius: 8px;
        outline: none;
      }

      .select-input,
      .dropdown {
        border: 1px solid black;
        border-radius: 8px;
      }

      .select-input--arrow {
        width: 32px;
        display: flex;
        flex-shrink: 0;
      }

      .dropdown {
        margin-top: 8px;
        overflow: hidden;
      }

      .dropdown__item {
        padding: 1rem 2rem;
      }
      .dropdown__item--highlight {
        background: #aedfff;
      }

      .dropdown--open {
        display: block;
      }

      .dropdown--closed {
        display: none;
      }

      /* RESET STUFF */
      input {
        font-family: 'Roboto', sans-serif !important;
      }

      input:focus,
      button {
        outline: none;
      }

      button {
        background: none;
        border: none;
      }
    `,
  ];

  handleToggleDropdown() {
    this.open = !this.open;
    this.search = '';
    if (this.open) {
      setTimeout(() => {
        this.shadowRoot.getElementById('input').focus();
      }, 0);
    }
  }

  handleSelectOption = (option: string) => {
    this.selectedOption = option;

    this.handleToggleDropdown();
  };

  handleOnInputChange(e: { target: HTMLInputElement }) {
    this.search = e.target.value;
    this.index = 0;
  }

  GetFilterOptions(): string[] {
    if (this.search) {
      return this.options.filter((x) => x.includes(this.search));
    } else {
      return this.options;
    }
  }

  keyInput(key: any) {
    switch (key.key) {
      case 'ArrowUp':
        key.preventDefault();
        this.index = Math.max(this.index - 1, 0);
        break;

      case 'ArrowDown':
        key.preventDefault();
        this.index = Math.min(this.index + 1, this.options.length - 1);
        break;

      case 'Enter':
        if (this.search && !this.GetFilterOptions().length) {
          this.handleToggleDropdown();
        } else {
          this.handleSelectOption(this.options[this.index]);
        }
        break;

      case 'Escape':
        this.handleToggleDropdown();
        break;

      default:
        break;
    }
  }

  render() {
    return html`
      <div>
        <div class="select-input">
          ${this.open
            ? html`<input
                @input=${this.handleOnInputChange}
                @keydown=${this.keyInput}
                @blur=${this.handleToggleDropdown}
                id="input"
                type="text"
                value=${this.selectedOption}
              />`
            : html`<div
                class="header"
                @mousedown=${(e: any) => e.preventDefault()}
                @click=${this.handleToggleDropdown}
              >
                ${this.selectedOption}
              </div>`}
          <button
            class="select-input--arrow"
            @mousedown=${(e: any) => e.preventDefault()}
            @focus=${this.handleToggleDropdown}
            @click=${this.handleToggleDropdown}
          >
            <!-- Heroicon: chevron-down -->
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </div>

        <div
          @mousedown=${(e: any) => e.preventDefault()}
          class="dropdown ${this.open ? 'dropdown--open' : 'dropdown--closed'}"
        >
          ${this.GetFilterOptions().map(
            (option, index) =>
              html`
                <div
                  class=${index === this.index
                    ? 'dropdown__item dropdown__item--highlight'
                    : 'dropdown__item'}
                  @click=${() => this.handleSelectOption(option)}
                  @mouseover=${() => (this.index = index)}
                  value=${option}
                >
                  ${option}
                </div>
              `
          )}
        </div>
      </div>
    `;
  }
}

customElements.define('searchable-dropdown', SearchableDropdownElement);
