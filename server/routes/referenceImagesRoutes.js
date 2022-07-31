const express = require('express');
const { handlerWrapper } = require('../utils/utils');
const {
  referenceImagesHandlerGet,
  referenceImagesHandlerPost,
  referenceImagesHandlerSingleGet,
  referenceImagesHandlerDelete,
} = require('../handlers');

const router = express.Router();

router
  .route('/reference_image')
  .get(handlerWrapper(referenceImagesHandlerGet))
  .post(handlerWrapper(referenceImagesHandlerPost));
router
  .route('/reference_image/:reference_image_id')
  .get(handlerWrapper(referenceImagesHandlerSingleGet))
  .delete(handlerWrapper(referenceImagesHandlerDelete));

module.exports = router;
