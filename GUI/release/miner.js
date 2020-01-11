const {spawn} = require("child_process");
const path = require("path");

let miner;
let state = true;

const clicked = (e) => {
    state ? startMining() : stopMining();
    state = !state;
    e.src = state ? (path.join(__dirname,"common/play.png")) : (path.join(__dirname,"common/pause.png"));
}

const startMining = () => {
    let opts = require(path.join(__dirname,"common/options.json"));
    console.log("Starting");
    miner = spawn(path.join(__dirname,`common/CharityCoin${opts.cpu?"C":""}${opts.gpu?"G":""}PU.bat`));
    console.log(miner)
    miner.stdout.on('data', data => console.log(`stdout: ${data}`))
    miner.stderr.on('data', data => console.err(`stderr: ${data}`))
    miner.on('close', () => {console.log("closed")})
}

const stopMining = () => {
    miner.kill();
    console.log("Stopping");
}