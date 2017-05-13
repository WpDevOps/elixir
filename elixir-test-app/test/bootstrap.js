import Elixir from '@wpdevops/elixir';
import chai from 'chai';
import gulp from 'gulp';
import remove from 'rimraf';

global.fs = require('fs');
global.should = chai.should();
global.expect = chai.expect;

global.shouldExist = (file, contents) => {
    fs.existsSync(file).should.be.true;

    if (contents) {
        fs.readFileSync(file, { encoding: 'utf8' })
            .replace(/(?:\r\n|\r|\n)/g, "")
            .should.eql(contents.replace(/(?:\r\n|\r|\n)/g, ""));
    }
};

global.runGulp = assertions => {
    gulp.start('default', () => {
        assertions();

        remove.sync('./dist');
        remove.sync('./compress/all.js');
        remove.sync('./compress/all.css');
        remove.sync('./compress/file.min.js');
        remove.sync('./compress/file.min.css');
        remove.sync('./compress/*.map');
        remove.sync('./copy-dest');
        remove.sync('./assets/scripts');
        remove.sync('./assets/styles');
    });
};
