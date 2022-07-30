const express = require('express');
const { handlerWrapper } = require('./utils/utils');
const {
  // species
  speciesHandlerGet,
  speciesHandlerPost,
  speciesHandlerPatch,
  speciesHandlerSingleGet,

  // organization_species
  organizationSpeciesHandlerGet,
  organizationSpeciesHandlerPost,
  organizationSpeciesHandlerSingleGet,
  organizationSpeciesHandlerDelete,
} = require('./handlers');

const router = express.Router();

router
  .route('/species')
  .get(handlerWrapper(speciesHandlerGet))
  .post(handlerWrapper(speciesHandlerPost));

router
  .route('/species/:species_id')
  .patch(handlerWrapper(speciesHandlerPatch))
  .get(handlerWrapper(speciesHandlerSingleGet));

router
  .route('/organization_species')
  .get(handlerWrapper(organizationSpeciesHandlerGet))
  .post(handlerWrapper(organizationSpeciesHandlerPost));
router
  .route('/organization_species/:organization_species_id')
  .get(handlerWrapper(organizationSpeciesHandlerSingleGet))
  .delete(handlerWrapper(organizationSpeciesHandlerDelete));

module.exports = router;
