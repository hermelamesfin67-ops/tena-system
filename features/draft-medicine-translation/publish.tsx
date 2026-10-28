'use client';
import { Formik, Form } from 'formik';
import { Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModalHeader from '@/components/modal-header';
import { toast } from 'sonner';
import useDynamicMutation from '@/api/use-post-data';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

type Props = {
    id: string
    setOpenPublishDialog?: (arg: boolean) => void
}
export function PublishRequest({ id, setOpenPublishDialog }: Props) {
    const router = useRouter()
    const postMutation = useDynamicMutation({ type: "Json" })

    const publishRequest = async () => {
        try {
            await postMutation.mutateAsync({
                url: `drugs/translations/${id}/publish/`,
                method: "POST",
                body: {},
                onSuccess: async () => {
                    router.back()
                    toast.success(`Translation Published Successfully!`);
                    if (setOpenPublishDialog) setOpenPublishDialog(false)
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    return <Formik
        initialValues={{}}
        validationSchema={""}
        onSubmit={publishRequest}>
        <Form className="space-y-5">
            <ModalHeader
                title='Publish Medicine Translation'
                description='Are you sure you want to publish this translation? Once published, the changes will be applied immediately to the system.'
                icon={<Pill />}
            />
            <DialogFooter className="sm:justify-end">
                <DialogClose render={<Button type="button" variant={"outline"}>Cancel</Button>} />
                <Button disabled={postMutation.isPending} type="submit">
                    {postMutation.isPending ? "Loading.." : "Publish Translation"}
                </Button>
            </DialogFooter>
        </Form>
    </Formik>
}
