# workbench-electron

A Prototype Electron Application

```bash
# Install
npm install

# Run
npm start
```

#### electron-packager
```
# Package Application
npm install electron-packager -g
electron-packager . workbench --platform win32 arch--x64 --overwrite --win32metadata.CompanyName="Digital Super Glue" --win32metadata.ProductName="Workbench" --app-copyright "Copyright (C) 2017 Digital Super Glue, All rights reserved"
```

#### electron-builder
```
# Package, Installer and AutoUpdater
npm install electron-builder -g

# Create a test distribution
npm run dist

# Create full distribution (can take some time while creating installer) 
npm run pack
```
