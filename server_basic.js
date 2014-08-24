var Hapi=require('hapi')
	, server=Hapi.createServer(process.env.port||3000);

server.route({
	method: 'GET',
	path: '/echo/{name?}',
	handler: function(request, reply) {
		var name=request.params.name||'', s;
		if(name!=='') {
			s='Hello '+ name;
		} else {
			s='Hello';
		}
		console.log(s);
		reply(s);
	}
});
server.route({
	method: 'GET',
	path: '/else',
	handler: function(request, reply) {
		var s='Something else';
		reply(s);
	}
});
server.start( function() {
	console.log('server started at '+server.info.uri);
});
