// BulkActionBar.jsx — Barra de ações em massa — Frota 162 DS (node 4056:6361)
// Props:
//   count          {number}  — quantos itens selecionados
//   selectionType  {'na_only'|'np_only'|'mixed'}
//   onClose        {fn}      — limpar seleção

// ─── Ícones ───────────────────────────────────────────────────────────────────
const BulkIconEraser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 20H7L3 16l10-10 7 7-3.5 3.5"/>
    <path d="M6.5 17.5l4-4"/>
  </svg>
);
const BulkIconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const BulkIconFileText = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const BulkIconPrint = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
    <rect x="6" y="14" width="12" height="8"/>
  </svg>
);
const BulkIconTag = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const BulkIconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const BulkIconCreditCard = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);
const BulkIconXCircle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

// ─── Botão individual ─────────────────────────────────────────────────────────
function BulkBtn({ icon, label, disabled, tooltip, onClick }) {
  const [hov, setHov] = React.useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '8px 12px',
    background: disabled ? 'var(--color-neutral-200)' : hov ? 'var(--color-neutral-200)' : '#ffffff',
    border: '1px solid var(--color-neutral-400)',
    borderRadius: 8,
    fontFamily: 'var(--font-family-primary)',
    fontSize: 12, fontWeight: 700, lineHeight: '15px',
    color: disabled ? 'var(--color-neutral-500)' : 'var(--color-neutral-1000)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    whiteSpace: 'nowrap',
    transition: 'background .12s',
    flexShrink: 0,
    position: 'relative',
  };

  const btn = (
    <button
      style={base}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}>
      {icon}
      {label}
      {/* tooltip */}
      {disabled && tooltip && hov && (
        <span style={{
          position: 'absolute', bottom: 'calc(100% + 6px)', left: '50%',
          transform: 'translateX(-50%)',
          background: '#1c1c1e', color: '#fff',
          fontSize: 11, padding: '4px 8px', borderRadius: 4,
          whiteSpace: 'nowrap', zIndex: 999, pointerEvents: 'none',
          fontFamily: 'var(--font-family-primary)',
        }}>{tooltip}</span>
      )}
    </button>
  );

  return btn;
}

// ─── Ações contextuais ────────────────────────────────────────────────────────
function BulkActions({ selectionType }) {
  if (selectionType === 'na_only') return (
    <>
      <BulkBtn icon={<BulkIconUser/>}       label="Indicar condutor" />
      <BulkBtn icon={<BulkIconFileText/>}   label="Solicitar boleto SNE" />
      <BulkBtn icon={<BulkIconPrint/>}      label="Imprimir" />
      <BulkBtn icon={<BulkIconTag/>}        label="Status de tratamento" />
    </>
  );
  if (selectionType === 'np_only') return (
    <>
      <BulkBtn icon={<BulkIconCreditCard/>} label="Solicitar pagamento em lote" />
      <BulkBtn icon={<BulkIconDownload/>}   label="Baixar boletos" />
      <BulkBtn icon={<BulkIconPrint/>}      label="Imprimir" />
      <BulkBtn icon={<BulkIconTag/>}        label="Status de tratamento" />
    </>
  );
  // mixed
  return (
    <>
      <BulkBtn icon={<BulkIconPrint/>}      label="Imprimir" />
      <BulkBtn icon={<BulkIconTag/>}        label="Status de tratamento" />
      <BulkBtn icon={<BulkIconXCircle/>}    label="Inativar" />
      <BulkBtn icon={<BulkIconUser/>}       label="Indicar condutor"        disabled tooltip="Disponível apenas para Indicação de Condutor" />
      <BulkBtn icon={<BulkIconCreditCard/>} label="Solicitar pagamento"     disabled tooltip="Disponível apenas para Infrações a Pagar" />
    </>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
function BulkActionBar({ count, selectionType = 'na_only', onClose }) {
  if (!count || count === 0) return null;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'var(--color-primary-200)',
      borderRadius: 10,
      padding: '8px 12px',
      marginBottom: 12,
      gap: 16,
      fontFamily: 'var(--font-family-primary)',
    }}>
      {/* Esquerda — contador */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 2,
        fontSize: 14, fontWeight: 400, color: 'var(--color-neutral-1000)',
        whiteSpace: 'nowrap', flexShrink: 0,
      }}>
        <span>Selecionado:</span>
        <span style={{ fontWeight: 700, marginLeft: 2 }}>{count}</span>
      </div>

      {/* Direita — ações */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <BulkBtn icon={<BulkIconEraser/>} label="Limpar seleção" onClick={onClose} />
        <BulkActions selectionType={selectionType} />
      </div>
    </div>
  );
}

window.BulkActionBar = BulkActionBar;
