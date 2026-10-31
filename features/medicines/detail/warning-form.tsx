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
import { medicineWarningSchema, MedicineWarningSchemaType } from '@/validations/medicine.schema';
import { drugWarnings } from '@/constants';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {
    id?: string
    medicineId?: string
    warningType?: string
    setOpen?: (arg: boolean) => void
    setIsEditOpen?: (arg: boolean) => void
}
export function MedicineWarningForm({ id, medicineId, warningType, setOpen, setIsEditOpen }: Props) {
    const queryClient = useQueryClient()
    const postMutation = useDynamicMutation({ type: "Json" })
    const initialValues = { warning_type: warningType || '' }

    const createWarning = async (values: MedicineWarningSchemaType) => {
        try {
            await postMutation.mutateAsync({
                url: id ? `drug-warnings/${id}/` : `drugs/warnings/create/`,
                method: id ? "PATCH" : "POST",
                body: {
                    drug: medicineId,
                    warning_type: values?.warning_type,
                    sources: []
                },
                onSuccess: async () => {
                    queryClient.invalidateQueries({
                        queryKey: [queryKeys.getAllMedicineWarning],
                    })
                    toast.success(`Medicine Warning ${id ? "Updated" : "Created"} Successfully!`);
                    if (setOpen) setOpen(false)
                    if (setIsEditOpen) setIsEditOpen(false)
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    return <Formik
        initialValues={initialValues}
        validationSchema={medicineWarningSchema}
        onSubmit={(val) => {
            if (!hasObjectsDifferentValues(val, initialValues)) {
                toast.warning("No changes applied!");
                return;
            }
            createWarning(val)
        }}>
        {({ setFieldValue }) => (

            <Form className="space-y-5">
                <ModalHeader
                    title='Medicine Warning'
                    description='Configure a medicine warning available.'
                    icon={<Pill />}
                />
                <div className="space-y-2">
                    <Label htmlFor="name">
                        Warning Type *
                    </Label>
                    <Select items={drugWarnings} onValueChange={(v: any) => setFieldValue("warning_type", v)}>
                        <SelectTrigger size="sm" className="max-w-xs w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {drugWarnings?.map((item) => (
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
