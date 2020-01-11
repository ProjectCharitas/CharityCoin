const fs = require('fs');
const path = require('path');

let opts = JSON.parse(fs.readFileSync(path.join(__dirname, 'common/options.json')));

const goback = () => {
    fs.writeFile(path.join(__dirname, "common/options.json"), JSON.stringify(opts), (err) => {
        if(err) console.error(err);
    })
}

const toggle = (e) => {
    opts[e.id] = e.checked;
}