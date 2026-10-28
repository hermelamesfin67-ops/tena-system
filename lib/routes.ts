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
  draftMedicineTranslations: "/draft-medicine-translation",
  draftMedicineTranslationDetail: (id: string) => `/draft-medicine-translation/${id}`,
};
