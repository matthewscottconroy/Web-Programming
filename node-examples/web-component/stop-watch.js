class StopwatchComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                div, button {
                    font-family: Arial, sans-serif;
                    margin: 5px;
                }
                button {
                    padding: 5px 10px;
                    font-size: 16px;
                    cursor: pointer;
                }
                #display {
                    color: var(--text-color, black); /* Default color is black */
                }
            </style>
            <div id="display">00:00:00</div>
            <button id="toggle">Start</button>
            <button id="reset">Reset</button>
        `;

        this.display = this.shadowRoot.querySelector('#display');
        this.toggleButton = this.shadowRoot.querySelector('#toggle');
        this.resetButton = this.shadowRoot.querySelector('#reset');

        this.running = false;
        this.elapsedTime = 0;
        this.lastTime = 0;

        this.toggleButton.addEventListener('click', () => this.toggle());
        this.resetButton.addEventListener('click', () => this.reset());
    }

    connectedCallback() {
        this.updateColor();
    }

    static get observedAttributes() {
        return ['color'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'color') {
            this.updateColor();
        }
    }

    updateColor() {
        const color = this.getAttribute('color') || 'black'; // Default to black if no color is set
        this.display.style.color = color;
    }

    toggle() {
        if (!this.running) {
            this.running = true;
            this.lastTime = Date.now();
            this.interval = setInterval(() => {
                const now = Date.now();
                const delta = now - this.lastTime;
                this.lastTime = now;
                this.elapsedTime += delta;
                this.updateDisplay();
            }, 100); // Update the timer every 100 milliseconds
            this.toggleButton.textContent = 'Stop';
        } else {
            clearInterval(this.interval);
            this.running = false;
            this.toggleButton.textContent = 'Start';
        }
    }

    reset() {
        this.elapsedTime = 0;
        this.updateDisplay();
    }

    updateDisplay() {
        const time = new Date(this.elapsedTime);
        const hours = String(time.getUTCHours()).padStart(2, '0');
        const minutes = String(time.getUTCMinutes()).padStart(2, '0');
        const seconds = String(time.getUTCSeconds()).padStart(2, '0');
        this.display.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

customElements.define('stopwatch-component', StopwatchComponent);

