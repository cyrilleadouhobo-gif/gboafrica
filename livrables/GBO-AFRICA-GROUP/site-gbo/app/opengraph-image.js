import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Image de partage par défaut (WhatsApp, Facebook, LinkedIn...) — s'applique à toute page
// qui ne définit pas son propre openGraph.images (ex. un article de blog avec sa propre
// photo). Corrige l'absence totale d'og:image relevée par l'audit du 27/10.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logo = readFileSync(join(process.cwd(), 'public/logo-full.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 14, background: '#C6F202', display: 'flex' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={360} height={130} style={{ objectFit: 'contain', marginBottom: 40 }} />
        <div style={{ display: 'flex', fontSize: 42, color: '#fff', fontWeight: 700, textAlign: 'center', maxWidth: 880 }}>
          Plus qu&apos;une pratique, un style de vie.
        </div>
      </div>
    ),
    { ...size }
  );
}
