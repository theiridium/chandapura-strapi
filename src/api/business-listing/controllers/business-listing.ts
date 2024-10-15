/**
 * business-listing controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::business-listing.business-listing', ({ strapi }) => ({
    async update(ctx) {
        try {
            const response = await super.update(ctx);
            if (process.env.APP_ENV === "Production") {
                if (response.data.attributes && response.data.attributes.step_number === 5) {
                    const adminUsers = await strapi.db.query('admin::user').findMany();
                    let emailToAddressList = adminUsers.map(x => x.email).join(',');
                    await strapi.plugins['email'].services.email.send({
                        to: emailToAddressList,
                        subject: 'New Business Listing Published - Chandapura.com',
                        html: `A new Business Listing - <b>${response.data.attributes.name}</b> is posted and awaiting approval. Please review the item in below link and approve \n ${process.env.PUBLIC_URL}/admin/content-manager/collection-types/api::business-listing.business-listing/${response.data.id}`,
                    })
                }
            }
            return response;

        } catch (error) {
            return error;
        }
    },
}));
