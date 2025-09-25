import * as yup from "yup";

export const settingsSchema = yup.object({
  notifications: yup.boolean().required(),
  emailNotifications: yup.boolean().required(),
  pushNotifications: yup.boolean().required(),
  currency: yup.string().required("Currency is required"),
  theme: yup.string().required("Theme is required"),
});
