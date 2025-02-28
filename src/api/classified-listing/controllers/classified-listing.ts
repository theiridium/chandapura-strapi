/**
 * classified-listing controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::classified-listing.classified-listing', ({ strapi }) => ({
    async update(ctx) {
        try {
            const response = await super.update(ctx);
            const authorData = await strapi.entityService.findOne('api::classified-listing.classified-listing', response.data.id, {
                populate: ['author'],
            });
            if (process.env.APP_ENV === "Production") {
                const adminUsers = await strapi.db.query('admin::user').findMany({
                    where: {
                        roles: { id: 1 }
                    }
                });
                let emailToAddressListAdmin = adminUsers.map(x => x.email);
                if (response.data.attributes && response.data.attributes.step_number === 4) {
                    await strapi.plugins['email'].services.email.send({
                        to: emailToAddressListAdmin,
                        subject: 'New Classified Listing Posted - Chandapura.com',
                        html: `<p>A new Classified - <b>${response.data.attributes.name}</b> is posted and awaiting approval. Please review the item in below link for approval</p> ${process.env.PUBLIC_URL}/admin/content-manager/collection-types/api::classified-listing.classified-listing/${response.data.id}`,
                    });
                    let emailToAddressUser = authorData.author.email;
                    await strapi.plugins['email'].services.email.send({
                        to: emailToAddressUser,
                        subject: 'New Classified Listing Uploaded - Chandapura.com',
                        html: `<p>Your Classified - <b>${response.data.attributes.name}</b> has been successfully uploaded. Team is currently reviwing the uploaded content, once approved, the listing will be published live and you will be intimated about the same via email.</p>`,
                    });
                }
                if (response.data.attributes &&
                    response.data.attributes.step_number === 2 &&
                    response.data.attributes.publish_status) {
                    await strapi.plugins['email'].services.email.send({
                        to: emailToAddressListAdmin,
                        subject: 'Images Updated for Classified Listing - Chandapura.com',
                        html: `<p>Images Updated for Classified Listing - <b>${response.data.attributes.name}</b> and awaiting approval. Please review the item in below link for approval</p>
                        <a href='${process.env.PUBLIC_URL}/admin/content-manager/collection-types/api::classified-listing.classified-listing/${response.data.id}'>Link to admin portal</a> `,
                    });
                    let emailToAddressUser = authorData.author.email;
                    await strapi.plugins['email'].services.email.send({
                        to: emailToAddressUser,
                        subject: 'Images Updated for Classified Listing - Chandapura.com',
                        html: `<p>Images Updated for Classified Listing - <b>${response.data.attributes.name}</b>. Team is currently reviwing the uploaded content, once approved, the listing will be published live and you will be intimated about the same via email.</p>`,
                    });
                }
            }
            return response;

        } catch (error) {
            return error;
        }
    },
}));
