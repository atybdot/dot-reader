import { PartialMetadata } from "@/types/metadata";
import ePub from "epubjs";

export const extractMetadata = async (
  file: ArrayBuffer | string | File
): Promise<PartialMetadata> => {
  try {
    //@ts-ignore
    const book = ePub(file);
    await book.ready;
    const metadata = await book.loaded.metadata;
    return {
      title: metadata.title,
      author: metadata.creator,
      publisher: metadata.publisher,
      year: new Date(metadata.pubdate).getFullYear().toString(),
      cover: (await book.coverUrl()) ?? "",
      identifiers: [metadata.identifier],
      language: metadata.language,
      rights: metadata.rights,
    };
  } catch (error) {
    console.error("Error reading epub metadata:", error);
    throw error;
  }
};
