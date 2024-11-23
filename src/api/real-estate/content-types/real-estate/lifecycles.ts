let beforeUpdate_publish_status = false;
let afterUpdate_publish_status = false;
export default {
    async afterCreate(event: any) {
        try {
            const { result } = event;
            const response = await strapi.entityService.findOne('api::real-estate.real-estate', result.id, {
                populate: ['area']
            });
            const updatedSlug = `${result.slug}-${response.area.name.toLowerCase().replace(/\s+/g, '-')}`;
            await strapi.entityService.update('api::real-estate.real-estate', result.id, {
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
                const response = await strapi.entityService.findOne('api::real-estate.real-estate', id);
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
                    const response = await strapi.entityService.findOne('api::real-estate.real-estate', id, {
                        populate: ['author']
                    });
                    let emailToAddressUser = response.author.email;
                    let listingTypeSlug = response.listing_type === "Rent" ? "property-for-rent" : "property-for-sale";
                    await strapi.plugins['email'].services.email.send({
                        to: emailToAddressUser,
                        subject: 'New Property Listing Live - Chandapura.com',
                        html: `<p>Your Property Listing - <b><a href='https://www.chandapura.com/real-estate/${listingTypeSlug}/${result.slug}?source=${result.id}'>${result.name}</b></a> is Live now.</p>`,
                    });
                }
            }
        }
        catch (error) {
            console.error('Error from afterUpdate:', error);
        }
    },
};