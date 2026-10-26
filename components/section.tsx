
export default function SectionWrapper({ children }: { children: React.ReactNode }) {
    return (
        <section className="border-b border-emerald-100 bg-linear-to-br from-emerald-50 via-white to-white">
            {children}
        </section>
    )
}
