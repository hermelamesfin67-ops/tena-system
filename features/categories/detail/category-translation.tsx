import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useDynamicMutation from "@/api/use-post-data";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { queryKeys } from "@/api/query-keys";
import ModalHeader from "@/components/modal-header";
import Loader from "@/components/loader";
import { AddLanguageForm } from "@/components/add-language";
import { singleTranslationSchema } from "@/validations/category.schema";

type TranslationFormValues = {
    translations: CategoryTranslation[];
};

type Props = {
    categoryId: string
    languageFetching: boolean
    mergedLanguages: AddLanguage[]
    translations: CategoryTranslation[]
    setAddLanguage: (arg: AddLanguage[]) => void
}

function CategoryTranslationForm({ categoryId, translations, languageFetching, mergedLanguages, setAddLanguage }: Props) {
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

    const initialTranslations: CategoryTranslation[] = uniqueLanguages?.map(
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
                    category: categoryId,
                    language: {
                        id: lang.id,
                        code: lang.language_code,
                    } as Language,
                    language_code: lang.language_code,
                    name: "",
                    description: "",
                };
        }
    );


    const handleLanguageTranslation = async (
        values: CategoryTranslation
    ): Promise<TranslationAction> => {
        const translationAction: TranslationAction = values.id
            ? "update"
            : "create";

        const isUpdate = translationAction === "update";

        try {
            await postMutation.mutateAsync({
                url: isUpdate
                    ? `categories/translations/update/${values.id}/`
                    : "categories/translations/create/",
                method: isUpdate ? "PUT" : "POST",
                body: {
                    category: categoryId,
                    language: values?.language?.id,
                    name: values.name,
                    description: values.description,
                },
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: [queryKeys.getAllCategories],
                    });

                    toast.success(
                        isUpdate
                            ? "Translation updated successfully!"
                            : "Translation created successfully!"
                    );
                },
            });

            return translationAction;
        } catch (err) {
            console.error("Failed to save translation:", err);
            throw err;
        }
    };

    return (
        <div className="col-span-2 w-full">
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
                                    title="Category Translations"
                                    description=""
                                />

                                <div className="flex flex-wrap gap-4">
                                    {languageFetching ? (
                                        <Loader />
                                    ) : (
                                        uniqueLanguages?.map((item, index) => {
                                            const code = item.language_code;

                                            return (
                                                <button
                                                    key={index}
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
                                                type="button"
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
                                                ["name", "Category Name"],
                                                ["description", "Description"],
                                            ] as const
                                        ).map(([field, label]) => {
                                            const isLongText =
                                                field === "description"

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

                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-500">
                                        Select a language to edit its translation.
                                    </p>
                                )}

                                {selectedTranslation && <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={postMutation.isPending || isUpdate}
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

export default CategoryTranslationForm