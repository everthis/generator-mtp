let net = require('net')
let fs = require('fs')
let http = require('http')
let koa = require('koa')

/*
 * rewrite koa listen method
 */
class socketKoa extends koa {
  constructor() {
    super()
  }
  listen() {
    const server = http.createServer(this.callback())
    const socketPath = arguments[0]
    server.on('error', e => {
      if (e.code == 'EADDRINUSE') {
        let clientSocket = new net.Socket()
        clientSocket.on('error', e => {
          // handle error trying to talk to server
          if (e.code == 'ECONNREFUSED') {
            // No other server listening
            fs.unlinkSync(socketPath)
            server.listen(socketPath, function() {
              // 'listening' listener
              console.log('server recovered')
            })
          }
        })
        clientSocket.connect({ path: socketPath }, function() {
          console.log('Server running, giving up...')
          process.exit()
        })
      } else {
        console.log(e)
      }
    })
    return server.listen.apply(server, arguments)
  }
}

module.exports = socketKoa
