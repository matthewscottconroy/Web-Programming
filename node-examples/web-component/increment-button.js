class IncrementButton extends HTMLElement {
    constructor() {
        super(); // Always call super first in constructor
        this.attachShadow({mode: 'open'}); // Attach a shadow root to the element.
        this.shadowRoot.innerHTML = `
            <style>
                button {
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                }
            </style>
            <button id="btn">0</button>
        `;

        this.count = 0; // Initialize the count
        this.button = this.shadowRoot.querySelector('#btn');
        this.button.addEventListener('click', () => this.increment());
    }

    increment() {
        this.count++;
        this.button.innerText = this.count;
    }
}

// Define the new element
customElements.define('increment-button', IncrementButton);
