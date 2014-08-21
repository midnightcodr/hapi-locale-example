var Hapi=require('hapi')
	, i18n=new( require('i18n-2')) ( {
		locales: ['en', 'tw']
	})
	, server=Hapi.createServer(process.env.port||3000);


	server.ext('onRequest', function(request, next) {
		console.log(request.headers);
		var lang=request.headers['lang']||'en';
		console.log('lang='+lang);
		i18n.setLocale(lang);
		next();
	});
	server.route({
		method: 'GET',
		path: '/echo/{name?}',
		handler: function(request, reply) {
			var name=request.params.name||'', s;
			if(name!=='') {
				s=i18n.__('Hello %s', name);
			} else {
				s=i18n.__('Hello');
			}
			console.log(s);
			reply(s);
		}
	});
	server.route({
		method: 'GET',
		path: '/else',
		handler: function(request, reply) {
			var s=i18n.__('Something else');
			reply(s);
		}
	});
	server.start( function() {
		console.log('server started at '+server.info.uri);
	});
