'use client';
import { Formik, Form } from 'formik';
import { Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModalHeader from '@/components/modal-header';
import { useFetchData } from '@/api/use-fetch-data';
import { queryKeys } from '@/api/query-keys';
import Loader from '@/components/loader';
import { toast } from 'sonner';

type Props = {
    medicineLanguages: AddLanguage[]
    setOpen: (arg: boolean) => void
    setAddLanguage: (arg: AddLanguage[]) => void
}
export function AddLanguageForm({ medicineLanguages, setOpen, setAddLanguage }: Props) {
    const languagesData = useFetchData(
        [queryKeys.getAllLanguages],
        `languages/`,
    )
    const languages: Language[] = languagesData.data

    const initialValues = { languages: medicineLanguages }
    if (languagesData.isFetching) return <Loader />

    return <Formik initialValues={initialValues} validationSchema={""} onSubmit={() => { }}>
        {({ setFieldValue, values }) => (
            <Form className="space-y-5">
                <ModalHeader
                    title='Language details'
                    description='Configure a language available for localized content.'
                    icon={<Globe2 />}
                />

                <div className="flex flex-wrap gap-2">
                    {languages
                        ?.map(lang => {
                            return (<label key={lang.id} className={`cursor-pointer capitalize rounded-full border px-3 py-2 text-xs ${values.languages?.map((lan) => lan.language_code).includes(lang?.code) ? 'border-emerald-300 bg-emerald-50 text-brand' : 'border-slate-200 text-slate-600'}`}>
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    disabled={medicineLanguages?.map((lan) => lan?.language_code)?.includes(lang.code)}
                                    checked={values.languages?.map((lan) => lan?.language_code)?.includes(lang.code)}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        setFieldValue(
                                            'languages',
                                            isChecked
                                                ? [
                                                    ...(values.languages || []).filter(
                                                        (v) => v.language_code !== lang.code
                                                    ),
                                                    {
                                                        ...lang,
                                                        language_code: lang.code,
                                                        id: lang.id,
                                                    },
                                                ]
                                                : (values.languages || []).filter(
                                                    (v) => v.language_code !== lang.code
                                                )
                                        );
                                    }}
                                />
                                {lang.native_name}
                            </label>)
                        }
                        )}
                </div>

                <div className="flex justify-end">
                    <Button onClick={() => {
                        if (values.languages?.length) {
                            setOpen(false)
                            setAddLanguage(values.languages)
                        } else {
                            toast.warning("No changes applied!");
                            return;
                        }
                    }
                    }>Add language</Button>
                </div>
            </Form>
        )}
    </Formik>
}
