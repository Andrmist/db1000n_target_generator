const fastify = require('fastify')({ logger: { prettyPrint: true } });

fastify.register(require('fastify-static'), {
  root: __dirname
});

fastify
  .listen(process.env.PORT || 9898, '0.0.0.0')
  // eslint-disable-next-line no-console
  .then(() => console.log('Server Started'))
  // eslint-disable-next-line no-console
  .catch(console.error);
