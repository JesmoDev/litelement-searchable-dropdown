import { LitElement, html, css, property, state } from 'lit-element';

class SearchableDropdownElement extends LitElement {
  @property()
  options: string[];

  @state() open: boolean = false;
  @state() selectedOption: string = 'Select Option';
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
        padding: 8px;
      }

      .dropdown--open {
        display: block;
      }

      .dropdown--closed {
        display: none;
      }
    `,
  ];

  handleToggleDropdown() {
    this.open = !this.open;
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
  }

  filterOptions(): string[] {
    if (this.search) {
      return this.options.filter((x) => x.includes(this.search));
    } else {
      return this.options;
    }
  }

  render() {
    return html`
      <div>
        <div class="select-input">
          ${this.open
            ? html`<input
                @input=${this.handleOnInputChange}
                id="input"
                type="text"
                value=${this.selectedOption}
              />`
            : html`<div class="header" @click=${this.handleToggleDropdown}>
                ${this.selectedOption}
              </div>`}
          <div class="select-input--arrow" @click=${this.handleToggleDropdown}>
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
          </div>
        </div>

        <div
          class="dropdown ${this.open ? 'dropdown--open' : 'dropdown--closed'}"
        >
          ${this.filterOptions().map(
            (option) =>
              html`
                <div
                  @click=${() => this.handleSelectOption(option)}
                  value="${option}"
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
