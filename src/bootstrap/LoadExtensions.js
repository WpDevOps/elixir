/**
 * Load any official Elixir extensions, if
 * they have been installed by the user.
 */
function loadOfficialExtensions() {
    loadExtension('@wpdevops/elixir-rollup');
    loadExtension('@wpdevops/elixir-coffeescript');
    loadExtension('@wpdevops/elixir-stylus');
    loadExtension('@wpdevops/elixir-browserify');
    loadExtension('@wpdevops/elixir-browsersync');

    require('require-dir')('../tasks/recipes');
};


/**
 * Load a single Elixir extension, while
 * suppressing any errors.
 *
 * @param  {string} name
 */
function loadExtension(name) {
    try { require(name); }
    catch (e) {}
}

loadOfficialExtensions();
