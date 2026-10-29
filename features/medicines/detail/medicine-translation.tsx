import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { singleTranslationSchema } from "@/validations/medicine.schema";
import * as Yup from "yup";
import { AddLanguage, AddLanguageForm } from "./add-language";
import useDynamicMutation from "@/api/use-post-data";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { queryKeys } from "@/api/query-keys";
import ModalHeader from "@/components/modal-header";
import Loader from "@/components/loader";

type TranslationFormValues = {
    translations: MedicineTranslation[];
};

type Props = {
    medicineId: string
    languageFetching: boolean
    mergedLanguages: AddLanguage[]
    translations: MedicineTranslation[]
    setAddLanguage: (arg: AddLanguage[]) => void
}

function MedicineTranslationForm({ medicineId, translations, languageFetching, mergedLanguages, setAddLanguage }: Props) {
    const queryClient = useQueryClient()
    const postMutation = useDynamicMutation({ type: "Json" })
    const [open, setOpen] = useState(false);

    const uniqueLanguages = Array.from(
        new Map(
            (mergedLanguages ?? [])?.map((lang) => [
                lang.language_code,
                lang,
            ])
        ).values()
    );
    const [language, setLanguage] = useState(uniqueLanguages?.length ? uniqueLanguages[0]?.language_code : "");

    const initialTranslations: MedicineTranslation[] = uniqueLanguages?.map(
        (lang) => {
            const existingTranslation = (translations ?? [])?.find(
                (translation) =>
                    translation.language_code === lang.language_code ||
                    (
                        typeof translation.language === "object" &&
                        translation.language?.code === lang.language_code
                    )
            );

            return existingTranslation
                ? {
                    ...existingTranslation,
                    language_code: lang.language_code,
                }
                : {
                    id: "",
                    language: {
                        id: lang.id,
                        code: lang.language_code,
                    } as Language,
                    language_code: lang?.language_code,
                    display_name: "",
                    short_description: "",
                    what_it_treats: "",
                    how_to_use: "",
                    when_to_use: "",
                    side_effects: "",
                    storage_instructions: "",
                    updated_at: new Date(),
                    review_status: "draft",
                };
        }
    );

    const handleLanguageTranslation = async (values: MedicineTranslation | null) => {
        const translationAction: TranslationAction = values?.id
            ? "update"
            : "create";

        const isUpdate = translationAction === "update";
        try {
            await postMutation.mutateAsync({
                url: isUpdate ? `drug-translations/${values?.id}/` : `drugs/translations/create/`,
                method: isUpdate ? "PATCH" : "POST",
                body: {
                    drug: medicineId,
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
            <Formik<TranslationFormValues>
                initialValues={{
                    translations: initialTranslations,
                }}
                onSubmit={async (
                    values,
                    { setSubmitting, setFieldError }
                ) => {
                    const selectedTranslation = values.translations?.find(
                        (translation) => translation.language_code === language
                    );

                    if (!selectedTranslation) {
                        setSubmitting(false);
                        return;
                    }

                    try {
                        await singleTranslationSchema.validate(
                            selectedTranslation,
                            { abortEarly: false }
                        );

                        // Use the selected translation, not the entire translations array.
                        await handleLanguageTranslation(
                            selectedTranslation
                        );

                    } catch (error) {
                        if (error instanceof Yup.ValidationError) {
                            error.inner.forEach((validationError) => {
                                if (validationError.path) {
                                    const index = values.translations?.findIndex(
                                        (translation) =>
                                            translation.language_code === language
                                    );

                                    setFieldError(
                                        `translations[${index}].${validationError.path}`,
                                        validationError.message
                                    );
                                }
                            });
                        } else {
                            console.error("Failed to save translation:", error);
                        }
                    } finally {
                        setSubmitting(false);
                    }
                }}
                enableReinitialize
            >
                {({ values }) => {
                    const selectedIndex = values.translations?.findIndex(
                        (t) => t.language_code === language
                    );
                    const selectedTranslation = values.translations[selectedIndex];

                    // Distinguishes a database translation from a new translation.
                    const translationAction: TranslationAction =
                        selectedTranslation?.id ? "update" : "create";
                    const isUpdate = translationAction === "update";


                    return (
                        <Form className="flex flex-col gap-5">
                            <div className="flex flex-col gap-5 border border-black/10 rounded-md p-3">
                                <ModalHeader
                                    title="Medicine Translations"
                                    description="Core information about the medicine."
                                />

                                <div className="flex flex-wrap gap-4">
                                    {languageFetching ? (
                                        <Loader />
                                    ) : (
                                        uniqueLanguages?.map((item) => {
                                            const code =
                                                item.language_code;

                                            return (
                                                <button
                                                    key={code}
                                                    type="button"
                                                    aria-pressed={language === code}
                                                    onClick={() => setLanguage(code)}
                                                    className={`capitalize shrink-0 rounded-full px-4 py-2 text-xs font-medium ${language === code
                                                        ? "bg-primary text-white"
                                                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                                        }`}
                                                >
                                                    {item.native_name} -{" "}
                                                    <span className="uppercase">
                                                        {code}
                                                    </span>
                                                </button>
                                            );
                                        })
                                    )}
                                    <Dialog open={open} onOpenChange={setOpen}>
                                        <DialogTrigger render={<div>
                                            <button
                                                className={"capitalize shrink-0 rounded-full px-4 py-2 flex items-center gap-2 text-xs font-medium border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}
                                            >
                                                <Plus size={17} /> Add Language
                                            </button>
                                        </div>} />
                                        <DialogContent className="sm:max-w-lg">
                                            <AddLanguageForm
                                                setOpen={setOpen}
                                                medicineLanguages={uniqueLanguages}
                                                setAddLanguage={setAddLanguage} />
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                {selectedTranslation ? (
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
                                            const isLongText =
                                                field !== "display_name" &&
                                                field !== "short_description";

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
                                                            name={`translations[${selectedIndex}].${field}`}
                                                            rows={3}
                                                            placeholder={`Enter ${label.toLowerCase()}`}
                                                            className="w-full rounded-md border border-slate-200 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                                                        />
                                                    ) : (
                                                        <Field
                                                            id={field}
                                                            name={`translations[${selectedIndex}].${field}`}
                                                            placeholder={`Enter ${label.toLowerCase()}`}
                                                            className="w-full rounded-md border border-slate-200 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                                                        />
                                                    )}

                                                    <ErrorMessage
                                                        name={`translations[${selectedIndex}].${field}`}
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
                                                name={`translations[${selectedIndex}].review_status`}
                                                className="w-full rounded-md border border-slate-200 bg-white p-3 text-sm"
                                            >
                                                <option value="draft">Draft</option>
                                                <option value="reviewed">Reviewed</option>
                                                <option value="published">Published</option>
                                            </Field>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-500">
                                        Select a language to edit its translation.
                                    </p>
                                )}

                                {selectedTranslation && <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={postMutation.isPending}
                                        className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
                                    >
                                        {postMutation.isPending
                                            ? "Saving..."
                                            : isUpdate
                                                ? <span>Save Changes ({selectedTranslation?.language_code?.toUpperCase()})</span>
                                                : <span>Create ({selectedTranslation?.language_code?.toUpperCase()}) Translations</span>
                                        }
                                    </button>
                                </div>}
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    )
}

export default MedicineTranslationForm