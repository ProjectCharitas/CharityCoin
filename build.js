const fs = require('fs');
const min = require('node-minify');

const args = process.argv.slice(2).map(e => e.replace(/-/g, ''));
const isF = (n) => {
   return n.indexOf('.') > -1; //quick and dirty way to check if an entry is a file, there has got to be a better way
}

//delete old GUI/release/ directory
//any files you don't want deleted should be put in GUI/common/ 
let wipeRelease = fs.readdirSync('./GUI/release');
for (let file of wipeRelease) {
   if (isF(file)) {
      fs.unlinkSync(`./GUI/release/${file}`);
   }
}
console.log("Wiped /release/ directory")
//copy src files to /release/
let copySrc = fs.readdirSync('./GUI/src');
for (let file of copySrc) {
   if (isF(file)) {
      fs.writeFileSync(`./GUI/release/${file}`, fs.readFileSync(`./GUI/src/${file}`));
   }
}
console.log("Copied source files to /release/")

if (args.includes('t')) {
   //replace templates with code then write to ./GUI/src/
   const toReplace = {
      "<!--HEADER-->": fs.readFileSync("./GUI/src/replace/header.html", "utf8")
   }
   let replaceTemplate = fs.readdirSync('./GUI/release');
   for (let file of replaceTemplate) {
      if (isF(file)) {
         let content = fs.readFileSync(`./GUI/release/${file}`, 'utf8');
         for (let r in toReplace) {
            content = content.replace(r, toReplace[r]);
         }
         fs.writeFileSync(`./GUI/release/${file}`, content);
      }
   }
   console.log("Replaced templates")
}

if (args.includes('m')) {
   //minify the files
   let minifyFiles = fs.readdirSync('./GUI/release');
   for (let file of minifyFiles) {
      if (isF(file)) {
         let type = file.substring(file.lastIndexOf(".") + 1);
         const compressors = {
            'js': 'gcc',
            'css': 'clean-css',
            'html': 'html-minifier'
         };
         min.minify({
            compressor: compressors[type],
            input: `./GUI/release/${file}`,
            output: `./GUI/release/${file}`,
            callback: function (err, min) {}
         })
      }
   }
   console.log("Minified files")
}