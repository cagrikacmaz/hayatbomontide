import { FormEvent, ReactNode, useState } from "react";

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

  function enterDigit(digit: string) {
    setError("");
    setPassword((current) => `${current}${digit}`.slice(0, 4));
  }

  function deleteDigit() {
    setError("");
    setPassword((current) => current.slice(0, -1));
  }

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
          <div className="access-form__desktop">
            <label htmlFor="access-password">Şifre</label>
            <div className="access-form__row">
              <input
                id="access-password"
                name="password"
                type="password"
                inputMode="numeric"
                autoComplete="current-password"
                maxLength={4}
                value={password}
                onChange={(event) => setPassword(event.target.value.replace(/\D/g, "").slice(0, 4))}
                aria-describedby={error ? "access-error" : undefined}
                required
              />
              <button type="submit" disabled={isChecking}>
                {isChecking ? "Kontrol ediliyor" : "Giriş"}
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
          <div className="access-keypad">
            <div
              className="access-code"
              role="textbox"
              aria-label="Şifre"
              aria-readonly="true"
              aria-describedby={error ? "access-error" : undefined}
            >
              {[0, 1, 2, 3].map((position) => (
                <span
                  key={position}
                  className={position < password.length ? "is-filled" : ""}
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="access-keypad__grid" aria-label="Sayısal şifre tuşları">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  className="access-keypad__digit"
                  onClick={() => enterDigit(digit)}
                  aria-label={`${digit} rakamı`}
                >
                  {digit}
                </button>
              ))}
              <button
                type="button"
                className="access-keypad__utility"
                onClick={deleteDigit}
                aria-label="Son rakamı sil"
              >
                Sil
              </button>
              <button
                type="button"
                className="access-keypad__digit"
                onClick={() => enterDigit("0")}
                aria-label="0 rakamı"
              >
                0
              </button>
              <button
                type="submit"
                className="access-keypad__utility access-keypad__submit"
                disabled={isChecking || password.length !== 4}
              >
                Giriş
              </button>
            </div>
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
