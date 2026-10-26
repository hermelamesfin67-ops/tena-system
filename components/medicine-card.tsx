import Link from "next/link";

type Props = {
    medicine: Medicine;
    categories: Category[];
};

export default function MedicineCard({ medicine, categories }: Props) {

    const categoryNames = categories
        ?.filter((category) => medicine?.categories?.includes(category?.id))
        ?.map((category) => {
            return (
                category.translations.find(
                    (translation) => translation.language_code === "en"
                )
            );
        });

    return (
        <Link
            href={`/medicine/${medicine?.id}`}
            className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-lg"
        >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-primary">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-6 w-6"
                    aria-hidden="true"
                >
                    <path d="M10 4h4a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" />
                    <path d="M7 12h10" />
                </svg>
            </div>

            <div className="flex flex-wrap gap-2">
                {categoryNames?.map((category, index) => (
                    <span
                        key={index}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                    >
                        {category?.name}
                    </span>
                ))}
            </div>

            <h2 className="mt-3 text-xl font-semibold text-slate-900 group-hover:text-primary">
                {medicine?.brand_name}
            </h2>

            <p className="mt-1 text-slate-500">
                {medicine?.generic_name}
            </p>

            <p className="mt-3 text-sm text-slate-600">
                {[medicine?.strength, medicine?.dosage_form]
                    .filter(Boolean)
                    .join(" · ")}
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                View medicine information
                <span aria-hidden="true">→</span>
            </span>
        </Link>
    );
}