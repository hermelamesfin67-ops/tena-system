import {
    DialogFooter,
} from "@/components/ui/dialog"
import { Formik, Form, Field, ErrorMessage } from "formik";
import useDynamicMutation from "@/api/use-post-data";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/api/query-keys";
import ModalHeader from "@/components/modal-header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
    translation: MedicineWarningTranslation
}

function MedicineWarningTranslationUpdateForm({ translation }: Props) {
    const router = useRouter()
    const queryClient = useQueryClient()
    const postMutation = useDynamicMutation({ type: "Json" })

    const initialTranslations: MedicineWarningTranslation = {
        id: translation?.id,
        warning: translation?.warning,
        language: translation?.language,
        language_code: translation?.language_code,
        title: translation?.title,
        description: translation?.description,
        recommended_action: translation?.recommended_action,
        rejection_reason: translation?.rejection_reason,
        reviewed_by: translation?.reviewed_by,
        reviewed_at: translation?.reviewed_at,
        updated_at: translation?.updated_at,
        review_status: translation?.review_status,
    }

    const handleLanguageTranslation = async (values: MedicineWarningTranslation | null) => {
        try {
            await postMutation.mutateAsync({
                url: `drug-warning-translations/${values?.id}/`,
                method: "PATCH",
                body: {
                    warning: values?.warning,
                    language: values?.language,
                    title: values?.title,
                    description: values?.description,
                    recommended_action: values?.recommended_action,
                },
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: [queryKeys.getAllMedicineWarning],
                    })
                    toast.success("Translation submitted successfully!");
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="col-span-full md:col-span-3 w-full">
            <Formik
                initialValues={initialTranslations}
                onSubmit={(val) => handleLanguageTranslation(val)}
                enableReinitialize
            >
                {({ }) => {
                    return (
                        <Form className="flex flex-col gap-5">
                            <div className="flex flex-col gap-5 border border-black/10 rounded-md p-3">
                                <ModalHeader
                                    title="Warning Translations"
                                    description="Core information about the medicine."
                                />

                                <div className="grid grid-cols-1 gap-4">
                                    {(
                                        [
                                            ["title", "Title"],
                                            ["description", "Description"],
                                            ["recommended_action", "Recommended Action"],
                                        ] as const
                                    ).map(([field, label]) => {
                                        const isLongText = field !== "title"

                                        return (
                                            <div key={field} className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor={field}
                                                    className="text-sm font-medium"
                                                >
                                                    {label}
                                                </label>

                                                {isLongText ? (
                                                    <Field
                                                        as="textarea"
                                                        id={field}
                                                        name={`${field}`}
                                                        rows={3}
                                                        placeholder={`Enter ${label.toLowerCase()}`}
                                                        className="w-full rounded-md border border-slate-200 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                                                    />
                                                ) : (
                                                    <Field
                                                        id={field}
                                                        name={`${field}`}
                                                        placeholder={`Enter ${label.toLowerCase()}`}
                                                        className="w-full rounded-md border border-slate-200 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                                                    />
                                                )}

                                                <ErrorMessage
                                                    name={`${field}`}
                                                    component="p"
                                                    className="text-xs text-red-500"
                                                />
                                            </div>
                                        );
                                    })}

                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            htmlFor="review_status"
                                            className="text-sm font-medium"
                                        >
                                            Review Status
                                        </label>

                                        <Field
                                            as="select"
                                            id="review_status"
                                            disabled
                                            name={`review_status`}
                                            className="w-full rounded-md border border-slate-200 bg-white p-3 text-sm"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="reviewed">Reviewed</option>
                                            <option value="published">Published</option>
                                        </Field>
                                    </div>
                                </div>

                                <DialogFooter className="sm:justify-end">
                                    <Button onClick={() => router.back()} variant={"outline"}>Back</Button>
                                    <Button type="submit" disabled={postMutation.isPending}>
                                        {postMutation.isPending ? "Loading.." : "Update"}
                                    </Button>
                                </DialogFooter>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    )
}

export default MedicineWarningTranslationUpdateForm