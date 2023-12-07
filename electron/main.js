const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const codMainFile = require("./cod/main.js")
const crabMainFile = require("./crab/mainCrab.js")
const crabOPMainFile = require('./crabop/mainCrab.js')

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 850,
        height: 550,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        show: false,
        maxHeight: 550,
        maxWidth: 850,
        minHeight: 550,
        minWidth: 850
    })

    mainWindow.loadURL(
        isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    )

    mainWindow.setMenuBarVisibility(false)

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle("open-dialog", () => {
    return dialog.showOpenDialogSync({
        properties: ['openFile', 'multiSelections'],
        filters:[
            {name: "Excel", extensions:["xlsx"]}
        ]
    
    })
})

ipcMain.handle("get-desktop", () => {
    let dir_home = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]
    let dir_desktop = path.join(dir_home, "Desktop")

    return dir_desktop
})

ipcMain.handle("ssd-extract",  (event, file) => {
   
    const ssdFile = file[0].toString()
    const douseiFile = file[1].toString()
    const desktopDir = file[2].toString()
    let res =  codMainFile.main(ssdFile, douseiFile, desktopDir)
    
    return res  
})

ipcMain.handle("ssd-extract-crab",  (event, file) => {
   
    const ssdFile = file[0].toString()
    const douseiFile = file[1].toString()
    const desktopDir = file[2].toString()
    const dbFile = file[3].toString()
    let res =  crabMainFile.main(ssdFile, douseiFile, desktopDir, dbFile)
    
    return res  
})

ipcMain.handle("ssd-extract-crabop",  (event, file) => {
   
    const ssdFile = file[0].toString()
    const douseiFile = file[1].toString()
    const desktopDir = file[2].toString()
    const dbFile = file[3].toString()
    let res =  crabOPMainFile.main(ssdFile, douseiFile, desktopDir, dbFile)
    
    return res  
})