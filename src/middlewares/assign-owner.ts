/**
 * `assign-owner` middleware
 */

import { Strapi } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.request.body.data.author = ctx.state.user.id
    await next();
  };
};
