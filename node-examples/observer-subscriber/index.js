const EventEmitter = require('events');

class Subject extends EventEmitter {
    constructor() {
        super();
        this.state = 0;
    }

    changeState(newState) {
        this.state = newState;
        this.emit('stateChanged', this.state);
    }
}

function observer1(state) {
    console.log(`Observer 1: State changed to ${state}`);
}

function observer2(state) {
    console.log(`Observer 2: State changed to ${state}`);
}

const subject = new Subject();
subject.on('stateChanged', observer1);
subject.on('stateChanged', observer2);

subject.changeState(1); // Notifies all subscribed observers

