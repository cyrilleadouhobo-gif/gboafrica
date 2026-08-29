import { css } from '../../lib/css.js';
import { prisma } from '../../lib/db.js';
import ImageSlot from '../../components/ImageSlot.js';
import Reveal from '../../components/Reveal.js';
import { stockPhoto } from '../../lib/stockPhoto.js';
import { ABIDJAN_COMMUNES } from '../../lib/constants.js';

export const metadata = { title: 'Nos coachs — GBÔ AFRICA GROUP' };
export const dynamic = 'force-dynamic';

export default async function CoachsPage({ searchParams }) {
  const sp = await searchParams;
  const commune = (sp?.commune || '').trim();

  const allCoaches = await prisma.coach.findMany({ orderBy: { name: 'asc' } });
  const coaches = commune ? allCoaches.filter((c) => c.zones.toLowerCase().includes(commune.toLowerCase())) : allCoaches;

  const covered = new Set();
  allCoaches.forEach((c) => c.zones.split(',').forEach((z) => covered.add(z.trim())));

  return (
    <div>
      <section style={css('padding:clamp(80px,10vw,120px) clamp(20px,5vw,64px) clamp(30px,4vw,50px)')}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>
            Nos coachs
          </div>
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,6vw,54px);letter-spacing:-1.5px;max-width:16ch")}>
            Un réseau de coachs sélectionnés et formés.
          </h1>
          <p style={css('font-size:clamp(16px,2.2vw,20px);color:var(--muted,#8a8a8a);max-width:58ch;margin-top:20px;line-height:1.5')}>
            {allCoaches.length} coach{allCoaches.length > 1 ? 's' : ''} actif{allCoaches.length > 1 ? 's' : ''} sur {covered.size} commune
            {covered.size > 1 ? 's' : ''} d&apos;Abidjan. Chaque coach est affecté selon sa spécialité, sa zone et vos disponibilités.
          </p>
        </div>
      </section>

      <Reveal as="section" style={css('padding:clamp(20px,3vw,40px) clamp(20px,5vw,64px) clamp(64px,9vw,110px)')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <form method="get" style={css('display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px')}>
            <a
              href="/coachs"
              style={css(
                `padding:9px 16px;border-radius:20px;border:1px solid ${
                  !commune ? 'var(--lime,#C6F202)' : 'var(--border,rgba(255,255,255,.14))'
                };font-size:13px;font-weight:600;color:${!commune ? 'var(--lime,#C6F202)' : 'var(--muted,#8a8a8a)'}`
              )}
            >
              Toutes les communes
            </a>
            {ABIDJAN_COMMUNES.filter((c) => covered.has(c)).map((c) => (
              <a
                key={c}
                href={`/coachs?commune=${encodeURIComponent(c)}`}
                style={css(
                  `padding:9px 16px;border-radius:20px;border:1px solid ${
                    commune === c ? 'var(--lime,#C6F202)' : 'var(--border,rgba(255,255,255,.14))'
                  };font-size:13px;font-weight:600;color:${commune === c ? 'var(--lime,#C6F202)' : 'var(--muted,#8a8a8a)'}`
                )}
              >
                {c}
              </a>
            ))}
          </form>

          {coaches.length === 0 ? (
            <div style={css('padding:32px;border-radius:16px;border:1px dashed var(--border,rgba(255,255,255,.18));color:var(--muted,#8a8a8a);text-align:center')}>
              Aucun coach ne couvre cette commune pour le moment.{' '}
              <a href="/fitness" style={{ color: 'var(--lime,#C6F202)' }}>
                Laissez-nous vos coordonnées
              </a>{' '}
              et on vous recontacte dès qu&apos;un coach est disponible.
            </div>
          ) : (
            <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px')}>
              {coaches.map((c, i) => (
                <Reveal
                  key={c.id}
                  delay={i * 50}
                  className="hover-card"
                  style={css('border-radius:18px;overflow:hidden;border:1px solid var(--border,rgba(255,255,255,.09))')}
                >
                  <div style={{ aspectRatio: '4/5', position: 'relative' }}>
                    <ImageSlot placeholder={`Photo de ${c.name}`} src={stockPhoto('portrait', c.id, '400x500')} />
                  </div>
                  <div style={{ padding: 18 }}>
                    <div style={css('display:flex;justify-content:space-between;align-items:flex-start;gap:8px')}>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>{c.name}</div>
                      <span
                        style={css(
                          c.dispo === 'DISPONIBLE'
                            ? 'flex:0 0 auto;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:rgba(52,211,153,.15);color:#34d399;border:1px solid rgba(52,211,153,.4)'
                            : 'flex:0 0 auto;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:var(--surface2,#222);color:var(--muted,#8a8a8a);border:1px solid var(--border,rgba(255,255,255,.14))'
                        )}
                      >
                        {c.dispo === 'DISPONIBLE' ? 'Disponible' : 'Complet'}
                      </span>
                    </div>
                    <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);margin-top:6px;line-height:1.45')}>{c.spec}</div>
                    <div style={css('font-size:12.5px;color:var(--lime,#C6F202);margin-top:8px;font-weight:600')}>{c.zones}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}
