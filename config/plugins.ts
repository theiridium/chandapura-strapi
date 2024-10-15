export default ({ env }) => ({
    email: {
        config: {
            provider: 'sendmail',
            providerOptions: {
                dkim: {
                  privateKey: env('DKIM_PRIVATE_KEY'),
                  keySelector: 'iridium', // the same as the one set in DNS txt record, use online dns lookup tools to be sure that is retreivable
                },
                secure: true,
              },
            settings: {
                defaultFrom: 'no-reply@chandapura.com',
                defaultReplyTo: 'priyankastro7@gmail.com',
            },
        },
    },
    upload: {
        config: {
            provider: 'cloudinary',
            providerOptions: {
                cloud_name: env('CLOUDINARY_NAME'),
                api_key: env('CLOUDINARY_KEY'),
                api_secret: env('CLOUDINARY_SECRET'),
            },
            actionOptions: {
                upload: {},
                uploadStream: { folder: env('CLOUDINARY_FOLDER') },
                delete: {},
            },
        },
    },
    slugify: {
        enabled: true,
        config: {
            contentTypes: {
                property: {
                    field: 'slug',
                    references: ['name', 'type', 'carpet_area'],
                },
                'real-estate': {
                    field: 'slug',
                    references: ['name', 'type', 'rooms', 'listing_type', 'area'],
                },
                'business-listing': {
                    field: 'slug',
                    references: ['name', 'area'],
                }
            },
        },
    },
    'transformer': {
        enabled: true,
        config: {
            responseTransforms: {
                removeAttributesKey: true,
                removeDataKey: true,
            },
        }
    },
});