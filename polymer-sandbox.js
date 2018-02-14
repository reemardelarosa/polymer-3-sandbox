import { Element as PolymerElement, html } from "./node_modules/@polymer/polymer/polymer-element.js";

class PolymerSandbox extends PolymerElement {
  static get template () {
    return html`
      <h1>Polymer 3.0 Sandbox</h1>
    `;
  }
}

customElements.define('polymer-sandbox', PolymerSandbox);