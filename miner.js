const {spawn} = require("child_process");
let miner;
let state = true;

const clicked = (e) => {
    state ? startMining() : stopMining();
    state = !state;
    e.src = state ? "play.png" : "pause.png";
}

const startMining = () => {
    let opts = require("./options.json")
    console.log("Starting");
    miner = spawn(`CharityCoin${opts.cpu?"C":""}${opts.gpu?"G":""}PU.bat`);
    miner.stdout.on('data', data => console.log(`stdout: ${data}`))
    miner.stderr.on('data', data => console.err(`stderr: ${data}`))
    miner.on('close', () => {console.log("closed")})
}

const stopMining = () => {
    miner.kill();
    console.log("Stopping");
}