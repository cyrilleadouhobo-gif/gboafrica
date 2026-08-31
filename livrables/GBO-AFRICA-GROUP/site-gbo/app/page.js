'use client';

import Link from 'next/link';
import { css } from '../lib/css.js';
import { useAppData } from '../context/AppData.js';
import ImageSlot from '../components/ImageSlot.js';
import Honeypot from '../components/Honeypot.js';
import Reveal from '../components/Reveal.js';
import { stockPhoto } from '../lib/stockPhoto.js';
import { POLES, badgeStyle } from '../data/poles.js';
import { VALUES, METHOD_STEPS, TRANSFORMATIONS, TESTIMONIALS, PARTNERS, BLOG_PREVIEW } from '../data/content.js';

export default function HomePage() {
  const { showToast } = useAppData();

  const scrollToMission = () => {
    document.querySelector('[data-anchor="mission"]')?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitNewsletter = async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: f.get('email'), website: f.get('website') }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Une erreur est survenue, réessayez.');
        return;
      }
      e.target.reset();
      showToast("Presque terminé — confirmez via l'e-mail (double opt-in).");
    } catch {
      showToast('Connexion impossible. Réessayez.');
    }
  };

  const poles = POLES.map((p) => ({ ...p, statusLabel: p.status === 'op' ? 'Disponible' : 'Bientôt' }));

  return (
    <div>
      <section style={css('position:relative;background:#050505;padding:clamp(48px,9vw,96px) clamp(20px,5vw,64px) clamp(64px,10vw,120px)')}>
        <div style={css('position:absolute;inset:0;overflow:hidden;pointer-events:none')}>
          <div
            style={css(
              'position:absolute;top:-140px;left:-100px;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(198,242,2,.16),transparent 70%)'
            )}
          />
          <div
            style={css(
              'position:absolute;bottom:-160px;right:-120px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(198,242,2,.12),transparent 70%)'
            )}
          />
        </div>

        <div style={css('position:relative;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(380px,1fr));gap:56px;align-items:center')}>
          <div>
            <div
              style={css(
                "display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border-radius:30px;border:1px solid rgba(198,242,2,.4);background:rgba(198,242,2,.08);font-size:12px;font-weight:600;letter-spacing:.5px;color:#C6F202;margin-bottom:22px;animation:fadeUp .6s both"
              )}
            >
              ● Abidjan · Côte d&apos;Ivoire
            </div>
            <h1 style={css("font-family:'Broaven',sans-serif;font-weight:700;font-size:clamp(32px,4.6vw,54px);line-height:1.02;letter-spacing:-1.5px;color:#fff;max-width:12ch;animation:fadeUp .7s .05s both")}>
              Plus qu&apos;une pratique, un <span style={{ color: '#C6F202' }}>style de vie.</span>
            </h1>
            <p style={css("font-size:clamp(15px,1.6vw,18px);color:rgba(255,255,255,.82);max-width:46ch;margin-top:22px;line-height:1.55;animation:fadeUp .7s .12s both")}>
              Sport, fitness et bien-être accessibles à tous. Un accompagnement premium, une méthode propriétaire, une communauté. GBÔ AFRICA GROUP.
            </p>
            <div style={css('display:flex;flex-wrap:wrap;gap:14px;margin-top:34px;animation:fadeUp .7s .2s both')}>
              <Link href="/fitness" className="btn-cta" style={css('padding:16px 30px;border-radius:12px;background:#C6F202;color:#000;font-weight:700;font-size:16px')}>
                Commencer
              </Link>
              <button
                onClick={scrollToMission}
                className="btn-cta"
                style={css('padding:16px 30px;border-radius:12px;border:1px solid rgba(255,255,255,.3);color:#fff;font-weight:700;font-size:16px;background:rgba(255,255,255,.05)')}
              >
                Découvrir GBÔ
              </button>
            </div>
          </div>

          <div style={css('position:relative')}>
            <div
              style={css(
                'position:relative;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,.12);background:#0c0c0c;aspect-ratio:4/3;animation:fadeUp .7s .15s both'
              )}
            >
              <ImageSlot placeholder="Visuel GBÔ — mouvement, énergie" src={stockPhoto('fitnessMen', 'home-hero', '1200x900')} />
              <div style={css('position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.05) 0%,rgba(0,0,0,.5) 100%)')} />
            </div>

            <div
              style={css(
                'position:absolute;top:-18px;left:24px;display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:14px;background:#0c0c0c;border:1px solid rgba(255,255,255,.12);box-shadow:0 14px 32px rgba(0,0,0,.45);animation:fadeUp .7s .3s both'
              )}
            >
              <span
                style={css(
                  'width:34px;height:34px;flex-shrink:0;border-radius:10px;background:rgba(198,242,2,.12);color:#C6F202;display:flex;align-items:center;justify-content:center'
                )}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </span>
              <span>
                <span style={css('display:block;font-size:13.5px;font-weight:700;color:#fff')}>Communauté</span>
                <span style={css('display:block;font-size:11.5px;color:var(--muted,#8a8a8a)')}>Active &amp; engagée</span>
              </span>
            </div>

            <div
              style={css(
                'position:absolute;bottom:-18px;right:24px;display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:14px;background:#0c0c0c;border:1px solid rgba(255,255,255,.12);box-shadow:0 14px 32px rgba(0,0,0,.45);animation:fadeUp .7s .35s both'
              )}
            >
              <span
                style={css(
                  'width:34px;height:34px;flex-shrink:0;border-radius:10px;background:rgba(198,242,2,.12);color:#C6F202;display:flex;align-items:center;justify-content:center'
                )}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 000-7.6z" />
                </svg>
              </span>
              <span>
                <span style={css('display:block;font-size:13.5px;font-weight:700;color:#fff')}>Bien-être</span>
                <span style={css('display:block;font-size:11.5px;color:var(--muted,#8a8a8a)')}>Corps &amp; esprit</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <Reveal as="section" style={css('padding:clamp(64px,11vw,140px) clamp(20px,5vw,64px);text-align:center')} data-anchor="mission">
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <p style={css("font-size:clamp(26px,4.4vw,46px);font-family:'Broaven';font-weight:500;line-height:1.25;letter-spacing:-1px")}>
            GBÔ est un <span style={{ color: 'var(--lime,#C6F202)' }}>écosystème du mouvement</span> — sport, bien-être, communauté et formation réunis sous une même
            exigence : l&apos;excellence accessible.
          </p>
        </div>
      </Reveal>

      <Reveal
        as="section"
        style={css(
          'padding:clamp(56px,9vw,120px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b);border-top:1px solid var(--border,rgba(255,255,255,.08));border-bottom:1px solid var(--border,rgba(255,255,255,.08))'
        )}
      >
        <div style={css('max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:clamp(32px,5vw,72px)')}>
          <div>
            <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:16px')}>Notre mission</div>
            <p style={css('font-size:clamp(18px,2.4vw,24px);line-height:1.5;font-weight:500')}>
              Développer des solutions innovantes permettant à chaque individu et à chaque organisation d&apos;intégrer durablement le sport, l&apos;activité
              physique et le bien-être dans leur quotidien.
            </p>
          </div>
          <div>
            <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:16px')}>Notre vision</div>
            <p style={css('font-size:clamp(18px,2.4vw,24px);line-height:1.5;font-weight:500')}>
              Devenir la référence africaine du sport, du fitness et du bien-être accessible à tous.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,120px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:10px')}>Nos valeurs</div>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,4.5vw,44px);letter-spacing:-1px;margin-bottom:34px")}>Ce qui nous tient debout.</h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px')}>
            {VALUES.map((v, i) => (
              <Reveal
                key={v.n}
                delay={i * 70}
                className="hover-card"
                style={css(
                  'padding:24px;border-radius:18px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))'
                )}
              >
                <div
                  style={css(
                    "width:44px;height:44px;border-radius:12px;background:rgba(198,242,2,.12);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center;margin-bottom:16px;font-family:'Broaven';font-weight:700;font-size:18px"
                  )}
                >
                  {v.n}
                </div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{v.title}</div>
                <div style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.5')}>{v.desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,120px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b)')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:38px')}>
            <div>
              <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:10px')}>Actif de marque</div>
              <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,4.5vw,44px);letter-spacing:-1px")}>La Méthode GBÔ</h2>
            </div>
            <Link href="/fitness" style={css('padding:12px 22px;border-radius:11px;border:1px solid var(--border,rgba(255,255,255,.2));font-weight:700;font-size:14px;color:var(--fg,#fff)')}>
              En savoir plus →
            </Link>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px')}>
            {METHOD_STEPS.map((m, i) => (
              <Reveal
                key={m.n}
                delay={i * 70}
                className="hover-card"
                style={css('padding:22px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.09));position:relative;overflow:hidden')}
              >
                <div style={css("font-family:'Broaven';font-weight:700;font-size:40px;color:rgba(198,242,2,.22);line-height:1")}>{m.n}</div>
                <div style={{ fontWeight: 700, fontSize: 17, margin: '8px 0 6px' }}>{m.title}</div>
                <div style={css('font-size:13px;color:var(--muted,#8a8a8a);line-height:1.5')}>{m.desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,120px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:10px')}>L&apos;écosystème</div>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,4.5vw,44px);letter-spacing:-1px;margin-bottom:34px")}>Six pôles, une marque.</h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px')}>
            {poles.map((p, i) => (
              <Reveal
                as={Link}
                key={p.key}
                href={p.key === 'fitness' ? '/fitness' : `/poles/${p.key}`}
                delay={i * 60}
                className="hover-card"
                style={css('display:block;padding:26px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--glass,rgba(255,255,255,.02));cursor:pointer')}
              >
                <div style={css('display:flex;align-items:center;justify-content:space-between;margin-bottom:18px')}>
                  <div
                    style={css(
                      "width:48px;height:48px;border-radius:13px;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;font-family:'Broaven';font-weight:700;font-size:20px"
                    )}
                  >
                    {p.mono}
                  </div>
                  <span style={css(badgeStyle(p.status))}>{p.statusLabel}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 6 }}>{p.name}</div>
                <div style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.5')}>{p.tagline}</div>
                <div style={css('margin-top:18px;font-size:13px;font-weight:700;color:var(--lime,#C6F202)')}>{p.cta} →</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,120px) clamp(20px,5vw,64px)')}>
        <div
          style={css(
            'max-width:1200px;margin:0 auto;padding:clamp(40px,6vw,64px);border-radius:28px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--glass,rgba(255,255,255,.03));text-align:center'
          )}
        >
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:14px')}>
            Vous êtes un professionnel du fitness ?
          </div>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,5vw,48px);letter-spacing:-1px;margin-bottom:18px")}>
            GBÔ vous accompagne aussi.
          </h2>
          <p style={css('font-size:15px;color:var(--muted,#8a8a8a);font-weight:600;letter-spacing:.5px;margin-bottom:30px')}>
            Digitalisation · Talents · Acquisition · Animation
          </p>
          <Link
            href="/pour-les-salles"
            className="btn-cta"
            style={css('display:inline-block;padding:16px 30px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:15px')}
          >
            Découvrir les solutions pour les salles →
          </Link>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,120px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b)')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:10px')}>Preuves</div>
          <div style={css('display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:12px;margin-bottom:30px')}>
            <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,4.5vw,44px);letter-spacing:-1px")}>Des transformations réelles.</h2>
            <span style={css('font-size:12px;color:var(--muted,#8a8a8a);max-width:34ch')}>Publiées avec le consentement des membres. Aucun visuel n&apos;est fictif.</span>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px')}>
            {TRANSFORMATIONS.map((t, i) => (
              <Reveal
                key={t.id}
                delay={i * 60}
                className="hover-card"
                style={css('border-radius:18px;overflow:hidden;border:1px solid var(--border,rgba(255,255,255,.09))')}
              >
                <div style={{ aspectRatio: '3/4', position: 'relative' }}>
                  <ImageSlot placeholder={t.ph} src={stockPhoto('portrait', t.id, '600x800')} />
                </div>
                <div style={{ padding: 14 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</div>
                  <div style={css('font-size:13px;color:var(--muted,#8a8a8a)')}>{t.detail}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,120px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,4.5vw,44px);letter-spacing:-1px;margin-bottom:34px")}>Ils vivent GBÔ.</h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px')}>
            {TESTIMONIALS.map((t, i) => (
              <Reveal
                key={t.id}
                delay={i * 70}
                className="hover-card"
                style={css('padding:28px;border-radius:18px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))')}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="var(--lime,#C6F202)" style={{ opacity: 0.9 }}>
                  <path d="M10 7H6a3 3 0 00-3 3v7h7v-7H6c0-1 0-3 4-3zm11 0h-4a3 3 0 00-3 3v7h7v-7h-4c0-1 0-3 4-3z" />
                </svg>
                <p style={{ fontSize: 16, lineHeight: 1.55, margin: '14px 0 18px' }}>{t.quote}</p>
                <div style={css('display:flex;align-items:center;gap:12px')}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', flex: '0 0 auto', position: 'relative' }}>
                    <ImageSlot shape="circle" placeholder="Photo" src={stockPhoto('portrait', t.id, '200x200')} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                    <div style={css('font-size:12.5px;color:var(--muted,#8a8a8a)')}>{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(40px,6vw,72px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b);overflow:hidden')}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:26px')}>Ils nous font confiance</div>
          <div style={css('display:flex;gap:48px;flex-wrap:wrap;justify-content:center;align-items:center;opacity:.75')}>
            {PARTNERS.map((p, i) => (
              <span key={i} style={css("font-family:'Broaven';font-weight:700;font-size:clamp(16px,2.4vw,24px);color:var(--muted,#8a8a8a)")}>
                {p}
              </span>
            ))}
          </div>
          <div style={css('font-size:11px;color:var(--muted,#8a8a8a);margin-top:22px;opacity:.7')}>Logos réels uniquement — emplacements réservés aux partenaires officiels.</div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,120px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:12px;margin-bottom:30px')}>
            <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,4.5vw,44px);letter-spacing:-1px")}>Le journal GBÔ</h2>
            <Link href="/blog" style={css('padding:12px 22px;border-radius:11px;border:1px solid var(--border,rgba(255,255,255,.2));font-weight:700;font-size:14px;color:var(--fg,#fff)')}>
              Tout le blog →
            </Link>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px')}>
            {BLOG_PREVIEW.map((b, i) => (
              <Reveal
                as={Link}
                key={b.id}
                href="/blog"
                delay={i * 70}
                className="hover-card"
                style={css('border-radius:18px;overflow:hidden;border:1px solid var(--border,rgba(255,255,255,.09));cursor:pointer;display:block')}
              >
                <div style={{ aspectRatio: '16/10', position: 'relative' }}>
                  <ImageSlot placeholder="Visuel article" src={stockPhoto('team', b.id, '600x375')} />
                </div>
                <div style={{ padding: 18 }}>
                  <div style={css('font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600')}>
                    {b.cat} · {b.read}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 18, margin: '8px 0 6px', lineHeight: 1.3 }}>{b.title}</div>
                  <div style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.5')}>{b.excerpt}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,110px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b)')}>
        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(26px,4vw,40px);letter-spacing:-1px;margin-bottom:12px")}>Restez dans le mouvement.</h2>
          <p style={css('color:var(--muted,#8a8a8a);font-size:16px;margin-bottom:26px;line-height:1.5')}>
            Conseils fitness, nutrition et bien-être, une fois par semaine. Double opt-in, désinscription en un clic.
          </p>
          <form onSubmit={submitNewsletter} style={css('display:flex;flex-wrap:wrap;gap:10px;max-width:520px;margin:0 auto')}>
            <input
              required
              type="email"
              name="email"
              placeholder="Votre e-mail"
              style={css(
                "flex:1;min-width:220px;padding:16px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:15px"
              )}
            />
            <button type="submit" className="btn-cta" style={css('padding:16px 26px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:15px')}>
              S&apos;inscrire
            </button>
            <Honeypot />
          </form>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(64px,10vw,130px) clamp(20px,5vw,64px);background:var(--lime,#C6F202);color:#000')}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(34px,6vw,64px);letter-spacing:-2px;line-height:1")}>Prêt à commencer ?</h2>
          <p style={css('font-size:clamp(16px,2.2vw,20px);margin:18px auto 32px;max-width:52ch;opacity:.85;line-height:1.5')}>
            Votre premier bilan est offert. Un conseiller GBÔ vous accompagne pas à pas.
          </p>
          <Link
            href="/fitness"
            className="btn-cta"
            style={css('padding:18px 40px;border-radius:14px;background:#000;color:#C6F202;font-weight:700;font-size:17px;display:inline-block')}
          >
            Démarrer mon accompagnement
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
