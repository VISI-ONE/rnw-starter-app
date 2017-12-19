/* eslint-disable prefer-destructuring */
const shouldSwitch = require('./switchSnapshots').shouldSwitch;
const fsx = require('fs-extra');

const tempfile = './temp.json';

if (shouldSwitch(true)) {
  fsx.writeJsonSync(tempfile, { shouldSwitch: true });
} else {
  fsx.writeJsonSync(tempfile, { shouldSwitch: false });
}
