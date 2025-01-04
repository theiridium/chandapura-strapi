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
            'job-listing': {
                settings: {
                    filterableAttributes: ["publish_status", "work_mode", "job_type", "area"]
                },
            },
            'business-listing': {
                settings: {
                    filterableAttributes: ["publish_status", "payment_details", "sub_category"],
                    sortableAttributes: ["id", "createdAt", "updatedAt", "name"]
                },
            },
        }
    },
    email: {
        config: {
            provider: 'sendgrid',
            providerOptions: {
                apiKey: env('SENDGRID_API_KEY'),
            },
            settings: {
                defaultFrom: env('SENDGRID_DEFAULT_FROM'),
                defaultReplyTo: env('SENDGRID_DEFAULT_TO'),
                defaultName: "Chandapura Notifications"
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
                'advertisement': {
                    field: 'slug',
                    references: ['name'],
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