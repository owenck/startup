const GameEvent = {
    Tag: 'tagEvent'
};

class EventMessage {
    constructor(from, type, value) {
        this.from = from;
        this.type = type;
        this.value = value;
    }
}

class GameEventNotifier {
    events = [];
    handlers = [];

    constructor() {
        const port = window.location.port; // set to 4000, could be problematic
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        console.log("Connecting to WebSocket...");
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onerror = (error) => console.error("WebSocket error:", error);

        this.socket.onopen = () => {
            this.receiveEvent(new EventMessage('Tagster', GameEvent.System, { msg: 'connected' }));
        };

        this.socket.onclose = () => {
            this.receiveEvent(new EventMessage('Tagster', GameEvent.System, { msg: 'disconnected' }));
        };

        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text());
                this.receiveEvent(event);
            } catch (error) {
                console.error("Error processing WebSocket message:", error);
            }
        };
    }

    broadcastEvent(from, type, value) {
        console.log("Broadcasting event:", type);
        const event = new EventMessage(from, type, value);
        if (this.socket.readyState === WebSocket.OPEN) {
            console.log("sending to wss");
            this.socket.send(JSON.stringify(event));
        } else {
            console.error("WebSocket is not ready. Event not sent:", event);
        }
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers = this.handlers.filter((h) => h !== handler);
    }

    receiveEvent(event) {
        this.events.push(event);
        this.handlers.forEach((handler) => handler(event));
    }
}

const GameNotifier = new GameEventNotifier();
export { GameEvent, GameNotifier };
