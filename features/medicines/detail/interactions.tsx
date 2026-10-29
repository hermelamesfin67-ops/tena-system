import { queryKeys } from '@/api/query-keys'
import { useFetchData } from '@/api/use-fetch-data'
import Loader from '@/components/loader'
import ModalHeader from '@/components/modal-header'
import TitleValueCard from '@/components/title-value-card'

type Props = {
    id: string
}
function MedicineInteractions({ id }: Props) {
    const medicineInteractionsData = useFetchData(
        [queryKeys.getAllMedicineInteractions, id],
        `drugs/interactions/?drug_id=${id}`,
    )
    // drug_a
    const interactions: MedicineInteraction[] = medicineInteractionsData.data
    if (medicineInteractionsData.isFetching) return <Loader />

    return (
        <div className="flex flex-col gap-5 border border-black/10 rounded-md p-3">
            <ModalHeader
                title="Medicine Interaction"
                description="Information about the medicine interaction."
            />
            <div className='flex flex-col gap-5'>
                {interactions?.length ? interactions?.map((interaction, index) => {
                    const interactionWith = interaction?.drug_a === id ? interaction?.drug_b_name : interaction?.drug_a_name

                    return (
                        <div key={index} className="grid xl:grid-cols-2 gap-3 border-b pb-2">
                            <TitleValueCard title="Interaction with" value={interactionWith} />
                            <TitleValueCard title="Severity" value={interaction?.severity} />
                            <TitleValueCard title="Review Status" value={interaction?.review_status} />
                        </div>
                    )
                }) : <div className="font-semibold text-slate-600">
                    No medicine interaction found
                </div>}
            </div>
        </div>
    )
}

export default MedicineInteractions