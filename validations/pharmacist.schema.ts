import * as Yup from "yup";

export const pharmacistSchema = Yup.object({
  username: Yup.string().max(10).required("Username is required"),
  email: Yup.string().max(100).required("Email is required"),
  password: Yup.string().max(100).required("Password is required"),
});

export type PharmacistSchemaType = Yup.InferType<typeof pharmacistSchema>;
