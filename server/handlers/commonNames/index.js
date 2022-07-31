const CommonNameService = require('../../services/CommonNameService');
const HttpError = require('../../utils/HttpError');
const {
  getFilterAndLimitOptions,
  generatePrevAndNext,
} = require('../../utils/helper');
const {
  commonNamePostSchema,
  commonNameIdParamSchema,
  commonNameQuerySchema,
} = require('./schemas');

const commonNameHandlerGet = async (req, res) => {
  await commonNameQuerySchema.validateAsync(req.query, {
    abortEarly: true,
  });

  const { filter, limitOptions } = getFilterAndLimitOptions(req.query);

  const commonNameService = new CommonNameService();
  const { commonNames, count } = await commonNameService.getCommonNames(
    filter,
    limitOptions,
  );

  const url = 'common_name';

  const links = generatePrevAndNext({
    url,
    count,
    limitOptions,
    queryObject: { ...filter, ...limitOptions },
  });

  res.send({
    common_names: commonNames,
    links,
    count,
    query: { ...limitOptions, ...filter },
  });
};

const commonNameHandlerPost = async (req, res) => {
  await commonNamePostSchema.validateAsync(req.body, { abortEarly: false });

  const commonNameService = new CommonNameService();
  const commonName = await commonNameService.createCommonName(req.body);

  res.send(commonName);
};

const commonNameHandlerSingleGet = async (req, res) => {
  await commonNameIdParamSchema.validateAsync(req.params);
  const commonNameId = req.params.common_name_id;

  const commonNameService = new CommonNameService();
  const commonName = await commonNameService.getCommonNameById(commonNameId);

  if (!commonName) {
    throw new HttpError(404, `common name with ${commonNameId} not found`);
  }

  res.send(commonName);
};

const commonNameHandlerDelete = async (req, res) => {
  await commonNameIdParamSchema.validateAsync(req.params);
  const commonNameId = req.params.common_name_id;

  const commonNameService = new CommonNameService();
  const commonName = await commonNameService.deleteCommonName(commonNameId);

  res.send(commonName);
};

module.exports = {
  commonNameHandlerGet,
  commonNameHandlerPost,
  commonNameHandlerSingleGet,
  commonNameHandlerDelete,
};
