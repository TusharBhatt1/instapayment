import * as yup from "yup";

export const phoneSchema = yup
  .object({
    contact: yup
      .string()
      .matches(/^[7-9][0-9]+$/, "Invalid Number must start 7, 8 or 9")
      .min(10, "Contact number must be 10 digits")
      .max(10, "Contact number must be 10 digits")
      .required("Contact number is required")
  })
  .required();

export type phoneSchemaType = yup.InferType<typeof phoneSchema>;
