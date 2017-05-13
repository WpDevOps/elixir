let fs, del, glob;

class VersionTask extends Elixir.Task {

    /**
     * Create a new CssTask instance.
     *
     * @param {string}    name
     * @param {GulpPaths} paths
     */
    constructor(name, paths) {
        super(name, null, paths);

        this.distPath = Elixir.config.distPath;
        this.buildPath = this.output.baseDir;
        this.deletesSourceAfter = true;

        if (this.src.baseDir == this.buildPath) {
            if (this.src.path.find(path => /\*/.test(path))) {
                Elixir.fail(
                    'Because you\'ve overridden the "mix.version()" build path ' +
                    'to be the same as your source path, you cannot pass a ' +
                    'regular expression. Please use full file paths instead.'
                );
            }
        }
    }


    /**
     * Lazy load dependencies.
     */
    loadDependencies() {
        fs = require('fs');
        del = require('del');
        glob = require('glob');
    }


    /**
     * Build the Gulp task.
     *
     * @param {Elixir.Plugins} $
     */
    gulpTask($) {

        this.deleteManifestFiles();

        if (! Elixir.inProduction) {
            return this.skip();
        }

        this.recordStep('Versioning');

        return (
            gulp
                .src(this.src.path, {base: `./${this.distPath}`})
                .pipe($.rev())
                .pipe(this.updateVersionedPathInFiles($))
                .pipe(gulp.dest(this.buildPath))
                .pipe($.rev.manifest('manifest.json'))
                .pipe(this.saveAs(gulp))
                .on('end', this.copyMaps.bind(this))
                .on('end', this.deleteOriginalFiles.bind(this))
        );
    }


    /**
     * Register file watchers.
     */
    registerWatchers() {
        this.watch(this.src.path);
    }

    /**
     * Not in production record
     *
     */
    skip() {
        this.recordStep('Skipping versioning, not in production');
    }

    /**
     * Update files to point to the newly versioned file name.
     *
     * @param {Elixir.Plugins} $
     */
    updateVersionedPathInFiles($) {
        let buildFolder = this.buildPath.replace(this.distPath, '').replace('\\', '/');

        this.recordStep('Rewriting File Paths');

        return $.revReplace({prefix: buildFolder + '/'});
    }


    /**
     * Empty all relevant files from the build directory.
     */
    deleteManifestFiles() {
        let manifest = `${this.buildPath}/manifest.json`;

        if (!fs.existsSync(manifest)) return;

        manifest = JSON.parse(fs.readFileSync(manifest));

        for (let key in manifest) {
            del.sync(`${this.buildPath}/${manifest[key]}`, {force: true});
        }
    }

    /**
     * Delete the original files
     *
     * @param gulp
     * @returns {*}
     */
    deleteOriginalFiles() {
        let manifest = `${this.buildPath}/manifest.json`;

        if (!fs.existsSync(manifest)) return;

        this.recordStep('Deleting source filed');

        manifest = JSON.parse(fs.readFileSync(manifest));

        for (let key in manifest) {
            del.sync(`${this.buildPath}/${key}`, {force: true});
        }
    }

    /**
     * Copy source maps to the build directory.
     */
    copyMaps() {
        this.recordStep('Copying Source Maps');

        this.src.path.forEach(file => {
            glob(file, {}, (error, files) => {
                if (error) return;

                files.filter(file => fs.existsSync(`${file}.map`))
                    .forEach(this.copyMap.bind(this));
            });
        });
    }


    /**
     * Copy a single map file over.
     *
     * @param {string} srcMap
     */
    copyMap(srcMap) {
        let destMap = srcMap.replace(this.distPath, this.buildPath + '/').replace('//', '/');

        if (destMap != srcMap) {
            fs.createReadStream(`${srcMap}.map`)
                .pipe(fs.createWriteStream(`${destMap}.map`));
        }
    }

}


export default VersionTask;
