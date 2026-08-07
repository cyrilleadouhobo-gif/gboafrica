import { headers } from 'next/headers';
import './globals.css';
import { AppDataProvider } from '../context/AppData.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Toast from '../components/Toast.js';

export const metadata = {
  title: 'GBÔ AFRICA GROUP — Plus qu\'une pratique, un style de vie.',
  description: "Sport, fitness et bien-être accessibles à tous. Coaching personnalisé, méthode propriétaire, communauté GBÔ. Abidjan, Côte d'Ivoire.",
};

const THEME_INIT_SCRIPT = `
try {
  var t = localStorage.getItem('gbo_theme');
  document.documentElement.setAttribute('data-theme', t === 'light' ? 'light' : 'dark');
} catch (e) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
`;

export default function RootLayout({ children }) {
  const nonce = headers().get('x-nonce') || undefined;

  return (
    <html lang="fr" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <AppDataProvider>
          <Header />
          <main style={{ minHeight: '60vh' }}>{children}</main>
          <Footer />
          <Toast />
        </AppDataProvider>
      </body>
    </html>
  );
}
