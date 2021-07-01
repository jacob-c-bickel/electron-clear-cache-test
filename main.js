const fs = require("fs");
const path = require("path");
const { app, BrowserWindow, ipcMain, session } = require("electron");

app.commandLine.appendSwitch("disk-cache-size", "0"); // Ineffective
app.commandLine.appendSwitch("disable-http-cache"); // Ineffective

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // Preload config
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // session: session.fromPartition("example", { cache: false }) // Ineffective
    }
    // Insecure config (allows for webFrame.clearCache() which works)
    // webPreferences: {
    //   nodeIntegration: true,
    //   contextIsolation: false
    // }
  });

  mainWindow.loadURL(`file://${path.join(__dirname, "index.html")}`);
};

app.on("ready", createWindow);

ipcMain.handle("SWAP_FILENAMES", async (event) => {
  fs.renameSync("./images/1.jpg", "./images/temp.jpg");
  fs.renameSync("./images/2.jpg", "./images/1.jpg");
  fs.renameSync("./images/temp.jpg", "./images/2.jpg");

  await mainWindow.webContents.session.clearCache(); // Ineffective
  await mainWindow.webContents.session.clearStorageData(); // Ineffective
});