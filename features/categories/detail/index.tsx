"use client"
import { queryKeys } from "@/api/query-keys";
import { useFetchData } from "@/api/use-fetch-data";
import Loader from "@/components/loader";
import ModalHeader from "@/components/modal-header";
import PageHeader from "@/components/page-header";
import TitleValueCard from "@/components/title-value-card";
import { routes } from "@/lib/routes";
import { useState } from "react";
import CategoryTranslationForm from "./category-translation";

const breadcrumb = [{ name: "Categories", href: routes.category }, { name: "Category Details" }];

function CategoryDetails({ id }: { id: string }) {

    const [addLanguage, setAddLanguage] = useState<AddLanguage[]>([]);

    const categoryData = useFetchData(
        [queryKeys.getAllCategories, id],
        `categories/${id}/`,
    )
    const categories: Category = categoryData.data

    const languagesData = useFetchData(
        [queryKeys.getAllLanguages],
        `languages/`,
    )
    const languages: Language[] = languagesData.data

    const existingLanguages = categories?.translations?.map((translation) => {
        const language = languages?.find(
            (lang) => lang.code === translation?.language_code
        );

        return {
            id: language?.id || "",
            native_name: language?.native_name || "",
            language_code: translation.language_code,
        };
    }) || [];
    const mergedLanguages = addLanguage?.length ? [...existingLanguages, ...addLanguage] : existingLanguages

    if (categoryData?.isFetching) return <Loader />

    return (
        <div className='flex flex-col gap-3 w-full'>
            <PageHeader breadcrumb={breadcrumb} />

            <div className="grid md:grid-cols-3 gap-5">
                {/* Category */}
                <div className="flex flex-col gap-5 border border-black/10 rounded-md p-3">
                    <ModalHeader
                        title="Category"
                        description=""
                    />
                    <div className="grid xl:grid-cols-2 gap-3">
                        <TitleValueCard title="Category Name" value={categories?.slug} />
                    </div>
                </div>

                {/* Category Translations */}
                <CategoryTranslationForm
                    categoryId={id}
                    languageFetching={languagesData.isFetching}
                    translations={categories?.translations}
                    mergedLanguages={mergedLanguages}
                    setAddLanguage={setAddLanguage}
                />

            </div>
        </div>
    )
}

export default CategoryDetails