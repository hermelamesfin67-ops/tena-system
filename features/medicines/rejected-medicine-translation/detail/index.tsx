"use client"
import { queryKeys } from "@/api/query-keys";
import { useFetchData } from "@/api/use-fetch-data";
import Loader from "@/components/loader";
import PageHeader from "@/components/page-header";
import TitleValueCard from "@/components/title-value-card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { routes } from "@/lib/routes";
import { useState } from "react";
import { RejectRequest } from "./reject";
import { PublishRequest } from "./publish";

const breadcrumb = [{ name: "Rejected Medicine Translations", href: routes.rejectedMedicineTranslations }, { name: "Details" }];

function RejectedMedicineTranslationDetail({ id }: { id: string }) {
    const [openRejectDialog, setOpenRejectDialog] = useState(false);
    const [openPublishDialog, setOpenPublishDialog] = useState(false);

    const rejectedData = useFetchData(
        [queryKeys.getAllMedicineDrat, id],
        `drug-translation/rejects/${id}/`,
    )
    const rejectedMedicine: MedicineTranslation = rejectedData.data

    if (rejectedData?.isFetching) return <Loader />

    return (
        <div className='flex flex-col gap-3 w-full'>
            <PageHeader breadcrumb={breadcrumb} />

            <div className="grid gap-4 border-t border-slate-100 pt-6">
                <TitleValueCard title="Display Name" value={rejectedMedicine?.display_name} />
                <TitleValueCard title="Language" value={rejectedMedicine?.language_code?.toUpperCase()} />
                <TitleValueCard title="Description" value={rejectedMedicine?.short_description} />
                <TitleValueCard title="What It Treats" value={rejectedMedicine?.what_it_treats} />
                <TitleValueCard title="How to use" value={rejectedMedicine?.how_to_use} />
                <TitleValueCard title="When to use" value={rejectedMedicine?.when_to_use} />
                <TitleValueCard title="Side Effects" value={rejectedMedicine?.side_effects} />
                <TitleValueCard title="Storage Instructions" value={rejectedMedicine?.storage_instructions} />
                <TitleValueCard title="Review Status" value={rejectedMedicine?.review_status} />

                {rejectedMedicine?.review_status?.toUpperCase() === "REJECTED" &&
                    <DialogFooter className="sm:justify-end">
                        <Dialog open={openRejectDialog} onOpenChange={setOpenRejectDialog}>
                            <DialogTrigger render={<div className='flex justify-end'>
                                <Button variant={"destructive"}>Reject</Button>
                            </div>} />
                            <DialogContent className="sm:max-w-lg">
                                <RejectRequest id={id} setOpenRejectDialog={setOpenRejectDialog} />
                            </DialogContent>
                        </Dialog>
                        <Dialog open={openPublishDialog} onOpenChange={setOpenPublishDialog}>
                            <DialogTrigger render={<div className='flex justify-end'>
                                <Button>Publish</Button>
                            </div>} />
                            <DialogContent className="sm:max-w-lg">
                                <PublishRequest id={id} setOpenPublishDialog={setOpenPublishDialog} />
                            </DialogContent>
                        </Dialog>
                    </DialogFooter>
                }
            </div>
        </div>
    )
}

export default RejectedMedicineTranslationDetail