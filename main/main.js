const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const _ = require('lodash');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadURL('http://localhost:3000');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (_.isNull(mainWindow)) {
      createWindow();
    }
  });
}).catch(error => {
  console.error(error);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('download-url', (event, url) => {
  if (!_.isNull(mainWindow)) {
    mainWindow.webContents.downloadURL(url);
  }
});

app.on('web-contents-created', (event, contents) => {
  if (contents.getType() === 'webview') {
    contents.session.on('will-download', (event, item, webContents) => {
      const id = Date.now().toString() + Math.random().toString();
      const filename = item.getFilename();

      mainWindow.webContents.send('download-started', { id, filename });

      item.on('updated', (event, state) => {
        if (state === 'interrupted') {
          mainWindow.webContents.send('download-progress', { id, progress: 0, state: 'interrupted' });
        } else if (state === 'progressing') {
          if (item.isPaused()) {
            return;
          }
          const progress = item.getReceivedBytes() / item.getTotalBytes();
          mainWindow.webContents.send('download-progress', { id, progress, state: 'downloading' });
        }
      });

      item.once('done', (event, state) => {
        const finalState = state === 'completed' ? 'completed' : 'interrupted';
        const url = item.getURL();
        mainWindow.webContents.send('download-progress', { id, progress: 1, state: finalState, url });
      });
    });
  }
});
