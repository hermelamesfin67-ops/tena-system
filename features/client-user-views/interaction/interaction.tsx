"use client"
import { queryKeys } from '@/api/query-keys'
import { useFetchData } from '@/api/use-fetch-data'
import Loader from '@/components/loader'
import ModalHeader from '@/components/modal-header'
import InteractionTranslations from './interaction-translations'

type Props = {
    id: string
}
function MedicineInteraction({ id }: Props) {
    const medicineInteractionData = useFetchData(
        [queryKeys.getAllMedicineInteractions, id],
        `drugs/interactions/?drug_id=${id}`,
    )
    const interactions: MedicineInteraction[] = medicineInteractionData.data

    if (medicineInteractionData.isFetching) return <Loader />

    return (
        <div className="rounded-3xl flex flex-col gap-5 border border-slate-200 bg-white p-6 sm:p-10">
            <ModalHeader
                title="Medicine interaction"
                description="Information about the medicine interaction."
            />
            <div className='flex flex-col gap-5'>
                {interactions?.length ? interactions?.map((interaction, index) => (
                    <div key={index}>
                        <InteractionTranslations interaction={interaction} />
                    </div>
                )) : <div className="font-semibold text-slate-600">
                    No medicine interaction found
                </div>}
            </div>
        </div>
    )
}

export default MedicineInteraction