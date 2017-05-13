describe('Styles Task', function() {

    beforeEach( () => Elixir.tasks.empty());

    it('merges stylesheets together', function(done) {
        Elixir(mix => mix.styles(['one.css', 'two.css']));

        runGulp(() => {
            shouldExist('dist/styles/all.css');

            done();
        });
    });

    it('merges to any file the user wishes', function(done) {
        Elixir(mix => mix.styles(['one.css', 'two.css'], './dist/css/merged.css'));

        runGulp(() => {
            shouldExist('dist/css/merged.css');

            done();
        });
    });

    it('applies a custom base directory', function(done) {
        Elixir(mix => {
            // We'll copy files over to a custom directory to test this.
            mix.copy('./assets/css', './assets/styles');

            mix.styles(['one.css', 'two.css'], null, './assets/styles');
        });

        runGulp(() => {
            shouldExist('dist/styles/all.css');

            done();
        });
    });
});
