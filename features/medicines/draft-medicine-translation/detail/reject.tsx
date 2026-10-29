'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModalHeader from '@/components/modal-header';
import { toast } from 'sonner';
import useDynamicMutation from '@/api/use-post-data';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { rejectionSchema, RejectionSchemaType } from '@/validations/rejection.schema';

type Props = {
    id: string
    setOpenRejectDialog?: (arg: boolean) => void
}
export function RejectRequest({ id, setOpenRejectDialog }: Props) {
    const router = useRouter()
    const postMutation = useDynamicMutation({ type: "Json" })

    const rejectRequest = async (values: RejectionSchemaType) => {
        try {
            await postMutation.mutateAsync({
                url: `drugs/translations/${id}/reject/`,
                method: "POST",
                body: {
                    reason: values.reason
                },
                onSuccess: async () => {
                    router.back()
                    toast.success(`Translation Rejected Successfully!`);
                    if (setOpenRejectDialog) setOpenRejectDialog(false)
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    return <Formik
        initialValues={{
            reason: ""
        }}
        validationSchema={rejectionSchema}
        onSubmit={(val) => rejectRequest(val)}>
        <Form className="space-y-5">
            <ModalHeader
                title='Reject Medicine Translation'
                description='Please review your changes carefully before proceeding.'
                icon={<Pill />}
            />
            <div className="space-y-2">
                <Label>Categories</Label>
                <Field
                    as="textarea"
                    id={"reason"}
                    name={`reason`}
                    rows={3}
                    placeholder={`Write a reason here`}
                    className="w-full rounded-md border border-slate-200 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
                <ErrorMessage
                    name={`reason`}
                    component="p"
                    className="text-xs text-red-500"
                />
            </div>
            <DialogFooter className="sm:justify-end">
                <DialogClose render={<Button type="button" variant={"outline"}>Cancel</Button>} />
                <Button disabled={postMutation.isPending} type="submit" variant={"destructive"}>
                    {postMutation.isPending ? "Loading.." : "Reject Translation"}
                </Button>
            </DialogFooter>
        </Form>
    </Formik>
}
