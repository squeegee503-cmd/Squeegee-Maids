import { supabase } from "@/lib/supabase";

export type QuoteData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  bedrooms?: string;
  bathrooms?: string;
  frequency?: string;
  notes?: string;
};

export async function submitQuote(data: QuoteData): Promise<void> {
  const { data: fnData, error: fnError } = await supabase.functions.invoke(
    "quote-request",
    { body: data },
  );

  if (fnError) {
    throw new Error("Something went wrong while submitting your request. Please try again.");
  }

  if (fnData && typeof fnData === "object" && "error" in fnData) {
    const msg = (fnData as { error: string }).error;
    throw new Error(msg || "Something went wrong while submitting your request. Please try again.");
  }
}
