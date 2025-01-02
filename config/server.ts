export default ({ env }) => ({
  https: {
    serverOptions: {
      timeout: 600000, // Set timeout to 10 minutes (adjust as needed)
    },
  },
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  url: env('PUBLIC_URL', 'http://localhost:1337'),
});
