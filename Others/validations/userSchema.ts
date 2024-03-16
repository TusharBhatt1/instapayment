import * as yup from "yup";
export const userSchema = yup
  .object({
    name: yup
      .string()
      .min(5)
      .max(30)
      .required()
      .matches(/^[a-zA-Z]+$/, "Name must only contain alphabets."),
    email: yup.string().email().required(),
    address: yup.string().min(10).max(50).required(),
    contact: yup
      .string()
      .matches(
        /^[7-9][0-9]+$/,
        "Invalid Number must start 7,8 or 9 and should only contain digits"
      )
      .min(10, "Contact number must be 10 digits")
      .max(10, "Contact number must be 10 digits")
      .required("Contact number is required"),
  })
  .required();

export type UserSchemaType = yup.InferType<typeof userSchema>;
