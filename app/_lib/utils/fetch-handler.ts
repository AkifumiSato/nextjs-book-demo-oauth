import type { Schema } from "zod";

export function handleWithZod<T>(schema: Schema) {
  return async (res: Response) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${await res.text()}`);
    }

    return schema.parse(await res.json());
  };
}
