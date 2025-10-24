var http = require('http');
var fs = require('fs');

var server = new http.Server();
server.listen(8009);

// // 端口，主机
// server.listen(8000, 'localhost');

// // 对象
// server.listen({
//   port: 8000,
//   host: 'localhost',
// })

server.on('request', function (request, response) {
  // 解析请求的URL
  var url = require('url').parse(request.url);

  //转义中文字符
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
      case 'htm':      type = 'text/html; charset=UTF-8'; break;
      case 'js':       type = 'application/javascript; charset=UTF-8'; break;
      case 'css':      type = 'text/css; charset=UTF-8'; break;
      case 'txt' :     type = 'text/plain; charset=UTF-8'; break;
      case 'manifest': type = 'text/cache-manifest; charset=UTF-8'; break;
      default:         type = 'application/octet-stream'; break;
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
