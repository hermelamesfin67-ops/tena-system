import * as Yup from "yup";

export const rejectionSchema = Yup.object({
  reason: Yup.string().min(5, "Allowed minimum rejection should be 5 characters").required("Rejection reason is required"),
});


export type RejectionSchemaType = Yup.InferType<typeof rejectionSchema>;
