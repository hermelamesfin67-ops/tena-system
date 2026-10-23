"use client"
import { queryKeys } from "@/api/query-keys";
import { useFetchData } from "@/api/use-fetch-data";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import Loader from "@/components/loader";
import { useMemo, useState } from "react";
import { sections } from "@/constants";

type Props = {
    id: string
};

export default function MedicineDetails({ id }: Props) {
    const [language, setLanguage] = useState("en");
    const medicineData = useFetchData(
        [queryKeys.getAllMedicine, id],
        `drugs/${id}`,
    )
    const medicine: Medicine = medicineData.data

    const medicineTranslation = useMemo(() => {
        return medicine?.translations?.filter((tr) => tr?.language_code === language)[0]
    }, [language, medicine])

    const categoryData = useFetchData(
        [queryKeys.getAllCategories],
        `categories/`,
    )
    const categories: Category[] = categoryData.data?.results

    const categoryNames = categories
        ?.filter((category) => medicine?.categories?.includes(category?.id))
        ?.map((category) => {
            return (
                category.translations.find(
                    (translation) => translation.language_code === language
                )
            );
        });

    const languagesData = useFetchData(
        [queryKeys.getAllLanguages],
        `languages/`,
    )
    const languages: Language[] = languagesData.data

    if (medicineData.isFetching) return <Loader />

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    className="text-sm flex items-center gap-1.5 font-medium text-primary hover:text-primary/80"
                >
                    <IoIosArrowBack size={20} /> Back to medicines
                </Link>

                <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-primary">
                        ✚
                    </div>

                    <div className="flex flex-col gap-3 md:flex-row w-full md:items-center">
                        <p className="mt-6 text-sm font-medium text-primary">
                            MEDICINE INFORMATION
                        </p>

                        <div className="flex items-center justify-end gap-2 flex-wrap w-full flex-1">
                            {languages?.map((item) => (
                                <button
                                    key={item.code}
                                    onClick={() => setLanguage(item.code)}
                                    aria-pressed={language === item.code}
                                    className={`capitalize shrink-0 rounded-full px-4 py-2 text-sm font-medium ${language === item.code
                                        ? "bg-primary text-white"
                                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    {item?.native_name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* {translation.short_description && (
                        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                            {translation.short_description}
                        </p>
                    )} */}

                    <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
                        <div>
                            <p className="text-sm text-slate-500">Name</p>
                            <p className="mt-1 font-semibold text-slate-900">
                                {medicineTranslation?.display_name}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Generic name</p>
                            <p className="mt-1 font-semibold text-slate-900">
                                {medicine?.generic_name}
                            </p>
                        </div>

                        {medicine?.brand_name && (
                            <div>
                                <p className="text-sm text-slate-500">Brand name</p>
                                <p className="mt-1 font-semibold text-slate-900">
                                    {medicine?.brand_name}
                                </p>
                            </div>
                        )}

                        <div>
                            <p className="text-sm text-slate-500">Strength and form</p>
                            <p className="mt-1 font-semibold text-slate-900">
                                {[medicine?.strength, medicine?.dosage_form]
                                    .filter(Boolean)
                                    .join(" · ") || "Not specified"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {categoryNames.map((category) => (
                            <span
                                key={category?.category}
                                className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700"
                            >
                                {category?.name}
                            </span>
                        ))}
                    </div>
                </header>

                {/* {translation.warnings && (
                    <aside className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                        <h2 className="font-semibold text-amber-950">
                            Important safety information
                        </h2>
                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-amber-900">
                            {translation.warnings}
                        </p>
                    </aside>
                )} */}

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {sections?.map((section) => {
                        const content = medicineTranslation[section.field];

                        // if (!content) return null;

                        const isWarning = section.field === "warnings";

                        // Warnings are already shown prominently above.
                        if (isWarning) return null;

                        return (
                            <section
                                key={section.field}
                                className="rounded-2xl border border-slate-200 bg-white p-6"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 font-semibold text-primary">
                                        {section.icon}
                                    </span>

                                    <h2 className="text-lg font-semibold text-slate-900">
                                        {section.title}
                                    </h2>
                                </div>

                                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                                    {content}
                                </p>
                            </section>
                        );
                    })}
                </div>

                <p className="mt-8 text-sm leading-6 text-slate-500">
                    This information is educational and does not replace professional
                    medical advice. Do not start, stop, or change a medicine without
                    appropriate medical guidance.
                </p>
            </div>
        </main>
    );
}