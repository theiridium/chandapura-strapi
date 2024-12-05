let beforeUpdate_publish_status = false;
let afterUpdate_publish_status = false;
export default {
    async afterCreate(event: any) {
        try {
            const { result } = event;
            const response = await strapi.entityService.findOne('api::classified-listing.classified-listing', result.id, {
                populate: ['area']
            });
            const updatedSlug = `${result.slug}-${response.area.name.toLowerCase().replace(/\s+/g, '-')}`;
            await strapi.entityService.update('api::classified-listing.classified-listing', result.id, {
                data: {
                    slug: updatedSlug,
                },
            });
        }
        catch (error) {
            console.error('Error from afterCreate:', error);
        }

    },
    async beforeUpdate(event: any) {
        try {
            const { params } = event;
            if (process.env.APP_ENV === "Production") {
                let id = params.where.id;
                const response = await strapi.entityService.findOne('api::classified-listing.classified-listing', id);
                beforeUpdate_publish_status = response.publish_status;
            }
        }
        catch (error) {
            console.error('Error from beforeUpdate:', error);
        }
    },
    async afterUpdate(event: any) {
        try {
            const { result, params } = event;
            if (process.env.APP_ENV === "Production") {
                afterUpdate_publish_status = result.publish_status;
                let id = params.where.id;
                if (beforeUpdate_publish_status === false && afterUpdate_publish_status === true) {
                    const response = await strapi.entityService.findOne('api::classified-listing.classified-listing', id, {
                        populate: ['category', 'author']
                    });
                    let emailToAddressUser = response.author.email;
                    await strapi.plugins['email'].services.email.send({
                        to: emailToAddressUser,
                        subject: 'New Classified Listing Live - Chandapura.com',
                        html: `<p>Your Classified Product - <b><a href='https://www.chandapura.com/classifieds/${response.category.slug}/${result.slug}?source=${result.id}'>${result.name}</b></a> is Live now.</p>`,
                    });
                }
            }
        }
        catch (error) {
            console.error('Error from afterUpdate:', error);
        }
    },
};