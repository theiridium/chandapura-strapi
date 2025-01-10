import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginSlugifySlug extends Schema.CollectionType {
  collectionName: 'slugs';
  info: {
    singularName: 'slug';
    pluralName: 'slugs';
    displayName: 'slug';
  };
  options: {
    draftAndPublish: false;
    comment: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    slug: Attribute.Text;
    count: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::slugify.slug',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::slugify.slug',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginGoogleMapsConfig extends Schema.SingleType {
  collectionName: 'google_maps_configs';
  info: {
    singularName: 'config';
    pluralName: 'configs';
    displayName: 'Google Maps Config';
  };
  options: {
    populateCreatorFields: false;
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    googleMapsKey: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<''>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::google-maps.config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::google-maps.config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    user_type: Attribute.Enumeration<['Site User', 'Backend User']>;
    phone: Attribute.String;
    phone_alt: Attribute.String;
    firstname: Attribute.String;
    lastname: Attribute.String;
    avatar: Attribute.String;
    business_listings: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::business-listing.business-listing'
    >;
    advertisements: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::advertisement.advertisement'
    >;
    classified_listings: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::classified-listing.classified-listing'
    >;
    job_listings: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::job-listing.job-listing'
    >;
    property_listings: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::property-listing.property-listing'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAdvertisementAdvertisement extends Schema.CollectionType {
  collectionName: 'advertisements';
  info: {
    singularName: 'advertisement';
    pluralName: 'advertisements';
    displayName: 'Advertisement';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    website: Attribute.String;
    author: Attribute.Relation<
      'api::advertisement.advertisement',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    ad_image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    business_listing: Attribute.Relation<
      'api::advertisement.advertisement',
      'oneToOne',
      'api::business-listing.business-listing'
    >;
    publish_status: Attribute.Boolean & Attribute.DefaultTo<false>;
    step_number: Attribute.Integer & Attribute.DefaultTo<0>;
    contact: Attribute.Component<'contact.contact-details'>;
    payment_details: Attribute.Component<'payment.payment'>;
    payment_history: Attribute.Component<'payment.payment', true>;
    slug: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::advertisement.advertisement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::advertisement.advertisement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAdvertisementPricingPlanAdvertisementPricingPlan
  extends Schema.SingleType {
  collectionName: 'advertisement_pricing_plans';
  info: {
    singularName: 'advertisement-pricing-plan';
    pluralName: 'advertisement-pricing-plans';
    displayName: 'Advertisement Pricing Plan';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    monthly: Attribute.Decimal;
    quaterly: Attribute.Decimal;
    yearly: Attribute.Decimal;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::advertisement-pricing-plan.advertisement-pricing-plan',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::advertisement-pricing-plan.advertisement-pricing-plan',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAreaArea extends Schema.CollectionType {
  collectionName: 'areas';
  info: {
    singularName: 'area';
    pluralName: 'areas';
    displayName: 'Area';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::area.area', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::area.area', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiBusinessListingBusinessListing
  extends Schema.CollectionType {
  collectionName: 'business_listings';
  info: {
    singularName: 'business-listing';
    pluralName: 'business-listings';
    displayName: 'Business Listing';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    full_address: Attribute.Text;
    description: Attribute.Text;
    slug: Attribute.Text;
    tags: Attribute.Text;
    sub_category: Attribute.Relation<
      'api::business-listing.business-listing',
      'manyToOne',
      'api::sub-category.sub-category'
    >;
    gallery_images: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    category: Attribute.Relation<
      'api::business-listing.business-listing',
      'manyToOne',
      'api::category.category'
    >;
    website: Attribute.String;
    services: Attribute.JSON;
    featured_image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    bus_hours: Attribute.JSON;
    publish_status: Attribute.Boolean & Attribute.DefaultTo<false>;
    author: Attribute.Relation<
      'api::business-listing.business-listing',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    step_number: Attribute.Integer;
    advertisement: Attribute.Relation<
      'api::business-listing.business-listing',
      'oneToOne',
      'api::advertisement.advertisement'
    >;
    location: Attribute.JSON &
      Attribute.CustomField<'plugin::google-maps.location-picker'>;
    payment_details: Attribute.Component<'payment.payment'>;
    payment_history: Attribute.Component<'payment.payment', true>;
    contact: Attribute.Component<'contact.contact-details'>;
    area: Attribute.Relation<
      'api::business-listing.business-listing',
      'oneToOne',
      'api::area.area'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::business-listing.business-listing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::business-listing.business-listing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBusinessListingPricingPlanBusinessListingPricingPlan
  extends Schema.SingleType {
  collectionName: 'business_listing_pricing_plans';
  info: {
    singularName: 'business-listing-pricing-plan';
    pluralName: 'business-listing-pricing-plans';
    displayName: 'Business Listing Pricing Plan';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    monthly: Attribute.Decimal;
    quaterly: Attribute.Decimal;
    yearly: Attribute.Decimal;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::business-listing-pricing-plan.business-listing-pricing-plan',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::business-listing-pricing-plan.business-listing-pricing-plan',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'Business Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    sub_categories: Attribute.Relation<
      'api::category.category',
      'oneToMany',
      'api::sub-category.sub-category'
    >;
    slug: Attribute.UID<'api::category.category', 'name'>;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    business_listings: Attribute.Relation<
      'api::category.category',
      'oneToMany',
      'api::business-listing.business-listing'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiClassifiedCategoryClassifiedCategory
  extends Schema.CollectionType {
  collectionName: 'classified_categories';
  info: {
    singularName: 'classified-category';
    pluralName: 'classified-categories';
    displayName: 'Classified Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    classified_listings: Attribute.Relation<
      'api::classified-category.classified-category',
      'oneToMany',
      'api::classified-listing.classified-listing'
    >;
    slug: Attribute.UID<'api::classified-category.classified-category', 'name'>;
    sub_category: Attribute.Enumeration<['classified.vehicle-details']>;
    image: Attribute.Media<'images'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::classified-category.classified-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::classified-category.classified-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiClassifiedListingClassifiedListing
  extends Schema.CollectionType {
  collectionName: 'classified_listings';
  info: {
    singularName: 'classified-listing';
    pluralName: 'classified-listings';
    displayName: 'Classified Listing';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    slug: Attribute.Text;
    author: Attribute.Relation<
      'api::classified-listing.classified-listing',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    payment_details: Attribute.Component<'payment.payment'>;
    payment_history: Attribute.Component<'payment.payment', true>;
    contact: Attribute.Component<'contact.contact-details'>;
    featured_image: Attribute.Media<'images'>;
    gallery_images: Attribute.Media<'images', true>;
    sale_amount: Attribute.Decimal;
    category: Attribute.Relation<
      'api::classified-listing.classified-listing',
      'manyToOne',
      'api::classified-category.classified-category'
    >;
    area: Attribute.Relation<
      'api::classified-listing.classified-listing',
      'oneToOne',
      'api::area.area'
    >;
    description: Attribute.Text;
    step_number: Attribute.Integer;
    publish_status: Attribute.Boolean & Attribute.DefaultTo<false>;
    ownership_history: Attribute.Integer;
    year_of_purchase: Attribute.String;
    details_by_category: Attribute.DynamicZone<['classified.vehicle-details']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::classified-listing.classified-listing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::classified-listing.classified-listing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiJobListingJobListing extends Schema.CollectionType {
  collectionName: 'job_listings';
  info: {
    singularName: 'job-listing';
    pluralName: 'job-listings';
    displayName: 'Job Listing';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    publish_status: Attribute.Boolean & Attribute.DefaultTo<false>;
    step_number: Attribute.Integer;
    slug: Attribute.Text;
    author: Attribute.Relation<
      'api::job-listing.job-listing',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    area: Attribute.Relation<
      'api::job-listing.job-listing',
      'oneToOne',
      'api::area.area'
    >;
    logo_image: Attribute.Media<'images'>;
    contact: Attribute.Component<'contact.contact-details'>;
    payment_details: Attribute.Component<'payment.payment'>;
    payment_history: Attribute.Component<'payment.payment', true>;
    preferred_languages: Attribute.Relation<
      'api::job-listing.job-listing',
      'oneToMany',
      'api::language.language'
    >;
    details_by_jobCategory: Attribute.DynamicZone<
      ['job.personal-job-details', 'job.corporate-job-details']
    >;
    category: Attribute.Enumeration<['Corporate', 'Personal']>;
    job_title: Attribute.String;
    gender: Attribute.Enumeration<['Male only', 'Female only', 'Any gender']>;
    full_address: Attribute.Text;
    job_description: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::job-listing.job-listing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::job-listing.job-listing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiJobTitleJobTitle extends Schema.CollectionType {
  collectionName: 'job_titles';
  info: {
    singularName: 'job-title';
    pluralName: 'job-titles';
    displayName: 'Job Title';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    company: Attribute.Boolean & Attribute.DefaultTo<false>;
    personal: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::job-title.job-title',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::job-title.job-title',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLanguageLanguage extends Schema.CollectionType {
  collectionName: 'languages';
  info: {
    singularName: 'language';
    pluralName: 'languages';
    displayName: 'Language';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::language.language',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::language.language',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPgAmenityPgAmenity extends Schema.CollectionType {
  collectionName: 'pg_amenities';
  info: {
    singularName: 'pg-amenity';
    pluralName: 'pg-amenities';
    displayName: 'PG Amenity';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::pg-amenity.pg-amenity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::pg-amenity.pg-amenity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPlotAmenityPlotAmenity extends Schema.CollectionType {
  collectionName: 'plot_amenities';
  info: {
    singularName: 'plot-amenity';
    pluralName: 'plot-amenities';
    displayName: 'Plot Amenity';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::plot-amenity.plot-amenity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::plot-amenity.plot-amenity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPropertyListingPropertyListing
  extends Schema.CollectionType {
  collectionName: 'property_listings';
  info: {
    singularName: 'property-listing';
    pluralName: 'property-listings';
    displayName: 'Property Listing';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    publish_status: Attribute.Boolean & Attribute.DefaultTo<false>;
    author: Attribute.Relation<
      'api::property-listing.property-listing',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    description: Attribute.Text;
    step_number: Attribute.Integer;
    location: Attribute.JSON &
      Attribute.CustomField<'plugin::google-maps.location-picker'>;
    area: Attribute.Relation<
      'api::property-listing.property-listing',
      'oneToOne',
      'api::area.area'
    >;
    full_address: Attribute.Text;
    listing_type: Attribute.Enumeration<['Rent', 'Sale', 'PG']>;
    property_type: Attribute.Enumeration<
      ['Apartment', 'Individual House', 'Villa', 'PG', 'Plot']
    >;
    featured_image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    gallery_images: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    details_by_listingtype: Attribute.DynamicZone<
      [
        'real-estate.rent-property-details',
        'real-estate.sale-property-details',
        'real-estate.pg-details',
        'real-estate.plot-details'
      ]
    >;
    contact: Attribute.Component<'contact.contact-details'>;
    payment_details: Attribute.Component<'payment.payment'>;
    payment_history: Attribute.Component<'payment.payment', true>;
    slug: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::property-listing.property-listing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::property-listing.property-listing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRealEstateAmenityRealEstateAmenity
  extends Schema.CollectionType {
  collectionName: 'real_estate_amenities';
  info: {
    singularName: 'real-estate-amenity';
    pluralName: 'real-estate-amenities';
    displayName: 'Real Estate Amenity';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::real-estate-amenity.real-estate-amenity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::real-estate-amenity.real-estate-amenity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRealEstatePricingPlanRealEstatePricingPlan
  extends Schema.SingleType {
  collectionName: 'real_estate_pricing_plans';
  info: {
    singularName: 'real-estate-pricing-plan';
    pluralName: 'real-estate-pricing-plans';
    displayName: 'Real Estate Pricing Plan';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Rent: Attribute.Component<'real-estate.pricing-plan', true>;
    Sale: Attribute.Component<'real-estate.pricing-plan', true>;
    PG: Attribute.Component<'real-estate.pricing-plan', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::real-estate-pricing-plan.real-estate-pricing-plan',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::real-estate-pricing-plan.real-estate-pricing-plan',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSubCategorySubCategory extends Schema.CollectionType {
  collectionName: 'sub_categories';
  info: {
    singularName: 'sub-category';
    pluralName: 'sub-categories';
    displayName: 'Sub-Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    pricing: Attribute.Integer;
    category: Attribute.Relation<
      'api::sub-category.sub-category',
      'manyToOne',
      'api::category.category'
    >;
    slug: Attribute.UID<'api::sub-category.sub-category', 'name'>;
    business_listings: Attribute.Relation<
      'api::sub-category.sub-category',
      'oneToMany',
      'api::business-listing.business-listing'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sub-category.sub-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sub-category.sub-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::slugify.slug': PluginSlugifySlug;
      'plugin::google-maps.config': PluginGoogleMapsConfig;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::advertisement.advertisement': ApiAdvertisementAdvertisement;
      'api::advertisement-pricing-plan.advertisement-pricing-plan': ApiAdvertisementPricingPlanAdvertisementPricingPlan;
      'api::area.area': ApiAreaArea;
      'api::business-listing.business-listing': ApiBusinessListingBusinessListing;
      'api::business-listing-pricing-plan.business-listing-pricing-plan': ApiBusinessListingPricingPlanBusinessListingPricingPlan;
      'api::category.category': ApiCategoryCategory;
      'api::classified-category.classified-category': ApiClassifiedCategoryClassifiedCategory;
      'api::classified-listing.classified-listing': ApiClassifiedListingClassifiedListing;
      'api::job-listing.job-listing': ApiJobListingJobListing;
      'api::job-title.job-title': ApiJobTitleJobTitle;
      'api::language.language': ApiLanguageLanguage;
      'api::pg-amenity.pg-amenity': ApiPgAmenityPgAmenity;
      'api::plot-amenity.plot-amenity': ApiPlotAmenityPlotAmenity;
      'api::property-listing.property-listing': ApiPropertyListingPropertyListing;
      'api::real-estate-amenity.real-estate-amenity': ApiRealEstateAmenityRealEstateAmenity;
      'api::real-estate-pricing-plan.real-estate-pricing-plan': ApiRealEstatePricingPlanRealEstatePricingPlan;
      'api::sub-category.sub-category': ApiSubCategorySubCategory;
    }
  }
}
