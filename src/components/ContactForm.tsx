import { useRef, useState, type FormEvent } from "react";
import { FACTS } from "../content";
import { useLang } from "../i18n";

const ENDPOINT = "https://api.web3forms.com/submit";
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 3000;
const EMAIL_MAX = 254;
/** Spam guards: people need a few seconds to type, bots fire instantly and in bursts. */
const MIN_FILL_MS = 3000;
const COOLDOWN_MS = 60_000;
const MAX_LINKS = 2;
const LAST_SENT_KEY = "hado-form-last-sent";

type Status = "idle" | "sending" | "sent" | "error" | "cooldown" | "links";

function readLastSent(): number {
  try {
    return Number(localStorage.getItem(LAST_SENT_KEY)) || 0;
  } catch {
    return 0;
  }
}

function writeLastSent(now: number) {
  try {
    localStorage.setItem(LAST_SENT_KEY, String(now));
  } catch {
    // Storage blocked: the cooldown just doesn't persist across reloads.
  }
}

const countLinks = (text: string) => (text.match(/https?:\/\/|www\./gi) ?? []).length;

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
  const shownAt = useRef(Date.now());

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
    const now = Date.now();
    const message = String(data.get("message") ?? "").trim();
    // Bots fill hidden fields or submit instantly: pretend success so they don't retry.
    if (data.get("botcheck") || data.get("website") || now - shownAt.current < MIN_FILL_MS) {
      setStatus("sent");
      return;
    }
    if (now - readLastSent() < COOLDOWN_MS) {
      setStatus("cooldown");
      return;
    }
    if (countLinks(message) > MAX_LINKS) {
      setStatus("links");
      return;
    }
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
          message,
          botcheck: false,
        }),
      });
      const body = (await res.json().catch(() => null)) as { success?: boolean } | null;
      const ok = res.ok && body?.success === true;
      if (ok) writeLastSent(now);
      setStatus(ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const sending = status === "sending";
  return (
    <form onSubmit={submit} className="relative grid gap-4">
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
      {/* Honeypots for bots: invisible to people and screen readers, but bots tend to fill every field. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="cursor-pointer rounded-md border-0 bg-ink px-6.5 py-3.5 text-[15px] font-medium text-white transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
        >
          {sending ? c.sending : c.send}
        </button>
        {(status === "error" || status === "cooldown" || status === "links") && (
          <p role="alert" className="m-0 text-[14.5px] text-sig">
            {status === "cooldown" ? c.cooldown : status === "links" ? c.tooManyLinks : c.error}
          </p>
        )}
      </div>
    </form>
  );
}
