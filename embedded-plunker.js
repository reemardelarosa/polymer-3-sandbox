import { Element as PolymerElement, html } from './node_modules/@polymer/polymer/polymer-element.js'; 
import { FlattenedNodesObserver } from './node_modules/@polymer/polymer/lib/utils/flattened-nodes-observer.js';

class EmbeddedPlunker extends PolymerElement {
  static get properties () {
    return {
      plunkId: {
        type: String,
        value: '',
        observer: '_refreshIframe'
      },
      iframe: {
        type: Object
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
    var iframe = document.createElement("iframe");
    iframe.id="iframe";
    iframe.frameBorder="0";
    iframe.title="Sample";
    this.appendChild(iframe);
    var nodes = FlattenedNodesObserver.getFlattenedNodes(this);
    for (var i=0; i < nodes.length; i++){
      if (nodes[i].nodeName =='IFRAME'){
        this.iframe=nodes[i];
      }
    }
    this.set('iframe.src', this._getPlunkSrc(this.plunkId));
  }

  _attachDom(dom) {
    this.appendChild(dom);
  }

  _refreshIframe(newValue, oldValue) {
    if (this.iframe != undefined ) {
      console.log(this.iframe.src);
      this.iframe.src = '';
      console.log(this.iframe.src);
      //console.log(this.iframe.contentDocument);
      //console.log(this.iframe.contentWindow.document);
      //this.iframe.src="";
      this.set('iframe.src', this._getPlunkSrc(newValue));
    }
  }

  _getPlunkSrc(plunkId) {
    if (window.innerWidth >= 1000 ) {
      return 'https://embed.plnkr.co/' + plunkId + '/?p=app,preview&show=js,preview&sidebar=tree';
    } else if (window.innerWidth >= 500 ) {
      return 'https://embed.plnkr.co/' + plunkId + '/?p=preview&show=js,preview&sidebar=none';
    } else {
      return 'https://embed.plnkr.co/' + plunkId + '/?show=js&sidebar=none';
    }
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
    `;
  }
}

customElements.define('embedded-plunker', EmbeddedPlunker);
