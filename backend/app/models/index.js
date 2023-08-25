/* eslint-disable no-undef */
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const loadModels = () => {
  const __filename = fileURLToPath(import.meta.url);

  const __dirname = path.dirname(__filename) + '/';
  /*
   * Load models dynamically
  */
  // Loop models path and loads every file as a model except this file
  fs.readdirSync(__dirname).filter((file) => {
    // Prevents loading of this file
    return file !== 'index.js' ? import(`./${file}`) : '';
  });
};

export {
  loadModels
};
