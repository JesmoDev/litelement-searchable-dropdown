import { LitElement, html, css } from 'lit-element';

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
      }
    `,
  ];
  render() {
    return html`
      <div>
        <h1>Searchable dropdown</h1>
        <searchable-dropdown .options=${this.options}></searchable-dropdown>
      </div>
    `;
  }
}

customElements.define('my-app', AppElement);
