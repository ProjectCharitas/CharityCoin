const fs = require('fs');
let opts = JSON.parse(fs.readFileSync('./options.json'));

const goback = () => {
    fs.writeFile("./common/options.json", JSON.stringify(opts), (err) => {
        if(err) console.error(err);
    })
}

const toggle = (e) => {
    opts[e.id] = e.checked;
}