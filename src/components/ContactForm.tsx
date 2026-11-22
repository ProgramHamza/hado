import { useState, type FormEvent } from "react";
import { FACTS } from "../content";
import { useLang } from "../i18n";

const ENDPOINT = "https://api.web3forms.com/submit";
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 3000;
const EMAIL_MAX = 254;

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "block w-full rounded-md border border-line bg-white/70 px-3.5 py-3 text-[15px] text-ink outline-none transition-colors focus:border-ink";

/**
 * Pilot enquiry form. Messages go through Web3Forms to the team inbox,
 * so the address itself never appears on the page or in the bundle.
 */
export function ContactForm() {
  const { t } = useLang();
  const c = t.pilot;
  const [status, setStatus] = useState<Status>("idle");

  if (!FACTS.contactFormKey) return <p className="m-0 text-mut">{c.offline}</p>;

  if (status === "sent") {
    return (
      <p role="status" className="m-0 text-ink">
        {c.sent}
      </p>
    );
  }

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("botcheck")) return; // Honeypot filled in: silently drop bot submissions.
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: FACTS.contactFormKey,
          subject: c.subject,
          from_name: "Hado website",
          email: String(data.get("email") ?? "").trim(),
          message: String(data.get("message") ?? "").trim(),
        }),
      });
      const body = (await res.json().catch(() => null)) as { success?: boolean } | null;
      setStatus(res.ok && body?.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const sending = status === "sending";
  return (
    <form onSubmit={submit} className="grid gap-4">
      <label className="grid gap-1.5 text-[14.5px] font-medium">
        {c.emailLabel}
        <input name="email" type="email" required maxLength={EMAIL_MAX} autoComplete="email" className={field} />
      </label>
      <label className="grid gap-1.5 text-[14.5px] font-medium">
        {c.messageLabel}
        <textarea
          name="message"
          required
          minLength={MESSAGE_MIN}
          maxLength={MESSAGE_MAX}
          rows={5}
          placeholder={c.messagePlaceholder}
          className={`${field} resize-y`}
        />
      </label>
      {/* Honeypot for bots: hidden from people and screen readers. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="cursor-pointer rounded-md border-0 bg-ink px-6.5 py-3.5 text-[15px] font-medium text-white transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
        >
          {sending ? c.sending : c.send}
        </button>
        {status === "error" && (
          <p role="alert" className="m-0 text-[14.5px] text-sig">
            {c.error}
          </p>
        )}
      </div>
    </form>
  );
}
