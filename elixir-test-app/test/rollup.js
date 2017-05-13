describe('Rollup Task', function() {

    beforeEach( () => Elixir.tasks.empty());

    it('compiles', function(done) {
        Elixir(mix => mix.rollup('main.js'));

        runGulp(() => {
            shouldExist('./dist/js/main.js',
`(function (exports) {
'use strict';

var SomeComponent = function SomeComponent() {
    ['one', 'two'].map(function (item) { return alert(item); });
};

new SomeComponent();

}((this.WpDevOpsElixirBundle = this.WpDevOpsElixirBundle || {})));
//# sourceMappingURL=main.js.map
`);

            done();
        });
    });
});
