# crepe pitch tracker as WebAPI scriptProcessorNode module

Pitch estimation on a per-buffer basis as an audio stream is run through 
a WebAudio graph.

## Description

This is an "update" of the MARL crepe model running here: (https://marl.github.io/crepe/). It is also the same model as ml5js (https://github.com/ml5js/). The app code here shows how to use the WebAudioAPI scriptProcessorNode implementing crepe. 

We just teased apart the MARL interface and audio code, making the scriptProcessorNode importable as an ES6 module, and making the pitch extraction node more re-usable. An API was added to get callbacks from the node with pitch and/or pitch activations.  

## Getting Started
To run the app, serve it. We just start a little server with 
```
npx http-server
```
and point a browser to localhost and the port the server is running on. 

### Dependencies

tfjs-0.8.0.min.js  is included in this project in the /libs folder. 

## Author

Lonce Wyse   ("author" is a bit glorious for a bit of code refactoring)

[lonce.org](https://lonce.org)

## License

Please check the [MARL site](https://github.com/marl/crepe) for licence info.

