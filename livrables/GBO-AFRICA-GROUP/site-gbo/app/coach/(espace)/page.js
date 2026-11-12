import { getCurrentCoach } from '../../../lib/coachAuth.js';
import { prisma } from '../../../lib/db.js';
import { css } from '../../../lib/css.js';

export const metadata = { title: 'Mon espace — GBÔ', robots: { index: false, follow: false } };

export default async function CoachSpacePage() {
  const coach = await getCurrentCoach();
  const coachProfile = await prisma.coach.findUnique({ where: { id: coach.coachId }, select: { name: true } });

  return (
    <div>
      <h1 style={css("font-family:'Broaven';font-weight:700;font-size:28px;margin-bottom:8px")}>
        Bonjour{coachProfile?.name ? ` ${coachProfile.name}` : ''}
      </h1>
      <p style={css('color:var(--muted,#8a8a8a);font-size:14.5px')}>
        Votre planning et vos clients arriveront bientôt ici.
      </p>
    </div>
  );
}
