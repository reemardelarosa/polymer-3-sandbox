import { PolymerElement, html } from '@polymer/polymer/polymer-element.js'; 
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';

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
      },
      loaded: {
        type: Boolean,
        value: false
      }
    };
  }

  /*  Wait for the window's load event to fire before loading the plunk. 
      This offering pleases Lighthouse.
      When adding event listeners to anything except the element or its 
      children, the event listener should be added from connectedCallback. See 
      https://www.polymer-project.org/2.0/docs/devguide/events#listener-on-outside-elements
  */
  connectedCallback () {
    super.connectedCallback();
    window.addEventListener('load', this.loadPlunk.bind(this));
  }

  /*  Remove the event listener when the element is disconnected. See 
      https://www.polymer-project.org/2.0/docs/devguide/events#listener-on-outside-elements
  */
  disconnectedCallback(){
    super.disconnectedCallback();
    window.removeEventListener('load', this.loadPlunk.bind(this));
  }
  
  loadPlunk(event){
    /*  In firefox, the load event was firing twice, triggering two iframes
        to be added to the document, only one of which did the thing properly */
    if (this.loaded==true){
      return;
    }
    var iframe = document.createElement("iframe");
    iframe.id="iframe";
    iframe.frameBorder="0";
    iframe.title="Sample";
    iframe.width="100%";
    iframe.height="100%";
    this.iframe=this.appendChild(iframe);
    this.set('iframe.src', this._getPlunkSrc(this.plunkId));
    this.loaded=true;
  }

  /* plunker does not like being in shadow DOM */
  _attachDom(dom) {
    this.appendChild(dom);
  }

  _refreshIframe(newPlunkId, oldPlunkId) {
    if (this.iframe != undefined ) {
      this.iframe.src = '';
      this.set('iframe.src', this._getPlunkSrc(newPlunkId));
    }
  }

  _getPlunkSrc(plunkId) {
    /*  Width of the window determines which panels to show in the plunker. 
        (Not really "responsive"; won't redraw when the window resizes. Determined by 
        the width of the window when the plunk ID changes.)
        - For a window >=1000px wide, show list of files, code editor, and preview.
        - For a window between 500 and 1000 px wide, show code editor and preview.
        - For a window narrower than 500px, show only the code editor.
        TODO: Maybe change it to _getPlunkSrc(plunkId, baseUrl, plunkOptions) or something?
    */
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
