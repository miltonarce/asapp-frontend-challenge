const util = require('util');
const path = require('path');
const fs = require('fs');
const marked = require('marked');
const readFile = util.promisify(fs.readFile);

let readmeHtml = undefined;
module.exports = async function(fastify) {
  fastify.get('/', async function(req, reply) {
    if (readmeHtml === undefined) {
      const css = await readFile(require.resolve('github-markdown-css'), {
        encoding: 'utf8',
      });
      readmeHtml = `<html>
<head>
  <title>Front End Challenge Cities API</title>
  <style>${css}</style>
</head>
<body style="max-width: 80rem; margin: 5rem auto;" class="markdown-body">
${marked(
  await readFile(path.join(__dirname, 'README.md'), { encoding: 'utf8' })
)}</body></html>`;
    }

    reply.type('text/html').send(readmeHtml);
  });
};
