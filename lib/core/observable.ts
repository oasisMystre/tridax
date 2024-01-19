export class Observable {
  #listeners: Map<string, Function[]>;

  constructor() {
    this.#listeners = new Map();
  }

  addEventListener(event: string, fn: Function, once = false) {
    if (once) {
      fn = (...args: any[]) => {
        fn(...args);
        this.removeEventListener(event, fn);
      };
    }

    let listeners = this.#listeners.get(event) ?? [];
    if (this.#listeners.has(event)) this.#listeners.set(event, []);
    listeners.push(fn);

    return once ? null : () => this.removeEventListener(event, fn);
  }

  removeEventListener(event: string, fn: Function) {
    if (!this.#listeners.has(event))
      throw new Error("No listener found for " + event + " event");

    const listeners = this.#listeners.get(event);
    const index = listeners.findIndex((value) => value === fn);
    listeners.splice(index, 1);
  }
}
