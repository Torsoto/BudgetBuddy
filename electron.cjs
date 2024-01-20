const { app, BrowserWindow, ipcMain } = require('electron')
const process = require('process');
const url = require('url');
const path = require('path');

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1366,
        height: 768,
        frame: false,
        minWidth: 940,
        minHeight: 768,
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.cjs')
        },
    })

    const isDev = !app.isPackaged; // Check if Electron is running in development

    if (isDev) {
        mainWindow.loadURL('http://localhost:3000'); // Development URL
    } else {
        mainWindow.loadFile(path.join(__dirname, 'dist/index.html')); // Production build
    }


    ipcMain.on('minimizeApp', () => {
        mainWindow.minimize();
    });

    ipcMain.on('maximizeApp', () => {
        if (!mainWindow.isMaximized()) {
            mainWindow.maximize();
        } else {
            mainWindow.unmaximize();
        }
    });

    ipcMain.on('closeApp', () => {
        mainWindow.close();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Einige APIs können nur nach dem Auftreten dieses Events genutzt werden.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.