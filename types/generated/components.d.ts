import type { Schema, Attribute } from '@strapi/strapi';

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

export interface PaymentPayment extends Schema.Component {
  collectionName: 'components_payment_payments';
  info: {
    displayName: 'Payment Details';
    description: '';
  };
  attributes: {
    purchase_date: Attribute.DateTime;
    isPaymentSuccess: Attribute.Boolean & Attribute.DefaultTo<false>;
    expiry_date: Attribute.DateTime;
    raz_order_id: Attribute.String;
    raz_payment_id: Attribute.String;
    amount: Attribute.Decimal;
    isOfferApplied: Attribute.Boolean & Attribute.DefaultTo<false>;
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

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'real-estate.real-estate': RealEstateRealEstate;
      'payment.payment': PaymentPayment;
      'contact.contact-details': ContactContactDetails;
    }
  }
}
