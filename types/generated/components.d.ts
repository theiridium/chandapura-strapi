import type { Schema, Attribute } from '@strapi/strapi';

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
      'payment.payment': PaymentPayment;
    }
  }
}
