export const routes = {
  signIn: "/auth/signin",
  signOut: "/auth/signout",
  error: "/auth/error",
  home: "/",
  overview: "/overview",
  medicine: "/medicine",
  medicineDetail: (id: string) => `/medicine/${id}`,

  // Admin Routes
  languages: "/languages",
  medicines: "/medicines",
  medicineDetails: (id: string) => `/medicines/${id}`,
  category: "/categories",
  categoryDetails: (id: string) => `/categories/${id}`,
};
