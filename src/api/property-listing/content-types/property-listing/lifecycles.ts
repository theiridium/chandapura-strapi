import slugify from 'slugify';
let beforeUpdate_publish_status = false;
let afterUpdate_publish_status = false;
let beforeUpdate_slug = "";
let afterUpdate_slug = "";

const CreateSlug = async (id: any) => {
    let slug = "";
    const response = await strapi.entityService.findOne('api::property-listing.property-listing', id, {
        populate: ['area', 'details_by_listingtype']
    });
    switch (response.property_type) {
        case "PG":
            slug = slugify(`${response.property_type} in ${response.area.name} Bangalore`, { lower: true, strict: true });
            break;

        case "Plot":
            slug = slugify(`${response.name} ${response.property_type} for sale in ${response.area.name} Bangalore`, { lower: true, strict: true });
            break;

        default:
            let room_type = "";
            if (response.listing_type == "Rent") room_type = response.details_by_listingtype.find(x => x.__component == "real-estate.rent-property-details")["room_type"];
            else room_type = response.details_by_listingtype.find(x => x.__component == "real-estate.sale-property-details")["room_type"];
            slug = slugify(`${response.name} ${room_type} ${response.property_type} for ${response.listing_type} in ${response.area.name} Bangalore`, { lower: true, strict: true });
            break;
    }
    return slug;
}

export default {
    async afterCreate(event: any) {
        try {
            const { result } = event;
            afterUpdate_slug = await CreateSlug(result.id);
            if (beforeUpdate_slug !== afterUpdate_slug) {
                await strapi.entityService.update('api::property-listing.property-listing', result.id, {
                    data: {
                        slug: afterUpdate_slug,
                    },
                });
            }
        }
        catch (error) {
            console.error('Error from afterCreate:', error);
        }

    },
    async beforeUpdate(event: any) {
        try {
            const { params } = event;
            let id = params.where.id;
            const response = await strapi.entityService.findOne('api::property-listing.property-listing', id);
            beforeUpdate_slug = response.slug;
            if (process.env.APP_ENV === "Production") {
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
            afterUpdate_slug = await CreateSlug(result.id);
            if (beforeUpdate_slug !== afterUpdate_slug) {
                await strapi.entityService.update('api::property-listing.property-listing', result.id, {
                    data: {
                        slug: afterUpdate_slug,
                    },
                });
            }
            if (process.env.APP_ENV === "Production") {
                afterUpdate_publish_status = result.publish_status;
                let id = params.where.id;
                if (beforeUpdate_publish_status === false && afterUpdate_publish_status === true) {
                    const response = await strapi.entityService.findOne('api::property-listing.property-listing', id, {
                        populate: ['author']
                    });
                    let emailToAddressUser = response.author.email;
                    let listingTypeSlug = response.listing_type === "Rent" ? "property-for-rent" : "property-for-sale";
                    await strapi.plugins['email'].services.email.send({
                        to: emailToAddressUser,
                        subject: 'New Property Listing Live - Chandapura.com',
                        html: `<p>Your Property Listing - <b><a href='https://www.chandapura.com/property-listing/${listingTypeSlug}/${result.slug}?source=${result.id}'>${result.name}</b></a> is Live now.</p>`,
                    });
                }
            }
        }
        catch (error) {
            console.error('Error from afterUpdate:', error);
        }
    },
};