import { makeCrepeScriptNode } from "./crepeScriptNode.js";

export function featureGraph(audioContext, pitchCallback, pitchVectorCallback) {
  function error(message) {
    document.getElementById('status').innerHTML = 'Error: ' + message;
    console.log('Error: ' + message)
    return message;
  }

  function status(message) {
    document.getElementById('status').innerHTML = message;
    console.log(`Status: ` + message)
  }

  // Create the graph
  function initAudio() {
    if (!navigator.getUserMedia) {
      if (navigator.mediaDevices) {
        navigator.getUserMedia = navigator.mediaDevices.getUserMedia;
      } else {
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      }
    }
    if (navigator.getUserMedia) {
      status('Initializing audio graph...')
      navigator.getUserMedia({audio: true}, function(stream) {
        status('Setting up AudioContext ...');
        console.log('Audio context sample rate = ' + audioContext.sampleRate);
        const mic = audioContext.createMediaStreamSource(stream);

        // We need the buffer size that is a power of two and is longer than 1024 samples when resampled to 16000 Hz.
        // In most platforms where the sample rate is 44.1 kHz or 48 kHz, this will be 4096, giving 10-12 updates/sec.
        const minBufferSize = audioContext.sampleRate / 16000 * 1024;
        for (var bufferSize = 4; bufferSize < minBufferSize; bufferSize *= 2);
        console.log('Buffer size = ' + bufferSize);

        const scriptNode = makeCrepeScriptNode(audioContext, bufferSize, pitchCallback, pitchVectorCallback )

        // It seems necessary to connect the stream to a sink for the pipeline to work, contrary to documentataions.
        // As a workaround, here we create a gain node with zero gain, and connect temp to the system audio output.
        const gain = audioContext.createGain();
        gain.gain.setValueAtTime(.7, audioContext.currentTime);

        mic.connect(scriptNode);
        scriptNode.connect(gain);

        gain.connect(audioContext.destination);

      }, function(message) {
        error('Could not access microphone - ' + message);
      });
    } else error('Could not access microphone - getUserMedia not available');
  }

  initAudio();
  return;
};

