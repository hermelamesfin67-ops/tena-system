"use client"
import { queryKeys } from '@/api/query-keys'
import { useFetchData } from '@/api/use-fetch-data'
import Loader from '@/components/loader'
import ModalHeader from '@/components/modal-header'
import TitleValueCard from '@/components/title-value-card'
import WarningTranslations from './warning-translations'

type Props = {
    id: string
}
function MedicineWarning({ id }: Props) {
    const medicineWarningData = useFetchData(
        [queryKeys.getAllMedicineWarning, id],
        `drugs/warnings/?drug_id=${id}`,
    )
    const warnings: MedicineWarning[] = medicineWarningData.data
    if (medicineWarningData.isFetching) return <Loader />

    return (
        <div className="rounded-3xl flex flex-col gap-5 border border-slate-200 bg-white p-6 sm:p-10">
            <ModalHeader
                title="Medicine Warning"
                description="Information about the medicine warning."
            />
            <div className='flex flex-col gap-5'>
                {warnings?.length ? warnings?.map((warning, index) => (
                    <div key={index} className="grid xl:grid-cols-2 gap-3 border-b pb-2">
                        <TitleValueCard title="Warning Type" value={warning?.warning_type} />
                        {warning?.rejection_reason && <TitleValueCard title="Rejection Reason" value={warning?.rejection_reason} />}

                        <WarningTranslations warning={warning}/>
                    </div>
                )) : <div className="font-semibold text-slate-600">
                    No medicine waring found
                </div>}
            </div>
        </div>
    )
}

export default MedicineWarning