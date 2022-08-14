const SpeciesService = require('../../services/SpeciesService');
const {
  speciesIdParamSchema,
  speciesPatchSchema,
  speciesQuerySchema,
  speciesPostSchema,
} = require('./schemas');
const {
  getFilterAndLimitOptions,
  generatePrevAndNext,
} = require('../../utils/helper');
const HttpError = require('../../utils/HttpError');

const speciesHandlerGet = async (req, res) => {
  await speciesQuerySchema.validateAsync(req.query, {
    abortEarly: true,
  });

  const { filter, limitOptions } = getFilterAndLimitOptions(req.query);

  const speciesService = new SpeciesService();
  const { species, count } = await speciesService.getSpecies(
    filter,
    limitOptions,
  );

  const url = 'species';

  const links = generatePrevAndNext({
    url,
    count,
    limitOptions,
    queryObject: { ...filter, ...limitOptions },
  });

  res.send({
    species,
    links,
    count,
    query: { ...limitOptions, ...filter },
  });
};

const speciesHandlerPost = async (req, res) => {
  const requestBody = await speciesPostSchema.validateAsync(req.body, {
    abortEarly: true,
  });

  const speciesService = new SpeciesService();
  const result = await speciesService.createSpecies(requestBody);

  res.status(201).json(result);
};

const speciesHandlerPatch = async (req, res) => {
  await speciesIdParamSchema.validateAsync(req.params);
  await speciesPatchSchema.validateAsync(req.body, {
    abortEarly: true,
  });

  const speciesService = new SpeciesService();
  const result = await speciesService.updateSpecies({
    ...req.body,
    id: req.params.species_id,
  });

  res.send(result);
};

const speciesHandlerSingleGet = async (req, res) => {
  await speciesIdParamSchema.validateAsync(req.params);

  const speciesId = req.params.species_id;

  const speciesService = new SpeciesService();
  const species = await speciesService.getSpeciesById(speciesId);

  if (!species) {
    throw new HttpError(404, `species with ${speciesId} not found`);
  }

  res.send(species);
};

module.exports = {
  speciesHandlerGet,
  speciesHandlerPost,
  speciesHandlerPatch,
  speciesHandlerSingleGet,
};
