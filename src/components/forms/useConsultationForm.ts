import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Your name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().optional(),
  practice: z.string().min(1, "Choose a practice area"),
  message: z.string().trim().min(1, "Tell us briefly what brings you to us"),
});

export type ConsultationValues = z.infer<typeof schema>;

/**
 * The consultation form state — shared by the Contact page and the booking
 * dialog. RHF + zod, no server yet (TODO wire to the firm's intake
 * endpoint); the same schema binds both contexts so validation and copy
 * never drift.
 */
export function useConsultationForm() {
  const form = useForm<ConsultationValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", practice: "General consultation", message: "" },
  });

  const onSubmit = form.handleSubmit(async () => {
    // TODO: POST to the firm's intake endpoint (Formspree/Resend/SES).
    await new Promise((r) => setTimeout(r, 900));
  });

  return { form, onSubmit };
}
