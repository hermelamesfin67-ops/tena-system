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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { PenLine } from 'lucide-react'
import { MedicineWarningForm } from '../detail/warning-form'
import { Button } from '@/components/ui/button'

type Props = {
    id: string
}
function MedicineWarningDetails({ id }: Props) {
    const [isEditOpen, setIsEditOpen] = useState(false);
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
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger render={<div className='flex justify-end'>
                        <Button className={"max-w-40 w-full"}>
                            <PenLine /> Edit Warning
                        </Button></div>} />
                    <DialogContent className="sm:max-w-lg">
                        <MedicineWarningForm
                            id={warning?.id}
                            warningType={warning?.warning_type}
                            medicineId={warning?.drug}
                            setIsEditOpen={setIsEditOpen}
                        />
                    </DialogContent>
                </Dialog>
                <div className='flex flex-col gap-5'>
                    <TitleValueCard title="Warning Type" value={warning?.warning_type} />
                    <TitleValueCard title="Last Updated At" value={formatDate(warning?.updated_at)} />
                    {warning?.rejection_reason && <TitleValueCard title="Rejection Reason" value={warning?.rejection_reason} />}

                    < MedicineWarningTranslationForm
                        medicineId={id}
                        languageFetching={languagesData.isFetching}
                        translations={warning?.translations}
                        mergedLanguages={mergedLanguages}
                        setAddLanguage={setAddLanguage}
                    />
                </div>
            </div>
        </div>
    )
}

export default MedicineWarningDetails