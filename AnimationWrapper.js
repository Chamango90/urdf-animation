window.AnimationWrapper =
class AnimationWrapper extends URDFViewer {

    constructor() {

        super();
        this.defaultTitle = 'URDF animation';
        if (document.title == '') document.title = this.defaultTitle;
        const meshOnlyLoader = this.urdfLoader.defaultMeshLoader.bind(this.urdfLoader);
        this.urdfLoader.defaultMeshLoader = (path, ext, done) => {

            meshOnlyLoader(path, ext, obj => {
                for (let i = obj.children.length - 1; i >= 0; i--) {

                    if (obj.children[i].type !== 'Mesh') {
                        obj.remove(obj.children[i]);
                    }
                }
                done(obj);
            });
        };
    }

    setCamera(data) {

        this.camera.fov = data.fov;
        this.camera.position.set(...data.position);
    }

    setLight(data) {

        this.directionalLight.position.set(...data.position);
        this.directionalLight.shadow.bias = data.shadow.bias;
        this.directionalLight.shadow.mapSize.width = data.shadow.mapSize.width;
        this.directionalLight.shadow.mapSize.height = data.shadow.mapSize.width;
    }

    addURDF(data) {

        super.urdf = data.urdf;
        super.package = data.packagesContainingMeshes.join(', ') || '';
    }

    addAnimation(data) {

        this.addEventListener('geometry-loaded', () => {

            new THREE.FileLoader().load( data.animation, anim => {

                // Load recorded robot motion into a Three.js clipAction
                const fading = data.fading || 0.5;
                const controlGUI = data.controlGUI | false;

                this.clock = new THREE.Clock();
                this.mixer = new THREE.AnimationMixer(this.world);

                this.track = THREE.AnimationClip.parse(JSON.parse(anim));
                if (document.title == this.defaultTitle) document.title = this.track.name + ' animation';

                this.action = this.mixer.clipAction(this.track);
                this.status = {recording: false};
                this.action.fadeIn( fading ).play();

                if (this.gui == null) this.gui = new dat.GUI();
                if (controlGUI) { addControlGUI( this.gui, this.action, this.track, fading); }

                this.dispatchEvent(new CustomEvent('animation-loaded', {bubbles: true, cancelable: true, composed: true}));

                let animate = function () {
                    requestAnimationFrame(animate);
                    this.mixer.update( this.clock.getDelta() );

                    if (this.status.recording) {
                        this.gif.addFrame(this.canvas, {delay: this.delay, copy: true});
                    }
                }.bind(this);

                animate();
            });
        });
    }

    addGIFConverter(data) {

        this.addEventListener('animation-loaded', () => {

            this.canvas = document.getElementsByTagName('canvas')[0];

            this.gif = new GIF({    // https://github.com/jnordberg/gif.js
                repeat: data.repeate            || 0,  // 1 = no repeat, 0 = forever
                workers: data.workers           || 2,
                workerScript: data.workerScript || 'gif.worker.js',
                background: data.background 	|| '#fff',
                //width: this.canvas.width,
                //height: this.canvas.height,
                transparent: this.transparent   || null, // hex color, 0x00FF00 = green
                dither: data.dither             || false, // e.g. FloydSteinberg-serpentine
                debug: data.debug               || false,
            });
            this.gif.on('finished', blob => window.open(URL.createObjectURL(blob)));

            this.delay = data.delay || 500;
            this.renderer.setClearColor(0xffffff); //white bg for recorded gif

            if (this.gui == null) this.gui = new dat.GUI();
            addRecordGUI(this.gui, this.action, this.mixer, this.track, this.gif, this.status);
        });
    }

    addWorld(data) {

        const urdf = data.urdf;
        const pkgs = data.packagesContainingMeshes.join(', ') || '';

        this.urdfLoader.load(urdf, pkgs,
            obj => {
                obj.traverse(c => {
                    if (c.type === 'Mesh') {
                        c.castShadow = true;
                        c.receiveShadow = true;
                    }
                });
                this.scene.add(obj);
            }
        );
    }
};


function addControlGUI( gui, action, track, fading) {

    let folder = gui.addFolder( 'Control ' + track.name),
        API = {
            'play()': () => action.play(),
            'stop()': () => action.stop(),
            'reset()': () => action.reset(),
            get 'time ='() { return action !== null ? action.time : 0; },
            set 'time ='( value ) { action.time = value; },
            get 'paused ='() { return action !== null && action.paused; },
            set 'paused ='( value ) { action.paused = value; },
            get 'enabled ='() { return action !== null && action.enabled; },
            'fade in()': () => action.reset().fadeIn( fading ).play()
        };

    folder.add( API, 'play()' );
    folder.add( API, 'stop()' );
    folder.add( API, 'reset()' );
    folder.add( API, 'time =', 0, track.duration ).listen();
    folder.add( API, 'paused =' ).listen();
    folder.add( API, 'fade in()' );
}


function  addRecordGUI( gui, action, mixer, track, gif, status) {
    let converting = 0;
    gif.on('progress', p => converting = p * 100);
    mixer.addEventListener( 'loop', () => {
        if (status.recording) {
            status.recording = false;
            action.paused = true;
            gif.abort();
            gif.render();
        }
    });
    let folder = gui.addFolder( 'Record ' + track.name),
        gifAPI = {
            'record()': function () {
                gif.abort();
                converting = 0;
                action.paused = false;
                status.recording = true;
                mixer.timeScale = gifAPI.speed;
                gif.setOptions({quality: gifAPI.quality});
                action.reset();
            },
            get 'recording ='() { return status.recording ? action.time : 0; },
            get 'converting ='() { return converting; },
            'speed': 1,
            'quality': 10
        };
    folder.add(gifAPI, 'speed', 0.1, 10);
    folder.add(gifAPI, 'quality', 1, 10, 1);
    folder.add(gifAPI, 'record()');
    folder.add(gifAPI, 'recording =', 0, track.duration).listen();
    folder.add(gifAPI, 'converting =', 0, 100).listen();
}


customElements.define('urdf-viewer', AnimationWrapper);
