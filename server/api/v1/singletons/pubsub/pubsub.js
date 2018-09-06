import { PubSub } from 'apollo-server';

class PubSubSingleton {
    constructor() {
        if (!PubSubSingleton.instance) {
            this.pubsub = new PubSub();
            PubSubSingleton.instance = this;
        }
        return PubSubSingleton.instance;
    }
}

const instance = new PubSubSingleton();
Object.freeze(instance);

export default instance;