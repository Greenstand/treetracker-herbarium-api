const express = require('express');
const { handlerWrapper } = require('../utils/utils');
const {
  commonNameHandlerGet,
  commonNameHandlerPost,
  commonNameHandlerSingleGet,
  commonNameHandlerDelete,
} = require('../handlers');

const router = express.Router();

router
  .route('/common_name')
  .get(handlerWrapper(commonNameHandlerGet))
  .post(handlerWrapper(commonNameHandlerPost));
router
  .route('/common_name/:common_name_id')
  .get(handlerWrapper(commonNameHandlerSingleGet))
  .delete(handlerWrapper(commonNameHandlerDelete));

module.exports = router;
