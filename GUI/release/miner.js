const {
    spawn,
    exec
} = require("child_process");

let miner;
let state = false;

const searchForOpenMiners = () => {
    exec(`wmic process WHERE "CommandLine LIKE '%CharityCoin%.bat%' AND Name='cmd.exe' AND NOT CommandLine LIKE '%wmic%'" get ProcessId | more +1`, (err, stdout, stderr) => {
        let procs = stdout.trim().split("\n").filter(p => p != "").map(p => p.trim());
        state = procs.length > 0;
        if (procs.length > 0) {
            if (procs.length == 1) {
                miner = {
                    kill: function () {
                        exec("taskkill /PID " + procs[0]);
                    }
                }
                toggleSpinner();
            } else {
                console.error("Multiple Miners found: " + procs);
                alert("Multiple Miners Detected.\nThis should not occur.\nPlease reach out to us on social media or contact us at help@charitas.co")
            }
        }
    })
}

const toggleSpinner = () => {
    [document.getElementById('mine-button').children[3], document.getElementById('mine-button').children[4]].forEach(c => c.setAttribute('class', state ? 'on' : 'off'));
}

const clicked = (e) => {
    state = !state;
    if (state) { //miner turned on
        startMining();
        toggleSpinner();
    } else { //miner turned off
        stopMining();
        document.getElementById("anim-off").innerHTML = `
        @keyframes unspin {
            from {
                transform: rotate(${-1 * (Math.asin(getComputedStyle(document.getElementById("arrows"))['transform'].replace(/[a-z()]/g,"").split(",")[1]) * 180/Math.PI)}deg);
            }
            to {
                transform: rotate(0deg);
            }
        }
        `;
        toggleSpinner();
    }
}

const startMining = () => {
    let opts = require(path.join(__dirname, "common/options.json"));
    console.log("Starting");
    miner = spawn(path.join(__dirname, `common/CharityCoin${opts.cpu?"C":""}${opts.gpu?"G":""}PURunner.bat`));
    console.log(miner)
    miner.stdout.on('data', data => console.log(`stdout: ${data}`))
    miner.stderr.on('data', data => console.error(`stderr: ${data}`))
    miner.on('close', () => {
        console.log("closed")
    })
}

const stopMining = () => {
    miner.kill();
    console.log("Stopping");
}