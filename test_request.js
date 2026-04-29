const http = require('http');

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/rewards'
}, (res) => {
  console.log('Status:', res.statusCode);
  res.on('data', (data) => {
    console.log('Response:', data.toString());
  });
});

req.on('error', (err) => {
  console.error('Error:', err.message);
});

req.end();