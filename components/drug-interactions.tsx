import { queryKeys } from "@/api/query-keys"
import { useFetchData } from "@/api/use-fetch-data"

type Props = {
    id: string
}
function DrugInteractions({ id }: Props) {
    const drugInteractionData = useFetchData(
        [queryKeys.getAllDrugInteractions, id],
        `drugs/interactions/?drug_id=${id}`,
    )
    const drugInteraction: MedicineInteractionTranslation[] = drugInteractionData.data

    return (
        <div className="grid gap-4 md:grid-cols-2">
            {drugInteraction?.map((interactions) => {

                return <section
                    key={interactions.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                    <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 font-semibold text-primary">
                            {/* {section.icon} */}
                        </span>

                        <h2 className="text-lg font-semibold text-slate-900">
                            Interactions with other medicine
                        </h2>
                    </div>

                    <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                        {/* {content} */}
                    </p>
                </section>
            })}


        </div>
    )
}

export default DrugInteractions