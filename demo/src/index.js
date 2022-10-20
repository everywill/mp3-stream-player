import { connect } from './websocket_connection.js';
import { Mp3Player } from '../../lib/index.js';

const mp3Player = new Mp3Player({
    decoderWasm: 'public/LameDecoder.wasm',
})

const playBtn = document.getElementById('play');
playBtn.onclick = async function(event) {
    await mp3Player.initialize();
    // const res = await fetch('public/media/tests_streamp3_data_stereo.mp3');
    // const buffer = await res.arrayBuffer();
    // mp3Decoder.decode(buffer);
   
    connect({
        onData(data) {
            mp3Player.feed(data);
        },
        onComplete() {
            mp3Player.setRequestStop();
        }
    })
}