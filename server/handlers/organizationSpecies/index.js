const OrganizationSpeciesService = require('../../services/OrganizationSpeciesService');
const {
  organizationSpeciedIdParamSchema,
  organizationSpeciesHandlerPostSchema,
  organizationSpeciesQuerySchema,
} = require('./schemas');
const {
  getFilterAndLimitOptions,
  generatePrevAndNext,
} = require('../../utils/helper');
const HttpError = require('../../utils/HttpError');

const organizationSpeciesHandlerGet = async (req, res) => {
  await organizationSpeciesQuerySchema.validateAsync(req.query, {
    abortEarly: true,
  });

  const { filter, limitOptions } = getFilterAndLimitOptions(req.query);

  const organizationSpeciesService = new OrganizationSpeciesService();
  const { organizationSpecies, count } =
    await organizationSpeciesService.getOrganizationSpecies(
      filter,
      limitOptions,
    );

  const url = 'organization_species';

  const links = generatePrevAndNext({
    url,
    count,
    limitOptions,
    queryObject: { ...filter, ...limitOptions },
  });

  res.send({
    organization_species: organizationSpecies,
    links,
    count,
    query: { ...limitOptions, ...filter },
  });
};

const organizationSpeciesHandlerPost = async (req, res) => {
  const requestBody = await organizationSpeciesHandlerPostSchema.validateAsync(
    req.body,
    { abortEarly: false },
  );

  const organizationSpeciesService = new OrganizationSpeciesService();
  const result = await organizationSpeciesService.createOrganizationSpecies(
    requestBody,
  );
  res.json(result);
};

const organizationSpeciesHandlerSingleGet = async (req, res) => {
  await organizationSpeciedIdParamSchema.validateAsync(req.params);
  const organizationSpeciesId = req.params.organization_species_id;

  const organizationSpeciesService = new OrganizationSpeciesService();
  const organizationSpecies =
    await organizationSpeciesService.getOrganizationSpeciesById(
      req.params.organization_species_id,
    );

  if (!organizationSpecies) {
    throw new HttpError(
      404,
      `organizationSpecies with id: ${organizationSpeciesId} not found`,
    );
  }

  res.send(organizationSpecies);
};

const organizationSpeciesHandlerDelete = async (req, res) => {
  await organizationSpeciedIdParamSchema.validateAsync(req.params);

  const organizationSpeciesService = new OrganizationSpeciesService();

  await organizationSpeciesService.deleteOrganizationSpecies(
    req.params.organization_species_id,
  );

  res.send({ status: 'successful' });
};

module.exports = {
  organizationSpeciesHandlerGet,
  organizationSpeciesHandlerPost,
  organizationSpeciesHandlerSingleGet,
  organizationSpeciesHandlerDelete,
};
