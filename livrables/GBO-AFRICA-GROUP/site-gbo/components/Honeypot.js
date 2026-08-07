// Hidden from real users, catnip for bots that auto-fill every field. Server rejects
// silently (returns ok:true) whenever this arrives non-empty — see lib/security.js.
export default function Honeypot() {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
    />
  );
}
