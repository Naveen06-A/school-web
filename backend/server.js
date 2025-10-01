const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Use default middlewares (CORS, static, etc)
server.use(middlewares);

// Add custom routes if needed
server.use(jsonServer.bodyParser);

// Use router
server.use(router);

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0'; // Allow external connections

server.listen(PORT, HOST, () => {
  console.log(`✅ JSON Server is running on http://${HOST}:${PORT}`);
  console.log(`📚 Teachers API: http://localhost:${PORT}/teachers`);
  console.log(`🎓 Students API: http://localhost:${PORT}/students`);
  console.log(`🌐 To test: curl http://localhost:${PORT}/teachers`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use!`);
    console.log('💡 Try: killall node OR change the port in server.js');
  } else {
    console.error('❌ Server error:', error);
  }
});