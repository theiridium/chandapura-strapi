import type { Schema, Attribute } from '@strapi/strapi';

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

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'contact.contact-details': ContactContactDetails;
      'payment.payment': PaymentPayment;
    }
  }
}
