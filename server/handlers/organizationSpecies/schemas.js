const Joi = require('joi');

const organizationSpeciesHandlerPostSchema = Joi.object({
  common_name: Joi.string().lowercase().required(),
  species_id: Joi.string().uuid().required(),
  organization_id: Joi.string().uuid().required(),
  created_by: Joi.string().uuid(),
});

const organizationSpeciesQuerySchema = Joi.object({
  organization_id: Joi.string().uuid(),
  common_name_id: Joi.string().uuid(),
  common_name: Joi.string(),
  species_id: Joi.string().uuid(),
  limit: Joi.number().integer().required().min(1).max(1000),
  offset: Joi.number().integer().min(0),
});

const organizationSpeciedIdParamSchema = Joi.object({
  organization_species_id: Joi.string().uuid().required(),
});

module.exports = {
  organizationSpeciedIdParamSchema,
  organizationSpeciesHandlerPostSchema,
  organizationSpeciesQuerySchema,
};
