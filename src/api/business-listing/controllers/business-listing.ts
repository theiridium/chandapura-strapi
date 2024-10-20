/**
 * business-listing controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::business-listing.business-listing', ({ strapi }) => ({
    async update(ctx) {
        try {
            const response = await super.update(ctx);
            const authorData = await strapi.entityService.findOne('api::business-listing.business-listing', response.data.id, {
                populate: 'author',
            });
            console.log(authorData)
            if (process.env.APP_ENV === "Production") {
                if (response.data.attributes && response.data.attributes.step_number === 5) {
                    const adminUsers = await strapi.db.query('admin::user').findMany();
                    let emailToAddressListAdmin = adminUsers.map(x => x.email).join(',');
                    await strapi.plugins['email'].services.email.send({
                        to: emailToAddressListAdmin,
                        subject: 'New Business Listing Published - Chandapura.com',
                        html: `<p>A new Business Listing - <b>${response.data.attributes.name}</b> is posted and awaiting approval. Please review the item in below link for approval</p> ${process.env.PUBLIC_URL}/admin/content-manager/collection-types/api::business-listing.business-listing/${response.data.id}`,
                    })
                    let emailToAddressUser = authorData.author.email;
                    await strapi.plugins['email'].services.email.send({
                        to: emailToAddressUser,
                        subject: 'New Business Listing Uploaded - Chandapura.com',
                        html: `<p>A new Business Listing - <b>${response.data.attributes.name}</b> has been successfully uploaded. Team is currently reviwing the uploaded content, once approved, the listing will be published live and you will be intimated about the same via email.</p>`,
                    })
                }
            }
            return response;

        } catch (error) {
            return error;
        }
    },
}));
