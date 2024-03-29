/**
 * Module dependencies
 */
var util = require( 'util' );
var actionUtil = require('sails-generate-ember-blueprints/templates/basic/api/blueprints/_util/actionUtil.js');

/**
 * Destroy One Record
 *
 * delete  /:modelIdentity/:id
 *    *    /:modelIdentity/destroy/:id
 *
 * Destroys the single model instance with the specified `id` from
 * the data adapter for the given model if it exists.
 *
 * Required:
 * @param {Integer|String} id  - the unique id of the particular instance you'd like to delete
 *
 * Optional:
 * @param {String} callback - default jsonp callback param (i.e. the name of the js function returned)
 */
module.exports = function destroyOneRecord( req, res ) {

  var Model = actionUtil.parseModel( req );
  var pk = actionUtil.requirePk( req );
  var criteria = req.query || {};

  var query = Model.findOne( pk ).where( criteria );
  query = actionUtil.populateEach( query, req );
  query.exec( function foundRecord( err, record ) {
    if ( err ) return res.serverError( err );
    if ( !record ) return res.notFound('Este recurso não foi encontrado ou você não possui o nível de acesso necessário para esta operação.');

    Model.destroy( pk ).exec( function destroyedRecord( err ) {
      if ( err ) return res.negotiate( err );

      if ( sails.hooks.pubsub ) {
        Model.publishDestroy( pk, !sails.config.blueprints.mirror && req, {
          previous: record
        } );
        if ( req.isSocket ) {
          Model.unsubscribe( req, record );
          Model.retire( record );
        }
      }

      return res.ok( null ); // Ember Data REST Adapter expects NULL after DELETE
    } );
  } );
};
