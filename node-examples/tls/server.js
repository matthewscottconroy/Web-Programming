const tls = require('tls');
const fs = require('fs');
const path = require('path');

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

const server = tls.createServer(options, (socket) => {
  console.log('Server connected', socket.authorized ? 'authorized' : 'unauthorized');
  socket.setEncoding('utf8');
  let data = '';

  socket.on('data', (chunk) => {
    data += chunk;
  });

  socket.on('end', () => {
    fs.writeFileSync('decrypted_file.txt', data);
    console.log('File saved!');
  });
});

server.listen(8000, () => {
  console.log('Server listening on port 8000');
});

