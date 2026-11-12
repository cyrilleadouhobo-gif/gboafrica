import { getCurrentClient } from '../../../lib/clientAuth.js';
import { prisma } from '../../../lib/db.js';
import { css } from '../../../lib/css.js';

export const metadata = { title: 'Mon espace — GBÔ', robots: { index: false, follow: false } };

export default async function ClientSpacePage() {
  const client = await getCurrentClient();
  const lead = await prisma.lead.findUnique({ where: { id: client.leadId }, select: { name: true } });

  return (
    <div>
      <h1 style={css("font-family:'Broaven';font-weight:700;font-size:28px;margin-bottom:8px")}>
        Bonjour{lead?.name ? ` ${lead.name}` : ''}
      </h1>
      <p style={css('color:var(--muted,#8a8a8a);font-size:14.5px')}>
        Votre planning, vos séances et vos comptes rendus arriveront bientôt ici.
      </p>
    </div>
  );
}
