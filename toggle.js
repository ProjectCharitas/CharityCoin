const fs = require('fs');
let opts = JSON.parse(fs.readFileSync('./options.json'));

console.log(`opts: ${JSON.stringify(opts)}`);

const goback = () => {
    fs.writeFile("./options.json", JSON.stringify(opts), (err) => {
        if(err) console.error(err);
    })
}

const toggle = (e) => {
    opts[e.id] = e.checked;
    console.log(opts);    
}