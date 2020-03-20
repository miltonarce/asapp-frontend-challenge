const {
  offsetLimitSchema,
  createLinks,
  parseOffsetAndLimit,
} = require('./pagination');

const getCitiesSchema = {
  querystring: {
    ...offsetLimitSchema,
  },
};

const patchCitiesSchema = {
  body: {
    type: 'object',
    patternProperties: {
      '[0-9]+': { type: 'boolean' },
    },
  },
};

module.exports = async function(fastify, { preferredCities = new Set() }) {
  fastify.get('/cities', { schema: getCitiesSchema }, async function(req) {
    const defaultLimit = preferredCities.size;
    const [offset, limit] = parseOffsetAndLimit(req, defaultLimit);

    return {
      data: Array.from(preferredCities).slice(offset, offset + limit),
      total: preferredCities.size,
      links: createLinks(req, preferredCities.size, offset, limit),
    };
  });

  fastify.patch('/cities', { schema: patchCitiesSchema }, async function(
    req,
    reply
  ) {
    const reqBody = req.body;

    Object.entries(reqBody).forEach(([geonameidStr, selected]) => {
      const geonameid = parseInt(geonameidStr, 10);
      if (selected) {
        preferredCities.add(geonameid);
      } else {
        preferredCities.delete(geonameid);
      }
    });

    reply.code(204).send();
  });
};
