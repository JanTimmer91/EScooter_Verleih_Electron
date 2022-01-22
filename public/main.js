const { app, BrowserWindow, Menu, ipcMain } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')
const isMac = process.platform === 'darwin'

require('@electron/remote/main').initialize()

var win

let userLoggedIn = false;

const menuTemplate_loggedIn = [
  {
      label: 'Scooter',
      submenu: [
          { 
              label: 'Meine Reservierungen',
              click: async () => {
                win.webContents.send('ROUTING_MESSAGE', '/reservierungshistorie')
              }
          },
          { 
              label: 'Verfügbarkeit einsehen',
              click: async () => {
                win.webContents.send('ROUTING_MESSAGE', '/scooterStatus')
              }
          },
          { 
              label: 'Scooter Reservieren',
              click: async () => {
                win.webContents.send('ROUTING_MESSAGE', '/')
              }
          },
          { 
            type: 'separator'
          },
          { 
            label: 'Abmelden',
            click: async () => {
              win.webContents.send('LOGOUT_USER', '')
            }
          },
          isMac ? { role: 'close' } : { role: 'quit' },
          { 
            role: 'toggleDevTools', 
            visible: isDev 
          }
      ]
  }
]

const menuTemplate_loggedOut = [
  {
      label: 'Scooter',
      submenu: [
          isMac ? { role: 'close' } : { role: 'quit' }
      ]
  }
]


function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    //autoHideMenuBar: true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
}

const menu = Menu.buildFromTemplate(menuTemplate_loggedOut)
Menu.setApplicationMenu(menu)

app.on('ready', () => {
  createWindow()

  ipcMain.on('LOGGED_IN_CHANGED', (event, data) => {
    userLoggedIn = data
    var selectedTemplate = menuTemplate_loggedOut
    if (userLoggedIn) {
      selectedTemplate = menuTemplate_loggedIn
    }
    const menu = Menu.buildFromTemplate(selectedTemplate)
    Menu.setApplicationMenu(menu)
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
