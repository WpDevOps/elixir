describe('Stylus Task', function() {

    beforeEach( () => Elixir.tasks.empty());

    it('compiles Stylus', done => {
        Elixir(mix => mix.stylus('app.styl'));

        runGulp(() => {
            shouldExist('./dist/css/app.css',
`body {
  color: #f00;
}

/*# sourceMappingURL=app.css.map */
`
);

            done();
        });
    });

    it('compiles Stylus to a custom output file.', done => {
        Elixir(mix => mix.stylus('app.styl', './dist/out.css'));

        runGulp(() => {
            shouldExist('./dist/out.css',
`body {
  color: #f00;
}

/*# sourceMappingURL=out.css.map */
`
);

            done();
        });
    });
});
