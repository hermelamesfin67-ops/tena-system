
import RejectedMedicineWarningTranslationDetail from "@/features/medicines/warning-translation/rejected-warning-translation/detail";
import { Suspense } from "react";

type Props = {
    params: Promise<{ id: string }>;
};

async function RejectedMedicineTranslationContent({ params }: Props) {
    const { id } = await params;

    return <RejectedMedicineWarningTranslationDetail id={id} />;
}

export default function Page({ params }: Props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RejectedMedicineTranslationContent params={params} />
        </Suspense>
    );
}
