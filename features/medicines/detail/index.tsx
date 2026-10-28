"use client"
import { queryKeys } from "@/api/query-keys";
import { useFetchData } from "@/api/use-fetch-data";
import Loader from "@/components/loader";
import ModalHeader from "@/components/modal-header";
import PageHeader from "@/components/page-header";
import TitleValueCard from "@/components/title-value-card";
import { routes } from "@/lib/routes";
import { useState } from "react";
import { AddLanguage } from "./add-language";
import MedicineTranslationForm from "./medicine-translation";
import { categoryStyles } from "@/features/categories";

const breadcrumb = [{ name: "Medicines", href: routes.medicines }, { name: "Medicine Details" }];
function MedicinesDetails({ id }: { id: string }) {

    const [addLanguage, setAddLanguage] = useState<AddLanguage[]>([]);

    const medicineData = useFetchData(
        [queryKeys.getAllMedicine, id],
        `drugs/${id}/`,
    )
    const medicine: Medicine = medicineData.data
    const categoryData = useFetchData(
        [queryKeys.getAllCategories],
        `categories/`,
    )
    const categories: Category[] = categoryData.data?.results

    const categoryNames = categories
        ?.filter((category) => medicine?.categories?.includes(category?.id))


    const languagesData = useFetchData(
        [queryKeys.getAllLanguages],
        `languages/`,
    )
    const languages: Language[] = languagesData.data

    const existingLanguages = medicine?.translations?.map((translation) => {
        const language = languages?.find(
            (lang) => lang.code === translation?.language_code
        );

        return {
            native_name: language?.native_name || "",
            language_code: translation.language_code,
        };
    });
    const mergedLanguages = addLanguage?.length ? [...existingLanguages, ...addLanguage] : existingLanguages



    if (medicineData?.isFetching) return <Loader />

    return (
        <div className='flex flex-col gap-3 w-full'>
            <PageHeader breadcrumb={breadcrumb} />

            <div className="grid md:grid-cols-3 gap-5">
                {/* Medicine Details */}
                <div className="flex flex-col gap-5 border border-black/10 rounded-md p-3">
                    <ModalHeader
                        title="Medicine Details"
                        description="Core information about the medicine."
                    />
                    <div className="grid xl:grid-cols-2 gap-3">
                        <TitleValueCard title="Generic Name" value={medicine?.generic_name} />
                        <TitleValueCard title="Brand Name" value={medicine?.brand_name} />
                        <TitleValueCard title="Strength" value={medicine?.strength} />
                        <TitleValueCard title="Dosage Form" value={medicine?.dosage_form} />
                        {categoryNames?.length ?
                            <div className="flex flex-col gap-1">
                                <p className="text-sm text-slate-500">Medicine Category</p>
                                <div className="flex flex-wrap gap-2 col-span-2">
                                    {categoryNames?.map((category, index) => (
                                        <span
                                            key={index}
                                            className={`inline-flex whitespace-nowrap capitalize rounded-full px-3 py-1 text-xs font-medium ${categoryStyles[index % categoryStyles.length]}`}
                                        >
                                            {category?.slug}
                                        </span>
                                    ))}
                                </div>
                            </div> : null}
                    </div>
                </div>

                {/* Medicine Translations */}
                <MedicineTranslationForm
                    medicineId={id}
                    languageFetching={languagesData.isFetching}
                    mergedLanguages={mergedLanguages}
                    setAddLanguage={setAddLanguage}
                />

            </div>
        </div>
    )
}

export default MedicinesDetails