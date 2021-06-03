import path from 'path';
import fs from 'fs-extra';
import Logger from './logger';

// eslint-disable-next-line no-unused-vars
const logger = Logger.getLogger(__filename);

// Register the upload path
const uploadPath = path.join('/tmp');

/**
 * It writes an entire file into the /tmp directory.
 * This function depends on the busboy library.
 *
 * @param {String} filePath
 * @param {Object} busboyFile
 * @param {String} encoding
 * @param {String} mimetype
 */
const writeFileThroughBusboy = ({
  fileName,
  busboyFile,
}) => {
  return new Promise((resolve, reject) => {
    // Create a write stream of the new file
    const fstream = fs.createWriteStream(path.join(uploadPath, `${Date.now()}-${fileName}`));
    // Pipe it trough
    busboyFile.pipe(fstream);

    fstream.on('error', (err) => {
      logger.error(err);
      reject(err);
    });

    // On finish of the upload
    fstream.on('close', async () => {
      resolve(fstream);
    });
  });
};

const readFile = (filePath) => {
  return fs.createReadStream(filePath);
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      logger.error('ERROR', err);
    }
  });
};

export default {
  writeFileThroughBusboy,
  readFile,
  deleteFile,
};
