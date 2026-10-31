"use client"
import { queryKeys } from "@/api/query-keys";
import { useFetchData } from "@/api/use-fetch-data";
import Loader from "@/components/loader";
import PageHeader from "@/components/page-header";
import TitleValueCard from "@/components/title-value-card";
import { routes } from "@/lib/routes";
import MedicineWarningTranslationUpdateForm from "./update-warning-translation";

const breadcrumb = [{ name: "Rejected Medicine Warning Translations", href: routes.rejectedWarningTranslations }, { name: "Details" }];

function RejectedMedicineWarningTranslationDetail({ id }: { id: string }) {

    const rejectedData = useFetchData(
        [queryKeys.getAllMedicineRejectedWarning, id],
        `drug-warning-translation/rejects/${id}/`,
    )
    const rejectedMedicineWarning: MedicineWarningTranslation = rejectedData.data

    if (rejectedData?.isFetching) return <Loader />

    return (
        <div className='flex flex-col gap-3 w-full'>
            <PageHeader breadcrumb={breadcrumb} />

            <div className="grid gap-4 border-t border-slate-100 pt-6">
                <TitleValueCard
                    title="Rejection Reason"
                    value={rejectedMedicineWarning?.rejection_reason}
                    className="border border-red-500 rounded-md p-2"
                />

                <MedicineWarningTranslationUpdateForm translation={rejectedMedicineWarning} />

            </div>
        </div>
    )
}

export default RejectedMedicineWarningTranslationDetail