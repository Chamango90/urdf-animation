document.addEventListener('WebComponentsReady', () => {
    let vw = document.querySelector('urdf-viewer');

    vw.addURDF({
        // https://github.com/gkjohnson/urdf-loaders
        urdf: './static/ur5_with_cam.urdf',
        packagesContainingMeshes: [
            'ur_description: https://raw.githubusercontent.com/ros-industrial/universal_robot/kinetic-devel/ur_description',
            'openni_description: https://raw.githubusercontent.com/ros-drivers/openni_camera/indigo-devel/openni_description'
        ]
    });

    /// [optional]
    vw.addAnimation({
        // https://github.com/ipa-jfh/urdf-animation
        animation: './static/recording.json',
        fading: 0.0,
        controlGUI: true
    });

    /// [optional]
    vw.setCamera({
        // https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
        fov: 7,
        position: [0, 2, -10]
    });

    /// [optional]
    vw.setLight({
        // https://threejs.org/docs/#api/en/lights/DirectionalLight
        position: [60, 100, 50],
        shadow: {
            bias: -0.0001,
            mapSize: {
                width: 256,
                width: 256
            }
        }
    });

    /// [optional]
    vw.addGIFConverter({
        // https://github.com/jnordberg/gif.js
        workers: 2,
        workerScript: './static/gif.worker.js',
        delay: 20, // [20, 500?] ms of frame
    });
});
