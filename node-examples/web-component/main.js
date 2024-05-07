class CustomGreeting extends HTMLElement {
  constructor() {
		super();
		this.attachShadow({mode: 'open'});
		this.shadowRoot.innerHTML = `
       <p>Hello, <span id="name">Guest</span>!</p>
		`;
	}

	connectedCallback() {
    console.log("I'm connected!");
	}

	static get observedAttributes() {
    return ['name'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'name') {
			this.shadowRoot.querySelector('#name').innerText = newValue;
	  }
  }
}
customElements.define('custom-greeting', CustomGreeting);

