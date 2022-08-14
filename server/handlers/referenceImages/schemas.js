const Joi = require('joi');

const referenceImagesPostSchema = Joi.object({
  species_id: Joi.string().uuid().required(),
  url: Joi.string().uri().required(),
});

const referenceImagesQuerySchema = Joi.object({
  species_id: Joi.string(),
  limit: Joi.number().integer().required().min(1).max(1000),
  offset: Joi.number().integer().min(0),
});

const referenceImageIdParamSchema = Joi.object({
  reference_image_id: Joi.string().uuid().required(),
});

module.exports = {
  referenceImageIdParamSchema,
  referenceImagesPostSchema,
  referenceImagesQuerySchema,
};
