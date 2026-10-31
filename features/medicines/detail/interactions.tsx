"use client"
import { queryKeys } from '@/api/query-keys'
import { useFetchData } from '@/api/use-fetch-data'
import Loader from '@/components/loader'
import ModalHeader from '@/components/modal-header'
import TitleValueCard from '@/components/title-value-card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { routes } from '@/lib/routes'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronRight, Plus } from 'lucide-react'
import { MedicineInteractionForm } from './interaction-form'

type Props = {
    id: string
}
function MedicineInteractions({ id }: Props) {
    const [open, setOpen] = useState(false);
    const medicineInteractionData = useFetchData(
        [queryKeys.getAllDrugInteractions, id],
        `drugs/interactions/?drug_id=${id}`,
    )
    const interactions: MedicineInteraction[] = medicineInteractionData.data
    if (medicineInteractionData.isFetching) return <Loader />

    return (
        <div className="flex flex-col gap-5 border border-black/10 rounded-md p-3">
            <ModalHeader
                title="Medicine Interactions"
                description="Information about the medicine interaction."
            />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger render={<div className='flex justify-end'><Button className={"max-w-40 w-full"}>
                    <Plus /> Add Interaction
                </Button></div>} />
                <DialogContent className="sm:max-w-lg">
                    <MedicineInteractionForm medicineId={id} setOpen={setOpen} />
                </DialogContent>
            </Dialog>
            <div className='flex flex-col gap-5'>
                {interactions?.length ? interactions?.map((interaction, index) => {
                    const interactionWith = interaction?.drug_a === id ? interaction?.drug_b_name : interaction?.drug_a_name

                    return (
                        <Link href={routes.drugInteractionTranslation(interaction?.id, id)}
                            key={index}
                            className={'flex flex-col gap-2 md:flex-row md:items-center justify-between w-full p-3 md:px-6 rounded-2xl cursor-pointer hover:bg-gray-50'}
                        >
                            <TitleValueCard title="Interaction with" value={interactionWith} />

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

export default MedicineInteractions