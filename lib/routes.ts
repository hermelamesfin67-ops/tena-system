export const routes = {
  signIn: "/auth/signin",
  signOut: "/auth/signout",
  error: "/auth/error",
  home: "/",
  overview: "/overview",
  medicine: "/medicine",
  medicineDetail: (id: string) => `/medicine/${id}`,

  // Admin Routes
  pharmacist: "/pharmacist",
  languages: "/languages",
  medicines: "/medicines",
  medicineDetails: (id: string) => `/medicines/${id}`,
  category: "/categories",
  categoryDetails: (id: string) => `/categories/${id}`,
  draftMedicineTranslations: "/medicines/draft-medicine-translation",
  draftMedicineTranslationDetail: (id: string) =>
    `/medicines/draft-medicine-translation/${id}`,
  rejectedMedicineTranslations: "/medicines/rejected-medicine-translation",
  rejectedMedicineTranslationDetail: (id: string) =>
    `/medicines/rejected-medicine-translation/${id}`,

  drugWarning: "/drug-warning",
  drugWarningTranslation: (id: string) => `/warning-translation/${id}`,
  draftWarningTranslations: "/warning-translation/draft-warning-translation",
  draftWarningTranslationDetail: (id: string) =>
    `/warning-translation/draft-warning-translation/${id}`,
  rejectedWarningTranslations:
    "/warning-translation/rejected-warning-translation",
  rejectedWarningTranslationDetail: (id: string) =>
    `/warning-translation/rejected-warning-translation/${id}`,

  drugInteraction: "/drug-interaction",
  drugInteractionTranslation: (id: string, medicineId: string) =>
    `/interaction-translation/${id}/${medicineId}`,
  draftInteractionTranslations:
    "/interaction-translation/draft-interaction-translation",
  draftInteractionTranslationDetail: (id: string) =>
    `/interaction-translation/draft-interaction-translation/${id}`,
  rejectedInteractionTranslations:
    "/interaction-translation/rejected-interaction-translation",
  rejectedInteractionTranslationDetail: (id: string) =>
    `/interaction-translation/rejected-interaction-translation/${id}`,
};
