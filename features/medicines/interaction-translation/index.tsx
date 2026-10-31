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
import MedicineInteractionTranslationForm from './interaction-translation'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { PenLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from 'cn'
import { MedicineInteractionForm } from '../detail/interaction-form'

type Props = {
    id: string
    medicineId: string
}
function MedicineInteractionDetails({ id, medicineId }: Props) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [addLanguage, setAddLanguage] = useState<AddLanguage[]>([]);

    const medicineInteractionTranslationData = useFetchData(
        [queryKeys.getAllMedicineInteractions, id],
        `drugs/interactions/${id}/`,
    )
    const interaction: MedicineInteraction = medicineInteractionTranslationData.data
    const interactionWith = interaction?.drug_a === medicineId ? interaction?.drug_b_name : interaction?.drug_a_name
    const interactionWithId = interaction?.drug_a === medicineId ? interaction?.drug_b : interaction?.drug_a

    const languagesData = useFetchData(
        [queryKeys.getAllLanguages],
        `languages/`,
    )
    const languages: Language[] = languagesData.data

    const existingLanguages = interaction?.translations?.map((translation) => {
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
            name: "Medicine Details", href: routes.medicineDetails(medicineId)
        },
        { name: "Medicine Interaction Details" }
    ];

    if (medicineInteractionTranslationData.isFetching) return <Loader />

    return (
        <div className='flex flex-col gap-3 w-full'>
            <PageHeader breadcrumb={breadcrumb} />

            <div className="flex flex-col gap-5 border border-black/10 rounded-md p-3">
                <ModalHeader
                    title="Medicine interaction"
                    description="Information about the medicine interaction."
                />
                <div className='flex flex-col gap-5'>
                    <div className={cn("flex flex-col sm:flex-row justify-between sm:items-center w-full")}>
                        <div className='grid md:grid-cols-2 w-full'>
                            <TitleValueCard title='Interaction With' value={interactionWith} />
                            <TitleValueCard title='Severity' value={interaction?.severity} />
                        </div>

                        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                            <DialogTrigger render={<div className='mr-3'>
                                <Button className={"max-w-40 w-full"}>
                                    <PenLine /> Edit Interaction
                                </Button></div>} />
                            <DialogContent className="sm:max-w-lg">
                                <MedicineInteractionForm
                                    id={interaction?.id}
                                    medicineId={medicineId}
                                    interactionWithId={interactionWithId}
                                    severity={interaction?.severity}
                                    setIsEditOpen={setIsEditOpen}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                    <TitleValueCard title="Last Updated At" value={formatDate(interaction?.updated_at)} />

                    <MedicineInteractionTranslationForm
                        id={id}
                        medicineId={medicineId}
                        languageFetching={languagesData.isFetching}
                        translations={interaction?.translations}
                        mergedLanguages={mergedLanguages}
                        setAddLanguage={setAddLanguage}
                    />
                </div>
            </div>
        </div>
    )
}

export default MedicineInteractionDetails