const jsonServer = require('json-server');
const clone = require('clone');
//const server = jsonServer.create();
//const router = jsonServer.router('db.json');
const data = require('./db.json');

const isProductionEnv = process.env.NODE_ENV === 'production';
const server = jsonServer.create()

const router = jsonServer.router(isProductionEnv ? clone(data) : 'db.json', {
	_isFake: isProductionEnv
});

const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000;

server.use(middlewares);
server.use(jsonServer.rewriter({
	'/api/*': '/$1',
}));

server.use((req, res, next) => {
	if (req.path !== '/')
		router.db.setState(clone(data));
		next();
});
server.use(router);

server.listen(PORT, () => {
	console.log('Server is running');
});

module.exports = server;