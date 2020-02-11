const {spawn} = require("child_process");

let miner;
let state = false;

const clicked = (e) => {
    state = !state;
    if(state){ //miner turned on
        startMining();
        [e.children[3], e.children[4]].forEach(c => c.setAttribute('class', 'on'));
    }
    else { //miner turned off
        stopMining();
        document.getElementById("anim-off").innerHTML = `
        @keyframes unspin {
            from {
                transform: rotate(${Math.asin(getComputedStyle(document.getElementById("arrows"))['transform'].replace(/[a-z()]/g,"").split(",")[1]) * 180/Math.PI}deg);
            }
            to {
                transform: rotate(0deg);
            }
        }
        `;
        [e.children[3], e.children[4]].forEach(c => c.setAttribute('class', 'off'));
    }
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