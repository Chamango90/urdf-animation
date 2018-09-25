document.addEventListener('WebComponentsReady', () => {
    let vw = document.querySelector('urdf-viewer');

    vw.addURDF({
        // https://github.com/gkjohnson/urdf-loaders
        urdf: 'https://raw.githubusercontent.com/ros/urdf_tutorial/master/urdf/05-visual.urdf', 
            // or local one using './static/example_urdf.urdf',
        packagesContainingMeshes: [
            'urdf_tutorial: https://raw.githubusercontent.com/ros/urdf_tutorial/master'
        ]
    });

    /// [optional]
    vw.addAnimation({
        // https://github.com/ipa-jfh/urdf-animation
        animation: './static/example.js',
        fading: 0.0,
        controlGUI: true
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
        position: [20, 100, -40],
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

    /// [optional]
    // vw.addWorld({ //Workaround, since not possible to add .SDF
    //     urdf: './static/world.urdf',
    //     packagesContainingMeshes: []
    // });

});
