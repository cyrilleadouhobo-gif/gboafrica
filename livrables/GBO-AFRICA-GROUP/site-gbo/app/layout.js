import { headers } from 'next/headers';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { AppDataProvider } from '../context/AppData.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Toast from '../components/Toast.js';
import CookieBanner from '../components/CookieBanner.js';
import { SITE_URL, SITE_NAME } from '../lib/site.js';

// Le H1 de la home ("Nous faisons avancer le sport.") est un slogan de marque, volontairement
// gardé tel quel — mais un slogan seul comme <title> ne contient aucun des mots que les gens
// tapent réellement. On ajoute donc le terme de recherche principal devant, en gardant le
// même thème que le H1 (audit du 27/10).
const TITLE = 'Coaching sportif à Abidjan | GBÔ AFRICA GROUP';
const DESCRIPTION = "Sport, fitness et bien-être accessibles à tous. Coaching personnalisé, méthode propriétaire, communauté GBÔ. Abidjan, Côte d'Ivoire.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'fr_FR',
    type: 'website',
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/opengraph-image`],
  },
};

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  description: DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Abidjan',
    addressCountry: 'CI',
  },
};

export default async function RootLayout({ children }) {
  const headerList = await headers();
  const nonce = headerList.get('x-nonce') || undefined;

  return (
    <html lang="fr">
      <head>
        <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }} />
      </head>
      <body>
        <AppDataProvider>
          <Header />
          <main style={{ minHeight: '60vh' }}>{children}</main>
          <Footer />
          <Toast />
          <CookieBanner />
          <Analytics />
        </AppDataProvider>
      </body>
    </html>
  );
}
