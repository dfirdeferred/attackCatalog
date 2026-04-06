import { defineCollection, z } from "astro:content";

const roleContentSchema = z.object({
  intro: z.string(),
  whyCare: z.string(),
});

const attacks = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    severity: z.enum(["Low", "Low-Medium", "Medium", "High", "Critical"]),
    category: z.string(),
    targets: z.array(z.string()),
    killChains: z.array(z.string()).default([]),
    roles: z.object({
      "c-level": roleContentSchema,
      "it-admin": roleContentSchema,
      "end-user": roleContentSchema,
      "red-teamer": roleContentSchema,
    }),
  }),
});

const choiceSchema = z.object({
  label: z.string(),
  next: z.string(),
});

const scenarios = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    chain: z.string(),
    chainOrder: z.number().int().positive(),
    role: z.enum(["c-level", "it-admin", "end-user", "red-teamer"]),
    attack: z.string(),
    choices: z.array(choiceSchema).default([]),
    isDebrief: z.boolean().default(false),
  }),
});

export const collections = { attacks, scenarios };
