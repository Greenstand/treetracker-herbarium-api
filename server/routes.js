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

  // reference_images
  referenceImagesHandlerGet,
  referenceImagesHandlerPost,
  referenceImagesHandlerSingleGet,
  referenceImagesHandlerDelete,
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

router
  .route('/reference_image')
  .get(handlerWrapper(referenceImagesHandlerGet))
  .post(handlerWrapper(referenceImagesHandlerPost));
router
  .route('/reference_image/:reference_image_id')
  .get(handlerWrapper(referenceImagesHandlerSingleGet))
  .delete(handlerWrapper(referenceImagesHandlerDelete));

module.exports = router;
