/**
 * Jutsu.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: 'string',
    type: 'string',
    elemnt: 'string',
    power: 'string',
    ninjas: {
      collection: 'ninja',
      via: 'jutsus'
    }
  }
};

