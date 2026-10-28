'use client';
import { Formik, Form } from 'formik';
import { Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModalHeader from '@/components/modal-header';
import { toast } from 'sonner';
import useDynamicMutation from '@/api/use-post-data';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { useRouter } from 'next/router';

type Props = {
    id: string
    setOpenRejectDialog?: (arg: boolean) => void
}
export function RejectRequest({ id, setOpenRejectDialog }: Props) {
    const router = useRouter()
    const postMutation = useDynamicMutation({ type: "Json" })

    const rejectRequest = async () => {
        try {
            await postMutation.mutateAsync({
                url: `drugs/translations/${id}/reject/`,
                method: "POST",
                body: {},
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
        initialValues={{}}
        validationSchema={""}
        onSubmit={rejectRequest}>
        <Form className="space-y-5">
            <ModalHeader
                title='Reject Medicine Translation'
                description='Please review your changes carefully before proceeding.'
                icon={<Pill />}
            />
            <DialogFooter className="sm:justify-end">
                <DialogClose render={<Button type="button" variant={"outline"}>Cancel</Button>} />
                <Button disabled={postMutation.isPending} type="submit" variant={"destructive"}>
                    {postMutation.isPending ? "Loading.." : "Reject Translation"}
                </Button>
            </DialogFooter>
        </Form>
    </Formik>
}
