# mp3-stream-player
A mp3 steam player for web

# How to use
```
const mp3Player = new Mp3Player({
    decoderWasm: 'url of lib/LameDecoder.wasm',
});

await mp3Player.initialize();  //  initialize and load wasm

mp3Player.feed(data);   // player will automatically handle playing sound
```
