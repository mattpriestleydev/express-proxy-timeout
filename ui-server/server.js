const express = require('express');
const path = require('path');
var fs = require("fs");
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');
var https = require('https')

const app = express();
const port = 3000; // Change to your desired port

app.use(express.static(path.join(__dirname)));

// Define a route that will be proxied with an extended timeout
app.use('/getFile', (req, res, next) => {
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
      pathRewrite: {
        '^/getFile': '',
      },
      timeout: 300000,
      onProxyReq: fixRequestBody
    })(req, res, next);
  });

app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

https.createServer(
    {
      key: fs.readFileSync("not-a-real.key"),
      cert: fs.readFileSync("not-a-real.cert"),
    },
    app
  )
  .listen(port, function () {
    console.log(
      "Example app listening on port 3000! Go to https://localhost:3000/"
    );
  });