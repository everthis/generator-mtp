const fs = require('fs')
const path = require('path')
const http = require('http')
const koa = require('../extensions/koa.ext')
const handlebars = require("koa-handlebars")
const session = require('koa-session')
const config = require('../config')
const nodeEnv = process.env.NODE_ENV

const app = new koa();
app.keys = ['secret_key'];
app.use(async (ctx, next) => {
    if(!this.config){
        this.config = config;
    }
    await next();
});

app.use(session({
    key: '<%= module_name %>:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true
}, app));

var Logger = require('mini-logger');
var logger = Logger({
    dir: config.logDir,
    format: 'YYYY-MM-DD-[{category}][.log]'
});

app.context.logger = logger;

const onerror = require('koa-onerror');
onerror(app);

const bodyParser = require('koa-bodyparser');
app.use(bodyParser({
    formLimit: '5mb',
    jsonLimit: '5mb',
    textLimit: '5mb'
}));

const router = require('koa-router')({
    prefix : config.appPrefix || ''
});
app.use(router.routes())
   .use(router.allowedMethods());

const appRouter = require('./router/index');
appRouter(router);

app.listen(config.nodeSocket, function(){
    fs.chmodSync(config.nodeSocket, '666');
    console.log('server listening on ' + config.nodeSocket);
});

fs.writeFile(config.nodePidPath, `${process.pid}`, function(err) {
    if(err) return console.log(err);
    console.log("process pid was saved!");
});

module.exports = app;

