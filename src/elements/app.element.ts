import { LitElement, html, css, property } from 'lit-element';

class AppElement extends LitElement {
  options = [
    'Albert',
    'Lisa',
    'Lars',
    'Jesper',
    'Monica',
    'Randal',
    'Lynea',
    'Elspeth',
    'Rosalinde',
    'Marketa',
    'Jeremie',
    'Celesta',
    'Antonietta',
    'Sebastian',
  ];

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        margin: auto;
        max-width: 500px;
        align-items: center;
        height: 100vh;
        padding-top: 20vh;
        box-sizing: border-box;
        color: #374151;
      }
    `,
  ];

  @property()
  name: string;

  handleSelectName(event: CustomEvent) {
    this.name = event.detail;
  }

  render() {
    return html`
      <div>
        <h1>Searchable dropdown</h1>
        <searchable-dropdown
          .options=${this.options}
          @onSelectOption=${this.handleSelectName}
        ></searchable-dropdown>
        ${this.name
          ? html`
              <h3>You have selected the name</h3>
              <h2>${this.name}</h2>
            `
          : html`<h3>You haven't selected a name yet</h3>`}
      </div>
    `;
  }
}

customElements.define('my-app', AppElement);
