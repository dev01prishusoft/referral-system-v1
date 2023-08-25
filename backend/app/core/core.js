import { buildErrObject } from '../middleware/utils.js';

/**
   * create item in database
   * @param {string} collection - collection name
   * @param {Object} data - data to create
  */

const createItem = (collection, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const record = await collection.create(data);
      resolve(record);
    } catch (error) {
      reject(buildErrObject(422, error.message));
    }
  });
};

/**
 * Gets item from database via condition
 * @param {string} collection - item id
 * @param {Object} condition - item id
 * @param {string} select - fields to select
 * @param {string} population - population string
*/

const getItemCustom = (collection, condition, select = '', population = '') => {
  return new Promise(async (resolve, reject) => {
    try {
      const item = await collection.findOne(condition).select(select).populate(population);
      resolve(item);
    } catch (error) {
      reject(buildErrObject(422, error.message));
    }
  });
};

/**
 * Gets item from database via condition
 * @param {string} collection - item id
 * @param {Object} condition - item id
*/

const updateItem = (collection, condition, data, additionalOptions = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const item = await collection.findOneAndUpdate(
        condition,
        data,
        {
          new: true,
          runValidators: true,
          ...additionalOptions
        },
      );
      resolve(item);
    } catch (error) {
      console.log('error: ', error.message);
      reject(buildErrObject(422, error.message));
    }
  });
};

export {
  createItem,
  getItemCustom,
  updateItem
};