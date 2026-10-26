import * as Yup from "yup";

export const signInSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export type SignInSchemaType = Yup.InferType<typeof signInSchema>;
