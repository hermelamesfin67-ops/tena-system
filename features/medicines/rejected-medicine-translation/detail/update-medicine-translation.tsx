"use client"
import { Formik, Form, Field, ErrorMessage } from "formik";
import useDynamicMutation from "@/api/use-post-data";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/api/query-keys";
import ModalHeader from "@/components/modal-header";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
    translation: MedicineTranslation
}

function MedicineTranslationUpdateForm({ translation }: Props) {
    const router = useRouter()
    const queryClient = useQueryClient()
    const postMutation = useDynamicMutation({ type: "Json" })

    const initialTranslations: MedicineTranslation = {
        id: translation?.id,
        language: {
            id: translation.id,
            code: translation.language_code,
        } as Language,
        language_code: translation?.language_code,
        display_name: translation?.display_name,
        short_description: translation?.short_description,
        what_it_treats: translation?.what_it_treats,
        how_to_use: translation?.how_to_use,
        when_to_use: translation?.when_to_use,
        side_effects: translation?.side_effects,
        storage_instructions: translation?.storage_instructions,
        rejection_reason: translation?.rejection_reason,
        updated_at: translation?.updated_at,
        review_status: translation?.review_status,
    }

    const handleLanguageTranslation = async (values: MedicineTranslation | null) => {

        try {
            await postMutation.mutateAsync({
                url: `drug-translations/${values?.id}/`,
                method: "PATCH",
                body: {
                    language: values?.language?.id,
                    display_name: values?.display_name,
                    short_description: values?.short_description,
                    what_it_treats: values?.what_it_treats,
                    how_to_use: values?.how_to_use,
                    when_to_use: values?.when_to_use,
                    side_effects: values?.side_effects,
                    storage_instructions: values?.storage_instructions
                },
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: [queryKeys.getAllMedicine],
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
            >
                {({ }) => {
                    return (
                        <Form className="flex flex-col gap-5">
                            <div className="flex flex-col gap-5 border border-black/10 rounded-md p-3">
                                <ModalHeader
                                    title="Medicine Translations"
                                    description="Core information about the medicine."
                                />
                                <div className="grid grid-cols-1 gap-4">
                                    {(
                                        [
                                            ["display_name", "Display Name"],
                                            ["short_description", "Short Description"],
                                            ["what_it_treats", "What It Treats"],
                                            ["how_to_use", "How to Use"],
                                            ["when_to_use", "When to Use"],
                                            ["side_effects", "Side Effects"],
                                            [
                                                "storage_instructions",
                                                "Storage Instructions",
                                            ],
                                        ] as const
                                    ).map(([field, label]) => {
                                        const isLongText = field !== "display_name"

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

export default MedicineTranslationUpdateForm