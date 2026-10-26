export const routes = {
  signIn: "/auth/signin",
  signOut: "/auth/signout",
  error: "/auth/error",
  home: "/",
  medicine: "/medicine",
  medicineDetail: (id: string) => `/medicine/${id}`,
  medicines: "/medicines",
  medicineDetails: (id: string) => `/medicines/${id}`,
};
