document.addEventListener('WebComponentsReady', () => {
    let vw = document.querySelector('urdf-viewer');

    vw.addURDF({
        // https://github.com/gkjohnson/urdf-loaders
        urdf: './static/ur5.urdf',
        packagesContainingMeshes: [
            'ur_description: https://raw.githubusercontent.com/ros-industrial/universal_robot/kinetic-devel/ur_description'
        ]
    });

    /// [optional]
    vw.addAnimation({
        // https://github.com/ipa-jfh/urdf-animation
        animation: './static/test_move.json',
        fading: 0.0,
        //controlGUI: true
    });

    /// [optional]
    vw.setCamera({
        // https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
        fov: 10,
        position: [10, 5, -5]
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
