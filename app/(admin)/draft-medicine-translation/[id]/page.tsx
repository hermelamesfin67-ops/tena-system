
import DraftMedicineTranslationDetail from "@/features/draft-medicine-translation/detail";
import { Suspense } from "react";

type Props = {
    params: Promise<{ id: string }>;
};

async function DraftMedicineTranslationContent({ params }: Props) {
    const { id } = await params;

    return <DraftMedicineTranslationDetail id={id} />;
}

export default function Page({ params }: Props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DraftMedicineTranslationContent params={params} />
        </Suspense>
    );
}
