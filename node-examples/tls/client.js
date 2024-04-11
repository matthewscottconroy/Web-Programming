const tls = require('tls');
const fs = require('fs');

const options = {
  ca: fs.readFileSync('server.cert') // Use the server's certificate
};

const fileContents = fs.readFileSync('file_to_encrypt.txt', 'utf8');

const client = tls.connect(8000, options, () => {
  console.log('Client connected', client.authorized ? 'authorized' : 'unauthorized');
  client.write(fileContents);
  client.end();
});

client.on('error', (error) => {
  console.error(error);
});

