# <%= appname %>

### development

1. Install Nginx,
2. Configure Nginx
nginx config (development)
```
location /<%= s %> {
  proxy_pass http://unix:/home/work/projects/<%= appname %>/shared/socket/node.dev.sock;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header Host $http_host;
  proxy_redirect off;
}

location /static/<%= s %> {
  proxy_pass http://unix:/home/work/projects/<%= appname %>/shared/socket/webpack.sock;
}

location /ws/webpack/<%= s %> {
 proxy_pass http://unix:/home/work/projects/<%= appname %>/shared/socket/webpack.sock;
 proxy_http_version 1.1;
 proxy_set_header Upgrade $http_upgrade;
 proxy_set_header Connection "upgrade";
}
location /ws/<%= s %> {
 proxy_pass http://unix:/home/work/projects/<%= appname %>/shared/socket/node.dev.sock;
 proxy_http_version 1.1;
 proxy_set_header Upgrade $http_upgrade;
 proxy_set_header Connection "upgrade";
}
```

3. Launch app. 
```
npm run dev:start
```

### production

1. Add Nginx config.
nginx config (production)
```
location /<%= s %> {
  proxy_pass http://unix:/home/work/projects/<%= appname %>/shared/socket/node.prod.sock;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header Host $http_host;
  proxy_redirect off;
}

location /static/<%= s %> {
  alias /home/work/projects/<%= appname %>/build/<%= appname %>;
}

location /ws/<%= s %> {
 proxy_pass http://unix:/home/work/projects/<%= appname %>/shared/socket/node.prod.sock;
 proxy_http_version 1.1;
 proxy_set_header Upgrade $http_upgrade;
 proxy_set_header Connection "upgrade";
}
```

2. Build front end code.
```
npm run build
```

3. Start app.
```
./bin/restart.sh
```