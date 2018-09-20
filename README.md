Robot Recorder NPM
=========

A wrapper for gkjohnson/urdf-loaders to visualize ROS recorded animations (ipa-jfh/robot_recorder).

## Installation

  `npm i urdf-animation`

## Usage

Run the example webpage. Either:
- opening the `index.html`
- by `webpack-dev-server`:

```bash
sudo npm i webpack-dev-server@2.9.1 -g --save-dev
sudo npm i webpack@3.9.0 -g
npm start
```

## Create page for your animation:
```bash
mkdir my_animation && cd my_animation
npm init \\ Minimal OK for all steps

\\ add urdf, animation, world, index.js
\\ link to index.html of `urdf-animation`
\\ TODO explain more detailed
```