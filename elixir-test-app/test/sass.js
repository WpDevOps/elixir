describe('Sass Task', function() {

    beforeEach( () => Elixir.tasks.empty());

    it('compiles Sass files to the public/css directory', done => {
        Elixir(mix => mix.sass('app.scss'));

        runGulp(() => {
            shouldExist('./dist/css/app.css');

            done();
        });
    });

    it('creates sourcemaps for compiled Sass files', done => {
        Elixir(mix => mix.sass('app.scss'));

        runGulp(() => {
            shouldExist('./dist/css/app.css.map');

            done();
        });
    });

    it('compiles to the source file name, if a single file is given', done => {
        Elixir(mix => mix.sass('another.scss'));

        runGulp(() => {
            shouldExist('./dist/css/another.css');

            done();
        });
    });

    it('compiles to a custom directory and file name', done => {
        Elixir(mix => mix.sass(['app.scss', 'another.scss'], './dist/styles/done.css'));

        runGulp(() => {
            shouldExist('./dist/styles/done.css');

            done();
        });
    });
});
