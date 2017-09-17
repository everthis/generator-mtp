const nunjucks = require('nunjucks')
const config = require('../config')
const assetsMap = require('./manifest.ext')

function factoryFn(tag, endTag, ...restParams) {
    this.tags = [tag]
    this.tag = tag
    this.endTag = endTag
}
factoryFn.prototype.parse = function(parser, nodes, lexer) {
    const tok = parser.nextToken()

    const args = parser.parseSignature(null, true)
    parser.advanceAfterBlockEnd(tok.value)

    let body = parser.parseUntilBlocks('error', this.endTag)
    let errorBody = null

    if (parser.skipSymbol('error')) {
        parser.skip(lexer.TOKEN_BLOCK_END)
        errorBody = parser.parseUntilBlocks(this.endTag)
    }

    parser.advanceAfterBlockEnd()

    return new nodes.CallExtension(this, 'run', args, [body, errorBody])
}
factoryFn.prototype.run = function(context, name, body, errorBody) {
    const id = `${this.tag}__${Math.floor(Math.random() * 10000)}`
    const type = genType(this.tag)
    let src = ''

    if (config.isDev) {
        src =
            config.assetsPublicPrefix +
            name +
            (type === 'script' ? '.js' : '.css')
    } else if (config.isProd) {
        src =
            config.assetsPublicPrefix +
            assetsMap[type === 'script' ? 'scripts' : 'styles'][name]
    }

    return genStr({ type, id, src })
}

function genType(tag) {
    switch (tag) {
        case 'xscript':
            return 'script'
            break
        case 'xstyle':
            return 'style'
            break
    }
}

function genStr(params) {
    const type = params.type
    switch (type) {
        case 'style':
            return new nunjucks.runtime.SafeString(
                `<link id="${params.id}" href="${params.src}" rel="stylesheet">`
            )
            break
        case 'script':
            return new nunjucks.runtime.SafeString(
                `<script id="${params.id}" src="${params.src}"></script>`
            )
            break
    }
}
const xscriptExtension = new factoryFn('xscript', 'endxscript')
const xstyleExtension = new factoryFn('xstyle', 'endxstyle')

module.exports = { xscriptExtension, xstyleExtension }
