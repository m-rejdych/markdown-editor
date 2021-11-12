import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { join } from 'path';
import { URL } from 'url';

declare global {
  interface ImportMeta {
    hot: {
      accept: () => void;
      dispose: () => void;
    };
    env: {
      MODE: string;
      PROD: boolean;
      VITE_DEV_SERVER_URL: string;
    };
  }
}

const isSingleInstance = app.requestSingleInstanceLock();

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

app.disableHardwareAcceleration();

let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    show: false, // Use 'ready-to-show' event to show window
    transparent: true,
    frame: false,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    webPreferences: {
      nativeWindowOpen: true,
      preload: join(__dirname, '../../preload/dist/index.cjs'),
    },
  });

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();

    if (import.meta.env.MODE === 'development') {
      mainWindow?.webContents.openDevTools();
    }
  });

  /**
   * External hyperlinks open in the default browser.
   *
   * @see https://stackoverflow.com/a/67409223
   */
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl =
    import.meta.env.MODE === 'development' &&
    import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? import.meta.env.VITE_DEV_SERVER_URL
      : new URL(
          '../renderer/dist/index.html',
          'file://' + __dirname,
        ).toString();

  await mainWindow.loadURL(pageUrl);
};

app.on('second-instance', () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('close-window', () => {
  if (!mainWindow) return;
  mainWindow?.close();
});

ipcMain.on('window-minimize', () => {
  if (!mainWindow) return;
  mainWindow.minimize();
});

ipcMain.on('window-maximize', () => {
  if (!mainWindow) return;
  mainWindow.maximize();
});

app
  .whenReady()
  .then(createWindow)
  .catch((e) => console.error('Failed create window:', e));

// Auto-updates
if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() => import('electron-updater'))
    .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) => console.error('Failed check updates:', e));
}
