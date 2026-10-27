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
import { AddLanguage, AddLanguageForm } from "@/features/medicines/detail/add-language";
import { singleTranslationSchema } from "@/validations/category.schema";

type TranslationFormValues = {
    translations: CategoryTranslation[];
};

const createEmptyTranslation = (language: Language): CategoryTranslation => ({
    id: "",
    category: "",
    language: language,
    language_code: language?.code,
    name: "",
    description: ""
});

type Props = {
    categoryId: string
    languageFetching: boolean
    mergedLanguages: AddLanguage[]
    setAddLanguage: (arg: AddLanguage[]) => void
}

function CategoryTranslationForm({ categoryId, languageFetching, mergedLanguages, setAddLanguage }: Props) {
    const queryClient = useQueryClient()
    const postMutation = useDynamicMutation({ type: "Json" })
    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState("");

    const initialTranslations: CategoryTranslation[] = [];

    const handleLanguageTranslation = async (values: CategoryTranslation | null) => {
        try {
            await postMutation.mutateAsync({
                url: `categories/translations/create/`,
                method: "POST",
                body: {
                    category: categoryId,
                    language: values?.language_code,
                    name: "",
                    description: ""
                },
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: [queryKeys.getAllCategories],
                    })
                    toast.success("Translation submitted successfully!");
                },
            });
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="col-span-2 w-full">
            <Formik<TranslationFormValues>
                initialValues={{
                    translations: (mergedLanguages ?? []).map((lang) => {
                        const code = lang.language_code;

                        return (
                            initialTranslations?.find(
                                (t) => t.language_code === code
                            ) ?? createEmptyTranslation(lang as unknown as Language)
                        );
                    }),
                }}
                onSubmit={async (values, { setSubmitting, setFieldError }) => {
                    const selectedTranslation = values.translations.find(
                        (t) => t.language_code === language
                    );

                    if (!selectedTranslation) {
                        setSubmitting(false);
                        return;
                    }

                    try {
                        // Validate only the selected translation
                        await singleTranslationSchema.validate(
                            selectedTranslation,
                            { abortEarly: false }
                        );
                        handleLanguageTranslation(values?.translations?.find((tr) => tr.language_code === language) || null)
                    } catch (error) {
                        if (error instanceof Yup.ValidationError) {
                            error.inner.forEach((validationError) => {
                                if (validationError.path) {
                                    setFieldError(
                                        `translations[${values.translations.findIndex(
                                            (t) =>
                                                t.language_code === language
                                        )}].${validationError.path}`,
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
                {({ values, isSubmitting }) => {
                    const selectedIndex = values.translations.findIndex(
                        (t) => t.language_code === language
                    );

                    const selectedTranslation = values.translations[selectedIndex];
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
                                        mergedLanguages?.map((item) => {
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
                                                medicineLanguages={mergedLanguages}
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
                                        disabled={isSubmitting}
                                        className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
                                    >
                                        {isSubmitting
                                            ? "Saving..."
                                            : "Save Translations"}
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