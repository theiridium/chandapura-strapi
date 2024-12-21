export default ({ env }) => ({
    meilisearch: {
        config: {
            'property-listing': {
                entriesQuery: {
                    populate: ['details_by_listingtype.amenities', 'payment_details', 'featured_image', 'contact', 'area'],
                },
                settings: {
                    filterableAttributes: ["publish_status", "payment_details", "listing_type"]
                },
            },
        }
    },
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
        shouldUpdateSlug: true,
        skipUndefinedReferences: true,
        config: {
            contentTypes: {
                'real-estate': {
                    field: 'slug',
                    references: ['name', 'property_type', 'room_type', 'listing_type'],
                },
                // 'property-listing': {
                //     field: 'slug',
                //     references: ['name'],
                // },
                'business-listing': {
                    field: 'slug',
                    references: ['name'],
                },
                'classified-listing': {
                    field: 'slug',
                    references: ['name'],
                },
                'job-listing': {
                    field: 'slug',
                    references: ['company_name', 'job_role', 'id'],
                },
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