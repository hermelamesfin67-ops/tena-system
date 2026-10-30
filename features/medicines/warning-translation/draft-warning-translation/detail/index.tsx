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
import { formatDate } from "@/lib/date-time";

const breadcrumb = [{ name: "Draft Medicine Warning Translations", href: routes.draftWarningTranslations }, { name: "Details" }];

function DraftMedicineWarningTranslationDetail({ id }: { id: string }) {
    const [openRejectDialog, setOpenRejectDialog] = useState(false);
    const [openPublishDialog, setOpenPublishDialog] = useState(false);

    const draftData = useFetchData(
        [queryKeys.getAllMedicineDraftWarning, id],
        `drug-warning-translation/drafts/${id}/`,
    )
    const draftMedicine: MedicineWarningTranslation = draftData.data

    if (draftData?.isFetching) return <Loader />

    return (
        <div className='flex flex-col gap-3 w-full'>
            <PageHeader breadcrumb={breadcrumb} />

            <div className="grid gap-4 border-t border-slate-100 pt-6">
                <TitleValueCard title="Title" value={draftMedicine?.title} />
                <TitleValueCard title="Language" value={draftMedicine?.language_code?.toUpperCase()} />
                <TitleValueCard title="Description" value={draftMedicine?.description} />
                <TitleValueCard title="Recommended Action" value={draftMedicine?.recommended_action} />
                {draftMedicine?.rejection_reason && <TitleValueCard title="rejection_reason" value={draftMedicine?.rejection_reason} />}
                <TitleValueCard title="Review Status" value={draftMedicine?.review_status} />
                <TitleValueCard title="Updated At" value={formatDate(draftMedicine?.updated_at)} />

                {draftMedicine?.review_status?.toUpperCase() === "DRAFT" &&
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

export default DraftMedicineWarningTranslationDetail