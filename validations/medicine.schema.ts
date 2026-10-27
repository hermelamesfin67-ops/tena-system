import * as Yup from "yup";

export const medicineSchema = Yup.object({
  generic_name: Yup.string().max(255).required("Generic name is required"),
  brand_name: Yup.string().max(255),
  strength: Yup.string().max(100),
  dosage_form: Yup.string().max(100),
  categories: Yup.array().of(Yup.string()),
});

export const medicineTranslationSchema = Yup.object({
  language: Yup.string().required("Select a language"),
  display_name: Yup.string().max(255).required("Display name is required"),
});

export const singleTranslationSchema = Yup.object({
  display_name: Yup.string().required("Display name is required"),
  short_description: Yup.string().required("Short description is required"),
  what_it_treats: Yup.string().required("This field is required"),
  how_to_use: Yup.string().required("This field is required"),
  when_to_use: Yup.string().required("This field is required"),
  side_effects: Yup.string().required("This field is required"),
  warnings: Yup.string().required("This field is required"),
  storage_instructions: Yup.string().required("This field is required"),
  review_status: Yup.string()
    .oneOf(["draft", "reviewed", "published"])
    .required("Review status is required"),
});

export type MedicineSchemaType = Yup.InferType<typeof medicineSchema>;
export type SingleTranslationSchemaType = Yup.InferType<typeof singleTranslationSchema>;
export type MedicineTranslationSchemaType = Yup.InferType<
  typeof medicineTranslationSchema
>;
