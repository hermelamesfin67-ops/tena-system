
import DraftMedicineWarningTranslationDetail from "@/features/medicines/warning-translation/draft-warning-translation/detail";
import { Suspense } from "react";

type Props = {
    params: Promise<{ id: string }>;
};

async function DraftMedicineWarningTranslationContent({ params }: Props) {
    const { id } = await params;

    return <DraftMedicineWarningTranslationDetail id={id} />;
}

export default function Page({ params }: Props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DraftMedicineWarningTranslationContent params={params} />
        </Suspense>
    );
}
