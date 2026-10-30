"use client"
import { queryKeys } from '@/api/query-keys'
import { useFetchData } from '@/api/use-fetch-data'
import Loader from '@/components/loader'
import ModalHeader from '@/components/modal-header'
import TitleValueCard from '@/components/title-value-card'
import { Button } from '@/components/ui/button'
import { routes } from '@/lib/routes'
import Link from 'next/link'

type Props = {
    id: string
}
function MedicineWarning({ id }: Props) {
    const medicineWarningData = useFetchData(
        [queryKeys.getAllMedicineWarning, id],
        `drugs/warnings/?drug=${id}`,
    )
    const warnings: MedicineWarning[] = medicineWarningData.data
    if (medicineWarningData.isFetching) return <Loader />

    return (
        <div className="flex flex-col gap-5 border border-black/10 rounded-md p-3">
            <ModalHeader
                title="Medicine Warning"
                description="Information about the medicine warning."
            />
            <div className='flex flex-col gap-5'>
                {warnings?.length ? warnings?.map((warning, index) => (
                    <div key={index} className="grid xl:grid-cols-2 gap-3 border-b pb-2">
                        <TitleValueCard title="Warning Type" value={warning?.warning_type} />
                        {warning?.rejection_reason && <TitleValueCard title="Rejection Reason" value={warning?.rejection_reason} />}
                        <Link href={routes.drugWarningTranslation(warning?.id)}>
                            <Button variant={"outline"} className={"rounded-full text-xs w-fit"}>View Translations</Button>
                        </Link>
                    </div>
                )) : <div className="font-semibold text-slate-600">
                    No medicine waring found
                </div>}
            </div>
        </div>
    )
}

export default MedicineWarning