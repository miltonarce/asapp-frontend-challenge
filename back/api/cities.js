const {
  offsetLimitSchema,
  createLinks,
  parseOffsetAndLimit,
} = require('./pagination');

function applyFilter(data, filter) {
  if (filter === undefined) return data;
  const normalizedFilter = filter.toLowerCase().trim();

  return data.filter(
    ({ name, country, subcountry }) =>
      name.toLowerCase().includes(normalizedFilter) ||
      (country ? country.toLowerCase().includes(normalizedFilter) : false) ||
      (subcountry ? subcountry.toLowerCase().includes(normalizedFilter) : false)
  );
}

module.exports = async function(fastify, { data }) {
  fastify.get(
    '/',
    {
      schema: {
        querystring: {
          ...offsetLimitSchema,
          filter: { type: 'string' },
        },
      },
    },
    async function(req) {
      // A default limit of 10 is better, but it was intentionally left to the whole data length.
      // It's too much data and we expect the candidate to paginate it.
      const defaultLimit = data.length;
      const [offset, limit] = parseOffsetAndLimit(req, defaultLimit);
      const filter = req.query.filter;
      const results = applyFilter(data, filter);

      return {
        data: results.slice(offset, offset + limit),
        total: results.length,
        ...(filter !== undefined ? { filter } : {}),
        links: createLinks(req, results.length, offset, limit, filter),
      };
    }
  );

  fastify.get(
    '/:id',
    {
      schema: {
        params: {
          id: { type: 'integer', minimum: 0 },
        },
      },
    },
    async function(req, reply) {
      const id = req.params.id;
      const found = data.find(({ geonameid }) => geonameid === id);
      if (found) {
        return found;
      }
      reply.code(404).send();
    }
  );
};
