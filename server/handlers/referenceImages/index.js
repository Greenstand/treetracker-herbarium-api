const {
  referenceImagesPostSchema,
  referenceImagesQuerySchema,
  referenceImageIdParamSchema,
} = require('./schemas');
const {
  getFilterAndLimitOptions,
  generatePrevAndNext,
} = require('../../utils/helper');
const HttpError = require('../../utils/HttpError');
const ReferenceImageService = require('../../services/ReferenceImageService');

const referenceImagesHandlerGet = async (req, res) => {
  await referenceImagesQuerySchema.validateAsync(req.query, {
    abortEarly: true,
  });

  const { filter, limitOptions } = getFilterAndLimitOptions(req.query);

  const referenceImageService = new ReferenceImageService();
  const { referenceImages, count } =
    await referenceImageService.getReferenceImages(filter, limitOptions);

  const url = 'reference_image';

  const links = generatePrevAndNext({
    url,
    count,
    limitOptions,
    queryObject: { ...filter, ...limitOptions },
  });

  res.send({
    reference_images: referenceImages,
    links,
    count,
    query: { ...limitOptions, ...filter },
  });
};

const referenceImagesHandlerPost = async (req, res) => {
  await referenceImagesPostSchema.validateAsync(req.body, {
    abortEarly: false,
  });

  const referenceImageService = new ReferenceImageService();
  const result = await referenceImageService.createReferenceImage(req.body);

  res.status(201).send(result);
};

const referenceImagesHandlerSingleGet = async (req, res) => {
  await referenceImageIdParamSchema.validateAsync(req.params);
  const referenceImageId = req.params.reference_image_id;

  const referenceImageService = new ReferenceImageService();
  const referenceImage = await referenceImageService.getReferenceImageById(
    referenceImageId,
  );

  if (!referenceImage) {
    throw new HttpError(
      404,
      `reference image with id ${referenceImageId} not found`,
    );
  }

  res.send(referenceImage);
};

const referenceImagesHandlerDelete = async (req, res) => {
  await referenceImageIdParamSchema.validateAsync(req.params);
  const referenceImageId = req.params.reference_image_id;

  const referenceImageService = new ReferenceImageService();
  const referenceImage = await referenceImageService.deleteReferenceImage(
    referenceImageId,
  );

  res.send(referenceImage);
};

module.exports = {
  referenceImagesHandlerGet,
  referenceImagesHandlerPost,
  referenceImagesHandlerSingleGet,
  referenceImagesHandlerDelete,
};
