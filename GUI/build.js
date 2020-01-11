const fs = require('fs');
const min = require('node-minify');

//delete old GUI/release/ directory
//any files you don't want deleted should be put in GUI/common/ 

fs.readdir("./release", (err, files) => {
   if (err) console.log(err);
   else {
      for (let file of files) {
         try {
            fs.unlinkSync(`release/${file}`);
         } catch (err) {
            //lmao throw an error if you want to I didn't want to delete the ./common/ directory anyway stupid code get pranked
         }
      }
   }
});

//replace templates with code then write to ./src/
const toReplace = {
   "<!--HEADER-->": fs.readFileSync("./src/replace/header.html", "utf8")
}

fs.readdir("./src", (err, files) => {
   if (err) console.error(err);
   else {
      for (let file of files) {
         if (file.indexOf(".") > -1) { //quick and dirty way to check if an entry is a file
            let content = fs.readFileSync(`./src/${file}`, 'utf8');
            for (let r in toReplace) {
               content = content.replace(r, toReplace[r]);
            }
            fs.writeFileSync(`./release/${file}`, content);
         }
      }
   }
})

//minify the files

fs.readdir("./release", (err, files) => {
   if (err) console.error(err);
   else {
      for (let file of files) {
         if (file.indexOf(".") > -1) { //there's gotta be a better way to do that
            let type = file.substring(file.lastIndexOf(".") + 1);
            const compressors = {
               'js': 'gcc',
               'css': 'clean-css',
               'html': 'html-minifier'
            };
            min.minify({
               compressor: compressors[type],
               input: `./release/${file}`,
               output: `./release/${file}`,
               callback: function (err, min) {}
            })
         }
      }
   }
});