const goback = () => {
    fs.writeFile(path.join(__dirname, "common/options.json"), JSON.stringify(opts), (err) => {
        if(err) console.error(err);
    })
}

const toggle = (e) => {
    if(e.id == "cpu"){
        if(!e.checked){
            if(!document.getElementById("gpu").checked){
                document.getElementById("gpu").checked = true;
                opts['gpu'] = document.getElementById("gpu").checked;
            }
                
        }
    }
    if(e.id == "gpu"){
        if(!e.checked){
            if(!document.getElementById("cpu").checked){
                document.getElementById("cpu").checked = true;
                opts['cpu'] = document.getElementById("cpu").checked;
            }
        }
    }
    opts[e.id] = e.checked;
}