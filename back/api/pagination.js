const URI = require('uri-js');
const queryString = require('query-string');

const offsetLimitSchema = {
  offset: { type: 'integer', minimum: 0 },
  limit: { type: 'integer', minimum: 1 },
};

function createLinks(req, total, offset, limit, filter = undefined) {
  // Currently there is no easy way to detect the protocol from the request
  // in Fatisfy (see https://github.com/fastify/fastify/issues/1800)
  // For the challenge we can assume that the protocol is plain http
  const sourceUri = URI.parse(`http://${req.headers.host}${req.req.url}`);
  const baseUri = {
    scheme: sourceUri.scheme,
    host: sourceUri.host,
    port: sourceUri.port,
    path: sourceUri.path,
  };
  const baseQueryString = {
    filter,
    limit,
  };

  const first = URI.serialize({
    ...baseUri,
    ...(filter !== undefined
      ? { query: queryString.stringify(baseQueryString) }
      : {}),
  });

  const lastOffset =
    limit * (Math.floor(total / limit) + (total % limit === 0 ? -1 : 0));

  const last = URI.serialize({
    ...baseUri,
    query: queryString.stringify({
      ...baseQueryString,
      offset: lastOffset,
    }),
  });

  const next =
    offset < lastOffset
      ? URI.serialize({
          ...baseUri,
          query: queryString.stringify({
            ...baseQueryString,
            offset: Math.min(total - 1, offset + limit),
          }),
        })
      : undefined;

  const prev =
    offset > 0
      ? URI.serialize({
          ...baseUri,
          query: queryString.stringify({
            ...baseQueryString,
            offset: Math.max(0, offset - limit),
          }),
        })
      : undefined;

  return {
    first,
    ...(prev !== undefined ? { prev } : {}),
    ...(next !== undefined ? { next } : {}),
    last,
  };
}

const parseOptionalInt = (str, defaultValue) =>
  str !== undefined ? parseInt(str, 10) : defaultValue;

const parseOffsetAndLimit = (req, limit) => [
  parseOptionalInt(req.query.offset, 0),
  parseOptionalInt(req.query.limit, limit),
];

module.exports = {
  offsetLimitSchema,
  parseOffsetAndLimit,
  createLinks,
};
