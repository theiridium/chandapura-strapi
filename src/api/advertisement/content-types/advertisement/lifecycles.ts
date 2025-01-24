let beforeUpdate_publish_status = false;
let afterUpdate_publish_status = false;

export default {
    async beforeUpdate(event: any) {
        try {
            const { params } = event;
            if (process.env.APP_ENV === "Production") {
                let id = params.where.id;
                const response = await strapi.entityService.findOne('api::advertisement.advertisement', id);
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
                    const response = await strapi.entityService.findOne('api::advertisement.advertisement', id, {
                        populate: ['author']
                    });
                    let emailToAddressUser = response.author.email;
                    await strapi.plugins['email'].services.email.send({
                        to: emailToAddressUser,
                        subject: 'Advertisement is Live - Chandapura.com',
                        html: `<p>Your Advertisement is now live. Find your banner in homepage of <a href='https://www.chandapura.com'>Chandapura.com</b></a></p>
                        </br><p>If you are unable to find your banner, please contact our support.</p>`,
                    });
                }
            }
        }
        catch (error) {
            console.error('Error from afterUpdate:', error);
        }
    },
};