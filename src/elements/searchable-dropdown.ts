import { LitElement, html } from 'lit-element';

class SearchableDropdownElement extends LitElement {
    render() {
        return html`
      <div>Element working</div>
    `;
    }
}

customElements.define('searchable-dropdown', SearchableDropdownElement);
