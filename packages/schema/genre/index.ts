import { z } from "zod";
import { zfd } from "zod-form-data";

export const genreValidationSchema = zfd.formData({
  id: zfd.numeric(z.number()).optional(),
  name: zfd.text(z.string().min(1, "Name is required")),
});
