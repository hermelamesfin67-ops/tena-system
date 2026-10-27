export const medicineD = {
  id: "string",
  generic_name: "string",
  brand_name: "string",
  strength: "string",
  dosage_form: "string",
  status: "string",
  updated_at: "Date",
  categories: ["string"],
  translations: [
    {
      language: {
        id: "1",
        code: "en",
        name: "string",
        native_name: "English",
        is_active: false,
      },
      language_code: "en",
      display_name: "string",
      short_description: "string",
      what_it_treats: "string",
      how_to_use: "string",
      when_to_use: "string",
      side_effects: "string",
      warnings: "string",
      storage_instructions: "string",
      review_status: "draft",
    },
  ],
};

export const categoriesD = [
  {
    id: "1",
    slug: "Pain",
    translations: [
      {
        id: "string",
        language: "Amharic",
        language_code: "am",
        category: "Pain",
        name: "Pain",
        description: "Pain",
      },
    ],
  },
];

export const languageD = [
  {
    id: "1",
    code: "en",
    name: "string",
    native_name: "English",
    is_active: false,
  },
  {
    id: "2",
    code: "am",
    name: "string",
    native_name: "Amharic",
    is_active: false,
  },
];

// const medicineTranslation = {
//   language: {
//     code: "en",
//     language_code: "en",
//     native_name: "English",
//   },
//   language_code: "en",
//   display_name: "Atorvastatin",
//   short_description:
//     "Atorvastatin is a prescription statin medicine used to lower cholesterol and reduce the risk of heart attack and stroke.",
//   what_it_treats:
//     "Atorvastatin is used to lower LDL (bad) cholesterol and triglycerides and may increase HDL (good) cholesterol. It is prescribed to help treat high cholesterol and reduce the risk of cardiovascular events, including heart attack and stroke, in eligible patients.",
//   how_to_use:
//     "Take atorvastatin by mouth exactly as prescribed by your healthcare professional, usually once daily, with or without food. Take it at approximately the same time each day. Do not change your dose or stop taking it without consulting your healthcare professional.",
//   when_to_use:
//     "Use atorvastatin as prescribed for high cholesterol or to reduce cardiovascular risk. It is generally taken daily for ongoing cholesterol management and cardiovascular protection, alongside recommended dietary and lifestyle changes.",
//   side_effects:
//     "Common side effects may include muscle or joint pain, diarrhea, nausea, and indigestion. Seek urgent medical attention for unexplained muscle pain, tenderness, or weakness, especially with fever or unusual tiredness, or for dark urine. These may indicate a rare but serious muscle problem. Contact a healthcare professional if you experience yellowing of the skin or eyes or other concerning symptoms.",
//   warnings:
//     "Do not use atorvastatin during pregnancy; contact your healthcare professional promptly if you become pregnant while taking it. It is generally not recommended during breastfeeding. Tell your healthcare professional about liver disease, heavy alcohol use, and all medicines or supplements you take because some interactions can increase the risk of muscle injury. Seek medical advice before starting or stopping other medicines.",
//   storage_instructions:
//     "Store at room temperature according to the product label, away from excessive heat, moisture, and direct light. Keep the medicine in its original container, tightly closed, and out of the reach of children. Follow the package instructions for disposal of unused medicine.",
//   review_status: "draft",
// };
