Robot Recorder NPM
=========
A wrapper for [gkjohnson/urdf-loaders](https://github.com/gkjohnson/urdf-loaders) to visualize ROS animations recorded with [ipa-jfh/robot_recorder](https://github.com/ipa-jfh/robot_recorder).

## Examples

<a href="https://ipa-jfh.github.io/urdf-animation/manipulator_ur5/">
    <img src="https://user-images.githubusercontent.com/17281534/46695927-2b6eeb80-cc11-11e8-8d91-d1ac6bec8810.gif" width="535" height="423">
    >> 3D animation
</a>

<a href="https://ipa-jfh.github.io/urdf-animation/application_scan_and_plan/">
    <img src="https://user-images.githubusercontent.com/17281534/46005937-aafba700-c0b6-11e8-9d8f-0148392488f1.gif" width="430" height="250">
    >> 3D animation
</a>

<a href="https://ipa-jfh.github.io/urdf-animation/mobile_robot_turtlebot3/">
    <img src="https://user-images.githubusercontent.com/17281534/46012246-e30be580-c0c8-11e8-953b-244bf7070d7b.gif" width="430" height="250">
    >> 3D animation
</a>


## Installation

  `npm i urdf-animation`

## Usage

### Run the examples locally

1. Download repo and go inside one example
    ```bash
    git clone https://github.com/ipa-jfh/urdf-animation
    cd urdf-animation/docs/mobile_robot_turtlebot3
    ```

1. Now either
    1. Open the `index.html` (this uses the bundled js files)
    1. Install npm packages and open `includes.html`
        ```bash
        npm install
        ```
    1. Install npm packages and run the webpack-dev-server 
        ```bash
        npm install
        sudo npm i webpack-dev-server@2.9.1 -g --save-dev
        sudo npm i webpack@3.9.0 -g
        npm start  
        ```

### Create new page for your animation:
1. Create a new npm package
    ```bash
    mkdir my_animation && cd my_animation
    npm init 
    ```
1. In `package.json` add dependecy to `urdf-animation` like in [example](https://github.com/ipa-jfh/urdf-animation/blob/master/docs/mobile_robot_turtlebot3/package.json)
1. Install dependecies
    ```bash
    npm install
    ```
1. Copy the template folder`s contest inside your package. E.g.:
    ```bash
    cp ./node_modules/animation/template/* .
    ```
1. Add your URDF and recorded animation and reference it in the `config.js` file
1. Further configer the `config.js` file to e.g. adjust camera and lights

=> Now everthing is set-up and you can run the animation (See ### Run the examples locally) 
