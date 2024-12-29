import slugify from 'slugify';
let beforeUpdate_publish_status = false;
let afterUpdate_publish_status = false;
let beforeUpdate_slug = "";
let afterUpdate_slug = "";

const CreateSlug = async (id: any) => {
    const response = await strapi.entityService.findOne('api::job-listing.job-listing', id, {
        populate: ['area']
    });
    const slug = slugify(`job vacanncy for ${response.job_title} in ${response.area.name} Bangalore`, { lower: true, strict: true });
    return slug;
}

export default {
    async afterCreate(event: any) {
        try {
            const { result } = event;
            afterUpdate_slug = await CreateSlug(result.id);
            if (beforeUpdate_slug !== afterUpdate_slug) {
                await strapi.entityService.update('api::job-listing.job-listing', result.id, {
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
            const response = await strapi.entityService.findOne('api::job-listing.job-listing', id);
            beforeUpdate_slug = response.slug;
            if (process.env.APP_ENV === "Production") {
                let id = params.where.id;
                const response = await strapi.entityService.findOne('api::job-listing.job-listing', id);
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
                await strapi.entityService.update('api::job-listing.job-listing', result.id, {
                    data: {
                        slug: afterUpdate_slug,
                    },
                });
            }
            if (process.env.APP_ENV === "Production") {
                afterUpdate_publish_status = result.publish_status;
                let id = params.where.id;
                if (beforeUpdate_publish_status === false && afterUpdate_publish_status === true) {
                    const response = await strapi.entityService.findOne('api::job-listing.job-listing', id, {
                        populate: ['author']
                    });
                    let emailToAddressUser = response.author.email;
                    await strapi.plugins['email'].services.email.send({
                        to: emailToAddressUser,
                        subject: 'New Job Posted Live - Chandapura.com',
                        html: `<p>Your Job vacancy for - <b><a href='https://www.chandapura.com/job-vacancy/${response.slug}?source=${result.id}'>${result.name}</b></a> is Live now.</p>`,
                    });
                }
            }
        }
        catch (error) {
            console.error('Error from afterUpdate:', error);
        }
    },
};