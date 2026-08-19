import { headers } from 'next/headers';
import './globals.css';
import { AppDataProvider } from '../context/AppData.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Toast from '../components/Toast.js';
import CookieBanner from '../components/CookieBanner.js';
import { SITE_URL, SITE_NAME } from '../lib/site.js';

const TITLE = 'GBÔ AFRICA GROUP — Plus qu\'une pratique, un style de vie.';
const DESCRIPTION = "Sport, fitness et bien-être accessibles à tous. Coaching personnalisé, méthode propriétaire, communauté GBÔ. Abidjan, Côte d'Ivoire.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'fr_FR',
    type: 'website',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }} />
      </head>
      <body>
        <AppDataProvider>
          <Header />
          <main style={{ minHeight: '60vh' }}>{children}</main>
          <Footer />
          <Toast />
          <CookieBanner />
        </AppDataProvider>
      </body>
    </html>
  );
}
