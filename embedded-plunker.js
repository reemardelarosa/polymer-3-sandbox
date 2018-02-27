import { Element as PolymerElement, html } from './node_modules/@polymer/polymer/polymer-element.js'; 

class EmbeddedPlunker extends PolymerElement {
  static get properties () {
    return {
      plunkId: {
        type: String,
        value: ''
      },
      plunkSrc: {
        type: String,
        computed: '_getPlunkSrc(plunkId)'
      },
      mainPageReady: {
        type: Boolean,
        value: false
      }
    };
  }

  connectedCallback () {
    super.connectedCallback();
    window.addEventListener('load', this.loadPlunk.bind(this));
  }

  disconnectedCallback(){
    super.disconnectedCallback();
    window.removeEventListener('load', this.loadPlunk.bind(this));
  }
  
  loadPlunk(event){
    console.log(event);
    this.mainPageReady = true;
    this.$.iframe.src = this._getPlunkSrc(this.plunkId);
  }

  _attachDom(dom) {
    this.appendChild(dom);
  }

  _getPlunkSrc(plunkId) {
    if (this.mainPageReady) {
      if (window.innerWidth >= 1000 ) {
        return 'https://embed.plnkr.co/' + plunkId + '/?p=app,preview&show=js,preview&sidebar=tree';
      } else if (window.innerWidth >= 500 ) {
        return 'https://embed.plnkr.co/' + plunkId + '/?p=preview&show=js,preview&sidebar=none';
      } else {
        return 'https://embed.plnkr.co/' + plunkId + '/?show=js&sidebar=none';
      }
    }
    else return '';
  }
  
  static get template () {
    return html`
      <style>
        :host {
          display: block;
          height: 100%;
          width: 100%;
        }
        iframe {
          display: block;
          width: 100%;
          height: 100%;
        }
      </style>
      <iframe
        id='iframe'
        src="[[plunkSrc]]"
        frameBorder="0"
        allowfullscreen="allowfullscreen"
        title="Embedded Polymer Sample"
      ></iframe>
    `;
  }
}

customElements.define('embedded-plunker', EmbeddedPlunker);
