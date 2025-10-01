const http = require('http');

function testServer() {
  return new Promise((resolve, reject) => {
    const req = http.request('http://localhost:3001/teachers', (res) => {
      if (res.statusCode === 200) {
        resolve(true);
      } else {
        reject(new Error(`Status: ${res.statusCode}`));
      }
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.setTimeout(5000, () => {
      reject(new Error('Timeout'));
    });
    
    req.end();
  });
}

testServer()
  .then(() => {
    console.log('✅ Backend server is running!');
    process.exit(0);
  })
  .catch((err) => {
    console.log('❌ Backend server is not available:', err.message);
    console.log('\n💡 Please start the backend server:');
    console.log('   cd backend && npm start');
    process.exit(1);
  });