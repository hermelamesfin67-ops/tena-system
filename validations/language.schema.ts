import * as Yup from "yup";

export const languageSchema = Yup.object({
  code: Yup.string().max(10).required("Language code is required"),
  name: Yup.string().max(100).required("Language name is required"),
  native_name: Yup.string().max(100).required("Native name is required"),
  is_active: Yup.boolean(),
});

export type languageSchemaType = Yup.InferType<typeof languageSchema>;
