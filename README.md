## Description

[Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate") + Python backend via [zeroMQ](https://github.com/zeromq).

![Demo](https://user-images.githubusercontent.com/4576131/82744740-56ed0e00-9d42-11ea-83e6-62adc281a641.gif)

## Install

First, clone the repo via git and install dependencies:

```bash
git clone --depth 1 --single-branch https://github.com/omdv/react-electron-python.git your-project-name
cd your-project-name
yarn
```

Second, create python environment with a tool of your choice (e.g. virtualenv, conda) and install dependencies:

```bash
conda create -n electron python=3.7
pip install -r requirements.txt
```

## Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
yarn dev
```

Start the python backend in the separate window:

```bash
conda activate electron
python backend/python-backend-main.py
```

It is possible to use compiled python binary for development, change the `devUsePackaged` in `./constants/python.json`.

## Packaging for Production

To package application for the local platform:

```bash
yarn package-python
```

This command will package python in a binary (using pyinstaller) and include it into Electron distribution.

## Documentation, Licenses, Contributors

Please refer to [upstream repository](https://github.com/electron-react-boilerplate/electron-react-boilerplate).
