/**
 * classified-listing router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::classified-listing.classified-listing', {
    config: {
        create: {
            middlewares: ['global::assign-owner'],
        },
        update: {
            policies: ['global::is-owner']
        },
        delete: {
            policies: ['global::is-owner']
        }
    }
});