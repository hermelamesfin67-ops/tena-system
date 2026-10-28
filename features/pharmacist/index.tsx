"use client"
import PageHeader from "@/components/page-header"
import { PenLine, Plus } from 'lucide-react';
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
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFetchData } from "@/api/use-fetch-data";
import { queryKeys } from "@/api/query-keys";
import Loader from "@/components/loader";
import { PharmacistForm } from "./create";

const breadcrumb = [{ name: "Pharmacist" }];
function Pharmacist() {
    const [open, setOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingPharmacistId, setEditingPharmacistId] = useState("");

    const pharmacistData = useFetchData(
        [queryKeys.getAllPharmacist],
        `pharmacist/`,
    )
    const pharmacist: Pharmacist[] = pharmacistData.data

    return (
        <div className='flex flex-col gap-3 w-full'>
            <PageHeader breadcrumb={breadcrumb}>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger render={<div className='flex justify-end'><Button className={"max-w-40 w-full"}><Plus /> Add Pharmacist</Button></div>} />
                    <DialogContent className="sm:max-w-lg">
                        <PharmacistForm setOpen={setOpen} />
                    </DialogContent>
                </Dialog>
            </PageHeader>
            <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white w-full">
                <div className='overflow-x-auto w-full'>
                    <Table className='w-full'>
                        <TableHeader className="bg-slate-50/80">
                            <TableRow className="hover:bg-slate-50/80">
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                pharmacistData?.isFetching ?
                                    <TableRow>
                                        <TableCell>
                                            <Loader />
                                        </TableCell>
                                    </TableRow>
                                    : pharmacist?.length ? pharmacist?.map((usr) => {
                                        return (
                                            <TableRow key={usr?.id}>
                                                <TableCell>
                                                    <div className="font-medium capitalize text-slate-900">
                                                        {usr?.username}
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="font-medium text-slate-900">
                                                        {usr?.email}
                                                    </div>
                                                </TableCell>
                                                <TableCell className='flex items-center gap-3'>
                                                    <Tooltip>
                                                        <TooltipTrigger className={"cursor-pointer"} delay={100}>
                                                            <Dialog
                                                                open={isEditOpen && editingPharmacistId === usr?.id}
                                                                onOpenChange={(open) => {
                                                                    if (open) {
                                                                        setEditingPharmacistId(usr?.id)
                                                                        setIsEditOpen(true)
                                                                    } else {
                                                                        setIsEditOpen(false)
                                                                        setEditingPharmacistId("")
                                                                    }
                                                                }}>
                                                                <DialogTrigger render={<PenLine size={16} />} />
                                                                <DialogContent className="sm:max-w-lg">
                                                                    <PharmacistForm pharmacist={usr} setIsEditOpen={setIsEditOpen} />
                                                                </DialogContent>
                                                            </Dialog>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className='text-xs'>Edit</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                        : <TableRow className='h-36 w-full flex items-center justify-center'>
                                            <TableCell className="font-semibold text-slate-600">
                                                No Pharmacist found
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

export default Pharmacist