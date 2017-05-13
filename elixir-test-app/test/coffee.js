describe('CoffeeScript Task', function() {

    beforeEach( () => Elixir.tasks.empty());

    it('compiles CoffeeScript', done => {
        Elixir(mix => mix.coffee('module.coffee'));

        runGulp(() => {
            shouldExist('./dist/js/module.js',
`(function() {
  var MyModule;

  MyModule = (function() {
    function MyModule() {}

    return MyModule;

  })();

}).call(this);

//# sourceMappingURL=module.js.map
`
);

            done();
        });
    });

    it('compiles CoffeeScript to a custom output path.', done => {
        Elixir(mix => mix.coffee('module.coffee', './dist/out.js'));

        runGulp(() => {
            shouldExist('./dist/out.js');

            done();
        });
    });
});
