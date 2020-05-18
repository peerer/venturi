declare type listener = (typedArray: Uint8Array) => void;
export default class Venturi {
    constructor(chunkSize: number);
    data: number[];
    chunkSize: number;
    listeners: listener[];
    nextListeners: listener[];
    pushChunk(): void;
    push(typedArray: Uint8Array): void;
    listen(fn: listener): void;
    nextChunk(fn: listener): void;
    clear(): void;
}
export {};
