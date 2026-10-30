"use client"
import { queryKeys } from "@/api/query-keys";
import { useFetchData } from "@/api/use-fetch-data";
import Loader from "@/components/loader";
import PageHeader from "@/components/page-header";
import TitleValueCard from "@/components/title-value-card";
import { routes } from "@/lib/routes";
import MedicineTranslationUpdateForm from "./update-medicine-translation";

const breadcrumb = [{ name: "Rejected Medicine Translations", href: routes.rejectedMedicineTranslations }, { name: "Details" }];

function RejectedMedicineTranslationDetail({ id }: { id: string }) {

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
                <TitleValueCard
                    title="Rejection Reason"
                    value={rejectedMedicine?.rejection_reason}
                    className="border border-red-500 rounded-md p-2"
                />

                <MedicineTranslationUpdateForm translation={rejectedMedicine} />
            </div>
        </div>
    )
}

export default RejectedMedicineTranslationDetail