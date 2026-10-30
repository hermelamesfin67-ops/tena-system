"use client"
import PageHeader from "@/components/page-header"
import { Plus } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipTrigger,
// } from "@/components/ui/tooltip"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFetchData } from "@/api/use-fetch-data";
import { queryKeys } from "@/api/query-keys";
import Loader from "@/components/loader";
import { LanguageForm } from "../language/create";

export const languageStyles = [
    'bg-purple-50 text-purple-700',
    'bg-amber-50 text-amber-700',
    'bg-slate-50 text-slate-700',
];

const breadcrumb = [{ name: "Languages" }];
function Languages() {
    const [open, setOpen] = useState(false);
    // const [isEditOpen, setIsEditOpen] = useState(false);
    // const [editingLanguageId, setEditingLanguageId] = useState("");

    const languageData = useFetchData(
        [queryKeys.getAllLanguages],
        `languages/`,
    )
    const languages: Language[] = languageData.data


    return (
        <div className='flex flex-col gap-3 w-full'>
            <PageHeader breadcrumb={breadcrumb}>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger render={<div className='flex justify-end'><Button className={"max-w-40 w-full"}><Plus /> Add Language</Button></div>} />
                    <DialogContent className="sm:max-w-lg">
                        <LanguageForm setOpen={setOpen} />
                    </DialogContent>
                </Dialog>
            </PageHeader>
            <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white w-full">
                <div className='overflow-x-auto w-full'>
                    <Table className='w-full'>
                        <TableHeader className="bg-slate-50/80">
                            <TableRow className="hover:bg-slate-50/80">
                                <TableHead>Native Name</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                languageData?.isFetching ?
                                    <TableRow>
                                        <TableCell>
                                            <Loader />
                                        </TableCell>
                                    </TableRow>
                                    : languages?.length ? languages?.map((language) => {
                                        return (
                                            <TableRow key={language?.id}>
                                                <TableCell>
                                                    <div className="font-medium capitalize text-slate-900">
                                                        {language?.native_name}
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="font-medium uppercase text-slate-900">
                                                        {language?.code}
                                                    </div>
                                                </TableCell>
                                                {/* <TableCell className='flex items-center gap-3'>
                                                    <Tooltip>
                                                        <TooltipTrigger className={"cursor-pointer"} delay={100}>
                                                            <Dialog
                                                                open={isEditOpen && editingLanguageId === language?.id}
                                                                onOpenChange={(open) => {
                                                                    if (open) {
                                                                        setEditingLanguageId(language?.id)
                                                                        setIsEditOpen(true)
                                                                    } else {
                                                                        setIsEditOpen(false)
                                                                        setEditingLanguageId("")
                                                                    }
                                                                }}>
                                                                <DialogTrigger render={<PenLine size={16} />} />
                                                                <DialogContent className="sm:max-w-lg">
                                                                    <LanguageForm language={language} setIsEditOpen={setIsEditOpen} />
                                                                </DialogContent>
                                                            </Dialog>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className='text-xs'>Edit</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TableCell> */}
                                            </TableRow>
                                        )
                                    })
                                        : <TableRow className='h-36 w-full flex items-center justify-center'>
                                            <TableCell className="font-semibold text-slate-600">
                                                No languages found
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

export default Languages