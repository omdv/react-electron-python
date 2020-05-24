## Description

[Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) + Python backend via [zeroMQ](https://github.com/zeromq).

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
conda create -n your-environment python=3.7
conda activate your-environment
pip install -r requirements.txt
```

## Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
yarn dev
```

Start the python backend in the separate window:

```bash
conda activate your-environment
python backend/python-backend-main.py
```

It is possible to use compiled python binary for development, change the `devUsePackaged` in `./constants/python.json`.

## Packaging for Production

To package application for the local platform:

```bash
conda activate your-environment
yarn package-python
```

This command will package python in a binary (using pyinstaller) and include it into Electron distribution.

## How to start

What follows below is the recommended set of steps to add your own logic. The short guide is targeted more towards Python crowd, who are less familiar with React and Typescript.

The high-level logic of the application is to use Electron as frontend, spawn the compiled Python script as child process (or connect to live script during development) and communicate with it via zeroMQ. This follows the frontend/backend pattern in web development, where Python serves as backend, Electron is providing a local frontend and the communication between the two is handled by zeroMQ which replaces REST or gRPC APIs.

### 1. Design Redux Store

This step may be seen as definining your API or content of the message you are going to exchange between Python and Electron.

This Electron boilerplate is relying on [react-redux](https://react-redux.js.org/introduction/quick-start) to manage the "UI logic". Depending on your level of familiarity you may want to go over some [tutorials](https://react-redux.js.org/introduction/basic-tutorial). Three fundamental concepts behind Redux are: `Store`, `Actions` and `Reducers`. Simply speaking `Store` is an internal state of the application; it can be changed only via issuing `Actions`, which in turn use `Reducers` to actually apply changes to `Store`.

`Store` is defined in [types definitions](https://github.com/omdv/react-electron-python/blob/master/app/types.ts). This example is using a nested state, where `PythonCounter` is part of the overall `CounterState`. Since we are using Typescript you want to define your state types explicitly. However, there is an option to just use a payload of `string` type, which can carry JSON or other format. You will then need to deserialize messages separately on frontend and backend sides.

In the published example the two key state properties responsible for the logic are `value` and `operator`. Value is going to be the value of the counter and operator is going to be either +1 or -1. When defining state keep the properties `isFetching` and `error`, because they may be used to block UI elements while you wait for the results of async request or show error messages. The example shows how it works.

Overall, it is recommended to spend a good amount of time at this step [designing your state](https://redux.js.org/advanced/async-actions#designing-the-state-shape).

### 2. Design Redux Reducers

The next file you need to change is [actions and reducers](https://github.com/omdv/react-electron-python/blob/master/app/actions/pythonCounter.ts).

There are only three actions in this example - `PYTHON_BACKEND_REQUEST`, `PYTHON_BACKEND_SUCCESS` and `PYTHON_BACKEND_FAILURE`. They are used to communicate with python backend. Then we have two functions or reducers which actually perform the increment and decrement of the counter. They construct the message to backend by specifying the corresponding operator and then dispatch another async function `pythonCalc`, which is in turn REQUESTing backend and then handles either a SUCCESS or FAILURE.

At this step you want to have at least some idea on what your UI will look like, as later you will map the reducers defined here (like `pythonIncrement` and `pythonDecrement`) to your UI elements.

### 3. Mapping Reducers to UI functions

Next you need to map your reducers to your container (think of it as one UI page of the application). There is a [container](https://github.com/omdv/react-electron-python/blob/master/app/containers/PythonCounterPage.tsx) called `PythonCounterPage`.

### 4. Handling UI logic

Visual part of UI is handled by components. After you mapped your reducers to containers you can use them inside React components to bind them to specific UI elements. Similar to the comment on react-redux, spend some time to familiarize yourself with [React](https://reactjs.org/tutorial/tutorial.html) in general. [In this example](https://github.com/omdv/react-electron-python/blob/master/app/components/PythonCounter.tsx) we are binding two functions to two buttons, also bind the counter property of the state to the corresponding UI element. Also note how we disable buttons when `isFetching` property of the state is `True`, which is important to cover async behavior.

### 5. Python backend

Python logic is placed in [backend folder](https://github.com/omdv/react-electron-python/blob/master/backend/python-backend-main.py). You can organize your project in any way you want, but if your choose to rename your main script to something other than `python-backend-main` you'll need to change few hard-coded references, namely in the parts responsible for packaging the application.

The two required modules for Python are `pyzmq` and `PyInstaller`, as you can see in requirements.txt. ZeroMQ is a lightweight communication protocol. Python serves as a server, [binding to the socket](http://api.zeromq.org/2-1:zmq-bind), creating an endpoint.

After receiving a message it attempts to parse it (assuming JSON) and perform the calculation. You can presumably use a logic of any complexity here as the connection is asynchronous and related UI elements are disabled during execution. Needless to stay that you need to use the same state structure you defined in Step 1.

In this example it is assumed that Python backend is stateless. The state is stored inside Electron React Redux store, so you need to organize your Python script logic appropriately.

### 6. Development and Production

During development it is recommended to use standalone Python script (like shown in the demo). For the production the command `yarn package-python` will compile your script and all dependencies into a binary for a local platform and add it to the Electron distribution. Production version of the application will spawn the Python binary as child process and kill it after Electron window is closed.

## Documentation, Licenses, Contributors

Please refer to [upstream repository](https://github.com/electron-react-boilerplate/electron-react-boilerplate).
