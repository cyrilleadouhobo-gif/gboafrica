const STATUS_MAP = {
  disponible: { label: 'Disponible', bg: '#E8F5E9', text: '#2E7D32' },
  vendu: { label: 'Vendu', bg: '#F5F5F5', text: '#666' },
  loué: { label: 'Loué', bg: '#FFF3E0', text: '#E65100' },
  en_attente: { label: 'En attente', bg: '#FFF3E0', text: '#E65100' },
  confirmée: { label: 'Confirmée', bg: '#E8F5E9', text: '#2E7D32' },
  annulée: { label: 'Annulée', bg: '#FFEBEE', text: '#C62828' }
};

export default function StatusBadge({ status }) {
  const info = STATUS_MAP[status] || { label: status, bg: '#F0F0F0', text: '#666' };
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.4rem 0.9rem',
        borderRadius: '12px',
        fontSize: '0.85rem',
        fontWeight: 500,
        background: info.bg,
        color: info.text
      }}
    >
      {info.label}
    </span>
  );
}
