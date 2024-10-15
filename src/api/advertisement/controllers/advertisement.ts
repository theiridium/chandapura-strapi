/**
 * advertisement controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::advertisement.advertisement', ({ strapi }) => ({
    async update(ctx) {
        // some logic here
        const response = await super.update(ctx);
        // some more logic
        console.log("controller triggred");
        await strapi.plugins['email'].services.email.send({
            to: 'priyankastro7@gmail.com',
            subject: 'The Strapi Email plugin worked successfully',
            text: 'Hello world!',
            html: 'Hello world!',
        })
        return response;
    },
}));
