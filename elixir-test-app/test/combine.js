describe('Combine Task', function() {

    beforeEach( () => Elixir.tasks.empty());

    it('combines a given array of files.', done => {
        Elixir(mix => mix.combine([
            'assets/js/lib1.js',
            './assets/js/lib2.js'
        ], './dist/js/combined.js'));

        runGulp(() => {
            shouldExist('./dist/js/combined.js',
`var somelib;
var anotherlib;`);

            done();
        });
    });

    it('allows for an optional base directory', done => {
        Elixir(mix => mix.combine([
            'js/lib1.js',
            'js/lib2.js'
        ], './dist/js/combined.js', 'assets'));

        runGulp(() => {
            shouldExist('./dist/js/combined.js',
`var somelib;
var anotherlib;`);

            done();
        });
    });
});
