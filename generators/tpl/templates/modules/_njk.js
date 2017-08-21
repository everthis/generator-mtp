const njk = require('nunjucks')
njk.configure({
  trimBlocks: true,
  lstripBlocks: true,
  autoescape: true,
  trimBlocks: true
});

module.exports = {
  njk
}