export default ({ env }) => ({
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