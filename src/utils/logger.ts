import { NODE_MODE } from "@/config/env";

export default function logger(error: any, log = true): string {
  const message = error?.response?.data?.message || error?.message || "";
  if (NODE_MODE === "DEV" && log) console.log({ error, message });

  return message;
}
