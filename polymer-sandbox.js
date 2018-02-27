// Import Polymer library and utils
import { 
  Element as PolymerElement, 
  html 
} from './node_modules/@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures } from './node_modules/@polymer/polymer/lib/utils/settings.js';
import './node_modules/@polymer/polymer/lib/elements/dom-repeat.js';

// Import web component for header
import './node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';

// Import web components for nav bar
import './node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import './node_modules/@polymer/paper-item/paper-item.js';
import './node_modules/@polymer/paper-listbox/paper-listbox.js';

class PolymerSandbox extends PolymerElement {
  constructor(){
    setPassiveTouchGestures(true);
    super();
    this._loadData('data/data.json');
  }

  /*  Properties are seeded with minimal data so that the first code sample 
      can be displayed without waiting for the data file to load.
  */
  static get properties() {
    return {
      /*  Title, uniqe id and description of each plunk  */
      plunkData: {
        type: Object,
        value: function () { return {
          'a2dZmn': {
            'plunkId': 'a2dZmn',
            'plunkTitle': 'Declare simple properties',
            'plunkDescription': '<ul><li>Declare simple properties (<code>Boolean</code>, <code>String</code>, <code>Number</code>, <code>Date</code>) in a static <code>properties</code> getter.</li><li>Initialize values for simple properties in the static <code>properties</code> getter.</li><li>Initialize values for simple properties from attributes in markup.</li></ul>'
          }
        };}
      },
      /*  Name, id and list of plunks in each category */
      categoryData: {
        type: Object,
        value: function () { return { 
          'properties': 
          {
            'categoryId': 'properties',
            'categoryName': 'Properties',
            'plunks': [ 'a2dZmn' ]
          }
        };}
      },
      currentCategory: {
        type: String,
        value: 'properties',
        observer: '_categoryChanged'
      },
      currentPlunk: {
        type: String,
        value: 'a2dZmn',
        observer: '_currentPlunkChanged'
      },
      /*  List of plunks available in current category.  */
      plunks: {
        type: Array,
        value: function () { return [ 'a2dZmn' ];}
      },
      /*  List of available categories. */
      categories: {
        type: Array,
        value: function () { return ['properties'];}
      }
    };
  }

  /*  Retrieve and process data file containing info about the 
      code samples and menu items   */
  _loadData(filename){
    var request=new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      this.categoryData=event.target.response.categoryData;
      this.plunkData=event.target.response.plunkData;
      this.categories=Object.keys(this.categoryData);
      this.plunks=this.categoryData[this.currentCategory].plunks;
      this.currentPlunk=this.plunks[0];
    }.bind(this));
    request.responseType='json';
    request.open('GET', filename, true);
    request.send();
  }

  /*  When the current category changes:
      - Populate the list of plunks with the plunks in the new category
      - Display the first plunk from that list  */
  _categoryChanged(newValue, oldValue){
      this.plunks=this.categoryData[newValue].plunks;
      this.currentPlunk=this.plunks[0];
  }

/*  When the current plunk changes:
    - Update the plunk description section
    - Update the embedded plunker   */
  _currentPlunkChanged(newValue, oldValue){
    this.$.plunkdesc.innerHTML=this.plunkData[newValue].plunkDescription;

    /*  Look through each node assigned to the slot.
        If it is an <embedded-plunker>, set its plunkId prop to 
        the new currentPlunk.  */
    var nodes = this.$.slot.assignedNodes();
    for (var i = 0; i< nodes.length; i++) {
      if(nodes[i].nodeName == 'EMBEDDED-PLUNKER') {
        var embeddedPlunker = nodes[i];
        embeddedPlunker.plunkId = newValue;
      }
    }
    /*  The following code works in polymer dev server but does not work in production:   */ 
    /* 
        const embeddedPlunker = this.$.slot.assignedNodes()[1]; // because text nodes.
        console.log(this.$.slot.assignedNodes()[1]);
        embeddedPlunker.plunkId = newValue;
    */ 
    /*  Maybe I am hallucinating but when deployed to firebase, there are no text nodes. wat  */
  }

  _getCategoryName(categoryId){
    return(this.categoryData[categoryId].categoryName);
  }

  _getPlunkTitle(plunkId){
    return(this.plunkData[plunkId].plunkTitle);
  }

  static get template () {
    return html`
      <style>
        :host {
          display: block;
          font-family: Roboto, Noto, sans-serif;
          padding: 0;
          margin: 0;
        }
        app-toolbar {
          font-family: Roboto, Noto, sans-serif;
          background-color: var(--paper-blue-500);
          color: white;
          margin: 0;
        }
        nav {
          float: left;
          max-width: 300px;
        }
        main {
          clear: none;
          height: 100%;
        }
        paper-dropdown-menu {
          padding: 5px;
          margin: 0;
          width: 290px;
        }
        paper-listbox.categoryselector {
          padding: 0;
          margin: 0;
          background-color: #f1f1f1;
        }
        paper-listbox.plunkselector {
          padding: 0;
          margin: 0;
          background-color: #f1f1f1;
          width: 100%;
        }
        .container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        #embeddedplunk {
          flex-grow: 3;
          height: 100%;
        }
        @media(max-width: 600px) {
          nav {
            float: none;
            max-width: 100%;
          }
          paper-dropdown-menu {
            width: 100%;
          }
        }
      </style>
      <app-toolbar>
        <div main-title>Polymer 3.0 Sandbox</div>
      </app-toolbar>
      <nav>
        <div id="categoryselector">
          <paper-dropdown-menu label="Category" no-animations>
            <paper-listbox slot="dropdown-content"
              class="categoryselector"
              attr-for-selected="id" 
              selected="{{currentCategory}}">
              <template is="dom-repeat" items="{{categories}}">
                <paper-item id="{{item}}">{{_getCategoryName(item)}}</paper-item>
              </template>
            </paper-listbox>
          </paper-dropdown-menu>
        </div>
        <div id="plunkselector">
          <paper-listbox class="plunkselector" attr-for-selected="id" selected="{{currentPlunk}}">
            <template is="dom-repeat" items="{{plunks}}"> 
              <paper-item id="{{item}}">{{_getPlunkTitle(item)}}</paper-item>
            </template>
          </paper-listbox>
        </div>
      </nav>
      <main>
        <div class="container">
          <div class="contained" id="plunkdata">
            <p><b>[[_getPlunkTitle(currentPlunk)]]</b> | <small>Edit this Plunker sample in a new tab: <a target="_blank" rel="noopener" href="https://plnkr.co/edit/[[currentPlunk]]?p=preview">https://plnkr.co/edit/[[currentPlunk]]?p=preview</a></small></p>
            <p id="plunkdesc"></p>
          </div>
          <div class="contained" id="embeddedplunk">
            <!-- Embedded Plunker goes here --> 
            <slot id="slot" name="slot"></slot>
          </div>
        </div>
      </main>
    `;
  }
}

customElements.define('polymer-sandbox', PolymerSandbox);
