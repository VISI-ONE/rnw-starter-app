const switchSnapshots = require('./switchSnapshots');
const fsx = require('fs-extra');

const tempfile = './temp.json';

if (fsx.readJsonSync(tempfile).shouldSwitch) {
  switchSnapshots(false);
}
fsx.removeSync(tempfile);
