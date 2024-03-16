import * as yup from "yup";
export const userSchema = yup
  .object({
    name: yup
      .string()
      .min(5)
      .max(30)
      .required()
      .matches(/^[a-zA-Z\s]+$/, 'Name must only contain alphabets and spaces.'),
    email: yup.string().email().required(),
    address: yup.string()
    .min(10, 'Address must be at least 10 characters long.')
    .max(50, 'Address cannot exceed 50 characters.')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Address can only contain letters and numbers.'),
    contact: yup
      .string()
      .matches(
        /^[7-9][0-9]+$/,
        "Invalid , must start with a 7/8/9 and should only contain digits"
      )
      .min(10, "Contact number must be 10 digits")
      .max(10, "Contact number must be 10 digits")
      .required("Contact number is required"),
  })
  .required();

export type UserSchemaType = yup.InferType<typeof userSchema>;
