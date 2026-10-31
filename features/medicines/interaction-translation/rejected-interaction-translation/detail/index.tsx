"use client"
import { queryKeys } from "@/api/query-keys";
import { useFetchData } from "@/api/use-fetch-data";
import Loader from "@/components/loader";
import PageHeader from "@/components/page-header";
import { routes } from "@/lib/routes";
import MedicineInteractionTranslationUpdateForm from "./update-interaction-translation";

const breadcrumb = [{ name: "Rejected Medicine Interaction Translations", href: routes.rejectedInteractionTranslations }, { name: "Details" }];

function RejectedMedicineInteractionTranslationDetail({ id }: { id: string }) {

    const rejectedData = useFetchData(
        [queryKeys.getAllMedicineRejectedInteraction, id],
        `drug-interactions//rejects/${id}/`,
    )
    const rejectedMedicineInteraction: MedicineInteractionTranslation = rejectedData.data

    if (rejectedData?.isFetching) return <Loader />

    return (
        <div className='flex flex-col gap-3 w-full'>
            <PageHeader breadcrumb={breadcrumb} />

            <div className="grid gap-4 border-t border-slate-100 pt-6">
                {/* <TitleValueCard
                    title="Rejection Reason"
                    value={rejectedMedicineInteraction?.rejection_reason}
                    className="border border-red-500 rounded-md p-2"
                /> */}

                <MedicineInteractionTranslationUpdateForm translation={rejectedMedicineInteraction} />

            </div>
        </div>
    )
}

export default RejectedMedicineInteractionTranslationDetail