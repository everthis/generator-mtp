#!/usr/bin/env bash
NODE_ENV=production UV_THREADPOOL_SIZE=10 nohup node --max_old_space_size=4096 ./server/app.js >> ./shared/log/node.stdout.log 2>>./shared/log/node.stderr.log &
