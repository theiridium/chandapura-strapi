let beforeUpdate_publish_status = false;
let afterUpdate_publish_status = false;
export default {
    async beforeUpdate(event: any) {
        const { params } = event;
        let id = params.data.id;
        const response = await strapi.entityService.findOne('api::business-listing.business-listing', id);
        beforeUpdate_publish_status = response.publish_status;
    },
    async afterUpdate(event: any) {
        const { result, params } = event;
        let id = params.data.id;
        afterUpdate_publish_status = result.publish_status;
        if (process.env.APP_ENV === "Production" && beforeUpdate_publish_status === false && afterUpdate_publish_status === true) {
            const response = await strapi.entityService.findOne('api::business-listing.business-listing', id, {
                populate: ['category', 'sub_category']
            });
            let emailToAddressUser = result.author.email;
            await strapi.plugins['email'].services.email.send({
                to: emailToAddressUser,
                subject: 'New Business Listing Live - Chandapura.com',
                html: `<p>Your Business Listing - <b><a href='https://www.chandapura.com/business-categories/${response.category.slug}/${response.sub_category.slug}/${result.slug}?source=${result.id}'>${result.name}</b></a> is Live now.</p>`,
            });
        }
    },
};