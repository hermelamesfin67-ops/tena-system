"use client"
import PageHeader from "@/components/page-header"
import { Eye } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useFetchData } from "@/api/use-fetch-data";
import { queryKeys } from "@/api/query-keys";
import Loader from "@/components/loader";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { cn } from "cn";
import { formatDate } from "@/lib/date-time";

const breadcrumb = [{ name: "Draft Interaction Translations" }];
function DraftMedicineInteractionTranslations() {

    const draftData = useFetchData(
        [queryKeys.getAllMedicineDraftInteraction],
        `drug-interaction-translation/drafted/`,
    )
    const draftMedicineInteraction: MedicineInteractionTranslation[] = draftData.data

    return (
        <div className='flex flex-col gap-3 w-full'>
            <PageHeader breadcrumb={breadcrumb} />
            <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white w-full">
                <div className='overflow-x-auto w-full'>
                    <Table className='w-full'>
                        <TableHeader className="bg-slate-50/80">
                            <TableRow className="hover:bg-slate-50/80">
                                <TableHead>Explanation</TableHead>
                                <TableHead>Recommended Action</TableHead>
                                <TableHead>Language Code</TableHead>
                                <TableHead>Last Updated</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                draftData?.isFetching ?
                                    <TableRow>
                                        <TableCell>
                                            <Loader />
                                        </TableCell>
                                    </TableRow>
                                    : draftMedicineInteraction?.length ? draftMedicineInteraction?.map((draft) => {
                                        return (
                                            <TableRow key={draft?.id}>
                                                <TableCell>
                                                    <div className="font-medium capitalize text-slate-900">
                                                        {draft?.explanation?.substring(0, 32) + "..."}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium capitalize text-slate-900">
                                                        {draft?.recommended_action?.substring(0, 32) + "..."}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-1.5">
                                                        <span key={draft?.language_code} className={cn(`inline-flex h-8 min-w-10 items-center justify-center rounded-full px-3 text-xs font-semibold`)}>
                                                            {draft?.language_code?.toUpperCase()}
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                <TableCell className="whitespace-nowrap text-slate-600">{formatDate(draft?.updated_at)}</TableCell>
                                                <TableCell className='flex items-center gap-3'>
                                                    <Tooltip>
                                                        <TooltipTrigger className={"cursor-pointer"} delay={100}>
                                                            <Link href={routes.draftInteractionTranslationDetail(draft?.interaction)}>
                                                                <Eye size={20} />
                                                            </Link>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className='text-xs'>View Detail</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                        : <TableRow className='h-36 w-full flex items-center justify-center'>
                                            <TableCell className="font-semibold text-slate-600">
                                                No Draft medicine interaction translation found
                                            </TableCell>
                                        </TableRow>
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default DraftMedicineInteractionTranslations