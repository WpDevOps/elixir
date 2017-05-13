describe('Scripts Task', function() {

    beforeEach( () => Elixir.tasks.empty());

    it('merges scripts together', function(done) {
        Elixir(mix => mix.scripts(['lib1.js', 'lib2.js']));

        runGulp(() => {
            shouldExist('dist/js/all.js');

            done();
        });
    });

    it('merges to any file the user wishes', function(done) {
        Elixir(mix => mix.scripts(['lib1.js', 'lib2.js'], './dist/js/merged.js'));

        runGulp(() => {
            shouldExist('dist/js/merged.js');

            done();
        });
    });

    it('applies a custom base directory', function(done) {
        Elixir(mix => {
            // We'll copy files over to a custom directory to test this.
            mix.copy('./assets/js', './assets/scripts');

            mix.scripts(['lib1.js', 'lib2.js'], null, './assets/scripts');
        });

        runGulp(() => {
            shouldExist('dist/js/all.js');

            done();
        });
    });
});
