export default class Vessel  {
    constructor(context, callbacks) {
        this.context = context;
        this.callbacks = callbacks;
    }

    addFunc(cb) {
        let name = cb.name;
        this.callbacks = Object.assign({ name: cb})
    }

    run(cbString, ...args) {
        let cb = this.callbacks[cbString];
        return cb.call(this.context, ...args);
    }
//    TODO: Make me react-y
}
