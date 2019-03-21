/**
 * Village.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: 'string',
    country: 'string',
    hokage: {
      model: 'ninja'
    },
    ninjas: {
      collection: 'ninja',
      via: 'village'
    }
  }
};

