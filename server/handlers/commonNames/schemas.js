const Joi = require('joi');

const commonNamePostSchema = Joi.object({
  species_id: Joi.string().uuid().required(),
  common_name: Joi.string().required(),
  created_by: Joi.string().uuid(),
});

const commonNameQuerySchema = Joi.object({
  species_id: Joi.string(),
  common_name: Joi.string(),
  limit: Joi.number().integer().required().min(1).max(1000),
  offset: Joi.number().integer().min(0),
});

const commonNameIdParamSchema = Joi.object({
  common_name_id: Joi.string().uuid().required(),
});

module.exports = {
  commonNamePostSchema,
  commonNameQuerySchema,
  commonNameIdParamSchema,
};
