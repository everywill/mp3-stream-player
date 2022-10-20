import { FUPCMPlayer } from 'pcm-stream-player';
import { Mp3Decoder } from 'mp3-stream-decoder';

export class Mp3Player {
    constructor(options) {
        const self = this;
        this.decoder = new Mp3Decoder({
            wasmUrl: options.decoderWasm,
            pcm_output(chunk, opts) {
                const length = chunk.length;
                const channels = chunk.channels;
                const result = new Int16Array(length * channels);
                chunk.copyTo(result);
                self.pcmPlayer.feed(result);
            },
            info_callback({sampleRate, numsChannels}) {
                if(!self.pcmPlayer) {
                    self.pcmPlayer = new FUPCMPlayer({
                        encoding: '16bitInt',
                        channels: numsChannels,
                        sampleRate,
                    });
                } 
            }
        });
    }

    async initialize() {
        await this.decoder.initialize();
        this.decoder.configure();
    }

    feed(data) {
        this.decoder.decode(data);
    }

    setRequestStop() {
        if(this.pcmPlayer) {
            this.pcmPlayer.setRequestStop();
        }
    }

    interrupt() {
        if(this.pcmPlayer) {
            this.pcmPlayer.interrupt();
        }
    }
}
