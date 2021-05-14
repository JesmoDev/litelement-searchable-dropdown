import { LitElement, html, css, property } from 'lit-element';

class SearchableDropdownElement extends LitElement {
  @property()
  options: string[];

  @property()
  private open: boolean = false;

  @property()
  private selectedOption: string = 'Select Option';

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

  toggleDropdown = () => {
    this.open = !this.open;
    if (this.open) {
      setTimeout(() => {
        this.shadowRoot.getElementById('input').focus();
      }, 0);
    }
  };

  selectOption = (option: string) => {
    this.selectedOption = option;

    this.toggleDropdown();
  };

  render() {
    return html`
      <div>
        <div class="select-input">
          ${this.open
            ? html`<input id="input" type="text" />`
            : html`<div class="header" @click=${() => this.toggleDropdown()}>
                ${this.selectedOption}
              </div>`}
          <div
            class="select-input--arrow"
            @click=${() => this.toggleDropdown()}
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
          </div>
        </div>

        <div
          class="dropdown ${this.open ? 'dropdown--open' : 'dropdown--closed'}"
        >
          ${this.options.map(
            (option) =>
              html`
                <div
                  @click=${() => this.selectOption(option)}
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
