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

export type MedicineSchemaType = Yup.InferType<typeof medicineSchema>;
export type MedicineTranslationSchemaType = Yup.InferType<
  typeof medicineTranslationSchema
>;
