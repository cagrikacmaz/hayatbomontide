import { FormEvent, ReactNode, useRef, useState } from "react";

const SESSION_KEY = "bomonti-preview-access";
const ACCESS_SALT = "bomonti-izmir-2026:";
const ACCESS_HASH = "72078a370410ae61fafd0a034d620296a2741fef9a82236aaa752b64e762fd24";

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await window.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function AccessGate({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(
    () => window.sessionStorage.getItem(SESSION_KEY) === "granted",
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsChecking(true);
    setError("");

    try {
      const candidate = await sha256(`${ACCESS_SALT}${password}`);

      if (candidate === ACCESS_HASH) {
        window.sessionStorage.setItem(SESSION_KEY, "granted");
        setIsOpen(true);
        return;
      }

      setPassword("");
      setError("Şifreyi kontrol edip yeniden deneyin.");
      window.setTimeout(() => inputRef.current?.focus(), 0);
    } finally {
      setIsChecking(false);
    }
  }

  if (isOpen) return children;

  return (
    <main className="access-gate">
      <div className="access-gate__mark" aria-hidden="true">B</div>
      <section className="access-card" aria-labelledby="access-title">
        <div className="access-card__topline">
          <span>Hayat Bomonti’de</span>
          <span>İzmir</span>
        </div>
        <p className="access-card__eyebrow">Özel önizleme</p>
        <h1 id="access-title">Şehrin yeni ritmine hoş geldiniz.</h1>
        <p className="access-card__description">
          Bu sunum kontrollü erişime açıktır. Devam etmek için şifrenizi girin.
        </p>
        <form className="access-form" onSubmit={handleSubmit}>
          <label htmlFor="access-password">Şifre</label>
          <div className="access-form__row">
            <input
              ref={inputRef}
              id="access-password"
              name="password"
              type="password"
              inputMode="numeric"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-describedby={error ? "access-error" : undefined}
              autoFocus
              required
            />
            <button type="submit" disabled={isChecking}>
              {isChecking ? "Kontrol ediliyor" : "Giriş"}
              <span aria-hidden="true">↗</span>
            </button>
          </div>
          <p
            id="access-error"
            className="access-form__error"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        </form>
        <p className="access-card__note">Mahall Bomonti İzmir · Canopy by Hilton İzmir</p>
      </section>
    </main>
  );
}
