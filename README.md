# venturi

Venturi allows transfer of data with chunk size limitation, something you can encounter with WebRTC messages limited to 64kB.

<p align="center">
<img src=venturi.png width=600/>
</p>


```js
const data = new Uint8Array(1024 * 1024)
const venturi = new Venturi(64 * 1024)

venturi.push(data)
venturi.listen(chunk => console.log(chunk))

sourceBuffer.addEventListener("updateend", function() {
  venturi.nextChunk((chunk) => sourceBuffer.appendBuffer(chunk));
});
```
