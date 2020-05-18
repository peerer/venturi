type listener = (typedArray: Uint8Array) => void;

export default class Venturi {
  constructor(chunkSize: number) {
    this.#chunkSize = chunkSize;
    this.#pushChunk = function () {
      if (this.#data.length >= this.#chunkSize) {
        const chunk = new Uint8Array(this.#data.splice(0, this.#chunkSize));

        this.#listeners.forEach(function (fn) {
          fn(chunk);
        });

        const next = this.#nextListeners.shift();
        if (next) {
          next(chunk);
        }

        this.#pushChunk();
      }
    };
  }

  #pushChunk: () => void;
  #data: number[] = [];
  #chunkSize: number = 0;
  #listeners: listener[] = [];
  #nextListeners: listener[] = [];

  push(typedArray: Uint8Array) {
    this.#data = [...this.#data, ...Array.from(typedArray)];
    this.#pushChunk();
  }

  listen(fn: listener) {
    this.#listeners.push(fn);
  }

  nextChunk(fn: listener) {
    this.#nextListeners.push(fn);
  }

  clear() {
    this.#listeners = [];
    this.#nextListeners = [];
  }
}
