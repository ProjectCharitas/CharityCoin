const electron = require("electron");

const ipc = electron.ipcRenderer;

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;



//const {app, BrowserWindow} = require('electron')

const path = require('path')

const url = require('url')



  
  cpu = true;
  gpu = true;
  gpuUsage = 50;
  const startMining = function () {
    const execFile = require('child_process');
    var path = "CharityCoinCGPU.bat";
    /*
    if(cpu&&gpu) {
      path="CharityCoinCGPU.bat";
    } else if(cpu) {
      path = "CharityCoinCPU.bat";
    } else if(gpu) {
      path = "CharityCoinGPU.bat";
    } else {
      console.log("Neither CPU or GPU were enabled");
      return false;
    }
  */
 const child = execFile(path);
 //spawn('cmd.exe', ['/c', path]);
 console.log("death");
  }


let win;
function display() {
  win = new BrowserWindow({
    width: 800, 
    height: 600,
    resizable: false
  })


  win.loadURL(url.format({
    pathname: path.join(__dirname, 'MainApp.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.webContents.openDevTools();
 
  win.on('closed', () => {
    win = null
  });


}



app.on('ready', display);

app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {

    app.quit();

  }

});

app.on('browser-window-created',function(e,window) {
  window.setMenu(null);
});

app.on('activate', () => {

  if (win === null) {

    display();

  }

});

function toggleButton(e, f) {
  var target = e.target,
  count = +target.dataset.count;
  target.dataset.count = count === 1 ? 0 : 1;
  /*
    swap event sender canvas between off and on
  */

  if(f==0) {
    if(target.dataset.count == 1) {
      gpu=true
      return 0;
    }
    gpu= false;
  }
  else {
    if(target.dataset.count == 1) {
      cpu=true
      return 0;
    }
    cpu= false;
  }
}

//x = win.document.getElementById("MiningButton");
const minerClicked = function(e) {
  if(e.textContent=="Start Mining") {
    console.log(e.textContent);
    e.textContent = "Stop Mining";
  } else {
    e.textContent = "Start Mining";
  }
  startMining();
}