export default ({ env }) => ({
    meilisearch: {
        config: {
            'property-listing': {
                entriesQuery: {
                    populate: ['details_by_listingtype.amenities', 'details_by_listingtype.occupancy_type', 'payment_details', 'featured_image', 'contact', 'area'],
                },
                settings: {
                    filterableAttributes: ["publish_status", "payment_details", "listing_type", "property_type", "area", "isUnlisted"],
                    sortableAttributes: ["id", "createdAt", "updatedAt", "name"]
                },
            },
            'job-listing': {
                settings: {
                    filterableAttributes: ["publish_status", "area", "category", "isUnlisted"],
                    sortableAttributes: ["id", "createdAt", "updatedAt", "name"]
                },
            },
            'classified-listing': {
                settings: {
                    filterableAttributes: ["publish_status", "category", "area", "isUnlisted"],
                    sortableAttributes: ["id", "createdAt", "updatedAt", "name"]
                },
            },
            'business-listing': {
                settings: {
                    filterableAttributes: ["publish_status", "payment_details", "category", "sub_category", "area"],
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