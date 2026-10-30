"use client"
import { queryKeys } from '@/api/query-keys'
import { useFetchData } from '@/api/use-fetch-data'
import Loader from '@/components/loader'
import ModalHeader from '@/components/modal-header'
import PageHeader from '@/components/page-header'
import TitleValueCard from '@/components/title-value-card'
import { formatDate } from '@/lib/date-time'
import { routes } from '@/lib/routes'
import { useState } from 'react'
import MedicineWarningTranslationForm from './warning-translation'

type Props = {
    id: string
}
function MedicineWarningDetails({ id }: Props) {
    const [addLanguage, setAddLanguage] = useState<AddLanguage[]>([]);

    const medicineWarningTranslationData = useFetchData(
        [queryKeys.getAllMedicineWarning, id],
        `drug-warnings/${id}/`,
    )
    const warning: MedicineWarning = medicineWarningTranslationData.data

    const languagesData = useFetchData(
        [queryKeys.getAllLanguages],
        `languages/`,
    )
    const languages: Language[] = languagesData.data

    const existingLanguages = warning?.translations?.map((translation) => {
        const language = languages?.find(
            (lang) => lang.code === translation?.language_code
        );

        return {
            id: language?.id || "",
            native_name: language?.native_name || "",
            language_code: translation.language_code,
        };
    });
    const mergedLanguages = addLanguage?.length ? [...existingLanguages, ...addLanguage] : existingLanguages


    const breadcrumb = [
        { name: "Medicines", href: routes.medicines }, {
            name: "Medicine Details", href: routes.medicineDetails(warning?.drug)
        },
        { name: "Medicine Warning Details" }
    ];

    if (medicineWarningTranslationData.isFetching) return <Loader />

    return (
        <div className='flex flex-col gap-3 w-full'>
            <PageHeader breadcrumb={breadcrumb} />
            <div className="flex flex-col gap-5 border border-black/10 rounded-md p-3">
                <ModalHeader
                    title="Medicine Warning"
                    description="Information about the medicine warning."
                />
                <div className='flex flex-col gap-5'>
                    <TitleValueCard title="Warning Type" value={warning?.warning_type} />
                    <TitleValueCard title="Last Updated At" value={formatDate(warning?.updated_at)} />
                    {warning?.rejection_reason && <TitleValueCard title="Rejection Reason" value={warning?.rejection_reason} />}

                    {warning?.translations?.length ?

                        < MedicineWarningTranslationForm
                            medicineId={id}
                            languageFetching={languagesData.isFetching}
                            translations={warning?.translations}
                            mergedLanguages={mergedLanguages}
                            setAddLanguage={setAddLanguage}
                        />

                        : <div className="font-semibold text-slate-600">
                            No medicine waring translation found
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default MedicineWarningDetails