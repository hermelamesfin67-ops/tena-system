"use client"
import { queryKeys } from '@/api/query-keys';
import { useFetchData } from '@/api/use-fetch-data';
import Loader from '@/components/loader';
import ModalHeader from '@/components/modal-header';
import TitleValueCard from '@/components/title-value-card';
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { warningSections } from '@/constants';
import { formatDate } from '@/lib/date-time';
import { useMemo, useState } from 'react';

type Props = { warning: MedicineWarning }

function WarningTranslations({ warning }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<div>
          <Button variant={"outline"} className={"rounded-full text-xs w-fit"}>View Translation</Button>
        </div>} />
        <DialogContent className="sm:max-w-3xl">
          <Translations warning={warning} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default WarningTranslations


const Translations = ({ warning }: Props) => {
  const [language, setLanguage] = useState("en");
  const languagesData = useFetchData(
    [queryKeys.getAllLanguages],
    `languages/`,
  )
  const languages: Language[] = languagesData.data

  const medicineLanguages = warning?.translations?.map((translation) => {
    const language = languages?.find(
      (lang) => lang.code === translation?.language_code
    );

    return {
      native_name: language?.native_name,
      language_code: translation.language_code,
    };
  });
  const warningTranslation = useMemo(() => {
    return warning?.translations?.filter((tr) => tr?.language_code === language)[0]
  }, [language, warning])
  const hasTranslation = warningTranslation &&
    typeof warningTranslation === "object" &&
    Object.keys(warningTranslation).length > 0

  return <div className='flex flex-col gap-3 w-full'>
    <div className="flex flex-col gap-5 rounded-md p-3">
      <ModalHeader
        title="Medicine Warning Translation"
        description=""
      />
      <div className="flex items-center justify-end gap-2 flex-wrap w-full flex-1">
        {languagesData?.isFetching ? <Loader /> : medicineLanguages?.map((item) => (
          <button
            key={item.language_code}
            onClick={() => setLanguage(item.language_code)}
            aria-pressed={language === item.language_code}
            className={`capitalize shrink-0 rounded-full px-4 py-2 text-sm font-medium ${language === item.language_code
              ? "bg-primary text-white"
              : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
          >
            {item?.native_name}
          </button>
        ))}
      </div>
      <div className='flex flex-col gap-5'>
        <TitleValueCard title="Warning Type" value={warning?.warning_type} />
        <TitleValueCard title="Last Updated At" value={formatDate(warning?.updated_at)} />
        {warning?.rejection_reason && <TitleValueCard title="Rejection Reason" value={warning?.rejection_reason} />}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {warningSections?.map((section) => {

          const content =
            hasTranslation
              ? warningTranslation[section.field]
              : undefined;

          if (!content) return null;


          return (
            <section
              key={section.field}
              className="rounded-2xl border border-slate-200 bg-white p-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 font-semibold text-primary">
                  {section.icon}
                </span>

                <h2 className="text-lg font-semibold text-slate-900">
                  {section.title}
                </h2>
              </div>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                {content}
              </p>
            </section>
          );
        })}
      </div>
    </div>
  </div>
}