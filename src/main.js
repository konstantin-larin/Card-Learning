const {app, BrowserWindow, ipcMain, Menu} = require('electron');
const {URL} = require('url');
const path = require('node:path');
const fs = require('fs');
require('@electron/remote/main').initialize();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}
const createWindow = () => {
    // Create the browser window.
    const iconPath = path.join(__dirname, '..', '..', 'src', 'assets/Card_Learning');
    let iconExtension = '.ico';

    if (process.platform === 'win32') {
        iconExtension = '.ico';
    } else if (process.platform === 'darwin') {
        iconExtension = '.icns';
    } else {
        iconExtension = '.png';
    }

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: iconPath + iconExtension,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            enableRemoteModule: true,
            contextIsolation: false,
            nodeIntegration: true,
            webSecurity: false,
            allowFileAccess: true
        },
    });

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }


    const emptyMenu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(emptyMenu);

    ipcMain.handle('save-image', async (event, imageData, fileName) => {
        const imagePath = path.join(app.getPath('userData'), 'images', fileName);
        try {
            fs.mkdirSync(path.dirname(imagePath), {recursive: true});
            fs.writeFileSync(imagePath, imageData, 'base64');
            return new URL(`file://${imagePath}`).toString();
        } catch (error) {
            console.error('Failed to save the image:', error);
            throw error;
        }
    });

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
