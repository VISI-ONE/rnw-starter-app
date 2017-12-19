/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const fsx = require('fs-extra');
const glob = require('glob');

const getPlatformDirName = isNative => isNative ? '__native_snapshots__' : '__web_snapshots__';
const getOtherPlatformDirName = isNative => isNative ? '__web_snapshots__' : '__native_snapshots__';

const ensureFolder = dir => !fs.existsSync(dir) && fs.mkdirSync(dir);

const switchFolders = (
  snapshotFolder,
  isNative,
  currentPlatformFolderName,
  otherPlatformFolderName
) => {
  const snapshotDir = path.join(__dirname, '..', snapshotFolder);
  const currentPlatformFolder = snapshotDir.replace('__snapshots__', currentPlatformFolderName);
  const otherPlatformFolder = snapshotDir.replace('__snapshots__', otherPlatformFolderName);

  ensureFolder(currentPlatformFolder);
  ensureFolder(otherPlatformFolder);

  fsx.copySync(snapshotDir, otherPlatformFolder);

  fsx.removeSync(snapshotDir);
  ensureFolder(snapshotDir);

  fsx.copySync(currentPlatformFolder, snapshotDir);
};

const shouldSwitch = isNative => {
  let appSnapshot = false;
  try {
    appSnapshot = require('../src/__snapshots__/App.test.js.snap'); // eslint-disable-line
  } catch (e) {} // eslint-disable-line

  const isCurrentSnapsWeb = appSnapshot && Object.keys(appSnapshot)
  .find(key => key.includes('- web'));
  return isCurrentSnapsWeb ? isNative : !isNative;
};

const switchSnapshots = (isNative) => {
  if (shouldSwitch(isNative)) {
    const currentPlatformFolderName = getPlatformDirName(isNative);
    const otherPlatformFolderName = getOtherPlatformDirName(isNative);

    console.log('*** Switching snapshots...');
    console.time('*** Finished switching snapshots in');

    const dirs = glob.sync('**/__snapshots__');
    dirs.forEach(snapshotFolder => switchFolders(
      snapshotFolder,
      isNative,
      currentPlatformFolderName,
      otherPlatformFolderName
    ));
    console.timeEnd('*** Finished switching snapshots in');
  }
};

module.exports = switchSnapshots;
module.exports.shouldSwitch = shouldSwitch;
