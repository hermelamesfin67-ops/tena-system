
import CategoryDetails from "@/features/categories/detail";
import { Suspense } from "react";

type Props = {
    params: Promise<{ id: string }>;
};

async function CategoryContent({ params }: Props) {
    const { id } = await params;

    return <CategoryDetails id={id} />;
}

export default function Page({ params }: Props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CategoryContent params={params} />
        </Suspense>
    );
}
