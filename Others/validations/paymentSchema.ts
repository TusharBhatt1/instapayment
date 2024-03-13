//@ts-nocheck
import * as Yup from 'yup';

export const paymentSchema = Yup.object().shape({
  paymentMode: Yup.string().required('Please select a payment mode'),
  holderName: Yup.string()
  .when('paymentMode', {
    is: (paymentMode) => paymentMode === 'UPI',
    then: Yup.string()
      .matches(/^[a-zA-Z]+$/, 'Should only contain alphabets')
      .min(5)
      .max(25)
      .required('Required')
  }),

  upiAddress: Yup.string().when('paymentMode', {
    is: (paymentMode) => paymentMode === 'UPI',
    then: Yup.string()
      .matches(/^[\w.-]+@[\w.-]+$/, 'Invalid, ex : xyz@sbi')
      .required('Required'),
  }),
 
  cvvNum: Yup.string().when('paymentMode', {
    is: (paymentMode) => paymentMode === 'Cards',
    then: Yup.string().matches(/^\d{3}$/, '3 digits only ').required("Required")
  }),
  //@ts-ignore
  cardNumber: Yup.string().when('paymentMode', {
    is: (paymentMode) => paymentMode === 'Cards',
    then: Yup.string()
      .matches(/^\d{12}$/, '12 digits only ')
      .required('Required'),
  }),
});

export type PaymentSchemaType = Yup.InferType<typeof paymentSchema>;
