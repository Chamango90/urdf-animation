const path = require('path');

export default
    Object.entries({
        AnimationWrapper: 'AnimationWrapper.js',
    }).map(([name, file]) => {

        const inputPath = path.join(__dirname, `./${file}`);
        const outputPath = path.join(__dirname, `./umd/${file}`);

        return {

            input: inputPath,
            treeshake: false,
            external: p => p !== inputPath,

            output: {

                name,
                extend: true,
                format: 'umd',
                file: outputPath,
                sourcemap: true,

                globals: path => /^three/.test(path) ? 'THREE' : null,

            },

        };
    });
