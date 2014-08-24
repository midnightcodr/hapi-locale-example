var Hapi=require('hapi')
	, vsprintf=require('sprintf').vsprintf
	, I18n=require('i18n-2')
	, i18n_opts={
		locales: ['en', 'tw']
	}
	, i18n=new I18n(i18n_opts)
	, server=Hapi.createServer(process.env.port||3000);

I18n.prototype.__= function() {
	var msg = this.translate(arguments[0], arguments[1]);

	if (arguments.length > 2) {
		msg = vsprintf(msg, Array.prototype.slice.call(arguments, 2));
	}

	return msg;
}


server.ext('onRequest', function(request, next) {
	request.lang=request.headers['lang']||'en';
	next();
});
server.route({
	method: 'GET',
	path: '/echo/{name?}',
	handler: function(request, reply) {
		console.log('request.lang='+request.lang);
		var name=request.params.name||'', s;
		if(name!=='') {
			s=i18n.__(request.lang, 'Hello %s', name);
		} else {
			s=i18n.__(request.lang, 'Hello');
		}
		console.log(s);
		reply(s);
	}
});
server.route({
	method: 'GET',
	path: '/else',
	handler: function(request, reply) {
		var s=i18n.__(request.lang, 'Something else');
		reply(s);
	}
});
server.start( function() {
	console.log('server started at '+server.info.uri);
});
