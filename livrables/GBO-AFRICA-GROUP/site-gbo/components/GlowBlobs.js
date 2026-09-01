// Halos verts ambiants réutilisables (façon hero d'accueil), en version discrète et animée.
// Le parent doit avoir position:relative — ce composant se pose en absolute inset:0.
// `compact` réduit la taille/le débord des halos, pour les blocs de texte courts (sans
// grande section hero autour) où la version pleine taille couvrirait tout le contenu.
export default function GlowBlobs({ className = '', compact = false }) {
  const sizeClass = compact ? ' glow-blob-compact' : '';
  return (
    <div className={`glow-blobs ${className}`} aria-hidden="true">
      <span className={`glow-blob glow-blob-a${sizeClass}`} />
      <span className={`glow-blob glow-blob-b${sizeClass}`} />
    </div>
  );
}
