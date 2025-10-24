
//前提：需要安装npm install http-proxy-middleware express
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs')


const app = express();
const PORT = 8100; // 前端服务端口
const UAT_HOST="http://10.38.164.142";

// const UAT_HOST ="https://icrmuat.be.test.mi.com:446";

// 静态文件托管（前端打包后的文件）
app.use(express.static('dist'));

// 代理配置
app.use('/uatApi', createProxyMiddleware({
  target: UAT_HOST, // 后端服务地址
  changeOrigin: true,             // 修改请求头中的 Host 为目标地址
  pathRewrite: { '^/uatApi': '' },   // 去掉请求路径中的 /api 前缀
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader('X-Special-Proxy-Header', 'NodeJS');
  }
}));


app.use("/",(request,response,next)=>{

  var url = require('url').parse(request.url);
  var path=decodeURI( url.pathname);
  if (path === '/hello') {
    response.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
    response.write('Hello');
    response.end();
  } else if (path === '/info') {
    response.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
    response.write(request.method + ' ' + request.url +
      ' HTTP/' + request.httpVersion + '\r\n');
    for (var h in request.headers) {
      response.write(h + ': ' + request.headers[h] + '\r\n');
    }
    response.write('\r\n');
    request.on('data', function(chunk) { response.write(chunk); });
    request.on('end', function(chunk) { response.end(); });
  } else {
    var filename = path.substring(1);
    var type;
    switch(filename.substring(filename.lastIndexOf('.') + 1))  {
      case 'html':
      case 'htm':
        type = 'text/html; charset=UTF-8';
        break;
      case 'js':
        type = 'application/javascript; charset=UTF-8';
        break;
      case 'css':
        type = 'text/css; charset=UTF-8';
        break;
      case 'txt' :
        type = 'text/plain; charset=UTF-8';
        break;
      case 'manifest':
        type = 'text/cache-manifest; charset=UTF-8';
        break;
      default:
        type = 'application/octet-stream';
        break;
    }


    //读取文件
    fs.readFile(filename, function (err, content) {
      if (err) {
        response.writeHead(404, {
          'Content-Type': 'text/plain; charset=UTF-8'});
        response.write(err.message);
        response.end();
      } else {
        response.writeHead(200, {'Content-Type': type});
        response.write(content);
        response.end();
      }
    });
  }
});

// 启动服务
app.listen(PORT, () => {
  console.log(`前端服务运行在 http://localhost:${PORT}`);
});
