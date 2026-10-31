"use client"
import { queryKeys } from '@/api/query-keys'
import { useFetchData } from '@/api/use-fetch-data'
import Loader from '@/components/loader'
import ModalHeader from '@/components/modal-header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { routes } from '@/lib/routes'
import Link from 'next/link'
import { useState } from 'react'
import { MedicineWarningForm } from './warning-form'
import { ChevronRight, Plus, TriangleAlert } from 'lucide-react'
import { cn } from 'cn'
import { warningBGstyle } from '@/constants'

type Props = {
    id: string
}
function MedicineWarning({ id }: Props) {
    const [open, setOpen] = useState(false);
    const medicineWarningData = useFetchData(
        [queryKeys.getAllMedicineWarning, id],
        `drugs/warnings/?drug_id=${id}`,
    )
    const warnings: MedicineWarning[] = medicineWarningData.data
    if (medicineWarningData.isFetching) return <Loader />

    return (
        <div className="flex flex-col gap-5 border border-black/10 rounded-md p-3">
            <ModalHeader
                title="Medicine Warning"
                description="Information about the medicine warning."
            />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger render={<div className='flex justify-end'><Button className={"max-w-40 w-full"}>
                    <Plus /> Add Warning
                </Button></div>} />
                <DialogContent className="sm:max-w-lg">
                    <MedicineWarningForm medicineId={id} setOpen={setOpen} />
                </DialogContent>
            </Dialog>
            <div className='flex flex-col gap-5'>
                {warnings?.length ? warnings?.map((warning, index) => {
                    const color = warningBGstyle[warning?.warning_type]

                    return (
                        <Link
                            key={index}
                            href={routes.drugWarningTranslation(warning?.id)}
                            className={cn('flex flex-col gap-2 md:flex-row md:items-center justify-between w-full p-3 md:px-6 rounded-2xl cursor-pointer hover:scale-105',
                                color.background
                            )}
                        >
                            <div className='flex items-center gap-3'>
                                <div className={cn('p-3 rounded-full', color.iconBG, color?.text)}>
                                    <TriangleAlert size={36} />
                                </div>
                                <div>
                                    <span className={cn('uppercase text-xs', color?.text)}>{warning?.warning_type}</span>
                                </div>
                            </div>

                            <Button variant={"outline"} className={"flex items-center gap-2 rounded-full p-2.5 border border-primary text-xs w-fit"}>
                                View Details <ChevronRight />
                            </Button>
                        </Link>
                    )
                }) : <div className="font-semibold text-slate-600">
                    No medicine waring found
                </div>}
            </div>
        </div>
    )
}

export default MedicineWarning