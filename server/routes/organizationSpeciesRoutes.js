const express = require('express');
const { handlerWrapper } = require('../utils/utils');
const {
  organizationSpeciesHandlerGet,
  organizationSpeciesHandlerPost,
  organizationSpeciesHandlerSingleGet,
  organizationSpeciesHandlerDelete,
} = require('../handlers');

const router = express.Router();

router
  .route('/organization_species')
  .get(handlerWrapper(organizationSpeciesHandlerGet))
  .post(handlerWrapper(organizationSpeciesHandlerPost));
router
  .route('/organization_species/:organization_species_id')
  .get(handlerWrapper(organizationSpeciesHandlerSingleGet))
  .delete(handlerWrapper(organizationSpeciesHandlerDelete));

module.exports = router;
