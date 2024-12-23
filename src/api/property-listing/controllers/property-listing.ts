/**
 * property-listing controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::property-listing.property-listing', ({ strapi }) => ({
    async update(ctx) {
        try {
            const response = await super.update(ctx);
            const itemData = await strapi.entityService.findOne('api::property-listing.property-listing', response.data.id, {
                populate: ['author', 'payment_details', 'payment_history'],
            });
            if (process.env.APP_ENV === "Production") {
                const adminUsers = await strapi.db.query('admin::user').findMany();
                let emailToAddressListAdmin = adminUsers.map(x => x.email);
                if (response.data.attributes && response.data.attributes.step_number === 4) {
                    await strapi.plugins['email'].services.email.send({
                        to: emailToAddressListAdmin,
                        subject: 'New Property Listing Published - Chandapura.com',
                        html: `<p>A new Property Listing - <b>${response.data.attributes.name}</b> is posted and awaiting approval. Please review the item in below link for approval</p> ${process.env.PUBLIC_URL}/admin/content-manager/collection-types/api::property-listing.property-listing/${response.data.id}`,
                    });
                    let emailToAddressUser = itemData.author.email;
                    await strapi.plugins['email'].services.email.send({
                        to: emailToAddressUser,
                        subject: 'New Property Listing Uploaded - Chandapura.com',
                        html: `<p>A new Property Listing - <b>${response.data.attributes.name}</b> has been successfully uploaded. Team is currently reviwing the uploaded content, once approved, the listing will be published live and you will be intimated about the same via email.</p>`,
                    });
                }
                if (response.data.attributes &&
                    response.data.attributes.step_number === 2 &&
                    itemData.payment_history.length > 0 &&
                    itemData.payment_details.expiry_date > new Date().toISOString()) {
                    await strapi.plugins['email'].services.email.send({
                        to: emailToAddressListAdmin,
                        subject: 'Images Updated for Property Listing - Chandapura.com',
                        html: `<p>Images Updated for Property Listing - <b>${response.data.attributes.name}</b> and awaiting approval. Please review the item in below link for approval</p>
                        <a href='${process.env.PUBLIC_URL}/admin/content-manager/collection-types/api::property-listing.property-listing/${response.data.id}'>Link to admin portal</a> `,
                    });
                    let emailToAddressUser = itemData.author.email;
                    await strapi.plugins['email'].services.email.send({
                        to: emailToAddressUser,
                        subject: 'Images Updated for Property Listing - Chandapura.com',
                        html: `<p>Images Updated for Property Listing - <b>${response.data.attributes.name}</b>. Team is currently reviwing the uploaded content, once approved, the listing will be published live and you will be intimated about the same via email.</p>`,
                    });
                }
            }
            return response;

        } catch (error) {
            return error;
        }
    },
}));
