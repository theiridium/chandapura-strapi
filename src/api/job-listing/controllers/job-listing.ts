/**
 * job-listing controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::job-listing.job-listing', ({ strapi }) => ({
    async update(ctx) {
        try {
            const response = await super.update(ctx);
            const authorData = await strapi.entityService.findOne('api::job-listing.job-listing', response.data.id, {
                populate: ['author'],
            });
            if (process.env.APP_ENV === "Production") {
                const adminUsers = await strapi.db.query('admin::user').findMany();
                let emailToAddressListAdmin = adminUsers.map(x => x.email);
                if (response.data.attributes && response.data.attributes.step_number === 4) {
                    await strapi.plugins['email'].services.email.send({
                        to: emailToAddressListAdmin,
                        subject: 'New Job Listing Posted - Chandapura.com',
                        html: `<p>A new Job lisiting by <b>${response.data.attributes.company_name}</b> is posted and awaiting approval. Please review the item in below link for approval</p> ${process.env.PUBLIC_URL}/admin/content-manager/collection-types/api::job-listing.job-listing/${response.data.id}`,
                    });
                    let emailToAddressUser = authorData.author.email;
                    await strapi.plugins['email'].services.email.send({
                        to: emailToAddressUser,
                        subject: 'New Job Listing Uploaded - Chandapura.com',
                        html: `<p>Your Job listing for the position <b>${response.data.attributes.job_designation}</b> has been successfully uploaded. Team is currently reviwing the uploaded content, once approved, the listing will be published live and you will be intimated about the same via email.</p>`,
                    });
                }
            }
            return response;

        } catch (error) {
            return error;
        }
    },
}));
