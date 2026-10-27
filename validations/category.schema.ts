import * as Yup from "yup";

export const categorySchema = Yup.object({
  slug: Yup.string().max(100).required("Category name is required"),
});

export const singleTranslationSchema = Yup.object({
  name: Yup.string().required("Display name is required"),
  description: Yup.string().required("Description is required"),
});

export type CategorySchemaType = Yup.InferType<typeof categorySchema>;
