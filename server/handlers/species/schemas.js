const Joi = require('joi');

const speciesPostSchema = Joi.object({
  scientific_name: Joi.string().lowercase().required(),
  description: Joi.string().required(),
  morphology: Joi.string().required(),
  shape: Joi.object({
    type: Joi.string().equal('MultiPolygon'),
    coordinates: Joi.array(),
  }).unknown(false),
});

const speciesQuerySchema = Joi.object({
  scientific_name: Joi.string(),
  limit: Joi.number().integer().required().min(1).max(1000),
  offset: Joi.number().integer().min(0),
});

const speciesIdParamSchema = Joi.object({
  species_id: Joi.string().uuid().required(),
});

const speciesPatchSchema = Joi.object({
  description: Joi.string(),
  morphology: Joi.string(),
});

module.exports = {
  speciesIdParamSchema,
  speciesPatchSchema,
  speciesQuerySchema,
  speciesPostSchema,
};
