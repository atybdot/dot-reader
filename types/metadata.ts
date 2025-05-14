import { Metadata } from "@prisma/client";

export type PartialMetadata = Omit<
  Metadata,
  "id" | "tags" | "category" | "totalPages" | "coverId"
> & { coverUrl: string };
