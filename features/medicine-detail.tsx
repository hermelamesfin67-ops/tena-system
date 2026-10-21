
type Props = {
    medicine: Medicine;
    translation: MedicineTranslation;
};

const sections = [
    {
        title: "What it treats",
        field: "what_it_treats",
        icon: "✚",
    },
    {
        title: "When to use it",
        field: "when_to_use",
        icon: "◷",
    },
    {
        title: "How to use it",
        field: "how_to_use",
        icon: "↗",
    },
    {
        title: "Possible side effects",
        field: "side_effects",
        icon: "!",
    },
    {
        title: "Warnings and precautions",
        field: "warnings",
        icon: "⚠",
    },
    {
        title: "Storage instructions",
        field: "storage_instructions",
        icon: "⌂",
    },
] as const;

export default function MedicineDetails({
    medicine,
    translation,
}: Props) {
    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <a
                    href="/medicines"
                    className="text-sm font-medium text-primary hover:underline"
                >
                    ← Back to medicines
                </a>

                <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-primary">
                        ✚
                    </div>

                    <p className="mt-6 text-sm font-medium text-primary">
                        MEDICINE INFORMATION
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        {translation.display_name}
                    </h1>

                    {translation.short_description && (
                        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                            {translation.short_description}
                        </p>
                    )}

                    <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
                        <div>
                            <p className="text-sm text-slate-500">Generic name</p>
                            <p className="mt-1 font-semibold text-slate-900">
                                {medicine.generic_name}
                            </p>
                        </div>

                        {medicine.brand_name && (
                            <div>
                                <p className="text-sm text-slate-500">Brand name</p>
                                <p className="mt-1 font-semibold text-slate-900">
                                    {medicine.brand_name}
                                </p>
                            </div>
                        )}

                        <div>
                            <p className="text-sm text-slate-500">Strength and form</p>
                            <p className="mt-1 font-semibold text-slate-900">
                                {[medicine.strength, medicine.dosage_form]
                                    .filter(Boolean)
                                    .join(" · ") || "Not specified"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {medicine.categories.map((category) => (
                            <span
                                key={category.slug}
                                className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700"
                            >
                                {category.name}
                            </span>
                        ))}
                    </div>
                </header>

                {translation.warnings && (
                    <aside className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                        <h2 className="font-semibold text-amber-950">
                            Important safety information
                        </h2>
                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-amber-900">
                            {translation.warnings}
                        </p>
                    </aside>
                )}

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {sections.map((section) => {
                        const content = translation[section.field];

                        if (!content) return null;

                        const isWarning = section.field === "warnings";

                        // Warnings are already shown prominently above.
                        if (isWarning) return null;

                        return (
                            <section
                                key={section.field}
                                className="rounded-2xl border border-slate-200 bg-white p-6"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 font-semibold text-primary">
                                        {section.icon}
                                    </span>

                                    <h2 className="text-lg font-semibold text-slate-900">
                                        {section.title}
                                    </h2>
                                </div>

                                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                                    {content}
                                </p>
                            </section>
                        );
                    })}
                </div>

                <p className="mt-8 text-sm leading-6 text-slate-500">
                    This information is educational and does not replace professional
                    medical advice. Do not start, stop, or change a medicine without
                    appropriate medical guidance.
                </p>
            </div>
        </main>
    );
}