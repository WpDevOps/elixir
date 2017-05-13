describe('Versioning Task', function() {

    beforeEach( () => Elixir.tasks.empty());

    it('Add hash to the end of the file', done => {
        Elixir(mix => mix.sass('app.scss').version('css/app.css'));

        runGulp(() => {

            done();
        });
    });

    it('Deletes the original file after save', done => {
        // console.log(gutils.env.production = true, Elixir);
        Elixir(mix => mix.sass('app.scss').version('css/app.css'));

        runGulp(() => {
            shouldNotExist('./dist/css/app.css');

            done();
        }, true);
    });

});
