import type { Schema, Attribute } from '@strapi/strapi';

export interface RealEstateSalePropertyDetails extends Schema.Component {
  collectionName: 'components_real_estate_sale_property_details';
  info: {
    displayName: 'Sale Property Details';
    description: '';
  };
  attributes: {
    bathrooms: Attribute.Integer;
    direction: Attribute.Enumeration<
      [
        'East',
        'West',
        'North',
        'South',
        'North-East',
        'South-East',
        'North-West',
        'South-West'
      ]
    >;
    floor_number: Attribute.Integer;
    total_floors: Attribute.Integer;
    carpet_area: Attribute.Decimal;
    parking_type: Attribute.Enumeration<['Open', 'Covered']>;
    furnishing: Attribute.Enumeration<
      ['Semi Furnished', 'Fully Furnished', 'Non Furnished']
    >;
    selling_amount: Attribute.Decimal;
    amenities: Attribute.Relation<
      'real-estate.sale-property-details',
      'oneToMany',
      'api::real-estate-amenity.real-estate-amenity'
    >;
    room_type: Attribute.String;
  };
}

export interface RealEstateRentPropertyDetails extends Schema.Component {
  collectionName: 'components_real_estate_rent_property_details';
  info: {
    displayName: 'Rent Property Details';
    description: '';
  };
  attributes: {
    bathrooms: Attribute.Integer;
    direction: Attribute.Enumeration<
      [
        'East',
        'West',
        'North',
        'South',
        'North-East',
        'South-East',
        'North-West',
        'South-West'
      ]
    >;
    floor_number: Attribute.Integer;
    total_floors: Attribute.Integer;
    carpet_area: Attribute.Decimal;
    parking_type: Attribute.Enumeration<['Open', 'Covered']>;
    furnishing: Attribute.Enumeration<
      ['Semi Furnished', 'Fully Furnished', 'Non Furnished']
    >;
    rental_amount: Attribute.Decimal;
    deposit_amount: Attribute.Decimal;
    amenities: Attribute.Relation<
      'real-estate.rent-property-details',
      'oneToMany',
      'api::real-estate-amenity.real-estate-amenity'
    >;
    room_type: Attribute.String;
  };
}

export interface RealEstateRealEstate extends Schema.Component {
  collectionName: 'components_real_estate_real_estates';
  info: {
    displayName: 'Property Details';
    description: '';
  };
  attributes: {
    bathrooms: Attribute.Integer;
    direction: Attribute.Enumeration<
      [
        'East',
        'West',
        'North',
        'South',
        'North-East',
        'South-East',
        'North-West',
        'South-West'
      ]
    >;
    floor_number: Attribute.Integer;
    total_floors: Attribute.Integer;
    carpet_area: Attribute.Decimal;
    parking_type: Attribute.Enumeration<['Open', 'Covered']>;
    landmark: Attribute.String;
    rental_amount: Attribute.Integer;
    selling_amount: Attribute.Integer;
    deposit_amount: Attribute.Integer;
    furnishing: Attribute.Enumeration<
      ['Semi Furnished', 'Fully Furnished', 'Non Furnished']
    >;
  };
}

export interface RealEstatePricingPlan extends Schema.Component {
  collectionName: 'components_real_estate_pricing_plans';
  info: {
    displayName: 'Pricing Plan';
  };
  attributes: {
    type: Attribute.String;
    amount: Attribute.Decimal;
  };
}

export interface RealEstatePlotDetails extends Schema.Component {
  collectionName: 'components_real_estate_plot_details';
  info: {
    displayName: 'Plot Details';
  };
  attributes: {
    dimension: Attribute.Decimal;
    direction: Attribute.Enumeration<
      [
        'East',
        'West',
        'North',
        'South',
        'North-East',
        'South-East',
        'North-West',
        'South-West'
      ]
    >;
  };
}

export interface RealEstatePgRoomType extends Schema.Component {
  collectionName: 'components_real_estate_pg_room_types';
  info: {
    displayName: 'PG Occupancy Type';
    description: '';
  };
  attributes: {
    single_room: Attribute.Decimal;
    twin_sharing: Attribute.Decimal;
    triple_sharing: Attribute.Decimal;
    four_sharing: Attribute.Decimal;
  };
}

export interface RealEstatePgDetails extends Schema.Component {
  collectionName: 'components_real_estate_pg_details';
  info: {
    displayName: 'PG Details';
    description: '';
  };
  attributes: {
    amenities: Attribute.Relation<
      'real-estate.pg-details',
      'oneToMany',
      'api::pg-amenity.pg-amenity'
    >;
    occupancy_type: Attribute.Component<'real-estate.pg-room-type'>;
  };
}

export interface ContactContactDetails extends Schema.Component {
  collectionName: 'components_contact_contact_details';
  info: {
    displayName: 'Contact Details';
    description: '';
  };
  attributes: {
    contact_name: Attribute.String;
    contact_number: Attribute.String;
    contact_email_id: Attribute.Email;
  };
}

export interface PaymentPayment extends Schema.Component {
  collectionName: 'components_payment_payments';
  info: {
    displayName: 'Payment Details';
    description: '';
  };
  options: {
    timestamps: true;
  };
  attributes: {
    purchase_date: Attribute.DateTime;
    isPaymentSuccess: Attribute.Boolean & Attribute.DefaultTo<false>;
    expiry_date: Attribute.DateTime;
    raz_order_id: Attribute.String & Attribute.Private;
    raz_payment_id: Attribute.String & Attribute.Private;
    amount: Attribute.Decimal;
    isOfferApplied: Attribute.Boolean & Attribute.DefaultTo<false>;
    expiry_date_timestamp: Attribute.Decimal;
  };
}

export interface ClassifiedVehicleDetails extends Schema.Component {
  collectionName: 'components_classified_vehicle_details';
  info: {
    displayName: 'Vehicle Details';
    description: '';
  };
  attributes: {
    fuel_type: Attribute.Enumeration<
      ['Petrol', 'Diesel', 'Electric', 'CNG', 'Hybrid']
    >;
    model_name: Attribute.String;
    transmission: Attribute.Enumeration<['Manual', 'Automatic']>;
    kms_driven: Attribute.BigInteger;
    year_of_manufacture: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'real-estate.sale-property-details': RealEstateSalePropertyDetails;
      'real-estate.rent-property-details': RealEstateRentPropertyDetails;
      'real-estate.real-estate': RealEstateRealEstate;
      'real-estate.pricing-plan': RealEstatePricingPlan;
      'real-estate.plot-details': RealEstatePlotDetails;
      'real-estate.pg-room-type': RealEstatePgRoomType;
      'real-estate.pg-details': RealEstatePgDetails;
      'contact.contact-details': ContactContactDetails;
      'payment.payment': PaymentPayment;
      'classified.vehicle-details': ClassifiedVehicleDetails;
    }
  }
}
