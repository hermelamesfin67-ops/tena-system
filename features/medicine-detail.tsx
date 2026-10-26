"use client"
import { queryKeys } from "@/api/query-keys";
import { useFetchData } from "@/api/use-fetch-data";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import Loader from "@/components/loader";
import { useMemo, useState } from "react";
import { sections } from "@/constants";
import TitleValueCard from "@/components/title-value-card";

type Props = {
    id: string
};

export default function MedicineDetails({ id }: Props) {
    const [language, setLanguage] = useState("en");
    const medicineData = useFetchData(
        [queryKeys.getAllMedicine, id],
        `drugs/${id}/`,
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

    const medicineLanguages = medicine?.translations?.map((translation) => {
        const language = languages?.find(
            (lang) => lang.code === translation?.language_code
        );

        return {
            native_name: language?.native_name,
            language_code: translation.language_code,
        };
    });


    if (medicineData.isFetching) return <Loader />
    const hasTranslation = medicineTranslation &&
        typeof medicineTranslation === "object" &&
        Object.keys(medicineTranslation).length > 0

    return (
        <main className="min-h-screen flex flex-col justify-between mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 bg-slate-50">
            <div className="flex flex-col gap-5">
                <Link
                    href="/"
                    className="text-sm flex items-center gap-1 font-medium text-primary hover:text-primary/80"
                >
                    <IoIosArrowBack size={18} /> Back to medicines
                </Link>

                <header className="rounded-3xl flex flex-col gap-5 border border-slate-200 bg-white p-6 sm:p-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-primary">
                        ✚
                    </div>

                    <div className="flex flex-col gap-3 md:flex-row w-full md:items-center">
                        <p className="text-sm font-medium text-primary">
                            MEDICINE INFORMATION
                        </p>

                        <div className="flex items-center justify-end gap-2 flex-wrap w-full flex-1">
                            {languagesData?.isFetching ? <Loader /> : medicineLanguages?.map((item) => (
                                <button
                                    key={item.language_code}
                                    onClick={() => setLanguage(item.language_code)}
                                    aria-pressed={language === item.language_code}
                                    className={`capitalize shrink-0 rounded-full px-4 py-2 text-sm font-medium ${language === item.language_code
                                        ? "bg-primary text-white"
                                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    {item?.native_name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {hasTranslation && medicineTranslation?.short_description && (
                        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                            {medicineTranslation?.short_description || "--"}
                        </p>
                    )}

                    <div className="grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">

                        <TitleValueCard title="Generic name" value={medicine?.generic_name} />
                        {medicine?.brand_name && (<TitleValueCard title="Brand name" value={medicine?.brand_name} />)}
                        <TitleValueCard
                            title="Strength and form"
                            value={[medicine?.strength, medicine?.dosage_form]
                                .filter(Boolean)
                                .join(" · ") || "Not specified"}
                        />

                    </div>

                    <div className="grid sm:grid-cols-3">
                        {hasTranslation &&
                            <TitleValueCard title="Medicine Name" value={medicineTranslation?.display_name || "--"} />}

                        <div className="flex flex-wrap gap-2 sm:col-span-2">
                            {categoryNames?.map((category) => (
                                <span
                                    key={category?.category}
                                    className="rounded-full h-fit bg-slate-100 px-3 py-1.5 text-sm text-slate-700"
                                >
                                    {category?.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </header>

                {/* {translation.warnings && (
                    <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                        <h2 className="font-semibold text-amber-950">
                            Important safety information
                        </h2>
                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-amber-900">
                            {translation.warnings}
                        </p>
                    </aside>
                )} */}

                <div className="grid gap-4 md:grid-cols-2">
                    {sections?.map((section) => {

                        const content =
                            hasTranslation
                                ? medicineTranslation[section.field]
                                : undefined;

                        if (!content) return null;

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

            </div>

            <p className="mt-8 text-sm leading-6 text-slate-500">
                This information is educational and does not replace professional
                medical advice. Do not start, stop, or change a medicine without
                appropriate medical guidance.
            </p>
        </main>
    );
}