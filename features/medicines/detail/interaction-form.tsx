/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Formik, Form, ErrorMessage } from 'formik';
import { Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import ModalHeader from '@/components/modal-header';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import useDynamicMutation from '@/api/use-post-data';
import { queryKeys } from '@/api/query-keys';
import { hasObjectsDifferentValues } from '@/lib/utils';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { medicineInteractionSchema, MedicineInteractionSchemaType } from '@/validations/medicine.schema';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFetchData } from '@/api/use-fetch-data';
import { drugSeverity } from '@/constants';
import Loader from '@/components/loader';

type Props = {
    id?: string
    medicineId?: string
    severity?: string
    interactionWithId?: string
    setOpen?: (arg: boolean) => void
    setIsEditOpen?: (arg: boolean) => void
}
export function MedicineInteractionForm({ id, medicineId, severity, interactionWithId, setOpen, setIsEditOpen }: Props) {
    const queryClient = useQueryClient()
    const postMutation = useDynamicMutation({ type: "Json" })
    const initialValues = { severity: severity || '', drug_b: interactionWithId || "" }

    const medicineData = useFetchData(
        [queryKeys.getAllMedicine],
        `drugs/?page=1&page_size=50`,
    )
    const medicines: Medicine[] = medicineData.data?.results
    const interactionWith = medicines?.length ? medicines?.map((medicine) => ({
        label: medicine?.generic_name,
        value: medicine?.id
    })) : []

    const createInteraction = async (values: MedicineInteractionSchemaType) => {
        try {
            await postMutation.mutateAsync({
                url: id ? `drugs/interactions/${id}/` : `drugs/interactions/create/`,
                method: id ? "PATCH" : "POST",
                body: {
                    "drug_a": medicineId,
                    "drug_b": values.drug_b,
                    "severity": values.severity,
                    "sources": []
                },
                onSuccess: async () => {
                    queryClient.invalidateQueries({
                        queryKey: [queryKeys.getAllMedicineInteractions],
                    })
                    toast.success(`Medicine Interaction ${id ? "Updated" : "Created"} Successfully!`);
                    if (setOpen) setOpen(false)
                    if (setIsEditOpen) setIsEditOpen(false)
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    if (medicineData.isFetching) return <Loader />

    return <Formik
        initialValues={initialValues}
        validationSchema={medicineInteractionSchema}
        onSubmit={(val) => {
            if (!hasObjectsDifferentValues(val, initialValues)) {
                toast.warning("No changes applied!");
                return;
            }
            createInteraction(val)
        }}>
        {({ setFieldValue }) => (

            <Form className="space-y-5">
                <ModalHeader
                    title='Medicine Interaction'
                    description='Configure a medicine interaction available.'
                    icon={<Pill />}
                />
                <div className="space-y-2">
                    <Label htmlFor="name">
                        Interaction With
                    </Label>
                    <Select items={interactionWith} defaultValue={interactionWithId} onValueChange={(v: any) => setFieldValue("drug_b", v)}>
                        <SelectTrigger size="sm" className="max-w-xs w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {interactionWith?.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <ErrorMessage name="drug_b" component="p" className="text-xs text-red-600" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="name">
                        Severity
                    </Label>
                    <Select items={drugSeverity} defaultValue={severity} onValueChange={(v: any) => setFieldValue("severity", v)}>
                        <SelectTrigger size="sm" className="max-w-xs w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {drugSeverity?.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <ErrorMessage name="slug" component="p" className="text-xs text-red-600" />
                </div>

                <DialogFooter className="sm:justify-end">
                    <DialogClose render={<Button type="button" variant={"outline"}>Cancel</Button>} />
                    <Button disabled={postMutation.isPending} type="submit">{postMutation.isPending ? "Loading.." : id ? "Save Changes" : "Create"}</Button>
                </DialogFooter>
            </Form>
        )}

    </Formik>
}
