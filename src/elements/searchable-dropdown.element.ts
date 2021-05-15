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
        position: relative;
        flex-direction: column;
        justify-self: center;
        font-size: 1rem;
      }

      .header,
      input {
        padding: 1rem 2rem;
        width: 100%;
      }

      .header,
      .select-input__arrow {
        cursor: pointer;
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
        overflow: hidden;
        box-shadow: 0px 9px 17px -10px rgba(0, 0, 0, 0.04),
          0px 5px 7px -4px rgba(0, 0, 0, 0.09),
          0px 1px 3px -1px rgba(0, 0, 0, 0.07);
      }

      .select-input:focus-within {
        border: 1px solid #4f46e5;
        border-radius: 8px;
        outline: none;
      }

      .select-input,
      .dropdown-wrapper {
        border: 1px solid #c4c7ce;
        border-radius: 8px;
        background: white;
      }

      .select-input__arrow {
        width: 42px;
        display: flex;
        flex-shrink: 0;
        align-items: center;
        padding: 8px;
      }

      .select-input__arrow svg {
        transition: 200ms transform ease-in-out;
        color: #374151;
      }

      .select-input__arrow--open svg {
        transform: rotate(180deg);
      }

      .select-input__arrow:hover {
        background: #f9fafb;
      }

      .dropdown-wrapper {
        position: absolute;
        width: 100%;
        margin-top: 8px;
        overflow: hidden;
        opacity: 0;
        max-height: 0px;
        transition: 200ms all ease-in-out;
        box-shadow: 0px 9px 60px -10px rgba(0, 0, 0, 0.05),
          0px 5px 27px -4px rgba(0, 0, 0, 0.07),
          0px 1px 10px -1px rgba(0, 0, 0, 0.1);
      }

      .dropdown-wrapper--open {
        opacity: 1;
      }

      .dropdown-wrapper--open,
      .dropdown {
        max-height: 200px;
      }

      .dropdown {
        overflow-y: auto;
        overflow-x: hidden;
      }

      .dropdown__item {
        padding: 1rem 2rem;
      }
      .dropdown__item--highlight {
        background: #eef4ff;
      }
      .dropdown__item--selected {
        font-weight: bold;
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

  handleOpenDropdown() {
    this.open = true;
    this.search = '';
    setTimeout(() => {
      this.shadowRoot.getElementById('input').focus();
    }, 0);
  }

  handleCloseDropdown() {
    this.open = false;
  }

  handleSelectOption = (option: string) => {
    this.selectedOption = option;

    const event = new CustomEvent('onSelectOption', { detail: option });
    this.dispatchEvent(event);

    this.handleCloseDropdown();
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
    var element = this.shadowRoot.getElementById('selected-item');

    switch (key.key) {
      case 'ArrowUp':
        key.preventDefault();
        element.scrollIntoView(false);
        this.index = Math.max(this.index - 1, 0);
        break;

      case 'ArrowDown':
        key.preventDefault();
        element.scrollIntoView(true);
        this.index = Math.min(this.index + 1, this.options.length - 1);
        break;

      case 'Enter':
        if (this.search && !this.GetFilterOptions().length) {
          this.handleCloseDropdown();
        } else {
          this.handleSelectOption(this.options[this.index]);
        }
        break;

      case 'Escape':
        this.handleCloseDropdown();
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
                @blur=${this.handleCloseDropdown}
                id="input"
                type="text"
                placeholder="${this.selectedOption}"
              />`
            : html`<div
                class="header"
                @mousedown=${(e: any) => e.preventDefault()}
                @click=${this.handleOpenDropdown}
              >
                ${this.selectedOption}
              </div>`}
          <button
            class="select-input__arrow ${this.open
              ? 'select-input__arrow--open'
              : ''}"
            @mousedown=${(e: any) => e.preventDefault()}
            @focus=${this.handleOpenDropdown}
            @click=${this.open
              ? this.handleCloseDropdown
              : this.handleOpenDropdown}
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
          class="dropdown-wrapper ${this.open ? 'dropdown-wrapper--open' : ''}"
        >
          <div @mousedown=${(e: any) => e.preventDefault()} class="dropdown">
            ${this.GetFilterOptions().map(
              (option, index) =>
                html`
                  <div
                    id=${index === this.index ? 'selected-item' : ''}
                    class="${index === this.index
                      ? 'dropdown__item dropdown__item--highlight'
                      : 'dropdown__item'} ${this.GetFilterOptions().indexOf(
                      this.selectedOption
                    ) === index
                      ? 'dropdown__item--selected'
                      : ''} "
                    @click=${() => this.handleSelectOption(option)}
                    @mouseover=${() => (this.index = index)}
                    value=${option}
                  >
                    ${option}
                  </div>
                `
            )}
            ${this.GetFilterOptions().length <= 0
              ? html`<div class="dropdown__item">
                  No option match the input
                </div>`
              : ''}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('searchable-dropdown', SearchableDropdownElement);
