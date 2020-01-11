const electron = require('electron');

const {app, BrowserWindow} = require('electron');

const createWindow = () => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  win.loadFile('MainApp.html');

  win.on('closed', () => { 
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin'){
    app.quit();
  };
});

app.on('activate', () => {
  if(win === null){
    createWindow();
  }
});