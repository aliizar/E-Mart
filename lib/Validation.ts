import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20),
  price: z.string(),
  category: z.string().min(3),
  link: z
    .string()
    .url()
    
});