const express = require('express');
const { handlerWrapper } = require('../utils/utils');
const {
  speciesHandlerGet,
  speciesHandlerPost,
  speciesHandlerPatch,
  speciesHandlerSingleGet,
} = require('../handlers');

const router = express.Router();

router
  .route('/species')
  .get(handlerWrapper(speciesHandlerGet))
  .post(handlerWrapper(speciesHandlerPost));
router
  .route('/species/:species_id')
  .patch(handlerWrapper(speciesHandlerPatch))
  .get(handlerWrapper(speciesHandlerSingleGet));

module.exports = router;
