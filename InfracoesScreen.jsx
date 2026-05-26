// InfracoesScreen.jsx — Módulo Multas | Infrações — Frota 162
const { useState: useInfState, useRef: useInfRef, useEffect: useInfEffect, useCallback: useInfCallback } = React;

// ─── Placeholder color global ─────────────────────────────────────────────────
(function injectInfStyles() {
  if (document.getElementById('inf-global-style')) return;
  const s = document.createElement('style');
  s.id = 'inf-global-style';
  s.textContent = `
    .inf-placeholder-input::placeholder { color: var(--color-neutral-700) !important; opacity: 1; }
    @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUpModal  { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  `;
  document.head.appendChild(s);
})();

// ─── Router context simples (sem React Router externo) ───────────────────────
// Exposto globalmente para que o App shell possa reagir
function useInfRouter() {
  const [currentAit, setCurrentAit] = useInfState(null);
  return { currentAit, goToDetail: setCurrentAit, goBack: () => setCurrentAit(null) };
}
window._infRouterState = null; // será sobrescrito pelo App

// ─── SVG Icons ───────────────────────────────────────────────────────────────

const IconPlus = () =>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>;

const IconPrint = () =>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" />
  </svg>;

const IconUpload = () =>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
  </svg>;

const IconDownload = () =>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>;

// IconChevronDown — disponível via Header.jsx (escopo compartilhado Babel)

const IconSearch = () =>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>;

const IconFilter = () =>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>;

const IconX = () =>
<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>;

// IconEye — disponível via Header.jsx (escopo compartilhado Babel)

const IconEdit = () =>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>;

const IconMoreVert = () =>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
  </svg>;

const IconPaperclip = () =>
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>;

const IconRefresh = () =>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>
  </svg>;

const IconStatus = () =>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>
  </svg>;

const IconChevronRight = () =>
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>;

const IconCheck = () =>
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>;

const IconArrowLeft = () =>
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>;

const IconArrowRight = () =>
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>;

const IconLayoutDashboard = () =>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>;

const IconListView = () =>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <circle cx="3" cy="6" r="0.5" fill="currentColor"/><circle cx="3" cy="12" r="0.5" fill="currentColor"/>
    <circle cx="3" cy="18" r="0.5" fill="currentColor"/>
  </svg>;

// ─── Dropdown select cosmético ────────────────────────────────────────────────
function FilterSelect({ label, value, options, onChange }) {
  const [open, setOpen] = useInfState(false);
  const ref = useInfRef(null);
  useInfEffect(() => {
    if (!open) return;
    const handler = (e) => {if (ref.current && !ref.current.contains(e.target)) setOpen(false);};
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', minWidth: 140 }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6,
          height: 36, padding: '0 10px',
          border: '1px solid var(--color-neutral-400)',
          borderRadius: 'var(--border-radius-xsm)',
          background: 'var(--color-neutral-100)',
          fontFamily: 'var(--font-family-primary)',
          fontSize: 13, color: value ? 'var(--color-neutral-1000)' : 'var(--color-neutral-700)',
          cursor: 'pointer', whiteSpace: 'nowrap', width: '100%',
          transition: 'border-color .15s',
          borderColor: open ? 'var(--color-primary-500)' : undefined
        }}>
        
        <span>{value || label}</span>
        <IconChevronDown />
      </button>
      {open &&
      <div style={{
        position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 300,
        minWidth: '100%', background: 'var(--color-neutral-100)',
        border: '1px solid var(--color-neutral-300)',
        borderRadius: 'var(--border-radius-xsm)',
        boxShadow: 'var(--shadow-level-2)',
        padding: '4px 0'
      }}>
          {options.map((opt) => {
            const isSel = opt === value;
            return (
        <button key={opt}
        onClick={() => {onChange(opt);setOpen(false);}}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', textAlign: 'left',
          padding: '8px 12px', border: 'none',
          background: isSel ? 'var(--color-primary-100)' : 'transparent',
          fontFamily: 'var(--font-family-primary)', fontSize: 13,
          color: isSel ? 'var(--color-primary-600)' : 'var(--color-neutral-1000)',
          fontWeight: isSel ? 600 : 400,
          cursor: 'pointer', transition: 'background .1s'
        }}
        onMouseEnter={(e) => { if (!isSel) e.currentTarget.style.background = 'var(--color-neutral-200)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = isSel ? 'var(--color-primary-100)' : 'transparent'; }}>
          <span>{opt}</span>
          {isSel && <span style={{ color: 'var(--color-primary-500)', display: 'inline-flex', flexShrink: 0 }}><IconCheck /></span>}
            </button>
            );
          })}
        </div>
      }
    </div>);

}

// ─── Badge de status (pill) ───────────────────────────────────────────────────
function StatusBadge({ type, onClick }) {
  const configs = {
    'INDIQUE AGORA': { bg: '#f9401b', color: '#fff', clickable: true },
    'INDICAÇÃO SIMPLIFICADA': { bg: '#f9401b', color: '#fff', clickable: false },
    'BOLETO 40% DISPONÍVEL': { bg: 'var(--color-success-100)', color: 'var(--color-success-700)', clickable: false },
    'BOLETO SOLICITADO': { bg: 'var(--color-information-100)', color: 'var(--color-information-700)', clickable: false },
    'AGUARDANDO ACEITE': { bg: 'var(--color-information-100)', color: 'var(--color-information-700)', clickable: false },
    'AGUARDANDO COMPROVANTE': { bg: 'var(--color-warning-100)', color: 'var(--color-warning-700)', clickable: false },
    'PGTO PROCESSANDO': { bg: 'var(--color-information-100)', color: 'var(--color-information-700)', clickable: false },
    'ANALISE DE DOCUMENTOS': { bg: 'var(--color-warning-100)', color: 'var(--color-warning-700)', clickable: false },
    'EM PROCESSAMENTO': { bg: 'var(--color-neutral-200)', color: 'var(--color-neutral-700)', clickable: false },
    'DOCUMENTOS INCORRETOS': { bg: 'var(--color-warning-100)', color: 'var(--color-warning-700)', clickable: true },
    'CONDUTOR INDICADO': { bg: 'var(--color-success-100)', color: 'var(--color-success-700)', clickable: false },
    'INDICAÇÃO REALIZADA': { bg: 'var(--color-success-100)', color: 'var(--color-success-700)', clickable: false },
    'INDIQUE OFFLINE': { bg: 'var(--color-neutral-200)', color: 'var(--color-neutral-600)', clickable: false },
    'VENCIDA': { bg: 'var(--color-neutral-200)', color: 'var(--color-neutral-500)', clickable: false },
    'PAGAR': { bg: '#f9401b', color: '#fff', clickable: true },
    'MULTA PAGA': { bg: 'var(--color-success-100)', color: 'var(--color-success-700)', clickable: false },
    'PAGO': { bg: 'var(--color-success-100)', color: 'var(--color-success-700)', clickable: false },
    'TAG LABEL': { bg: 'var(--color-neutral-200)', color: 'var(--color-neutral-600)', clickable: false }
  };
  const tooltips = {
    'INDIQUE AGORA': 'Faça a indicação de condutor.',
    'EM PROCESSAMENTO': 'Sua indicação foi enviada e está sendo processada pelo sistema.',
    'INDICAÇÃO SIMPLIFICADA': 'Sua indicação foi enviada e está sendo processada pelo sistema.',
    'ENVIADA AO ÓRGÃO': 'Encaminhado ao órgão autuador.',
    'DOCUMENTOS INCORRETOS': 'Os documentos enviados estão incorretos. Corrija e reenvie.',
    'FALHA NA INDICAÇÃO': 'Não foi possível concluir a indicação.',
    'INDEFERIDA PELO ÓRGÃO': 'O órgão autuador não aceitou a indicação.',
    'INDIQUE OFFLINE': 'Essa infração precisa ser indicada presencialmente no órgão.',
    'AGUARDANDO ACEITE': 'Enviada ao aplicativo CDT do condutor.',
    'RECUSADO PELO CONDUTOR': 'O condutor recusou a indicação.',
    'INDICAÇÃO VENCIDA': 'O prazo para indicar o condutor expirou.',
    'VENCIDA': 'O prazo para indicar o condutor expirou.',
    'VENCIDA SEM AÇÃO DO CONDUTOR': 'O condutor recebeu a notificação, mas não aceitou a tempo.',
    'CANCELADA PELO GESTOR': 'O processo de indicação do condutor foi cancelado pelo gestor.',
    'CONDUTOR INDICADO': 'A responsabilidade foi transferida para o condutor.',
    'INDICAÇÃO REALIZADA': 'A responsabilidade foi transferida para o condutor.',
  };
  const cfg = configs[type] || { bg: 'var(--color-neutral-200)', color: 'var(--color-neutral-700)', clickable: false };
  const tip = tooltips[type];
  const badge = (
    <span
      onClick={cfg.clickable ? onClick : undefined}
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '3px 10px',
        borderRadius: 20,
        background: cfg.bg, color: cfg.color,
        fontSize: 11, fontWeight: 700, letterSpacing: '0.03em',
        textTransform: 'uppercase', whiteSpace: 'nowrap',
        cursor: cfg.clickable ? 'pointer' : 'default',
        userSelect: 'none',
        transition: cfg.clickable ? 'opacity .15s' : undefined
      }}
      onMouseEnter={cfg.clickable ? (e) => e.currentTarget.style.opacity = '0.85' : undefined}
      onMouseLeave={cfg.clickable ? (e) => e.currentTarget.style.opacity = '1' : undefined}>
      {type}
    </span>);

  if (tip) return <TooltipBadge tooltip={tip}>{badge}</TooltipBadge>;
  return badge;
}

// ─── Tooltip para badges (portal — escapa overflow:hidden) ───────────────────
function TooltipBadge({ children, tooltip }) {
  const [visible, setVisible] = useInfState(false);
  const [pos, setPos] = useInfState({ above: true, x: 0, anchorTop: 0, anchorBottom: 0 });
  const timerRef = useInfRef(null);
  const wrapRef = useInfRef(null);

  function handleEnter() {
    timerRef.current = setTimeout(() => {
      if (wrapRef.current) {
        const r = wrapRef.current.getBoundingClientRect();
        setPos({ above: r.top > 56, x: r.left + r.width / 2, anchorTop: r.top, anchorBottom: r.bottom });
      }
      setVisible(true);
    }, 300);
  }
  function handleLeave() {clearTimeout(timerRef.current);setVisible(false);}
  useInfEffect(() => () => clearTimeout(timerRef.current), []);

  const tooltipEl = visible ? ReactDOM.createPortal(
    <span style={{
      position: 'fixed',
      ...(pos.above ?
      { bottom: `${window.innerHeight - pos.anchorTop + 8}px` } :
      { top: `${pos.anchorBottom + 8}px` }),
      left: `${pos.x}px`,
      transform: 'translateX(-50%)',
      background: 'var(--color-neutral-900)', color: '#fff',
      fontSize: 12, fontWeight: 400, lineHeight: 1.4,
      padding: '6px 10px', borderRadius: 6,
      whiteSpace: 'nowrap', zIndex: 9999,
      pointerEvents: 'none',
      boxShadow: '0 4px 12px rgba(0,0,0,0.22)',
      fontFamily: 'var(--font-family-primary)'
    }}>
      {tooltip}
      <span style={{
        position: 'absolute',
        ...(pos.above ? { bottom: -4, borderTop: '4px solid var(--color-neutral-900)' } : { top: -4, borderBottom: '4px solid var(--color-neutral-900)' }),
        left: '50%', transform: 'translateX(-50%)',
        width: 0, height: 0,
        borderLeft: '4px solid transparent', borderRight: '4px solid transparent'
      }} />
    </span>,
    document.body
  ) : null;

  return (
    <span ref={wrapRef} style={{ display: 'inline-flex' }}
    onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {children}
      {tooltipEl}
    </span>);

}

// ─── Chip de filtragem ────────────────────────────────────────────────────────
// icon/file-pen — Autuação
// icon/file-pen — Notificação
const IconAutuacao = ({ color = 'currentColor' }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.43933 14.6666H12C12.3536 14.6666 12.6928 14.5261 12.9428 14.2761C13.1929 14.026 13.3333 13.6869 13.3333 13.3333V5.33326M13.3333 5.33326C13.3339 5.122 13.2925 4.91273 13.2117 4.71752C13.131 4.52231 13.0123 4.34504 12.8627 4.19592L10.4707 1.80392C10.3216 1.65427 10.1443 1.53563 9.94907 1.45485C9.75387 1.37406 9.54459 1.33274 9.33333 1.33326M13.3333 5.33326L10 5.33325C9.82319 5.33325 9.65362 5.26301 9.5286 5.13799C9.40357 5.01297 9.33333 4.8434 9.33333 4.66659V1.33326M9.33333 1.33326H4C3.64638 1.33326 3.30724 1.47373 3.05719 1.72378C2.80714 1.97383 2.66667 2.31297 2.66667 2.66659V8.89326M6.91868 8.41465C7.18416 8.14944 7.54413 8.00055 7.91939 8.00073C8.29465 8.00092 8.65447 8.15017 8.91968 8.41565C9.1849 8.68114 9.33379 9.0411 9.3336 9.41636C9.33342 9.79162 9.18416 10.1514 8.91868 10.4167L5.57335 13.758C5.41493 13.9165 5.21913 14.0325 5.00402 14.0953L3.09268 14.6533C3.03532 14.6701 2.97451 14.6711 2.91662 14.6562C2.85874 14.6414 2.8059 14.6113 2.76365 14.569C2.72139 14.5268 2.69127 14.4739 2.67644 14.416C2.66161 14.3582 2.66262 14.2974 2.67935 14.24L3.23668 12.3273C3.2996 12.1124 3.41561 11.9169 3.57402 11.7587L6.91868 8.41465Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// icon/file-spreadsheet — Penalidade
const IconPenalidade = ({ color = 'currentColor' }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.33268 1.33325H3.99935C3.64573 1.33325 3.30659 1.47373 3.05654 1.72378C2.80649 1.97383 2.66602 2.31297 2.66602 2.66659V13.3333C2.66602 13.6869 2.80649 14.026 3.05654 14.2761C3.30659 14.5261 3.64573 14.6666 3.99935 14.6666H11.9993C12.353 14.6666 12.6921 14.5261 12.9422 14.2761C13.1922 14.026 13.3327 13.6869 13.3327 13.3333V5.33325M9.33268 1.33325C9.54372 1.33291 9.75274 1.37432 9.9477 1.4551C10.1427 1.53588 10.3197 1.65443 10.4687 1.80392L12.8607 4.19592C13.0106 4.34493 13.1295 4.52215 13.2105 4.71736C13.2915 4.91257 13.333 5.1219 13.3327 5.33325M9.33268 1.33325V4.66659C9.33268 4.8434 9.40292 5.01297 9.52794 5.13799C9.65297 5.26301 9.82254 5.33325 9.99935 5.33325L13.3327 5.33325M5.33268 8.66659H6.66602M9.33268 8.66659H10.666M5.33268 11.3333H6.66602M9.33268 11.3333H10.666" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// chipColor: 'default' (laranja primário) | 'orange' (notificação) | 'blue' (penalidade)
const CHIP_THEME = {
  default: { bg: 'var(--color-primary-200)', border: 'var(--color-primary-500)', badge: 'var(--color-primary-500)', badgeText: '#fff' },
  orange:  { bg: '#FFF0ED', border: '#F9401B', badge: '#F9401B', badgeText: '#fff' },
  blue:    { bg: '#EBF4FE', border: '#55A1F2', badge: '#55A1F2', badgeText: '#fff' },
};

function FilterChip({ label, count, active, onClick, icon, chipColor = 'default' }) {
  const theme = CHIP_THEME[chipColor] || CHIP_THEME.default;
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 10px',
        borderRadius: 8,
        border: active ? `1.5px solid ${theme.border}` : '1px solid var(--color-neutral-300)',
        background: active ? theme.bg : '#fff',
        fontSize: 13, fontWeight: active ? 600 : 400, lineHeight: '18px',
        color: 'var(--color-neutral-900)',
        cursor: 'pointer', whiteSpace: 'nowrap',
        transition: 'all .15s',
        fontFamily: 'var(--font-family-primary)',
        boxShadow: 'none',
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'var(--color-neutral-100)'; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = '#fff'; }}>
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>}
      <span>{label}</span>
      {count !== undefined && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          minWidth: 18, height: 18,
          padding: '0 5px', borderRadius: 16,
          background: active ? theme.badge : 'var(--color-neutral-200)',
          color: active ? theme.badgeText : 'var(--color-neutral-700)',
          fontSize: 11, fontWeight: 700, lineHeight: '18px',
        }}>{count}</span>
      )}
    </button>
  );
}

// ─── Tooltip do ícone de prazo de indicação ───────────────────────────────────
function PrazoInfoTooltip({ prazoOrgaoData }) {
  const [hov, setHov] = useInfState(false);
  const [pos, setPos] = useInfState({ top: 0, left: 0 });
  const ref = useInfRef(null);

  function handleEnter() {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      setPos({ top: r.top - 8, left: r.left + r.width / 2 });
    }
    setHov(true);
  }

  const text = 'Este é o prazo da indicação pela plataforma. O prazo de indicação pelo órgão é até ' + (prazoOrgaoData || 'DD/MM/AAAA');

  return (
    <span ref={ref} onMouseEnter={handleEnter} onMouseLeave={() => setHov(false)}
      style={{ display: 'inline-flex', alignItems: 'center', cursor: 'default', flexShrink: 0 }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="var(--color-neutral-1000)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {hov && ReactDOM.createPortal(
        <div style={{
          position: 'fixed',
          top: pos.top,
          left: pos.left,
          transform: 'translate(-50%, -100%)',
          marginTop: -6,
          background: '#1c1c1e',
          color: '#fff',
          fontSize: 12,
          fontWeight: 400,
          fontFamily: 'var(--font-family-primary)',
          lineHeight: 1.5,
          padding: '8px 12px',
          borderRadius: 8,
          maxWidth: 260,
          width: 'max-content',
          zIndex: 9999,
          pointerEvents: 'none',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          whiteSpace: 'normal',
          textAlign: 'left',
        }}>
          {text}
          <span style={{
            position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
            borderTop: '5px solid #1c1c1e',
          }} />
        </div>,
        document.body
      )}
    </span>
  );
}

// ─── Prazo indicação ──────────────────────────────────────────────────────────
function Prazo({ dias }) {
  if (dias === null) return <span style={{ color: 'var(--color-neutral-400)', fontSize: 12 }}>—</span>;
  const color = 'var(--color-neutral-1000)';
  const weight = 600;
  return (
    <span style={{ color, fontSize: 12, fontWeight: weight, whiteSpace: 'nowrap' }}>
      ← {dias} {dias === 1 ? 'dia' : 'dias'}
    </span>);

}

// ─── InlineMeta: "LABEL valor ·" em linha ────────────────────────────────────
function InlineMeta({ label, children, first }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, flexShrink: 0, flexWrap: 'nowrap' }}>
      {!first &&
      <span style={{ color: 'var(--color-neutral-300)', fontSize: 12, margin: '0 4px', userSelect: 'none' }}>·</span>
      }
      <span style={{
        fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.05em', color: 'var(--color-neutral-500)',
        fontFamily: 'var(--font-family-primary)', lineHeight: 1
      }}>{label}</span>
      {children}
    </span>);

}

// ─── MetaField: label + valor empilhados ─────────────────────────────────────
function MetaField({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
      <span style={{
        fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.06em', color: 'var(--color-neutral-500)',
        lineHeight: 1, fontFamily: 'var(--font-family-primary)'
      }}>{label}</span>
      {children}
    </div>);

}

// ─── Status configs (Figma nodes 33-4210 e 31-4766) ─────────────────────────
const NOTIF_STATUS = {
  indique_agora:         { label: 'INDIQUE AGORA',                 bg: '#2a89ef',                      color: '#fff',                         tooltip: 'Faça a indicação de condutor.' },
  em_processamento:      { label: 'EM PROCESSAMENTO',              bg: 'var(--color-information-200)',  color: 'var(--color-information-800)',  tooltip: 'Sua indicação foi enviada e está sendo processada pelo sistema.' },
  enviada_orgao:         { label: 'ENVIADA AO ÓRGÃO',              bg: 'var(--color-information-200)',  color: 'var(--color-information-800)',  tooltip: 'Encaminhado ao órgão autuador.' },
  documentos_incorretos: { label: 'DOCUMENTOS INCORRETOS',         bg: 'var(--color-warning-200)',      color: 'var(--color-warning-800)',      tooltip: 'Os documentos enviados estão incorretos. Corrija e reenvie.' },
  falha_indicacao:       { label: 'FALHA NA INDICAÇÃO',            bg: 'var(--color-warning-200)',      color: 'var(--color-warning-800)',      tooltip: 'Não foi possível concluir a indicação.' },
  indeferida_orgao:      { label: 'INDEFERIDA PELO ÓRGÃO',         bg: 'var(--color-warning-200)',      color: 'var(--color-warning-800)',      tooltip: 'O órgão autuador não aceitou a indicação.' },
  indique_orgao:         { label: 'INDIQUE NO ÓRGÃO',              bg: 'var(--color-neutral-300)',      color: 'var(--color-neutral-800)',      tooltip: 'Essa infração precisa ser indicada presencialmente no órgão.' },
  indicacao_vencida:     { label: 'INDICAÇÃO VENCIDA',             bg: 'var(--color-error-200)',        color: 'var(--color-error-800)',        tooltip: 'O prazo para indicar o condutor expirou.' },
  aguardando_aceite:     { label: 'AGUARDANDO ACEITE DO CONDUTOR', bg: 'var(--color-information-200)',  color: 'var(--color-information-800)',  tooltip: 'Enviada ao aplicativo CDT do condutor.' },
  recusado_condutor:     { label: 'RECUSADO PELO CONDUTOR',        bg: 'var(--color-error-200)',        color: 'var(--color-error-800)',        tooltip: 'O condutor recusou a indicação.' },
  vencida_sem_acao:      { label: 'VENCIDA SEM AÇÃO DO CONDUTOR',  bg: 'var(--color-error-200)',        color: 'var(--color-error-800)',        tooltip: 'O condutor recebeu a notificação, mas não aceitou a tempo.' },
  condutor_indicado:     { label: 'CONDUTOR INDICADO',             bg: 'var(--color-success-200)',      color: 'var(--color-success-800)',      tooltip: 'A responsabilidade foi transferida para o condutor.' },
  indique_no_orgao:      { label: 'INDIQUE NO ÓRGÃO',              bg: 'var(--color-neutral-300)',      color: 'var(--color-neutral-800)',      tooltip: 'Essa infração precisa ser indicada presencialmente no órgão.' },
  cancelado_pelo_gestor: { label: 'CANCELADO PELO GESTOR',         bg: 'var(--color-neutral-300)',      color: 'var(--color-neutral-800)',      tooltip: 'O processo de indicação do condutor foi cancelado pelo gestor.' },
};

// ─── Status IC elegíveis para exibir tag de boleto SNE ───────────────────────
// Apenas esses statusVariants podem receber boletoTag ('solicite_boleto_40',
// 'boleto_40_solicitado', 'boleto_40_disponivel'). Os demais nunca exibem.
const BOLETO_ELIGIBLE_VARIANTS = new Set([
  'indique_agora',        // INDIQUE AGORA (azul sólido)        ✅
  'em_processamento',     // INDICAÇÃO EM PROCESSAMENTO (azul)  ✅
  'documentos_incorretos',// DOCUMENTOS INCORRETOS (amarelo)    ✅
  'falha_indicacao',      // FALHA NA INDICAÇÃO (amarelo)       ✅
  'indique_no_orgao',     // INDIQUE NO ÓRGÃO (cinza)           ✅
  'recusado_condutor',    // RECUSADO PELO CONDUTOR (rosa)      ✅ se dentro do prazo de IC
]);
// NÃO elegíveis: enviada_orgao, indeferida_orgao, aguardando_aceite,
//                indicacao_vencida, vencida_sem_acao, condutor_indicado

// FRD-010 — Critério de saída da aba Indicação de condutor:
// AITs com estes statusVariants saíram do prazo de indicação ou transitaram para NP →
// não devem aparecer na aba Indicação. Aparecem na aba Pagamento como penalidade,
// com o histórico de IC visível via indLabel no PENAL_STATUS.
const INDICACAO_EXCLUDED_VARIANTS = new Set([
  'indicacao_vencida',  // Prazo expirado sem indicação
  'vencida_sem_acao',   // Prazo expirado sem ação do condutor
  'condutor_indicado',  // Indicação concluída → vai para Pagamento (boleto 20%)
]);

const PENAL_STATUS = {
  em_aberto:            { label: 'PAGUE AGORA',                    bg: '#f9401b',                     color: '#fff',                         tooltip: 'Pague através da plataforma ou via boleto.',
                          indLabel: 'VENCIDA SEM AÇÃO DO CONDUTOR', indBg: 'var(--color-error-200)',   indColor: 'var(--color-error-800)',   showBarcode: true },
  aguardando_aprovacao: { label: 'PAGAMENTO AGUARDANDO APROVAÇÃO', bg: 'var(--color-warning-200)',     color: 'var(--color-warning-800)',      tooltip: 'O pagamento está aguardando aprovação do responsável.',
                          indLabel: 'INDICAÇÃO VENCIDA',            indBg: 'var(--color-error-200)',   indColor: 'var(--color-error-800)',   showBarcode: false },
  processando:          { label: 'PAGAMENTO EM PROCESSAMENTO',     bg: 'var(--color-neutral-300)',     color: 'var(--color-neutral-800)',      tooltip: 'A solicitação de pagamento em andamento.',
                          indLabel: 'RECUSADO PELO CONDUTOR',       indBg: 'var(--color-error-200)',   indColor: 'var(--color-error-800)',   showBarcode: false },
  recusado:             { label: 'PAGAMENTO RECUSADO',             bg: 'var(--color-error-200)',       color: 'var(--color-error-800)',        tooltip: 'Verifique o motivo nos detalhes da infração.',
                          indLabel: 'CONDUTOR INDICADO',            indBg: 'var(--color-success-200)', indColor: 'var(--color-success-800)', showBarcode: false },
  vencido:              { label: 'PAGAMENTO VENCIDO',              bg: 'var(--color-error-200)',       color: 'var(--color-error-800)',        tooltip: 'O prazo para pagamento expirou.',
                          showBarcode: false },
  cancelado:            { label: 'CANCELADO',                      bg: 'var(--color-neutral-300)',     color: 'var(--color-neutral-800)',
                          showBarcode: false },
  pago:                 { label: 'PAGO',                           bg: 'var(--color-success-200)',     color: 'var(--color-success-800)',      tooltip: 'Multa paga com sucesso.',
                          indLabel: 'CONDUTOR INDICADO',            indBg: 'var(--color-success-200)', indColor: 'var(--color-success-800)', showBarcode: false },
};

const BOLETO_TAGS = {
  // ── Tags SNE com ações ─────────────────────────────────────────────────────
  solicite_boleto_40:   { label: 'SOLICITE O BOLETO 40%', bg: '#fff0ec', color: '#c0391b', action: 'solicitar',  tooltip: 'Pague essa multa com 40% de desconto pelo SNE.' },
  boleto_40_solicitado: { label: 'BOLETO 40% SOLICITADO', bg: 'var(--color-information-100)', color: 'var(--color-information-700)', action: 'solicitado', tooltip: 'A solicitação está sendo processada pelo sistema.' },
  boleto_40_disponivel: { label: 'BOLETO 40% DISPONÍVEL', bg: 'var(--color-success-100)',     color: 'var(--color-success-700)',       action: 'download',   tooltip: 'Baixe o boleto com 40% de desconto para pagar.' },
  boleto_nao_disponivel:{ label: 'BOLETO NÃO DISPONÍVEL', bg: 'var(--color-error-100)',       color: 'var(--color-error-700)',                               tooltip: 'O boleto de 40% não está disponível para esta multa.' },
  // ── Tags genéricas (sem ação) ──────────────────────────────────────────────
  boleto_disponivel:    { label: 'BOLETO DISPONÍVEL',      bg: '#e8f3ea', color: '#405c44' },
  boleto_solicitado:    { label: 'BOLETO SOLICITADO',       bg: 'var(--color-information-100)', color: 'var(--color-information-700)' },
};

// ─── Card de infração — layout unificado (Figma 33-4210 / 31-4766) ───────────
// ─── StatusSubMenu — submenu de "Status de tratamento" ───────────────────────
const STATUS_TRATAMENTO_OPTIONS = [
  'Não tratada',
  'Infração tratada',
  'Tratamento em andamento',
  'Aguardando retorno do gestor',
  'Em análise RH',
];

// ─── CardMoreMenu — dropdown "Mais ações" ────────────────────────────────────
function CardMoreMenu({ row }) {
  const [open, setOpen] = useInfState(false);
  const [pos, setPos] = useInfState({ top: 0, left: 0 });
  const [subPos, setSubPos] = useInfState(null); // posição do submenu
  const [selectedStatus, setSelectedStatus] = useInfState('Não tratada');
  const btnRef = useInfRef(null);
  const statusItemRef = useInfRef(null);
  const hideSubTimerRef = useInfRef(null);

  function toggle(e) {
    e.stopPropagation();
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 4, left: r.right });
    }
    setOpen((v) => !v);
    setSubPos(null);
  }

  function showSub() {
    clearTimeout(hideSubTimerRef.current);
    if (statusItemRef.current) {
      const r = statusItemRef.current.getBoundingClientRect();
      setSubPos({ top: r.top, right: window.innerWidth - r.left + 4 });
    }
  }
  function hideSub() {
    hideSubTimerRef.current = setTimeout(() => setSubPos(null), 120);
  }
  function keepSub() { clearTimeout(hideSubTimerRef.current); }

  useInfEffect(() => {
    if (!open) return;
    function onOutside(e) {
      if (btnRef.current && !btnRef.current.contains(e.target)) { setOpen(false); setSubPos(null); }
    }
    function onKey(e) { if (e.key === 'Escape') { setOpen(false); setSubPos(null); } }
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onOutside); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const ITEMS = [
    { icon: <IconDownload />,  label: 'Baixar boleto' },
    { icon: <IconRefresh />,   label: 'Atualizar boleto 20%' },
    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5v14"/><path d="M8 5v14"/><path d="M12 5v14"/><path d="M17 5v14"/><path d="M21 5v14"/></svg>, label: 'Solicitar boleto SNE 40%' },
    { icon: <IconStatus />,    label: 'Status de tratamento', chevron: true, isStatus: true },
    { icon: <IconPrint />,     label: 'Imprimir' },
  ];

  const dropdownStyle = {
    position: 'fixed', zIndex: 9999, background: '#fff',
    border: '1px solid #ddddde', borderRadius: 8, padding: 2,
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)', minWidth: 200,
    animation: 'fadeInOverlay .12s ease', fontFamily: 'var(--font-family-primary)',
  };
  const itemStyle = {
    display: 'flex', alignItems: 'center', gap: 8, padding: '8px 8px',
    borderRadius: 6, border: 'none', background: 'transparent',
    cursor: 'pointer', width: '100%', textAlign: 'left',
    fontSize: 14, fontWeight: 400, color: '#0a0a0a',
    fontFamily: 'var(--font-family-primary)', transition: 'background .1s',
  };

  return (
    <span ref={btnRef} style={{ display: 'inline-flex' }} onClick={(e) => e.stopPropagation()}>
      <button
        title="Mais ações"
        onClick={toggle}
        style={{ width: 28, height: 28, border: 'none',
          background: open ? 'var(--color-neutral-200)' : 'transparent',
          borderRadius: 6, cursor: 'pointer',
          color: open ? 'var(--color-neutral-800)' : 'var(--color-neutral-500)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'background .12s' }}
        onMouseEnter={(e) => { if (!open) { e.currentTarget.style.background = 'var(--color-neutral-200)'; e.currentTarget.style.color = 'var(--color-neutral-800)'; }}}
        onMouseLeave={(e) => { if (!open) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-neutral-500)'; }}}>
        <IconMoreVert />
      </button>

      {open && ReactDOM.createPortal(
        <div style={{ ...dropdownStyle, top: pos.top, left: pos.left, transform: 'translateX(-100%)' }}
          onClick={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '8px 6px' }}>
            {ITEMS.map((item) => (
              <button
                key={item.label}
                ref={item.isStatus ? statusItemRef : null}
                onClick={() => { if (!item.isStatus) setOpen(false); }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = item.isStatus ? '#feece8' : 'var(--color-neutral-100)';
                  if (item.isStatus) showSub();
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  if (item.isStatus) hideSub();
                }}
                style={itemStyle}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, flexShrink: 0, color: '#f9401b' }}>
                  {item.icon}
                </span>
                <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.label}
                </span>
                {item.chevron && (
                  <span style={{ color: 'var(--color-neutral-500)', flexShrink: 0 }}><IconChevronRight /></span>
                )}
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}

      {/* ── Submenu: Status de tratamento ── */}
      {open && subPos && ReactDOM.createPortal(
        <div
          onMouseEnter={keepSub}
          onMouseLeave={hideSub}
          style={{ ...dropdownStyle, top: subPos.top, right: subPos.right, minWidth: 220, animation: 'fadeInOverlay .1s ease' }}
          onClick={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '8px 6px' }}>
            {STATUS_TRATAMENTO_OPTIONS.map((opt) => {
              const isActive = selectedStatus === opt;
              return (
                <button
                  key={opt}
                  onClick={() => { setSelectedStatus(opt); setSubPos(null); setOpen(false); }}
                  style={{
                    ...itemStyle,
                    background: isActive ? '#feece8' : 'transparent',
                    justifyContent: 'space-between',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = isActive ? '#feece8' : 'var(--color-neutral-100)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = isActive ? '#feece8' : 'transparent'; }}>
                  <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#0a0a0a' }}>
                    {opt}
                  </span>
                  {isActive && (
                    <span style={{ color: '#f9401b', flexShrink: 0, marginLeft: 8 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>,
        document.body
      )}
    </span>
  );
}

function InfracaoCard({ row, selected, onSelect, onCardClick, onOpenIndicacao, onOpenPagamento, onBadgeAction, onBoletoAction }) {
  const [hovered, setHovered] = useInfState(false);
  const isNotificacao = row.tipo === 'notificacao';
  const isPenalidade  = row.tipo === 'penalidade';

  const cardBorder = selected ? '1px solid var(--color-primary-300)' : '1px solid var(--color-neutral-300)';
  const cardBg     = selected ? 'var(--color-primary-100)' : 'var(--color-neutral-100)';
  const cardShadow = hovered ? '0 2px 8px rgba(0,0,0,0.07)' : 'none';

  const cfg      = isNotificacao ? (NOTIF_STATUS[row.statusVariant] || {}) : (PENAL_STATUS[row.statusVariant] || {});
  const boletoCfg = row.boletoTag ? BOLETO_TAGS[row.boletoTag] : null;

  // ── Sub-components ──
  const CheckboxArea = () => (
    <div style={{ width: hovered || selected ? 36 : 0, overflow: 'hidden', transition: 'width 150ms ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, alignSelf: 'stretch' }}
      onClick={(e) => e.stopPropagation()}>
      <input type="checkbox" checked={selected}
        onChange={(e) => { e.stopPropagation(); onSelect(); }}
        style={{ width: 16, height: 16, accentColor: '#f9401b', cursor: 'pointer', flexShrink: 0 }} />
    </div>
  );

  const BlueStripe   = () => <div style={{ width: 4, background: '#2a89ef', flexShrink: 0, alignSelf: 'stretch' }} />;
  const OrangeStripe = () => <div style={{ width: 4, background: '#f9401b', flexShrink: 0, alignSelf: 'stretch' }} />;

  const CircleActionBtn = ({ title, children, onClick }) => (
    <button title={title} onClick={onClick}
      style={{ boxSizing: 'border-box', display: 'flex', justifyContent: 'center', alignItems: 'center',
        padding: 8, width: 32, height: 32, background: '#fff', border: '1px solid #DDDDDE',
        borderRadius: 8, cursor: 'pointer', flexShrink: 0, transition: 'background .12s, border-color .12s' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-neutral-200)'; e.currentTarget.style.borderColor = 'var(--color-neutral-500)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#DDDDDE'; }}>
      {children}
    </button>
  );

  // ── Render unificado ──────────────────────────────────────────────────────

  const StatusPill = ({ bg, color, label, tooltip = 'Texto da tooltip', onClick }) => {
    const [hov, setHov] = useInfState(false);
    const [pos, setPos] = useInfState({ top: 0, left: 0 });
    const ref = useInfRef(null);
    const isClickable = !!onClick;
    function handleEnter() {
      if (ref.current) {
        const r = ref.current.getBoundingClientRect();
        setPos({ top: r.top - 8, left: r.left + r.width / 2 });
      }
      setHov(true);
    }
    function handleClick(e) {
      if (!isClickable) return;
      e.stopPropagation();
      onClick();
    }
    return (
      <span ref={ref} onMouseEnter={handleEnter} onMouseLeave={() => setHov(false)}
        onClick={handleClick}
        style={{ display: 'inline-flex', alignItems: 'center', position: 'relative',
          padding: '3px 8px', borderRadius: 1000,
          background: bg, color: color,
          fontSize: 10, fontWeight: 700, letterSpacing: '0.03em',
          textTransform: 'uppercase', whiteSpace: 'nowrap',
          cursor: isClickable ? 'pointer' : 'default',
          outline: isClickable && hov ? `2px solid ${color}` : 'none',
          outlineOffset: 1,
          transition: 'outline .1s, opacity .1s',
          opacity: isClickable && hov ? 0.85 : 1,
        }}>
        {label}
        {hov && ReactDOM.createPortal(
          <div style={{
            position: 'fixed', top: pos.top, left: pos.left,
            transform: 'translate(-50%, -100%)', marginTop: -6,
            background: '#1c1c1e', color: '#fff',
            fontSize: 12, fontWeight: 400,
            fontFamily: 'var(--font-family-primary)',
            lineHeight: 1.5, padding: '6px 10px', borderRadius: 6,
            whiteSpace: 'nowrap', zIndex: 9999, pointerEvents: 'none',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          }}>
            {tooltip}
            <span style={{
              position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)',
              width: 0, height: 0,
              borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
              borderTop: '5px solid #1c1c1e',
            }} />
          </div>,
          document.body
        )}
      </span>
    );
  };

  const IconDollar = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  );
  const IconBarcode = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 5v14"/><path d="M8 5v14"/><path d="M12 5v14"/><path d="M17 5v14"/><path d="M21 5v14"/>
    </svg>
  );
  const IconUserRound = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/>
    </svg>
  );

  return (
    <div
      onClick={() => onCardClick ? onCardClick(row.ait) : onSelect()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', display: 'flex', alignItems: 'center',
        background: cardBg, border: cardBorder,
        borderRadius: 8, cursor: 'pointer',
        transition: 'box-shadow .15s, background .15s',
        boxShadow: cardShadow,
        fontFamily: 'var(--font-family-primary)',
        minHeight: 64, overflow: 'hidden',
      }}>

      {isNotificacao ? <BlueStripe /> : <OrangeStripe />}
      <CheckboxArea />

      {/* ── Information Container ── */}
      <div style={{ flex: 1, minWidth: 180, padding: '16px 16px' }}>
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#0a0a0a', whiteSpace: 'nowrap' }}>
            AIT {row.ait}
          </span>
          {/* Tag de status principal */}
          {cfg.label && (
            <StatusPill
              bg={cfg.bg} color={cfg.color} label={cfg.label}
              tooltip={cfg.tooltip}
              onClick={
                (row.statusVariant === 'indique_agora' || row.statusVariant === 'em_aberto')
                  ? () => onBadgeAction && onBadgeAction(row.statusVariant, row)
                  : undefined
              }
            />
          )}
          {/* Tag de boleto (notificação) — apenas visual, ação está no botão */}
          {isNotificacao && boletoCfg && (
            <StatusPill
              bg={boletoCfg.bg || '#e8f3ea'}
              color={boletoCfg.color || '#405c44'}
              label={boletoCfg.label}
              tooltip={boletoCfg.tooltip}
            />
          )}
          {/* Tag secundária de indicação (apenas penalidade) */}
          {!isNotificacao && cfg.indLabel && (
            <StatusPill bg={cfg.indBg} color={cfg.indColor} label={cfg.indLabel}
              tooltip={(() => { const k = Object.keys(NOTIF_STATUS).find(k => NOTIF_STATUS[k].label === cfg.indLabel); return k ? NOTIF_STATUS[k].tooltip : undefined; })()}
            />
          )}
        </div>
        {/* Descrição */}
        <div style={{ fontSize: 13, color: '#606266', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {row.codigoInfracao} - {row.nomeInfracao}
        </div>
      </div>

      {/* ── Meta cols ── */}
      <NewMetaCol label="DATA DA MULTA" width={132}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#0a0a0a', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
          {row.dataInfracao || '—'}
        </span>
      </NewMetaCol>
      <NewMetaCol label="PLACA" width={100}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#0a0a0a', whiteSpace: 'nowrap' }}>
          {row.placa}
        </span>
      </NewMetaCol>
      <NewMetaCol label="ÓRGÃO" width={180}>
        <span
          title={row.orgao}
          style={{ fontSize: 14, fontWeight: 700, color: '#0a0a0a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 156, display: 'block' }}>
          {row.orgao}
        </span>
      </NewMetaCol>
      <NewMetaCol label="VALOR" width={100}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#0a0a0a', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
          {row.valor}
        </span>
      </NewMetaCol>

      {/* Coluna final: PRAZO INDICAÇÃO (notificação) ou VENCIMENTO (penalidade) */}
      {isNotificacao && (
        <NewMetaCol label="PRAZO INDICAÇÃO" width={140}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{
              fontSize: 14, fontWeight: 700, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap',
              color: '#0a0a0a',
            }}>{row.prazoDataFormatada || '—'}</span>
            {row.prazoDataFormatada && (
              <PrazoInfoTooltip prazoOrgaoData={row.prazoOrgaoData} />
            )}
          </div>
        </NewMetaCol>
      )}
      {isPenalidade && (
        <NewMetaCol label="VENCIMENTO" width={140}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#0a0a0a', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
            {row.vencimento || '—'}
          </span>
        </NewMetaCol>
      )}

      {/* ── Actions — largura fixa para alinhar colunas entre todos os cards ── */}
      <div onClick={(e) => e.stopPropagation()}
        style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, width: 120, justifyContent: 'flex-end', padding: '0 16px 0 4px' }}>
        {isNotificacao && (
          <>
            {boletoCfg ? (() => {
              const [baixadoPos, setBaixadoPos] = useInfState(null);
              const barcodeRef = useInfRef(null);
              function handleBarcodeClick() {
                onBoletoAction && onBoletoAction(boletoCfg.action || 'solicitar', row);
                if (boletoCfg.action === 'download' && barcodeRef.current) {
                  const r = barcodeRef.current.getBoundingClientRect();
                  setBaixadoPos({ top: r.top - 8, left: r.left + r.width / 2 });
                  setTimeout(() => setBaixadoPos(null), 2000);
                }
              }
              return (
                <>
                  <span ref={barcodeRef} style={{ display: 'inline-flex' }}>
                    <CircleActionBtn
                      title={boletoCfg.action === 'download' ? 'Baixe o boleto' : (boletoCfg.tooltip || 'Ver boleto')}
                      onClick={handleBarcodeClick}>
                      <IconBarcode />
                    </CircleActionBtn>
                  </span>
                  {baixadoPos && ReactDOM.createPortal(
                    <div style={{
                      position: 'fixed',
                      top: baixadoPos.top,
                      left: baixadoPos.left,
                      transform: 'translate(-50%, -100%)',
                      zIndex: 99999,
                      background: 'var(--color-success-700)',
                      color: '#fff',
                      fontSize: 11, fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: 6,
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      animation: 'fadeInOverlay .15s ease',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                    }}>
                      ✓ Boleto baixado
                    </div>,
                    document.body
                  )}
                </>
              );
            })() : (
              <CircleActionBtn title="Ver boleto" onClick={() => onOpenPagamento && onOpenPagamento(row)}><IconBarcode /></CircleActionBtn>
            )}
            <CircleActionBtn title="Indicar condutor" onClick={() => onOpenIndicacao && onOpenIndicacao(row)}><IconUserRound /></CircleActionBtn>
          </>
        )}
        {isPenalidade && (
          <>
            {cfg.showBarcode && <CircleActionBtn title="Ver boleto"><IconBarcode /></CircleActionBtn>}
            <CircleActionBtn title="Situação de pagamento" onClick={() => onOpenPagamento && onOpenPagamento(row)}><IconDollar /></CircleActionBtn>
          </>
        )}
        <CardMoreMenu row={row} />
      </div>
    </div>
  );

}

// ─── Coluna de metadado nova ──────────────────────────────────────────────────
function NewMetaCol({ label, children, width }) {
  const colWidth = width !== undefined ? typeof width === 'number' ? `${width}px` : width : '192px';
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 8,
      padding: '16px 8px', flexShrink: 0, width: colWidth, minWidth: colWidth
    }}>
      <span style={{
        fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.07em', color: 'var(--color-neutral-500)',
        lineHeight: 1, fontFamily: 'var(--font-family-primary)', whiteSpace: 'nowrap'
      }}>{label}</span>
      {children}
    </div>);

}

// ─── Shimmer (skeleton) ───────────────────────────────────────────────────────
(function injectShimmer() {
  if (document.getElementById('inf-shimmer-style')) return;
  const s = document.createElement('style');
  s.id = 'inf-shimmer-style';
  s.textContent = `
    @keyframes inf-shimmer {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    .inf-shimmer {
      background: linear-gradient(90deg, #eeeeef 25%, #f5f5f5 50%, #eeeeef 75%);
      background-size: 200% 100%;
      animation: inf-shimmer 1.4s infinite;
      border-radius: 4px;
      flex-shrink: 0;
    }
    .inf-chip-scroll::-webkit-scrollbar { display: none; }
  `;
  document.head.appendChild(s);
})();

// ─── Skeleton components ──────────────────────────────────────────────────────
function SkeletonFilterBar() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, padding: '20px 20px 16px', flexShrink: 0 }}>
      {[200, 200, 180, 180].map((w, i) => (
        <div key={i} className="inf-shimmer" style={{ width: w, height: 40, borderRadius: 6 }} />
      ))}
      <div className="inf-shimmer" style={{ width: 160, height: 40, borderRadius: 6, marginLeft: 'auto' }} />
    </div>
  );
}

function SkeletonChips() {
  return (
    <div style={{ display: 'flex', gap: 8, padding: '10px 20px', flexShrink: 0, overflowX: 'hidden' }}>
      {[60, 110, 90, 130, 80].map((w, i) => (
        <div key={i} className="inf-shimmer" style={{ width: w, height: 32, borderRadius: 1000, flexShrink: 0 }} />
      ))}
    </div>
  );
}

function InfSkeletonCard() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      height: 78, padding: '0 16px',
      background: '#fff', border: '1px solid #eeeeef', borderRadius: 8,
      flexShrink: 0,
    }}>
      {/* Bloco esquerdo */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: '0 0 220px' }}>
        <div className="inf-shimmer" style={{ width: 80, height: 14, borderRadius: 4 }} />
        <div className="inf-shimmer" style={{ width: 200, height: 12, borderRadius: 4 }} />
      </div>
      {/* Colunas do meio */}
      <div style={{ display: 'flex', gap: 24, flex: 1 }}>
        {[80, 140, 80, 100].map((w, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div className="inf-shimmer" style={{ width: w * 0.6, height: 10, borderRadius: 3 }} />
            <div className="inf-shimmer" style={{ width: w, height: 13, borderRadius: 3 }} />
          </div>
        ))}
      </div>
      {/* Bloco direito — 2 círculos */}
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <div className="inf-shimmer" style={{ width: 32, height: 32, borderRadius: '50%' }} />
        <div className="inf-shimmer" style={{ width: 32, height: 32, borderRadius: '50%' }} />
      </div>
    </div>
  );
}

function SkeletonCards() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {Array.from({ length: 10 }, (_, i) => <InfSkeletonCard key={i} />)}
    </div>
  );
}

function SkeletonKanban() {
  return (
    <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 0 24px 0', flexWrap: 'nowrap', alignItems: 'flex-start' }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ width: 260, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div className="inf-shimmer" style={{ flex: 1, height: 16, borderRadius: 4 }} />
            <div className="inf-shimmer" style={{ width: 28, height: 20, borderRadius: 1000 }} />
          </div>
          {[80, 96, 80].map((h, j) => (
            <div key={j} className="inf-shimmer" style={{ width: '100%', height: h, borderRadius: 8, marginBottom: 8 }} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Chips por tab ────────────────────────────────────────────────────────────
const CHIPS_BY_TAB = {
  todas: [
    { id: 'todos',       label: 'Todos',       count: '99+' },
    { id: 'notificacao', label: 'Notificação',  count: 6, chipColor: 'orange', icon: <IconAutuacao color="#F9401B" /> },
    { id: 'penalidade',  label: 'Penalidade',   count: 4, chipColor: 'blue',   icon: <IconPenalidade color="#55A1F2" /> },
  ],

  // FRD-010: aba Indicação mostra apenas AITs em fase NA dentro do prazo.
  // Status 'indicacao_vencida', 'vencida_sem_acao' e 'condutor_indicado' estão excluídos
  // (ver INDICACAO_EXCLUDED_VARIANTS). Chip "Vencida" removido — cards saíram desta aba.
  indicacao: [
    { id: 'todos',           label: 'Todos',           count: 659 },
    { id: 'acao_necessaria', label: 'Ação necessária', count: 147, statusVariants: ['indique_agora', 'documentos_incorretos', 'indique_no_orgao'] },
    { id: 'em_andamento',    label: 'Em andamento',    count: 141, statusVariants: ['em_processamento', 'enviada_orgao', 'aguardando_aceite'] },
    { id: 'recusada',        label: 'Recusada',        count: 111, statusVariants: ['indeferida_orgao', 'recusado_condutor'] },
    { id: 'cancelada',       label: 'Cancelada',       count: 46,  statusVariants: ['cancelado_pelo_gestor'] },
  ],

  pagamento: [
    { id: 'todos',               label: 'Todos',               count: 421 },
    { id: 'em_aberto',           label: 'Pague agora',         count: 178, statusVariants: ['em_aberto'] },
    { id: 'em_andamento',        label: 'Em andamento',        count: 56,  statusVariants: ['aguardando_aprovacao', 'processando'] },
    { id: 'recusado',            label: 'Recusado',            count: 8,   statusVariants: ['recusado'] },
    { id: 'vencido',             label: 'Vencido',             count: 15,  statusVariants: ['vencido'] },
    { id: 'cancelado',           label: 'Cancelado',           count: 11,  statusVariants: ['cancelado'] },
    { id: 'pago',                label: 'Pago',                count: 179, statusVariants: ['pago'] },
  ],

  recurso: [
    { id: 'todos',      label: 'Todos' },
    { id: 'aberto',     label: 'Em aberto' },
    { id: 'deferido',   label: 'Deferido' },
    { id: 'indeferido', label: 'Indeferido' },
  ],
};

// ─── Helper: chip filter ─────────────────────────────────────────────────────
// Suporta chips com statusVariants[] (multi-status) e chips de tipo (todas tab)
function chipMatchesRow(chipId, row, tab) {
  if (chipId === 'todos') return true;
  const chip = (CHIPS_BY_TAB[tab] || []).find((c) => c.id === chipId);
  if (chip && chip.statusVariants) return chip.statusVariants.includes(row.statusVariant);
  return row.tipo === chipId; // fallback para aba "todas" (filtra por tipo)
}

// ─── Dados mock ───────────────────────────────────────────────────────────────
const MOCK_ROWS = [
  // ── Notificações (faixa azul) ─────────────────────────────────────────────
  {
    id: 1, tipo: 'notificacao', statusVariant: 'indique_agora', boletoTag: 'solicite_boleto_40',
    ait: 'SP04127832', codigoInfracao: '73662', nomeInfracao: 'Avançar Sinal Vermelho',
    placa: 'TES8G37', dataInfracao: '15/03/2025', orgao: 'DETRAN-SP',
    valor: 'R$ 293,47', prazoIndicacao: 20, prazoDataFormatada: '14/06/2025', prazoOrgaoData: '30/06/2025',
    vencimento: null, condutor: null, temAnexo: false, lowOpacity: false,
  },
  {
    id: 2, tipo: 'notificacao', statusVariant: 'em_processamento', boletoTag: 'boleto_40_solicitado',
    ait: 'RJ01985432', codigoInfracao: '68400', nomeInfracao: 'Dirigir em Velocidade Acima do Permitido',
    placa: 'FZJ0F53', dataInfracao: '12/02/2025', orgao: 'DETRAN-RJ',
    valor: 'R$ 195,23', prazoIndicacao: 30, prazoDataFormatada: '24/06/2025', prazoOrgaoData: '15/07/2025',
    vencimento: null, condutor: null, temAnexo: false, lowOpacity: false,
  },
  {
    id: 3, tipo: 'notificacao', statusVariant: 'enviada_orgao', boletoTag: null,
    ait: 'BA09234871', codigoInfracao: '60501', nomeInfracao: 'Usar Celular ao Volante',
    placa: 'KUY2J66', dataInfracao: '08/01/2025', orgao: 'SECRETARIA DE INFRAESTRUTURA DO ESTADO DA BAHIA',
    valor: 'R$ 195,23', prazoIndicacao: 45, prazoDataFormatada: '09/07/2025', prazoOrgaoData: '31/07/2025',
    vencimento: null, condutor: null, temAnexo: false, lowOpacity: false,
  },
  {
    id: 4, tipo: 'notificacao', statusVariant: 'documentos_incorretos', boletoTag: 'boleto_40_disponivel',
    ait: 'MG03561200', codigoInfracao: '73662', nomeInfracao: 'Avançar Sinal Vermelho',
    placa: 'ABC1A23', dataInfracao: '20/01/2025', orgao: 'SECRETARIA DE INFRAESTRUTURA DO ESTADO DA BAHIA',
    valor: 'R$ 293,47', prazoIndicacao: 3, prazoDataFormatada: '28/05/2025', prazoOrgaoData: '10/06/2025',
    vencimento: null, condutor: null, temAnexo: false, lowOpacity: false,
  },
  {
    id: 5, tipo: 'notificacao', statusVariant: 'aguardando_aceite', boletoTag: null,
    ait: 'RS07721988', codigoInfracao: '55500', nomeInfracao: 'Não Usar Cinto de Segurança',
    placa: 'NLX8012', dataInfracao: '10/03/2025', orgao: 'DETRAN-RS',
    valor: 'R$ 88,38', prazoIndicacao: 12, prazoDataFormatada: '07/06/2025', prazoOrgaoData: '20/06/2025',
    vencimento: null, condutor: null, temAnexo: false, lowOpacity: false,
  },
  {
    id: 6, tipo: 'notificacao', statusVariant: 'indique_no_orgao', boletoTag: 'boleto_disponivel',
    ait: 'PR02445001', codigoInfracao: '68400', nomeInfracao: 'Dirigir em Velocidade Acima do Permitido',
    placa: 'JBA8G44', dataInfracao: '25/02/2025', orgao: 'DETRAN-PR',
    valor: 'R$ 195,23', prazoIndicacao: 22, prazoDataFormatada: '20/06/2025', prazoOrgaoData: '05/07/2025',
    vencimento: null, condutor: 'Antônio Pereira', temAnexo: false, lowOpacity: false,
  },
  {
    id: 11, tipo: 'notificacao', statusVariant: 'indique_agora', boletoTag: null,
    ait: 'SC01182744', codigoInfracao: '60501', nomeInfracao: 'Usar Celular ao Volante',
    placa: 'GHT4P01', dataInfracao: '02/04/2025', orgao: 'DETRAN-SC',
    valor: 'R$ 195,23', prazoIndicacao: 8, prazoDataFormatada: '18/06/2025', prazoOrgaoData: '28/06/2025',
    vencimento: null, condutor: null, temAnexo: false, lowOpacity: false,
  },
  {
    id: 12, tipo: 'notificacao', statusVariant: 'falha_indicacao', boletoTag: 'boleto_disponivel',
    ait: 'GO05338812', codigoInfracao: '73662', nomeInfracao: 'Avançar Sinal Vermelho',
    placa: 'PLK7H22', dataInfracao: '18/03/2025', orgao: 'DETRAN-GO',
    valor: 'R$ 293,47', prazoIndicacao: 5, prazoDataFormatada: '02/06/2025', prazoOrgaoData: '15/06/2025',
    vencimento: null, condutor: null, temAnexo: false, lowOpacity: false,
  },
  {
    id: 13, tipo: 'notificacao', statusVariant: 'indicacao_vencida', boletoTag: null,
    ait: 'CE08771923', codigoInfracao: '55500', nomeInfracao: 'Não Usar Cinto de Segurança',
    placa: 'WQA3B55', dataInfracao: '05/01/2025', orgao: 'DETRAN-CE',
    valor: 'R$ 88,38', prazoIndicacao: 0, prazoDataFormatada: '12/05/2025', prazoOrgaoData: '25/05/2025',
    vencimento: null, condutor: null, temAnexo: false, lowOpacity: false,
  },
  {
    id: 14, tipo: 'notificacao', statusVariant: 'recusado_condutor', boletoTag: 'boleto_disponivel',
    ait: 'DF02901056', codigoInfracao: '68400', nomeInfracao: 'Dirigir em Velocidade Acima do Permitido',
    placa: 'BRZ9K77', dataInfracao: '22/02/2025', orgao: 'SEMOB-DF',
    valor: 'R$ 195,23', prazoIndicacao: 18, prazoDataFormatada: '16/06/2025', prazoOrgaoData: '30/06/2025',
    vencimento: null, condutor: null, temAnexo: false, lowOpacity: false,
  },
  // ── Penalidades (faixa laranja) ────────────────────────────────────────────
  {
    id: 7, tipo: 'penalidade', statusVariant: 'em_aberto', boletoTag: null,
    ait: 'SP04127850', codigoInfracao: '73662', nomeInfracao: 'Avançar Sinal Vermelho',
    placa: 'DTX0021', dataInfracao: '10/03/2025', orgao: 'DETRAN-SP',
    valor: 'R$ 293,47', prazoIndicacao: null, prazoDataFormatada: null,
    vencimento: '15/08/2025', condutor: null, temAnexo: false, lowOpacity: false,
  },
  {
    id: 8, tipo: 'penalidade', statusVariant: 'aguardando_aprovacao', boletoTag: null,
    ait: 'RJ01985449', codigoInfracao: '68400', nomeInfracao: 'Dirigir em Velocidade Acima do Permitido',
    placa: 'JDA7G14', dataInfracao: '05/02/2025', orgao: 'DETRAN-RJ',
    valor: 'R$ 195,23', prazoIndicacao: null, prazoDataFormatada: null,
    vencimento: '22/07/2025', condutor: null, temAnexo: false, lowOpacity: false,
  },
  {
    id: 9, tipo: 'penalidade', statusVariant: 'processando', boletoTag: null,
    ait: 'BA09234899', codigoInfracao: '60501', nomeInfracao: 'Usar Celular ao Volante',
    placa: 'RTY3K21', dataInfracao: '18/01/2025', orgao: 'SECRETARIA DE INFRAESTRUTURA DO ESTADO DA BAHIA',
    valor: 'R$ 195,23', prazoIndicacao: null, prazoDataFormatada: null,
    vencimento: '01/09/2025', condutor: null, temAnexo: false, lowOpacity: false,
  },
  {
    id: 10, tipo: 'penalidade', statusVariant: 'pago', boletoTag: null,
    ait: 'MG03561230', codigoInfracao: '68400', nomeInfracao: 'Dirigir em Velocidade Acima do Permitido',
    placa: 'MNO9P87', dataInfracao: '30/01/2025', orgao: 'DETRAN-MG',
    valor: 'R$ 195,23', prazoIndicacao: null, prazoDataFormatada: null,
    vencimento: '01/01/2026', condutor: 'Wagner Daniel', temAnexo: false, lowOpacity: false,
  },
  {
    id: 15, tipo: 'penalidade', statusVariant: 'em_aberto', boletoTag: null,
    ait: 'SC01182799', codigoInfracao: '60501', nomeInfracao: 'Usar Celular ao Volante',
    placa: 'GHT4P01', dataInfracao: '14/03/2025', orgao: 'DETRAN-SC',
    valor: 'R$ 195,23', prazoIndicacao: null, prazoDataFormatada: null,
    vencimento: '10/09/2025', condutor: null, temAnexo: false, lowOpacity: false,
  },
  {
    id: 16, tipo: 'penalidade', statusVariant: 'aguardando_aprovacao', boletoTag: null,
    ait: 'GO05338855', codigoInfracao: '73662', nomeInfracao: 'Avançar Sinal Vermelho',
    placa: 'PLK7H22', dataInfracao: '20/02/2025', orgao: 'DETRAN-GO',
    valor: 'R$ 293,47', prazoIndicacao: null, prazoDataFormatada: null,
    vencimento: '05/08/2025', condutor: null, temAnexo: false, lowOpacity: false,
  },
  {
    id: 17, tipo: 'penalidade', statusVariant: 'processando', boletoTag: null,
    ait: 'CE08771988', codigoInfracao: '55500', nomeInfracao: 'Não Usar Cinto de Segurança',
    placa: 'WQA3B55', dataInfracao: '09/01/2025', orgao: 'DETRAN-CE',
    valor: 'R$ 88,38', prazoIndicacao: null, prazoDataFormatada: null,
    vencimento: '28/07/2025', condutor: null, temAnexo: false, lowOpacity: false,
  },
  {
    id: 18, tipo: 'penalidade', statusVariant: 'pago', boletoTag: null,
    ait: 'DF02901099', codigoInfracao: '68400', nomeInfracao: 'Dirigir em Velocidade Acima do Permitido',
    placa: 'BRZ9K77', dataInfracao: '28/01/2025', orgao: 'SEMOB-DF',
    valor: 'R$ 195,23', prazoIndicacao: null, prazoDataFormatada: null,
    vencimento: '15/06/2025', condutor: 'Fernanda Lima', temAnexo: false, lowOpacity: false,
  },
  {
    id: 19, tipo: 'penalidade', statusVariant: 'em_aberto', boletoTag: null,
    ait: 'RS07721900', codigoInfracao: '73662', nomeInfracao: 'Avançar Sinal Vermelho',
    placa: 'NLX8012', dataInfracao: '17/03/2025', orgao: 'DETRAN-RS',
    valor: 'R$ 293,47', prazoIndicacao: null, prazoDataFormatada: null,
    vencimento: '30/09/2025', condutor: null, temAnexo: false, lowOpacity: false,
  },
  {
    id: 20, tipo: 'penalidade', statusVariant: 'recusado', boletoTag: null,
    ait: 'PR02445088', codigoInfracao: '60501', nomeInfracao: 'Usar Celular ao Volante',
    placa: 'JBA8G44', dataInfracao: '04/02/2025', orgao: 'DETRAN-PR',
    valor: 'R$ 195,23', prazoIndicacao: null, prazoDataFormatada: null,
    vencimento: '12/08/2025', condutor: null, temAnexo: false, lowOpacity: false,
  },
];

window.MOCK_AIT_OPTIONS = MOCK_ROWS.map(function(r) { return r.ait; });
window.MOCK_CTB_OPTIONS = (function() {
  var seen = {};
  return MOCK_ROWS.filter(function(r) {
    var k = r.codigoInfracao;
    if (seen[k]) return false; seen[k] = true; return true;
  }).map(function(r) { return r.codigoInfracao + ' - ' + r.nomeInfracao; });
})();
window.MOCK_PLACA_OPTIONS = (function() {
  var seen = {};
  return MOCK_ROWS.map(function(r) { return r.placa; }).filter(function(p) {
    if (seen[p]) return false; seen[p] = true; return true;
  });
})();

// ─── Sort helpers ─────────────────────────────────────────────────────────────
function parseBRDate(str) {
  if (!str) return null;
  const [d, m, y] = str.split('/');
  return new Date(Number(y), Number(m) - 1, Number(d));
}
function parseBRDateMs(str) {
  const d = parseBRDate(str);
  return d ? d.getTime() : null;
}
function venctoDays(str) {
  const ms = parseBRDateMs(str);
  if (ms === null) return null;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return Math.round((ms - today.getTime()) / 86400000);
}
function parseValorNum(str) {
  if (!str) return 0;
  return parseFloat(str.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
}

// ─── Opções de ordenação por tab ──────────────────────────────────────────────
const SORT_OPTIONS_BY_TAB = {
  todas: [
    {
      id: 'prazo_urgente',
      label: 'Prazo mais urgente',
      sortFn: (a, b) => {
        const pa = Math.min(
          a.prazoIndicacao ?? Infinity,
          venctoDays(a.vencimento) ?? Infinity
        );
        const pb = Math.min(
          b.prazoIndicacao ?? Infinity,
          venctoDays(b.vencimento) ?? Infinity
        );
        return pa - pb;
      },
    },
    {
      id: 'data_recente',
      label: 'Data da multa — mais recente',
      sortFn: (a, b) => (parseBRDateMs(b.dataInfracao) || 0) - (parseBRDateMs(a.dataInfracao) || 0),
    },
    {
      id: 'valor_maior',
      label: 'Valor — maior primeiro',
      sortFn: (a, b) => parseValorNum(b.valor) - parseValorNum(a.valor),
    },
    {
      id: 'placa_az',
      label: 'Placa — A→Z',
      sortFn: (a, b) => a.placa.localeCompare(b.placa),
    },
  ],
  indicacao: [
    {
      id: 'prazo_indicacao_urgente',
      label: 'Prazo de indicação — mais urgente',
      sortFn: (a, b) => (a.prazoIndicacao ?? Infinity) - (b.prazoIndicacao ?? Infinity),
    },
    {
      id: 'data_recente',
      label: 'Data da multa — mais recente',
      sortFn: (a, b) => (parseBRDateMs(b.dataInfracao) || 0) - (parseBRDateMs(a.dataInfracao) || 0),
    },
    {
      id: 'valor_maior',
      label: 'Valor — maior primeiro',
      sortFn: (a, b) => parseValorNum(b.valor) - parseValorNum(a.valor),
    },
    {
      id: 'placa_az',
      label: 'Placa — A→Z',
      sortFn: (a, b) => a.placa.localeCompare(b.placa),
    },
  ],
  pagamento: [
    {
      id: 'vencimento_urgente',
      label: 'Vencimento — mais urgente',
      sortFn: (a, b) => (venctoDays(a.vencimento) ?? Infinity) - (venctoDays(b.vencimento) ?? Infinity),
    },
    {
      id: 'valor_maior',
      label: 'Valor — maior primeiro',
      sortFn: (a, b) => parseValorNum(b.valor) - parseValorNum(a.valor),
    },
    {
      id: 'data_recente',
      label: 'Data da multa — mais recente',
      sortFn: (a, b) => (parseBRDateMs(b.dataInfracao) || 0) - (parseBRDateMs(a.dataInfracao) || 0),
    },
    {
      id: 'placa_az',
      label: 'Placa — A→Z',
      sortFn: (a, b) => a.placa.localeCompare(b.placa),
    },
  ],
  recurso: [
    {
      id: 'data_recente',
      label: 'Data da multa — mais recente',
      sortFn: (a, b) => (parseBRDateMs(b.dataInfracao) || 0) - (parseBRDateMs(a.dataInfracao) || 0),
    },
    {
      id: 'valor_maior',
      label: 'Valor — maior primeiro',
      sortFn: (a, b) => parseValorNum(b.valor) - parseValorNum(a.valor),
    },
    {
      id: 'placa_az',
      label: 'Placa — A→Z',
      sortFn: (a, b) => a.placa.localeCompare(b.placa),
    },
  ],
};

// ─── SortDropdown ─────────────────────────────────────────────────────────────
function SortDropdown({ activeTab, activeSort, onSortChange }) {
  const [open, setOpen] = useInfState(false);
  const ref = useInfRef(null);
  const options = SORT_OPTIONS_BY_TAB[activeTab] || SORT_OPTIONS_BY_TAB.todas;
  const activeOption = options.find((o) => o.id === activeSort) || options[0];

  useInfEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '4px 8px',
          border: 'none', background: open ? 'var(--color-neutral-200)' : 'transparent',
          borderRadius: 6, cursor: 'pointer',
          fontFamily: 'var(--font-family-primary)',
          fontSize: 13, color: 'var(--color-neutral-700)',
          transition: 'background .12s', whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-neutral-200)'; }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.background = 'transparent'; }}>
        <span>Ordenar por: </span>
        <span style={{ fontWeight: 500 }}>{activeOption.label}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="var(--color-neutral-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ marginLeft: 2, transition: 'transform .15s', transform: open ? 'rotate(180deg)' : 'none' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', right: 0,
          background: '#fff',
          border: '1px solid var(--color-neutral-300)',
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          minWidth: 240, zIndex: 100,
          overflow: 'hidden',
        }}>
          {options.map((opt) => {
            const isActive = opt.id === activeSort;
            return (
              <button
                key={opt.id}
                onClick={() => { onSortChange(opt.id); setOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '8px 14px',
                  border: 'none', background: 'transparent',
                  fontFamily: 'var(--font-family-primary)',
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? '#f9401b' : 'var(--color-neutral-800)',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'background .1s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-neutral-200)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                <span>{opt.label}</span>
                {isActive && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="#f9401b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Colunas Kanban por tab ───────────────────────────────────────────────────
const KANBAN_COLUMNS_BY_TAB = {
  todas: [
    { id: 'notificacao', label: 'Notificação', borderColor: '#2a89ef' },
    { id: 'penalidade',  label: 'Penalidade',  borderColor: '#f9401b' },
  ],
  indicacao: [
    { id: 'indique_agora',         label: 'Indique agora',         borderColor: '#2a89ef' },
    { id: 'indicacao_presencial',  label: 'Indicação presencial',  borderColor: '#2a89ef' },
    { id: 'em_processamento',      label: 'Em processamento',      borderColor: '#f9ab10' },
    { id: 'enviada_orgao',         label: 'Enviada ao órgão',      borderColor: '#f9ab10' },
    { id: 'aguardando_aceite',     label: 'Aguardando aceite',     borderColor: '#f9ab10' },
    { id: 'condutor_indicado',     label: 'Condutor indicado',     borderColor: '#15be78' },
    { id: 'documentos_incorretos', label: 'Documentos incorretos', borderColor: '#f09595' },
    { id: 'falha_indicacao',       label: 'Falha na indicação',    borderColor: '#f09595' },
    { id: 'vencida',               label: 'Vencida',               borderColor: '#ddddde' },
    { id: 'recusada',              label: 'Recusada',              borderColor: '#ddddde' },
    { id: 'cancelada',             label: 'Cancelada',             borderColor: '#ddddde' },
  ],
  pagamento: [
    { id: 'em_aberto',            label: 'Pague agora',           borderColor: '#2a89ef' },
    { id: 'em_andamento',         label: 'Em andamento',          borderColor: '#f9ab10' },
    { id: 'pagamento_recusado',   label: 'Pagamento recusado',    borderColor: '#eb4b5b' },
    { id: 'pago',                 label: 'Pago',                  borderColor: '#15be78' },
  ],
  recurso: [
    { id: 'aberto',     label: 'Em aberto',  borderColor: '#2a89ef' },
    { id: 'deferido',   label: 'Deferido',   borderColor: '#15be78' },
    { id: 'indeferido', label: 'Indeferido', borderColor: '#eb4b5b' },
  ],
};

// ─── ViewToggle ───────────────────────────────────────────────────────────────
function ViewToggle({ activeView, onViewChange }) {
  const buttons = [
    { id: 'kanban', label: 'Kanban',    Icon: IconLayoutDashboard },
    { id: 'list',   label: 'Listagem',  Icon: IconListView },
  ];
  return (
    <div style={{
      display: 'flex',
      border: '1px solid var(--color-neutral-300)',
      borderRadius: 6,
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {buttons.map(({ id, label, Icon }, idx) => {
        const active = activeView === id;
        return (
          <button
            key={id}
            title={label}
            onClick={() => onViewChange(id)}
            style={{
              width: 32, height: 32,
              border: 'none',
              borderLeft: idx > 0 ? '1px solid var(--color-neutral-300)' : 'none',
              background: active ? '#1c1c1e' : '#fff',
              color: active ? '#fff' : 'var(--color-neutral-500)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background .12s, color .12s',
            }}
            onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = 'var(--color-neutral-100)'; }}}
            onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = '#fff'; }}}>
            <Icon />
          </button>
        );
      })}
    </div>
  );
}

// ─── KanbanCard ───────────────────────────────────────────────────────────────
function KanbanCard({ row, onCardClick }) {
  const [hovered, setHovered] = useInfState(false);
  const isNotificacao = row.tipo === 'notificacao';

  const daysLeft = isNotificacao ? row.prazoIndicacao : venctoDays(row.vencimento);
  let prazoDisplay = '—';
  let prazoColor = 'var(--color-neutral-500)';
  if (daysLeft !== null && daysLeft !== undefined) {
    prazoDisplay = isNotificacao
      ? (row.prazoDataFormatada || String(daysLeft) + 'd')
      : (row.vencimento || '—');
    prazoColor = daysLeft <= 5
      ? 'var(--color-error-600)'
      : daysLeft <= 15
        ? 'var(--color-warning-600)'
        : 'var(--color-neutral-500)';
  }

  return (
    <div
      onClick={() => onCardClick && onCardClick(row.ait)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#fafafa' : '#fff',
        border: '1px solid ' + (hovered ? 'var(--color-neutral-300)' : 'var(--color-neutral-200)'),
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        cursor: 'pointer',
        transition: 'background .12s, border-color .12s',
        fontFamily: 'var(--font-family-primary)',
        minHeight: 80,
        boxSizing: 'border-box',
      }}>

      {/* Linha 1: AIT + ícones de ação */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-neutral-900)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          AIT {row.ait}
        </span>
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          {isNotificacao && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/>
            </svg>
          )}
        </div>
      </div>

      {/* Linha 2: código + descrição truncada */}
      <div style={{ fontSize: 11, color: 'var(--color-neutral-600)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 8, lineHeight: 1.4 }}>
        {row.codigoInfracao} - {row.nomeInfracao}
      </div>

      {/* Linha 3: placa + valor + prazo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <span style={{
          background: 'var(--color-neutral-100)', color: 'var(--color-neutral-700)',
          fontSize: 10, fontWeight: 700,
          borderRadius: 4, padding: '2px 6px',
          border: '1px solid var(--color-neutral-300)',
          whiteSpace: 'nowrap',
        }}>{row.placa}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-neutral-900)', whiteSpace: 'nowrap' }}>
          {row.valor}
        </span>
        <span style={{ fontSize: 11, color: prazoColor, whiteSpace: 'nowrap' }}>
          {prazoDisplay}
        </span>
      </div>
    </div>
  );
}

// ─── KanbanColumn ─────────────────────────────────────────────────────────────
function KanbanColumn({ colDef, rows, onCardClick }) {
  if (!rows || rows.length === 0) return null;
  return (
    <div style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ paddingBottom: 10, borderBottom: '2px solid ' + colDef.borderColor }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-neutral-800)', flex: 1 }}>
            {colDef.label}
          </span>
          <span style={{
            background: 'var(--color-neutral-200)', color: 'var(--color-neutral-600)',
            fontSize: 11, fontWeight: 600,
            padding: '2px 8px', borderRadius: 1000, whiteSpace: 'nowrap',
          }}>{rows.length}</span>
        </div>
      </div>
      {/* Cards */}
      <div style={{
        marginTop: 12,
        maxHeight: 'calc(100vh - 320px)',
        overflowY: 'auto',
        scrollbarWidth: 'thin',
      }}>
        {rows.map((row) => (
          <KanbanCard key={row.id} row={row} onCardClick={onCardClick} />
        ))}
      </div>
    </div>
  );
}

// ─── KanbanView ───────────────────────────────────────────────────────────────
function KanbanView({ activeTab, activeChip, activeSort, onCardClick }) {
  const allColumns = KANBAN_COLUMNS_BY_TAB[activeTab] || [];
  const activeSortFn = (SORT_OPTIONS_BY_TAB[activeTab] || [])
    .find((o) => o.id === activeSort)?.sortFn;

  function getColRows(col) {
    let rows;
    if (activeTab === 'todas') {
      rows = MOCK_ROWS.filter((r) => r.tipo === col.id);
    } else {
      rows = MOCK_ROWS.filter((r) => r.statusVariant === col.id);
    }
    return activeSortFn ? [...rows].sort(activeSortFn) : rows;
  }

  // Chip filter: suporta statusVariants[] (multi-status) ou fallback por col.id
  const visibleColumns = allColumns.filter((col) => {
    if (activeChip === 'todos') return true;
    const chip = (CHIPS_BY_TAB[activeTab] || []).find((c) => c.id === activeChip);
    if (chip && chip.statusVariants) return chip.statusVariants.includes(col.id);
    return col.id === activeChip;
  });

  return (
    <div style={{
      display: 'flex', gap: 12,
      overflowX: 'auto',
      padding: '0 0 24px 0',
      flexWrap: 'nowrap',
      alignItems: 'flex-start',
    }}>
      {visibleColumns.map((col) => (
        <KanbanColumn
          key={col.id}
          colDef={col}
          rows={getColRows(col)}
          onCardClick={onCardClick} />
      ))}
    </div>
  );
}

// ─── Demo FAB ─────────────────────────────────────────────────────────────────
function DemoFab({ listState, setListState }) {
  const [open, setOpen] = useInfState(false);
  const ref = useInfRef(null);

  useInfEffect(() => {
    if (!open) return;
    const handler = (e) => {if (ref.current && !ref.current.contains(e.target)) setOpen(false);};
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const states = [
  { id: 'success', label: 'Sucesso', icon: '✓' },
  { id: 'loading', label: 'Carregando', icon: '⟳' },
  { id: 'empty', label: 'Vazio', icon: '○' },
  { id: 'empty_filtered', label: 'Sem resultados', icon: '⊘' },
  { id: 'error', label: 'Erro', icon: '!' }];


  return (
    <div
      ref={ref}
      style={{
        position: 'fixed', bottom: 24, right: 24,
        zIndex: 9999,
        display: 'flex', flexDirection: 'column-reverse', alignItems: 'flex-end', gap: 8
      }}>
      
      {/* FAB principal */}
      <button
        onClick={() => setOpen((v) => !v)}
        title="Demo: estado da lista"
        style={{
          width: 44, height: 44,
          borderRadius: '50%',
          border: 'none',
          background: open ? 'var(--color-neutral-800)' : 'var(--color-neutral-700)',
          color: '#fff',
          boxShadow: '0 4px 14px rgba(0,0,0,0.22)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background .15s, transform .15s',
          transform: open ? 'rotate(45deg)' : 'none',
          fontSize: 22, lineHeight: 1
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-neutral-900)'}
        onMouseLeave={(e) => e.currentTarget.style.background = open ? 'var(--color-neutral-800)' : 'var(--color-neutral-700)'}>
        
        ⚙
      </button>

      {/* Opções — aparecem acima do FAB */}
      {open &&
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 6,
        background: 'var(--color-neutral-100)',
        border: '1px solid var(--color-neutral-300)',
        borderRadius: 10,
        boxShadow: '0 8px 24px rgba(0,0,0,0.13)',
        padding: '8px 6px',
        minWidth: 168
      }}>
          <span style={{
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.07em', color: 'var(--color-neutral-500)',
          padding: '2px 8px 4px',
          fontFamily: 'var(--font-family-primary)'
        }}>Demo — Estado da lista</span>
          {states.map((s) => {
          const active = listState === s.id;
          return (
            <button
              key={s.id}
              onClick={() => {setListState(s.id);setOpen(false);}}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '7px 10px',
                border: 'none',
                borderRadius: 7,
                background: active ? 'var(--color-primary-200)' : 'transparent',
                color: active ? 'var(--color-primary-700)' : 'var(--color-neutral-700)',
                fontFamily: 'var(--font-family-primary)',
                fontSize: 13, fontWeight: active ? 700 : 400,
                cursor: 'pointer', textAlign: 'left', width: '100%',
                transition: 'background .1s'
              }}
              onMouseEnter={(e) => {if (!active) e.currentTarget.style.background = 'var(--color-neutral-200)';}}
              onMouseLeave={(e) => {if (!active) e.currentTarget.style.background = 'transparent';}}>
              
                <span style={{
                width: 22, height: 22, borderRadius: '50%',
                background: active ? 'var(--color-primary-500)' : 'var(--color-neutral-300)',
                color: active ? '#fff' : 'var(--color-neutral-600)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, flexShrink: 0
              }}>{s.icon}</span>
                {s.label}
              </button>);

        })}
        </div>
      }
    </div>);

}

// ─── DrawerIndicacao ──────────────────────────────────────────────────────────
function DrawerIndicacao({ row, open, onClose }) {
  useInfEffect(() => {
    if (!open) return;
    const handler = (e) => {if (e.key === 'Escape') onClose();};
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const TIMELINE = [
  {
    status: 'CONDUTOR INDICADO',
    date: '16/04/2026 14:32',
    desc: 'Indicação deferida pelo órgão. Condutor: Rebeca Valetich',
    current: true
  },
  {
    status: 'ENVIADA AO ÓRGÃO',
    date: '16/04/2026 10:15',
    desc: 'Formulário enviado ao DETRAN-SP para análise.',
    current: false
  },
  {
    status: 'EM PROCESSAMENTO',
    date: '16/04/2026 09:58',
    desc: 'Documentos em análise pelo time de operações.',
    current: false
  },
  {
    status: 'INDIQUE AGORA',
    date: '14/04/2026 08:00',
    desc: 'Notificação recebida. Prazo de indicação: 25/07/2025.',
    current: false
  }];


  return (
    <>
      {/* Overlay */}
      {open &&
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.30)',
          animation: 'fadeIn 200ms ease'
        }} />

      }
      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, height: '100vh', width: 440,
        background: '#fff',
        borderLeft: '1px solid var(--color-neutral-300)',
        boxShadow: '-4px 0 16px rgba(0,0,0,0.10)',
        zIndex: 1001,
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 250ms ease'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--color-neutral-200)',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-neutral-900)', fontFamily: 'var(--font-family-primary)' }}>
              Indicação de condutor
            </span>
            <button onClick={onClose} style={{
              width: 28, height: 28, border: 'none', background: 'transparent',
              borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-neutral-500)', transition: 'background .12s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-neutral-200)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <span style={{ fontSize: 12, color: 'var(--color-neutral-500)', fontFamily: 'var(--font-family-primary)' }}>
            AIT {row?.ait} · {row?.codigoInfracao} - {row?.nomeInfracao}
          </span>
        </div>

        {/* Body scrollável */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>

          {/* Timeline */}
          <div style={{ position: 'relative', paddingLeft: 28 }}>
            {/* Linha vertical */}
            <div style={{
              position: 'absolute', left: 4, top: 10, bottom: 10,
              width: 2, background: 'var(--color-neutral-200)'
            }} />

            {TIMELINE.map((ev, i) =>
            <div key={i} style={{ position: 'relative', marginBottom: i < TIMELINE.length - 1 ? 24 : 0 }}>
                {/* Ponto */}
                <div style={{
                position: 'absolute', left: -24, top: 2,
                width: 10, height: 10, borderRadius: '50%',
                background: ev.current ? 'var(--color-success-500)' : 'var(--color-neutral-400)',
                boxShadow: ev.current ? '0 0 0 4px var(--color-success-100)' : 'none',
                zIndex: 1
              }} />

                {/* Card do evento atual */}
                {ev.current ?
              <div style={{
                background: 'var(--color-success-50, #f0faf4)',
                border: '1px solid var(--color-success-200)',
                borderRadius: 8, padding: 12
              }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-success-700)', fontFamily: 'var(--font-family-primary)' }}>
                        {ev.status}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--color-neutral-400)', whiteSpace: 'nowrap', fontFamily: 'var(--font-family-primary)' }}>
                        {ev.date}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: 12, color: 'var(--color-neutral-600)', fontFamily: 'var(--font-family-primary)', lineHeight: 1.5 }}>
                      {ev.desc}
                    </p>
                  </div> :

              <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-neutral-700)', fontFamily: 'var(--font-family-primary)' }}>
                        {ev.status}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--color-neutral-400)', whiteSpace: 'nowrap', fontFamily: 'var(--font-family-primary)' }}>
                        {ev.date}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: 12, color: 'var(--color-neutral-600)', fontFamily: 'var(--font-family-primary)', lineHeight: 1.5 }}>
                      {ev.desc}
                    </p>
                  </div>
              }
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--color-neutral-200)', margin: '24px 0' }} />

          {/* Info condutor */}
          <div style={{
            background: 'var(--color-neutral-50, #fafafa)',
            border: '1px solid var(--color-neutral-200)',
            borderRadius: 8, padding: 12
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--color-neutral-500)', fontFamily: 'var(--font-family-primary)' }}>
              Condutor responsável
            </span>
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-neutral-900)', fontFamily: 'var(--font-family-primary)' }}>Rebeca Valetich</span>
              <span style={{ fontSize: 12, color: 'var(--color-neutral-600)', fontFamily: 'var(--font-family-primary)' }}>CPF: 438.763.648-33</span>
              <span style={{ fontSize: 12, color: 'var(--color-neutral-600)', fontFamily: 'var(--font-family-primary)' }}>Data da indicação: 16/04/2026</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </>);

}

// ─── DrawerPagamento ──────────────────────────────────────────────────────────
function DrawerPagamento({ row, open, onClose }) {
  useInfEffect(() => {
    if (!open) return;
    const handler = (e) => {if (e.key === 'Escape') onClose();};
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const TIMELINE = [
  {
    status: 'BOLETO DISPONÍVEL',
    date: '04/04/2026',
    desc: 'Boleto gerado pelo órgão autuador. Vencimento: 22/04/2026',
    current: true
  },
  {
    status: 'AGUARDANDO BOLETO',
    date: '01/04/2026',
    desc: 'Multa registrada. Aguardando geração do boleto pelo órgão.',
    current: false
  },
  {
    status: 'NOTIFICAÇÃO RECEBIDA',
    date: '10/03/2026',
    desc: 'Infração capturada. Valor original: R$ 195,23',
    current: false
  }];


  return (
    <>
      {open &&
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.30)',
        animation: 'fadeIn 200ms ease'
      }} />
      }
      <div style={{
        position: 'fixed', top: 0, right: 0, height: '100vh', width: 440,
        background: '#fff',
        borderLeft: '1px solid var(--color-neutral-300)',
        boxShadow: '-4px 0 16px rgba(0,0,0,0.10)',
        zIndex: 1001,
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 250ms ease'
      }}>
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-neutral-200)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-neutral-900)', fontFamily: 'var(--font-family-primary)' }}>
              Situação do pagamento
            </span>
            <button onClick={onClose} style={{
              width: 28, height: 28, border: 'none', background: 'transparent',
              borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-neutral-500)', transition: 'background .12s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-neutral-200)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <span style={{ fontSize: 12, color: 'var(--color-neutral-500)', fontFamily: 'var(--font-family-primary)' }}>
            AIT {row?.ait} · {row?.valor}
          </span>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {/* Timeline */}
          <div style={{ position: 'relative', paddingLeft: 28 }}>
            <div style={{
              position: 'absolute', left: 4, top: 10, bottom: 10,
              width: 2, background: 'var(--color-neutral-200)'
            }} />
            {TIMELINE.map((ev, i) =>
            <div key={i} style={{ position: 'relative', marginBottom: i < TIMELINE.length - 1 ? 24 : 0 }}>
                <div style={{
                position: 'absolute', left: -24, top: 2,
                width: 10, height: 10, borderRadius: '50%',
                background: ev.current ? '#f9401b' : 'var(--color-neutral-400)',
                boxShadow: ev.current ? '0 0 0 4px #fff3f0' : 'none',
                zIndex: 1
              }} />
                {ev.current ?
              <div style={{
                background: '#fff3f0',
                border: '1px solid rgba(249,64,27,0.3)',
                borderRadius: 8, padding: 12
              }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#f9401b', fontFamily: 'var(--font-family-primary)' }}>
                        {ev.status}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--color-neutral-400)', whiteSpace: 'nowrap', fontFamily: 'var(--font-family-primary)' }}>
                        {ev.date}
                      </span>
                    </div>
                    <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--color-neutral-600)', fontFamily: 'var(--font-family-primary)', lineHeight: 1.5 }}>
                      {ev.desc}
                    </p>
                    <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '5px 12px', border: '1px solid var(--color-neutral-400)',
                  borderRadius: 6, background: '#fff',
                  fontSize: 12, fontWeight: 500, color: 'var(--color-neutral-700)',
                  cursor: 'pointer', fontFamily: 'var(--font-family-primary)',
                  transition: 'border-color .12s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#f9401b'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-neutral-400)'}>
                  
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Baixar boleto
                    </button>
                  </div> :

              <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-neutral-700)', fontFamily: 'var(--font-family-primary)' }}>{ev.status}</span>
                      <span style={{ fontSize: 11, color: 'var(--color-neutral-400)', whiteSpace: 'nowrap', fontFamily: 'var(--font-family-primary)' }}>{ev.date}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 12, color: 'var(--color-neutral-600)', fontFamily: 'var(--font-family-primary)', lineHeight: 1.5 }}>{ev.desc}</p>
                  </div>
              }
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--color-neutral-200)', margin: '24px 0' }} />

          {/* Resumo de valores */}
          <div style={{
            background: 'var(--color-neutral-50, #fafafa)',
            border: '1px solid var(--color-neutral-200)',
            borderRadius: 8, padding: 12,
            display: 'flex', flexDirection: 'column', gap: 10
          }}>
            {[
            { label: 'Valor da multa', value: 'R$ 195,23', color: 'var(--color-neutral-900)' },
            { label: 'Valor com desconto SNE 40%', value: 'R$ 117,14', color: 'var(--color-success-600)' },
            { label: 'Vencimento do boleto', value: '22/04/2026', color: 'var(--color-error-600)' }].
            map((item) =>
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'var(--color-neutral-500)', fontFamily: 'var(--font-family-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  {item.label}
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: item.color, fontFamily: 'var(--font-family-primary)', fontVariantNumeric: 'tabular-nums' }}>
                  {item.value}
                </span>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
              <span style={{ fontSize: 11, color: 'var(--color-neutral-500)', fontFamily: 'var(--font-family-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                Status
              </span>
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '3px 10px', borderRadius: 20,
                background: 'var(--color-success-100)', color: 'var(--color-success-700)',
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em'
              }}>Boleto disponível</span>
            </div>
          </div>
        </div>

        {/* Footer fixo */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid var(--color-neutral-200)',
          background: '#fff', flexShrink: 0
        }}>
          <button style={{
            width: '100%', height: 44,
            background: '#f9401b', color: '#fff', border: 'none',
            borderRadius: 8, fontSize: 15, fontWeight: 700,
            fontFamily: 'var(--font-family-primary)',
            cursor: 'pointer', transition: 'background .15s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#d9350f'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#f9401b'}>
            
            Pagar multa
          </button>
        </div>
      </div>
    </>);

}

// ─── MultiAutocompleteSelect ─────────────────────────────────────────────────
// Multi-select conforme Design System Frota 162 (node 3730-6070)
// ─── QuickSelect — dropdown simples com label, visual igual ao AutocompleteSelect ─
function QuickSelect({ label, value, options, onChange, flex, minWidth }) {
  const [open, setOpen] = useInfState(false);
  const wrapRef = useInfRef(null);
  const [dropRect, setDropRect] = useInfState(null);

  useInfEffect(() => {
    if (!open) return;
    const handler = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  function openDrop() {
    if (!wrapRef.current) return;
    setDropRect(wrapRef.current.getBoundingClientRect());
    setOpen(true);
  }

  return (
    <div style={{ flex: flex || '1 1 0', minWidth: minWidth || 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-neutral-700)', fontFamily: 'var(--font-family-primary)', display: 'block', pointerEvents: 'none' }}>{label}</label>
      <div
        ref={wrapRef}
        onClick={open ? () => setOpen(false) : openDrop}
        style={{
          position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6,
          height: 38, padding: '0 12px',
          border: '1px solid ' + (open ? 'var(--color-primary-500)' : 'var(--color-neutral-400)'),
          borderRadius: 8, background: '#fff',
          fontFamily: 'var(--font-family-primary)', fontSize: 13,
          color: value ? 'var(--color-neutral-1000)' : 'var(--color-neutral-700)',
          cursor: 'pointer', userSelect: 'none',
        }}>
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value || 'Selecione'}
        </span>
        {value
          ? <span onMouseDown={(e) => { e.stopPropagation(); onChange(''); }} style={{ display: 'flex', color: 'var(--color-neutral-500)', cursor: 'pointer' }}><IconX /></span>
          : <span style={{ display: 'flex', color: 'var(--color-neutral-600)', transition: 'transform .2s', transform: open ? 'rotate(180deg)' : '' }}><IconChevronDown /></span>
        }
      </div>
      {open && dropRect && ReactDOM.createPortal(
        <div style={{
          position: 'fixed', top: dropRect.bottom + 4, left: dropRect.left, width: dropRect.width,
          zIndex: 9999, background: '#fff', border: '1px solid var(--color-neutral-300)',
          borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.12)', overflow: 'auto', maxHeight: 220,
        }}>
          {options.map((opt) => (
            <div key={opt}
              onMouseDown={() => { onChange(opt === value ? '' : opt); setOpen(false); }}
              style={{
                padding: '8px 12px', fontSize: 13, cursor: 'pointer',
                fontFamily: 'var(--font-family-primary)',
                color: opt === value ? 'var(--color-primary-600)' : 'var(--color-neutral-900)',
                background: opt === value ? 'var(--color-primary-50, #eff6ff)' : 'transparent',
              }}
              onMouseEnter={(e) => { if (opt !== value) e.currentTarget.style.background = 'var(--color-neutral-100)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = opt === value ? 'var(--color-primary-50, #eff6ff)' : 'transparent'; }}
            >{opt}</div>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}

// Campo fixo 40px • chips border-style • dropdown com checkbox DS • "Selecionar todos"
// Overflow "+N" calculado dinamicamente pela largura real do campo

function MultiAutocompleteSelect({ label, placeholder, options, value, onChange, flex, minWidth }) {
  const [selectedItems, setSelectedItems] = useInfState(value || []);
  const [filterQuery, setFilterQuery] = useInfState('');
  const [open, setOpen] = useInfState(false);
  const [focused, setFocused] = useInfState(false);
  const [dropRect, setDropRect] = useInfState(null);
  const [overflowIdx, setOverflowIdx] = useInfState(null); // null = sem overflow, N = mostrar chips 0..N-1
  const wrapRef = useInfRef(null);
  const fieldRef = useInfRef(null);
  const inputRef = useInfRef(null);
  const measureRef = useInfRef(null); // div oculta para medir chips

  const allSelected = options.length > 0 && selectedItems.length === options.length;
  const someSelected = selectedItems.length > 0 && !allSelected;
  const hasSelection = selectedItems.length > 0;
  const isActive = focused || open;

  const filtered = filterQuery
    ? options.filter(o => o.toLowerCase().includes(filterQuery.toLowerCase()))
    : options;

  // Calcula quantos chips cabem na largura real do campo
  useInfEffect(() => {
    if (!measureRef.current || !fieldRef.current || selectedItems.length === 0) {
      setOverflowIdx(null);
      return;
    }
    const chipEls = measureRef.current.querySelectorAll('[data-chip-measure]');
    if (!chipEls.length) { setOverflowIdx(null); return; }

    // Largura disponível = largura do campo - padding esquerdo(16) - padding direito(12) - chevron(16) - gap(8)
    const available = fieldRef.current.clientWidth - 16 - 12 - 16 - 8;
    const OVERFLOW_W = 56; // largura estimada do "+N ×"
    const GAP = 4;

    let acc = 0;
    let idx = null;
    for (let i = 0; i < chipEls.length; i++) {
      const w = chipEls[i].offsetWidth + (i > 0 ? GAP : 0);
      const hasMore = i < chipEls.length - 1;
      const needed = acc + w + (hasMore ? GAP + OVERFLOW_W : 0);
      if (needed > available) { idx = i; break; }
      acc += w;
    }
    setOverflowIdx(idx);
  }, [selectedItems]);

  const visibleChips = overflowIdx !== null ? selectedItems.slice(0, overflowIdx) : selectedItems;
  const overflowCount = overflowIdx !== null ? selectedItems.length - overflowIdx : 0;

  const calcRect = () => {
    if (fieldRef.current) {
      const r = fieldRef.current.getBoundingClientRect();
      setDropRect({ top: r.bottom + 4, left: r.left, width: r.width });
    }
  };

  const openDropdown = () => { calcRect(); setOpen(true); };

  const handleFieldClick = () => {
    inputRef.current && inputRef.current.focus();
    openDropdown();
  };

  const handleFocus = () => { setFocused(true); openDropdown(); };

  const handleInputChange = (e) => {
    setFilterQuery(e.target.value);
    if (!open) openDropdown();
  };

  const handleToggle = (opt) => {
    const next = selectedItems.includes(opt)
      ? selectedItems.filter(i => i !== opt)
      : [...selectedItems, opt];
    setSelectedItems(next);
    onChange && onChange(next);
    setFilterQuery('');
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
  };

  const handleToggleAll = () => {
    const next = allSelected ? [] : [...options];
    setSelectedItems(next);
    onChange && onChange(next);
  };

  const handleRemoveChip = (e, opt) => {
    e.stopPropagation();
    const next = selectedItems.filter(i => i !== opt);
    setSelectedItems(next);
    onChange && onChange(next);
  };

  const handleRemoveOverflow = (e) => {
    e.stopPropagation();
    const next = selectedItems.slice(0, MULTI_MAX_CHIPS);
    setSelectedItems(next);
    onChange && onChange(next);
  };

  useInfEffect(() => {
    if (open) calcRect();
  }, [open]);

  useInfEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false); setFocused(false); setFilterQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── Chip DS style ──
  const chipStyle = {
    display: 'inline-flex', alignItems: 'center', gap: 4,
    border: '1px solid var(--color-neutral-400, #ddddde)',
    borderRadius: 8, padding: '3px 8px',
    background: 'var(--color-neutral-100, #fff)',
    fontSize: 12, lineHeight: '15px', fontWeight: 400,
    fontFamily: 'var(--font-family-primary)',
    color: 'var(--color-neutral-1000, #0a0a0a)',
    whiteSpace: 'nowrap', flexShrink: 0,
  };

  return (
    <div ref={wrapRef} style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: minWidth || 180, flex: flex || '1 1 180px', position: 'relative' }}>
      <label style={filterLabelStyle}>{label}</label>

      {/* Div de medição oculta — renderiza todos os chips para medir largura real */}
      <div ref={measureRef} style={{
        position: 'absolute', visibility: 'hidden', pointerEvents: 'none',
        display: 'flex', gap: 4, top: 0, left: 0, zIndex: -1,
      }}>
        {selectedItems.map(item => (
          <span key={item} data-chip-measure style={chipStyle}>{item}<span style={{ display: 'inline-flex', marginLeft: 4 }}><IconX /></span></span>
        ))}
      </div>

      {/* ── Field ── */}
      <div
        ref={fieldRef}
        onClick={handleFieldClick}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          cursor: 'text',
          border: `1px solid ${isActive ? 'var(--color-primary-500)' : 'var(--color-neutral-400, #ddddde)'}`,
          borderRadius: 8, background: 'var(--color-neutral-100)',
          height: 40, padding: '0 12px 0 16px',
          boxShadow: isActive ? '0 0 0 3px var(--color-primary-100)' : 'none',
          transition: 'border-color .15s, box-shadow .15s',
          overflow: 'hidden', position: 'relative',
        }}>
        {/* Chips + input invisível */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, minWidth: 0, overflow: 'hidden' }}>
          {visibleChips.map(item => (
            <span key={item} style={chipStyle}>
              {item}
              <span onMouseDown={(e) => handleRemoveChip(e, item)}
                style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', color: 'var(--color-neutral-600)' }}>
                <IconX />
              </span>
            </span>
          ))}
          {overflowCount > 0 && (
            <span style={chipStyle}>
              +{overflowCount}
              <span onMouseDown={handleRemoveOverflow}
                style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', color: 'var(--color-neutral-600)' }}>
                <IconX />
              </span>
            </span>
          )}
          <input
            ref={inputRef}
            className="inf-placeholder-input"
            value={filterQuery}
            placeholder={hasSelection ? '' : placeholder}
            onFocus={handleFocus}
            onBlur={() => setFocused(false)}
            onChange={handleInputChange}
            style={{
              flex: '1 1 60px', border: 'none', outline: 'none', background: 'transparent',
              fontFamily: 'var(--font-family-primary)', fontSize: 14,
              color: 'var(--color-neutral-900)', height: 38, minWidth: 40, padding: 0,
            }}
          />
        </div>
        {/* Chevron — roda quando aberto */}
        <span style={{
          color: 'var(--color-neutral-600)', display: 'inline-flex', flexShrink: 0,
          transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s',
        }}>
          <IconChevronDown />
        </span>
      </div>

      {/* ── Dropdown ── */}
      {open && dropRect && (
        <div style={{
          position: 'fixed', top: dropRect.top, left: dropRect.left, width: dropRect.width,
          zIndex: 9999, background: '#fff',
          border: '1px solid var(--color-neutral-400, #ddddde)',
          borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          maxHeight: 280, overflowY: 'auto', padding: 2,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 0' }}>

            {/* Selecionar todos */}
            <div
              onMouseDown={handleToggleAll}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, cursor: 'pointer', borderRadius: 6 }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-neutral-100)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Checkbox DS */}
              <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                  border: (allSelected || someSelected) ? 'none' : '1px solid var(--color-neutral-500, #bebec0)',
                  background: (allSelected || someSelected) ? 'var(--color-primary-500, #f9401b)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {allSelected && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  {someSelected && <svg width="8" height="2" viewBox="0 0 8 2" fill="none"><path d="M1 1H7" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>}
                </div>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-family-primary)', color: 'var(--color-neutral-1000)' }}>
                Selecionar todos
              </span>
            </div>

            {/* Divisor */}
            <div style={{ height: 1, background: 'var(--color-neutral-200)', margin: '2px 8px' }} />

            {/* Opções */}
            {filtered.map(opt => {
              const isSel = selectedItems.includes(opt);
              return (
                <div
                  key={opt}
                  onMouseDown={() => handleToggle(opt)}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, cursor: 'pointer', borderRadius: 6 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--color-neutral-100)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {/* Checkbox DS */}
                  <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                      border: isSel ? 'none' : '1px solid var(--color-neutral-500, #bebec0)',
                      background: isSel ? 'var(--color-primary-500, #f9401b)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {isSel && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                  </div>
                  <span style={{
                    fontSize: 14, fontWeight: isSel ? 700 : 400,
                    fontFamily: 'var(--font-family-primary)',
                    color: 'var(--color-neutral-1000)',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
                  }}>{opt}</span>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div style={{ padding: '10px 16px', fontSize: 14, color: 'var(--color-neutral-500)', fontFamily: 'var(--font-family-primary)' }}>
                Nenhum resultado
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tipos de data disponíveis por tab ───────────────────────────────────────
const DATE_TYPE_OPTIONS = [
  { id: 'infraction',           label: 'Data da Infração',                   tabs: ['todas', 'indicacao'] },
  { id: 'notification_emit',    label: 'Data de Emissão da Notificação',      tabs: ['todas', 'indicacao'] },
  { id: 'indication_deadline',  label: 'Data Limite de Indicação',            tabs: ['todas', 'indicacao'] },
  { id: 'notification_created', label: 'Data de Criação da Notificação',      tabs: ['todas'] },
  { id: 'fine_created',         label: 'Data de Criação da Multa',            tabs: ['todas'] },
  { id: 'notification_cancel',  label: 'Data de Cancelamento da Notificação', tabs: ['todas'] },
  { id: 'fine_cancel',          label: 'Data de Cancelamento da Multa',       tabs: ['todas'] },
  { id: 'fine',                 label: 'Data da Multa',                       tabs: ['todas', 'pagamento'] },
  { id: 'fine_expiry',          label: 'Data de Vencimento da Multa',         tabs: ['todas', 'pagamento'] },
  { id: 'boleto_expiry',        label: 'Data de Vencimento do Boleto',        tabs: ['todas', 'pagamento'] },
  { id: 'payment',              label: 'Data de Pagamento',                   tabs: ['todas', 'pagamento'] },
];
window.DATE_TYPE_OPTIONS = DATE_TYPE_OPTIONS;

// ─── DateRangePicker ──────────────────────────────────────────────────────────
function DateRangePicker({ startDate, endDate, onChange, inputStyle, wrapStyle }) {
  const [open, setOpen] = useInfState(false);
  const [hoverDate, setHoverDate] = useInfState(null);
  const [phase, setPhase] = useInfState('start'); // 'start' | 'end'
  const [viewMonth, setViewMonth] = useInfState(() => {
    const d = startDate || new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const [dropPos, setDropPos] = useInfState({});
  const fieldRef = useInfRef(null);
  const dropRef = useInfRef(null);

  const MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const DAYS   = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

  function fmtDate(d) {
    if (!d) return '';
    return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  }
  function isSameDay(a, b) {
    return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }
  const displayText = startDate && endDate
    ? `${fmtDate(startDate)} – ${fmtDate(endDate)}`
    : startDate ? `${fmtDate(startDate)} – ...` : '';

  function openPicker() {
    if (!fieldRef.current) return;
    const r = fieldRef.current.getBoundingClientRect();
    const pickerH = 340;
    const top = (window.innerHeight - r.bottom) >= pickerH ? r.bottom + 4 : r.top - pickerH - 4;
    setDropPos({ top, left: r.left });
    setOpen(true);
    setPhase(startDate ? 'end' : 'start');
  }

  useInfEffect(() => {
    if (!open) return;
    const h = (e) => {
      if (fieldRef.current && !fieldRef.current.contains(e.target) &&
          dropRef.current && !dropRef.current.contains(e.target)) {
        setOpen(false); setHoverDate(null);
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  function handleDayClick(date) {
    if (phase === 'start') {
      onChange(date, null);
      setPhase('end');
    } else {
      if (date < startDate) { onChange(date, startDate); }
      else { onChange(startDate, date); }
      setPhase('start');
      setOpen(false);
      setHoverDate(null);
    }
  }

  function prevMonth() {
    setViewMonth(v => {
      const d = new Date(v.year, v.month - 1, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }
  function nextMonth() {
    setViewMonth(v => {
      const d = new Date(v.year, v.month + 1, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  const { year, month } = viewMonth;
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const todayStr = new Date().toDateString();

  return (
    <div ref={fieldRef} style={{ position: 'relative', ...wrapStyle }}>
      <div
        onClick={() => open ? setOpen(false) : openPicker()}
        style={{
          display: 'flex', alignItems: 'center',
          height: 40, padding: '0 32px 0 12px', boxSizing: 'border-box',
          border: `1px solid ${open ? 'var(--color-primary-500)' : 'var(--color-neutral-400)'}`,
          borderRadius: 8, background: '#fff', cursor: 'pointer',
          fontFamily: 'var(--font-family-primary)', fontSize: 13,
          color: displayText ? 'var(--color-neutral-1000)' : 'var(--color-neutral-700)',
          whiteSpace: 'nowrap', overflow: 'hidden',
          boxShadow: open ? '0 0 0 2px var(--color-primary-200)' : 'none',
          transition: 'border-color .15s, box-shadow .15s',
          ...inputStyle,
        }}
      >
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {displayText || 'DD/MM/AAAA – DD/MM/AAAA'}
        </span>
        {(startDate || endDate) ? (
          <span
            onMouseDown={e => { e.stopPropagation(); onChange(null, null); setPhase('start'); }}
            style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--color-neutral-500)', display: 'inline-flex' }}
          ><IconX /></span>
        ) : (
          <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'inline-flex', color: 'var(--color-neutral-600)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </span>
        )}
      </div>

      {open && ReactDOM.createPortal(
        <div ref={dropRef} style={{
          position: 'fixed', top: dropPos.top, left: dropPos.left,
          width: 280, zIndex: 9999, background: '#fff',
          border: '1px solid var(--color-neutral-200)', borderRadius: 12,
          boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
          fontFamily: 'var(--font-family-primary)',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 10px' }}>
            <button onClick={prevMonth} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px',
              borderRadius: 6, color: 'var(--color-neutral-700)', fontSize: 16, lineHeight: 1,
              display: 'flex', alignItems: 'center', transition: 'background .1s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-neutral-200)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}>‹</button>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-neutral-900)' }}>
              {MONTHS[month]} {year}
            </span>
            <button onClick={nextMonth} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px',
              borderRadius: 6, color: 'var(--color-neutral-700)', fontSize: 16, lineHeight: 1,
              display: 'flex', alignItems: 'center', transition: 'background .1s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-neutral-200)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}>›</button>
          </div>
          {/* Hint */}
          <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--color-neutral-500)', marginBottom: 6, fontWeight: 500 }}>
            {phase === 'start' ? 'Selecione a data inicial' : 'Selecione a data final'}
          </div>
          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 12px' }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: 'var(--color-neutral-500)', padding: '4px 0' }}>{d}</div>
            ))}
          </div>
          {/* Days grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, padding: '4px 12px 8px' }}>
            {cells.map((date, i) => {
              if (!date) return <div key={`e${i}`} />;
              const isStart = isSameDay(date, startDate);
              const isEnd   = isSameDay(date, endDate);
              const isToday = date.toDateString() === todayStr;
              const rangeEnd = phase === 'end' && hoverDate ? hoverDate : endDate;
              let inRange = false;
              if (startDate && rangeEnd) {
                const lo = startDate < rangeEnd ? startDate : rangeEnd;
                const hi = startDate < rangeEnd ? rangeEnd : startDate;
                inRange = date > lo && date < hi;
              }
              const isSelected = isStart || isEnd;
              return (
                <div key={date.toISOString()}
                  onClick={() => handleDayClick(date)}
                  onMouseEnter={() => phase === 'end' && setHoverDate(date)}
                  onMouseLeave={() => phase === 'end' && setHoverDate(null)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    height: 34, borderRadius: 6, cursor: 'pointer', fontSize: 13,
                    background: isSelected ? 'var(--color-primary-500)' : inRange ? 'var(--color-primary-100)' : 'transparent',
                    color: isSelected ? '#fff' : isToday ? 'var(--color-primary-600)' : 'var(--color-neutral-900)',
                    fontWeight: isSelected ? 700 : isToday ? 600 : 400,
                    transition: 'background .1s',
                    userSelect: 'none',
                  }}
                  onMouseOver={e => { if (!isSelected && !inRange) e.currentTarget.style.background = 'var(--color-neutral-200)'; }}
                  onMouseOut={e => {
                    if (!isSelected && !inRange) e.currentTarget.style.background = 'transparent';
                    else if (inRange) e.currentTarget.style.background = 'var(--color-primary-100)';
                  }}
                >{date.getDate()}</div>
              );
            })}
          </div>
          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '8px 16px 12px', borderTop: '1px solid var(--color-neutral-200)' }}>
            <button
              onClick={() => { onChange(null, null); setPhase('start'); }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 13, color: 'var(--color-neutral-600)', padding: '4px 8px',
                borderRadius: 4, fontFamily: 'var(--font-family-primary)',
                transition: 'color .1s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary-500)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-neutral-600)'}
            >Limpar datas</button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

// ─── DateFilter — tipo de data + range picker ─────────────────────────────────
function DateFilter({ activeTab, flex }) {
  const [dateType,  setDateType]  = useInfState(null);
  const [startDate, setStartDate] = useInfState(null);
  const [endDate,   setEndDate]   = useInfState(null);
  const [open,      setOpen]      = useInfState(false);
  const [dropPos,   setDropPos]   = useInfState({});
  const [tooltip,   setTooltip]   = useInfState(null); // { text, x, y }
  const fieldRef = useInfRef(null);
  const dropRef  = useInfRef(null);

  const availableOpts = DATE_TYPE_OPTIONS.filter(o => o.tabs.includes(activeTab));

  useInfEffect(() => {
    if (dateType && !availableOpts.find(o => o.id === dateType)) setDateType(null);
  }, [activeTab]);

  const selectedLabel = availableOpts.find(o => o.id === dateType)?.label || null;

  function openDrop() {
    if (!fieldRef.current) return;
    const r = fieldRef.current.getBoundingClientRect();
    setDropPos({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 300) });
    setOpen(true);
  }

  useInfEffect(() => {
    if (!open) return;
    const h = (e) => {
      if (fieldRef.current && !fieldRef.current.contains(e.target) &&
          dropRef.current && !dropRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  // Tooltip portal
  const tooltipEl = tooltip && ReactDOM.createPortal(
    <div style={{
      position: 'fixed', top: tooltip.y, left: tooltip.x, transform: 'translateX(-50%)',
      background: 'var(--color-neutral-900)', color: '#fff',
      fontSize: 12, padding: '5px 10px', borderRadius: 6,
      fontFamily: 'var(--font-family-primary)', whiteSpace: 'nowrap',
      zIndex: 99999, pointerEvents: 'none',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    }}>{tooltip.text}</div>,
    document.body
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: flex || '0 0 auto', minWidth: flex ? 0 : 300 }}>
      <label style={filterLabelStyle}>Data</label>
      {tooltipEl}
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 6 }}>
        {/* Type select — largura fixa, texto truncado */}
        <div ref={fieldRef} style={{ position: 'relative', flex: '1 1 0', minWidth: 0 }}>
          <div
            onClick={() => open ? setOpen(false) : openDrop()}
            onMouseEnter={e => {
              if (selectedLabel) {
                const r = e.currentTarget.getBoundingClientRect();
                setTooltip({ text: selectedLabel, x: r.left + r.width / 2, y: r.top - 34 });
              }
            }}
            onMouseLeave={() => setTooltip(null)}
            style={{
              display: 'flex', alignItems: 'center',
              height: 40, padding: '0 32px 0 12px', boxSizing: 'border-box',
              width: '100%',
              border: `1px solid ${open ? 'var(--color-primary-500)' : 'var(--color-neutral-400)'}`,
              borderRadius: 8, background: '#fff', cursor: 'pointer',
              fontFamily: 'var(--font-family-primary)', fontSize: 13,
              color: selectedLabel ? 'var(--color-neutral-1000)' : 'var(--color-neutral-700)',
              overflow: 'hidden',
              boxShadow: open ? '0 0 0 2px var(--color-primary-200)' : 'none',
              transition: 'border-color .15s, box-shadow .15s',
            }}
          >
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {selectedLabel || 'Tipo de data'}
            </span>
            {selectedLabel ? (
              <span onMouseDown={e => { e.stopPropagation(); setDateType(null); }}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--color-neutral-500)', display: 'inline-flex' }}>
                <IconX />
              </span>
            ) : (
              <span style={{ position: 'absolute', right: 10, top: '50%', transform: `translateY(-50%) ${open ? 'rotate(180deg)' : ''}`, pointerEvents: 'none', display: 'inline-flex', color: 'var(--color-neutral-600)', transition: 'transform .2s' }}>
                <IconChevronDown />
              </span>
            )}
          </div>
          {open && ReactDOM.createPortal(
            <div ref={dropRef} style={{
              position: 'fixed', top: dropPos.top, left: dropPos.left, width: dropPos.width,
              zIndex: 9999, background: '#fff',
              border: '1px solid var(--color-neutral-300)', borderRadius: 8,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              padding: '4px 0', maxHeight: 320, overflowY: 'auto',
              fontFamily: 'var(--font-family-primary)',
            }}>
              {availableOpts.map(opt => {
                const isSel = dateType === opt.id;
                return (
                  <div key={opt.id}
                    onClick={() => { setDateType(opt.id); setOpen(false); }}
                    style={{
                      padding: '9px 14px', cursor: 'pointer', fontSize: 13,
                      background: isSel ? 'var(--color-primary-100)' : 'transparent',
                      color: isSel ? 'var(--color-primary-600)' : 'var(--color-neutral-1000)',
                      fontWeight: isSel ? 600 : 400,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      transition: 'background .1s',
                    }}
                    onMouseEnter={e => { if (!isSel) e.currentTarget.style.background = 'var(--color-neutral-100)'; }}
                    onMouseLeave={e => { if (!isSel) e.currentTarget.style.background = 'transparent'; }}
                  >
                    {opt.label}
                    {isSel && <span style={{ color: 'var(--color-primary-500)', display: 'inline-flex' }}><IconCheck /></span>}
                  </div>
                );
              })}
            </div>,
            document.body
          )}
        </div>
        {/* Date range picker */}
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onChange={(s, e) => { setStartDate(s); setEndDate(e); }}
          wrapStyle={{ flex: '1 1 0', minWidth: 0 }}
        />
      </div>
    </div>
  );
}

// ─── CompanyTreeSelect — autocomplete idêntico ao AutocompleteSelect ──────────
function CompanyTreeSelect({ label, placeholder, value, onChange, flex, minWidth }) {
  const [query,   setQuery]   = useInfState('');   // texto digitado
  const [isTyping, setIsTyping] = useInfState(false);
  const [open,    setOpen]    = useInfState(false);
  const [focused, setFocused] = useInfState(false);
  const [dropRect, setDropRect] = useInfState(null);
  const wrapRef  = useInfRef(null);
  const inputRef = useInfRef(null);

  const flat = window.flattenEmpresaTree(window.MOCK_EMPRESA_TREE);
  const filtered = isTyping && query.trim()
    ? flat.filter(n => n.label.toLowerCase().includes(query.toLowerCase()))
    : flat;

  // Texto mostrado no input
  const displayValue = isTyping ? query : (value || '');

  function openDropdown() {
    if (wrapRef.current) {
      const r = wrapRef.current.getBoundingClientRect();
      setDropRect({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 260) });
    }
    setOpen(true);
  }

  function handleFocus() {
    setFocused(true);
    setIsTyping(false);
    setQuery('');
    openDropdown();
  }

  function handleChange(e) {
    setIsTyping(true);
    setQuery(e.target.value);
    openDropdown();
  }

  function handleSelect(node) {
    onChange(node.label);
    setIsTyping(false);
    setQuery('');
    setOpen(false);
    inputRef.current?.blur();
  }

  function handleClear(e) {
    e.preventDefault();
    onChange('');
    setIsTyping(false);
    setQuery('');
    setOpen(false);
  }

  useInfEffect(() => {
    if (!open) return;
    const h = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setIsTyping(false);
        setQuery('');
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  const INDENT_PX = [0, 20, 34];

  return (
    <div ref={wrapRef} style={{ display: 'flex', flexDirection: 'column', gap: 4, flex, minWidth }}>
      <label style={filterLabelStyle}>{label}</label>
      <div style={{
        position: 'relative', display: 'flex', alignItems: 'center',
        border: `1px solid ${focused || open ? 'var(--color-primary-500)' : 'var(--color-neutral-400)'}`,
        borderRadius: 8, background: 'var(--color-neutral-100)', height: 40,
        boxShadow: focused || open ? '0 0 0 3px var(--color-primary-100)' : 'none',
        transition: 'border-color .15s, box-shadow .15s',
      }}>
        <input
          ref={inputRef}
          className="inf-placeholder-input"
          value={displayValue}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'var(--font-family-primary)', fontSize: 14,
            color: 'var(--color-neutral-900)', padding: '0 32px 0 16px',
            height: '100%', width: '100%',
          }}
        />
        {value ? (
          <span onMouseDown={handleClear} style={{
            position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
            color: 'var(--color-neutral-500)', display: 'inline-flex', cursor: 'pointer',
          }}><IconX /></span>
        ) : (
          <span style={{
            position: 'absolute', right: 10, top: '50%',
            transform: `translateY(-50%) ${open ? 'rotate(180deg)' : 'rotate(0deg)'}`,
            color: 'var(--color-neutral-600)', display: 'inline-flex',
            pointerEvents: 'none', transition: 'transform .2s',
          }}><IconChevronDown /></span>
        )}
      </div>

      {open && filtered.length > 0 && dropRect && ReactDOM.createPortal(
        <div style={{
          position: 'fixed', top: dropRect.top, left: dropRect.left, width: dropRect.width,
          zIndex: 9999, background: '#fff',
          border: '1px solid var(--color-neutral-300)', borderRadius: 8,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          maxHeight: 320, overflowY: 'auto',
        }}>
          {filtered.map(node => {
            const isSelected = value === node.label;
            const indent = INDENT_PX[node.level] || 0;
            return (
              <div
                key={node.id}
                onMouseDown={() => handleSelect(node)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: `9px 12px 9px ${12 + indent}px`,
                  cursor: 'pointer',
                  background: isSelected ? 'var(--color-primary-100)' : 'transparent',
                  fontFamily: 'var(--font-family-primary)', fontSize: 13,
                  fontWeight: node.level === 0 ? 600 : 400,
                  color: isSelected ? 'var(--color-primary-600)' : 'var(--color-neutral-1000)',
                  borderBottom: node.level === 0 ? '0.5px solid var(--color-neutral-200)' : 'none',
                  transition: 'background .1s',
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--color-neutral-100)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = isSelected ? 'var(--color-primary-100)' : 'transparent'; }}
              >
                {node.level > 0 && (
                  <span style={{
                    width: 3, height: 3, borderRadius: '50%', flexShrink: 0,
                    background: node.level === 1 ? 'var(--color-neutral-500)' : 'var(--color-neutral-300)',
                  }} />
                )}
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {node.label}
                </span>
                {isSelected && (
                  <span style={{ color: 'var(--color-primary-500)', display: 'inline-flex' }}><IconCheck /></span>
                )}
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </div>
  );
}

// ─── AutocompleteSelect ───────────────────────────────────────────────────────
function AutocompleteSelect({ label, placeholder, options, value, onChange, flex, minWidth }) {
  const [selected, setSelected] = useInfState(value || '');  // valor confirmado
  const [filterQuery, setFilterQuery] = useInfState('');      // texto de busca (só quando digitando)
  const [isTyping, setIsTyping] = useInfState(false);
  const [open, setOpen] = useInfState(false);
  const [focused, setFocused] = useInfState(false);
  const [dropRect, setDropRect] = useInfState(null);
  const wrapRef = useInfRef(null);
  const fieldRef = useInfRef(null);

  // O que o input exibe
  const displayValue = isTyping ? filterQuery : selected;

  // Lista filtrada: se estiver digitando, filtra; senão mostra tudo
  const filtered = isTyping
    ? options.filter(o => o.toLowerCase().includes(filterQuery.toLowerCase()))
    : options;

  const openDropdown = () => {
    if (fieldRef.current) {
      const r = fieldRef.current.getBoundingClientRect();
      setDropRect({ top: r.bottom + 4, left: r.left, width: r.width });
    }
    setOpen(true);
  };

  const handleFocus = () => {
    setFocused(true);
    setIsTyping(false);   // ao focar, mostra lista completa
    setFilterQuery('');
    openDropdown();
  };

  const handleChange = (e) => {
    setIsTyping(true);
    setFilterQuery(e.target.value);
    openDropdown();
  };

  const handleSelect = (opt) => {
    setSelected(opt);
    setIsTyping(false);
    setFilterQuery('');
    onChange && onChange(opt);
    setOpen(false);
  };

  const handleClear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelected('');
    setIsTyping(false);
    setFilterQuery('');
    onChange && onChange('');
    setOpen(false);
  };

  useInfEffect(() => {
    const handleClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setFocused(false);
        setIsTyping(false);
        setFilterQuery('');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={wrapRef} style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: minWidth || 180, flex: flex || '1 1 180px' }}>
      <label style={filterLabelStyle}>{label}</label>
      <div ref={fieldRef} style={{
        position: 'relative', display: 'flex', alignItems: 'center',
        border: `1px solid ${focused || open ? 'var(--color-primary-500)' : 'var(--color-neutral-400)'}`,
        borderRadius: 8, background: 'var(--color-neutral-100)', height: 40,
        boxShadow: focused || open ? '0 0 0 3px var(--color-primary-100)' : 'none',
        transition: 'border-color .15s, box-shadow .15s',
      }}>
        <input
          className="inf-placeholder-input"
          value={displayValue}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'var(--font-family-primary)', fontSize: 14,
            color: 'var(--color-neutral-900)', padding: '0 32px 0 16px',
            height: '100%', width: '100%',
          }}
        />
        {/* Ícone direito: X quando há valor, chevron quando vazio */}
        {selected ? (
          <span
            onMouseDown={handleClear}
            style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--color-neutral-500)', display: 'inline-flex', alignItems: 'center',
              cursor: 'pointer',
            }}>
            <IconX />
          </span>
        ) : (
          <span style={{
            position: 'absolute', right: 10, top: '50%',
            transform: `translateY(-50%) ${open ? 'rotate(180deg)' : 'rotate(0deg)'}`,
            color: 'var(--color-neutral-600)', display: 'inline-flex', alignItems: 'center',
            pointerEvents: 'none', transition: 'transform .2s',
          }}>
            <IconChevronDown />
          </span>
        )}
      </div>
      {open && filtered.length > 0 && dropRect && (
        <div style={{
          position: 'fixed', top: dropRect.top, left: dropRect.left, width: dropRect.width,
          zIndex: 9999, background: '#fff', border: '1px solid var(--color-neutral-300)',
          borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          maxHeight: 240, overflowY: 'auto',
        }}>
          {filtered.map((opt) => {
            const isSel = opt === selected;
            return (
              <div
                key={opt}
                onMouseDown={() => handleSelect(opt)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 16px', fontSize: 14, cursor: 'pointer',
                  fontFamily: 'var(--font-family-primary)',
                  color: isSel ? 'var(--color-primary-600)' : 'var(--color-neutral-900)',
                  fontWeight: isSel ? 600 : 400,
                  background: isSel ? 'var(--color-primary-100)' : 'transparent',
                  borderBottom: '1px solid var(--color-neutral-100)',
                  transition: 'background .1s',
                }}
                onMouseEnter={(e) => { if (!isSel) e.currentTarget.style.background = 'var(--color-neutral-100)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = isSel ? 'var(--color-primary-100)' : 'transparent'; }}
              >
                <span>{opt}</span>
                {isSel && <span style={{ color: 'var(--color-primary-500)', display: 'inline-flex', flexShrink: 0 }}><IconCheck /></span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────
function InfracoesScreen({ onNavigateToDetail }) {
  const [activeTab, setActiveTab] = useInfState('todas');
  const [activeChip, setActiveChip] = useInfState('todos');
  const [activeSort, setActiveSort] = useInfState(SORT_OPTIONS_BY_TAB['todas'][0].id);
  const [activeView, setActiveView] = useInfState('list');
  const [isLoading, setIsLoading] = useInfState(false);
  const [selectedRows, setSelectedRows] = useInfState(new Set());
  const [empresa, setEmpresa] = useInfState('');
  const [placa, setPlaca] = useInfState('');
  const [tratada, setTratada] = useInfState('');
  const [aitVal, setAitVal] = useInfState([]);
  const [listState, setListState] = useInfState('success'); // 'loading'|'empty'|'empty_filtered'|'error'|'success'
  const [drawerOpen, setDrawerOpen] = useInfState(false);
  const [badgeModal, setBadgeModal] = useInfState(null); // { type: 'indique_agora'|'em_aberto', ait }
  const [hoveredTab, setHoveredTab] = useInfState(null); // id da tab com hover
  const [boletoModal, setBoletoModal] = useInfState(null); // { action: 'solicitar'|'solicitado'|'download', row }
  // Quick-filters exclusivos da aba indicação
  const [qCondutor, setQCondutor] = useInfState('');
  const [qTipoIndicacao, setQTipoIndicacao] = useInfState('');
  const [qPossuiBoleto, setQPossuiBoleto] = useInfState('');
  const [activeDrawer, setActiveDrawer] = useInfState(null); // { type: 'indicacao'|'pagamento', row }

  // Injeta paddingBottom no <main> para criar espaço cinza no scroll
  useInfEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    const prev = main.style.paddingBottom;
    const prevBg = main.style.background;
    main.style.paddingBottom = '32px';
    main.style.background = 'var(--color-neutral-200)';
    return () => { main.style.paddingBottom = prev; main.style.background = prevBg; };
  }, []);

  function openDrawer(type, row) {setActiveDrawer({ type, row });}

  function handleBoletoAction(action, row) {
    if (action === 'download') {
      // Simula download: cria um link temporário com um blob PDF mínimo
      const pdfContent = '%PDF-1.0\n1 0 obj<</Type /Catalog /Pages 2 0 R>>endobj 2 0 obj<</Type /Pages /Kids [3 0 R] /Count 1>>endobj 3 0 obj<</Type /Page /MediaBox [0 0 3 3]>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\ntrailer<</Size 4 /Root 1 0 R>>\nstartxref\n183\n%%EOF';
      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `boleto-40pct-${row.ait || 'AIT'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } else {
      setBoletoModal({ action, row });
    }
  }
  function closeDrawer() {setActiveDrawer(null);}

  const tabs = [
  { id: 'todas', label: 'Todas as multas', count: '8888' },
  { id: 'indicacao', label: 'Indicação de condutor', count: '888' },
  { id: 'pagamento', label: 'Pagamento', count: '888' },
];



  const chips = CHIPS_BY_TAB[activeTab] || [];

  function handleTabChange(id) {
    setActiveTab(id);
    setActiveChip(CHIPS_BY_TAB[id]?.[0]?.id || '');
    setActiveSort(SORT_OPTIONS_BY_TAB[id]?.[0]?.id || '');
    setActiveView('list');
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  }

  function toggleRow(id) {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAll(e) {
    if (e.target.checked) setSelectedRows(new Set(MOCK_ROWS.map((r) => r.id)));else
    setSelectedRows(new Set());
  }

  const allChecked = selectedRows.size === MOCK_ROWS.length;
  const someChecked = selectedRows.size > 0 && !allChecked;

  // Determina tipo de seleção para BulkActionBar a partir dos rows selecionados
  const selectionType = (() => {
    if (selectedRows.size === 0) return 'mixed';
    const types = new Set([...selectedRows].map((id) => {
      const r = MOCK_ROWS.find((x) => x.id === id);
      return r?.tipo === 'notificacao' ? 'na' : r?.tipo === 'penalidade' ? 'np' : null;
    }).filter(Boolean));
    if (types.size === 2) return 'mixed';
    if (types.has('na')) return 'na_only';
    if (types.has('np')) return 'np_only';
    return 'mixed';
  })();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'var(--color-neutral-200)' }}>

      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <div style={{
        background: '#fafafa',
        borderBottom: '1px solid var(--color-neutral-300)',
        padding: '32px 32px 0', borderWidth: "0px"
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 72, gap: 16
        }}>
          {/* Título + subtítulo */}
          <div>
            <h1 style={{
              margin: 0, fontFamily: 'var(--font-family-primary)',
              fontSize: 20, fontWeight: 700, color: 'var(--color-neutral-900)',
              lineHeight: 1.3
            }}>Multa de trânsito</h1>
            <p style={{
              margin: '8px 0 0', fontSize: 13, color: 'var(--color-neutral-600)',
              fontFamily: 'var(--font-family-primary)'
            }}>
              Acompanhe os detalhes de cada multa, pague e indique aqui.
            </p>
          </div>

          {/* Ações do header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <button style={iconActionBtn} title="Relatório"
            onMouseEnter={(e) => {e.currentTarget.style.background = 'var(--color-neutral-200)';e.currentTarget.style.color = 'var(--color-neutral-900)';}}
            onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent';e.currentTarget.style.color = 'var(--color-neutral-600)';}}>
              
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "rgb(74, 74, 74)" }}>
                <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="9" x2="9" y2="21" />
              </svg>
            </button>
            <button style={iconActionBtn} title="Exportar"
            onMouseEnter={(e) => {e.currentTarget.style.background = 'var(--color-neutral-200)';e.currentTarget.style.color = 'var(--color-neutral-900)';}}
            onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent';e.currentTarget.style.color = 'var(--color-neutral-600)';}}>
              <IconUpload /></button>
            <button style={iconActionBtn} title="Download"
            onMouseEnter={(e) => {e.currentTarget.style.background = 'var(--color-neutral-200)';e.currentTarget.style.color = 'var(--color-neutral-900)';}}
            onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent';e.currentTarget.style.color = 'var(--color-neutral-600)';}}>
              <IconDownload /></button>
            <button
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '0 16px', height: 36,
                border: 'none', borderRadius: 8,
                background: 'var(--color-primary-500)',
                color: '#fff',
                fontFamily: 'var(--font-family-primary)', fontSize: 14, fontWeight: 600,
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background .15s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-600)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary-500)'}>
              
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              Nova infração
            </button>
          </div>
        </div>

        {/* ── TABS ──────────────────────────────────────────────────────── */}
        <div style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          padding: '8px 0 0',
          gap: 16,
        }}>
          <div style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            background: 'var(--color-neutral-100)',
            borderRadius: 8,
            padding: 6,
            gap: 4,
            width: '100%',
          }}>
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            const hovered = hoveredTab === tab.id && !active;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  gap: 4,
                  flex: '1 0 0',
                  padding: '8px 16px',
                  border: active ? '1px solid #f9401b' : '1px solid transparent',
                  borderRadius: 8,
                  background: active ? '#feece8' : hovered ? 'var(--color-primary-100)' : '#fff',
                  fontFamily: 'var(--font-family-primary)',
                  fontSize: 14,
                  fontWeight: 700,
                  color: active ? '#0a0a0a' : hovered ? '#0a0a0a' : '#7f8184',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'background .15s, color .15s, border-color .15s',
                  outline: 'none',
                }}>
                {tab.label}
              </button>);
          })}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTAINER (filtros + chips + lista + paginação) ────────── */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        margin: '32px 32px 0',
        background: '#fff',
        borderRadius: 12,
        border: 'none',
        boxShadow: 'none'
      }}>

      {/* ── FILTER BAR ──────────────────────────────────────────────────── */}
      {isLoading ? <SkeletonFilterBar /> : (
      <div style={{
          display: 'flex', flexDirection: 'column', gap: 12,
          background: '#fff', flexShrink: 0,
          padding: '24px 24px 16px', borderRadius: '12px 12px 0 0'
        }}>
        {/* ── Linha 1: AIT + Veículos + Empresa + Data (+ botão se não for indicacao) ── */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
          <MultiAutocompleteSelect label="AIT" placeholder="Busque e selecione as AITs"
            options={MOCK_ROWS.map(r => r.ait)} value={aitVal} onChange={setAitVal}
            flex={activeTab === 'indicacao' ? '1 1 0' : '1 1 180px'}
            minWidth={activeTab === 'indicacao' ? 0 : 180} />
          <AutocompleteSelect label="Veículos" placeholder="Busque e selecione as placas"
            options={[...new Set(MOCK_ROWS.map(r => r.placa))]} value={placa} onChange={setPlaca}
            flex={activeTab === 'indicacao' ? '1 1 0' : '1 1 200px'}
            minWidth={activeTab === 'indicacao' ? 0 : 200} />
          <CompanyTreeSelect label="Empresa" placeholder="Busque e selecione"
            value={empresa} onChange={setEmpresa}
            flex={activeTab === 'indicacao' ? '1 1 0' : '1 1 200px'}
            minWidth={activeTab === 'indicacao' ? 0 : 200} />
          <DateFilter activeTab={activeTab} flex={activeTab === 'indicacao' ? '1 1 0' : undefined} />
          {activeTab !== 'indicacao' && (
            <button onClick={() => setDrawerOpen(true)} style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                flex: '1 1 0', height: 38, padding: '0 16px',
                border: '1px solid var(--color-neutral-400)', borderRadius: 8,
                background: 'var(--color-neutral-100)', fontFamily: 'var(--font-family-primary)',
                fontSize: 13, fontWeight: 500, color: 'var(--color-neutral-700)',
                cursor: 'pointer', whiteSpace: 'nowrap', alignSelf: 'flex-end',
              }}
              onMouseEnter={(e) => {e.currentTarget.style.borderColor='var(--color-primary-500)';e.currentTarget.style.color='var(--color-primary-600)';}}
              onMouseLeave={(e) => {e.currentTarget.style.borderColor='var(--color-neutral-400)';e.currentTarget.style.color='var(--color-neutral-700)';}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
              </svg>
              Filtros avançados
            </button>
          )}
        </div>

        {/* ── Linha 2: extra indicacao ── */}
        {activeTab === 'indicacao' && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
            <AutocompleteSelect label="Condutor" placeholder="Selecione o condutor"
              options={['Rebeca Valetich', 'Wagner Daniel', 'Antônio Pereira', 'Carlos Mendes', 'Ana Paula Souza', 'Fernanda Lima', 'Rogério Alves']}
              value={qCondutor} onChange={setQCondutor} flex="1 1 0" minWidth={0} />
            <QuickSelect label="Tipo de Indicação" value={qTipoIndicacao}
              options={['Todas', 'CPF', 'Formulário']}
              onChange={setQTipoIndicacao} flex="1 1 0" />
            <QuickSelect label="Possui boleto" value={qPossuiBoleto}
              options={['Sim', 'Não', 'Desconto 40%']}
              onChange={setQPossuiBoleto} flex="1 1 0" />
            <div style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <button onClick={() => setDrawerOpen(true)} style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  width: '100%', height: 38, padding: '0 16px',
                  border: '1px solid var(--color-neutral-400)', borderRadius: 8,
                  background: 'var(--color-neutral-100)', fontFamily: 'var(--font-family-primary)',
                  fontSize: 13, fontWeight: 500, color: 'var(--color-neutral-700)',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {e.currentTarget.style.borderColor='var(--color-primary-500)';e.currentTarget.style.color='var(--color-primary-600)';}}
                onMouseLeave={(e) => {e.currentTarget.style.borderColor='var(--color-neutral-400)';e.currentTarget.style.color='var(--color-neutral-700)';}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
                </svg>
                Filtros avançados
              </button>
            </div>
          </div>
        )}
      </div>
      )}

      {/* ── CHIPS ───────────────────────────────────────────────────────── */}
      {isLoading ? <SkeletonChips /> : (
      <div style={{
        display: 'flex', flexDirection: 'column',
        padding: '24px 24px 8px', flexShrink: 0, background: '#fff', gap: 16,
        minWidth: 0,
      }}>
        {/* Linha 1: chips (wrap) + ordenação + ViewToggle (fixos à direita) */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, minWidth: 0 }}>
          {/* chips — envolvem livremente sem invadir os controles */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, flex: '1 1 0', minWidth: 0 }}>
            {chips.map((chip) =>
              <FilterChip
                key={chip.id}
                label={chip.label}
                count={chip.count}
                active={activeChip === chip.id}
                icon={chip.icon}
                chipColor={chip.chipColor || 'default'}
                onClick={() => setActiveChip(chip.id)} />
            )}
          </div>
          {/* controles — sempre fixos no canto direito, sem quebra */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <SortDropdown
              activeTab={activeTab}
              activeSort={activeSort}
              onSortChange={setActiveSort} />
            {/* <ViewToggle activeView={activeView} onViewChange={setActiveView} /> */}
          </div>
        </div>
      </div>
      )}

      {/* ── CARD LIST / KANBAN ──────────────────────────────────────────── */}
      <div style={{ background: '#fff', padding: '8px 24px 24px' }}>
        {isLoading
          ? (activeView === 'kanban' ? <SkeletonKanban /> : <SkeletonCards />)
          : activeView === 'kanban'
            ? <KanbanView
                activeTab={activeTab}
                activeChip={activeChip}
                activeSort={activeSort}
                onCardClick={onNavigateToDetail} />
            : (
        <AITListState
            state={listState}
            onClearFilters={() => {setListState('success');setEmpresa('');setPlaca('');setTratada('');setAitVal('');}}
            onRetry={() => setListState('success')}>

          {/* Barra de ações em massa — topo da listagem */}
          <BulkActionBar
            count={selectedRows.size}
            selectionType={selectionType}
            activeTab={activeTab}
            onClose={() => setSelectedRows(new Set())} />

          {/* Selecionar todos — aparece quando ≥1 card selecionado */}
          {selectedRows.size > 0 && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 8px 10px',
              fontFamily: 'var(--font-family-primary)',
            }}
              onClick={(e) => e.stopPropagation()}>
              <input
                type="checkbox"
                checked={allChecked}
                ref={(el) => { if (el) el.indeterminate = someChecked; }}
                onChange={(e) => {
                  if (e.target.checked) setSelectedRows(new Set(MOCK_ROWS.map((r) => r.id)));
                  else setSelectedRows(new Set());
                }}
                style={{ width: 16, height: 16, accentColor: '#f9401b', cursor: 'pointer', flexShrink: 0 }}
              />
              <span style={{ fontSize: 13, color: 'var(--color-neutral-700)', userSelect: 'none' }}>
                Selecionar todos
              </span>
              {someChecked && (
                <span style={{ fontSize: 12, color: 'var(--color-neutral-500)' }}>
                  ({selectedRows.size} de {MOCK_ROWS.length})
                </span>
              )}
            </div>
          )}

          {/* Cards — filtrados pelo chip ativo e ordenados */}
          {(() => {
            const activeSortFn = (SORT_OPTIONS_BY_TAB[activeTab] || [])
              .find((o) => o.id === activeSort)?.sortFn;
            const tabTipoFilter = activeTab === 'indicacao' ? 'notificacao'
              : activeTab === 'pagamento' ? 'penalidade' : null;

            let visibleRows;
            if (activeTab === 'todas') {
              // Intercala notificações e penalidades — 5 de cada = 10 total
              const notifs = MOCK_ROWS.filter((r) => r.tipo === 'notificacao').slice(0, 5);
              const penals = MOCK_ROWS.filter((r) => r.tipo === 'penalidade').slice(0, 5);
              const mixed = [];
              for (let i = 0; i < 5; i++) { mixed.push(notifs[i]); mixed.push(penals[i]); }
              visibleRows = mixed.filter((row) => chipMatchesRow(activeChip, row, activeTab));
            } else {
              visibleRows = MOCK_ROWS
                .filter((row) => !tabTipoFilter || row.tipo === tabTipoFilter)
                // FRD-010: aba Indicação exibe apenas AITs dentro do prazo de indicação
                .filter((row) => activeTab !== 'indicacao' || !INDICACAO_EXCLUDED_VARIANTS.has(row.statusVariant))
                .filter((row) => chipMatchesRow(activeChip, row, activeTab))
                .sort(activeSortFn || (() => 0));
            }
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {visibleRows.map((row) =>
                  <InfracaoCard
                    key={row.id}
                    row={row}
                    selected={selectedRows.has(row.id)}
                    onSelect={() => toggleRow(row.id)}
                    onCardClick={onNavigateToDetail}
                    onOpenIndicacao={(r) => openDrawer('indicacao', r)}
                    onOpenPagamento={(r) => openDrawer('pagamento', r)}
                    onBadgeAction={(type, r) => setBadgeModal({ type, ait: r.ait })}
                    onBoletoAction={handleBoletoAction} />
                )}
              </div>
            );
          })()}
        </AITListState>
        )}
      </div>

      {/* ── PAGINATION — só na view listagem ────────────────────────────── */}
      {activeView === 'list' && (
      <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 24px', flexShrink: 0,
          background: '#fff',
          borderRadius: '0 0 12px 12px',
          gap: 8
        }}>
        {/* Lado esquerdo: resultados por página */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            border: '1px solid var(--color-neutral-300)', borderRadius: 6,
            padding: '0 8px', height: 32, cursor: 'pointer',
            fontFamily: 'var(--font-family-primary)', fontSize: 13,
            color: 'var(--color-neutral-900)', background: '#fff',
          }}>
            10
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
          <span style={{ fontSize: 13, color: 'var(--color-neutral-600)', whiteSpace: 'nowrap' }}>
            Resultados por página
          </span>
        </div>

        {/* Lado direito: contador + navegação */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-neutral-900)', marginRight: 4, whiteSpace: 'nowrap' }}>
            1-10 de 8888
          </span>
          <button style={pgNavBtn(false)} disabled><IconArrowLeft /></button>
          {[1, 2, 3, 4, 5].map((n) =>
            <button key={n} style={pgNavBtn(n === 1)}>{n < 10 ? `0${n}` : n}</button>
          )}
          <span style={{ fontSize: 13, color: 'var(--color-neutral-500)', padding: '0 2px' }}>…</span>
          <button style={pgNavBtn(false)}>88</button>
          <button style={pgNavBtn(false)}><IconArrowRight /></button>
        </div>
      </div>
      )}

      </div>{/* fim container branco */}

      {/* ── DRAWERS ─────────────────────────────────────────────────── */}
      <DrawerIndicacao
        row={activeDrawer?.row}
        open={activeDrawer?.type === 'indicacao'}
        onClose={closeDrawer} />
      
      <DrawerPagamento
        row={activeDrawer?.row}
        open={activeDrawer?.type === 'pagamento'}
        onClose={closeDrawer} />
      

      

      {/* ── ADVANCED FILTERS DRAWER ─────────────────────────────────────── */}
      <AdvancedFiltersDrawer
        open={drawerOpen}
        activeTab={activeTab}
        onClose={() => setDrawerOpen(false)}
        onApply={(filters) => {
          console.log('Filtros aplicados:', filters);
          setDrawerOpen(false);
          setListState('success');
        }} />

      {/* ── Badge Modal ─────────────────────────────────────────────────── */}
      {badgeModal && ReactDOM.createPortal(
        <div
          onClick={() => setBadgeModal(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeInOverlay .18s ease',
          }}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 12,
              width: 480, maxWidth: 'calc(100vw - 32px)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
              fontFamily: 'var(--font-family-primary)',
              animation: 'slideUpModal .2s cubic-bezier(.16,1,.3,1)',
              overflow: 'hidden',
            }}>
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 24px 16px',
              borderBottom: '1px solid var(--color-neutral-200)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  display: 'inline-flex', padding: '3px 10px', borderRadius: 1000,
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.03em', textTransform: 'uppercase',
                  background: badgeModal.type === 'indique_agora' ? '#2a89ef' : '#f9401b',
                  color: '#fff',
                }}>
                  {badgeModal.type === 'indique_agora' ? 'Indique agora' : 'Pague agora'}
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-neutral-900)' }}>
                  AIT {badgeModal.ait}
                </span>
              </div>
              <button
                onClick={() => setBadgeModal(null)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 32, height: 32, border: 'none', background: 'transparent',
                  borderRadius: 6, cursor: 'pointer', color: 'var(--color-neutral-500)',
                  transition: 'background .12s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-neutral-100)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            {/* Body — em branco para demonstração */}
            <div style={{
              height: 240,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 8, color: 'var(--color-neutral-400)',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/>
              </svg>
              <span style={{ fontSize: 13, fontWeight: 500 }}>Conteúdo em desenvolvimento</span>
            </div>
            {/* Footer */}
            <div style={{
              display: 'flex', justifyContent: 'flex-end', gap: 8,
              padding: '14px 24px',
              borderTop: '1px solid var(--color-neutral-200)',
            }}>
              <button
                onClick={() => setBadgeModal(null)}
                style={{
                  height: 36, padding: '0 16px', border: '1px solid var(--color-neutral-300)',
                  borderRadius: 6, background: '#fff', cursor: 'pointer',
                  fontSize: 13, fontWeight: 500, color: 'var(--color-neutral-700)',
                  fontFamily: 'var(--font-family-primary)',
                }}>
                Cancelar
              </button>
              <button style={{
                height: 36, padding: '0 16px', border: 'none',
                borderRadius: 6, cursor: 'pointer',
                background: badgeModal.type === 'indique_agora' ? '#2a89ef' : '#f9401b',
                fontSize: 13, fontWeight: 600, color: '#fff',
                fontFamily: 'var(--font-family-primary)',
              }}>
                {badgeModal.type === 'indique_agora' ? 'Indicar condutor' : 'Ver boleto'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── BOLETO MODAL (solicitar / solicitado) ─────────────────────────── */}
      {boletoModal && ReactDOM.createPortal(
        <div onClick={() => setBoletoModal(null)} style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'fadeInOverlay .18s ease',
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: '#fff', borderRadius: 12,
            width: 560, maxWidth: '95vw',
            boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
            animation: 'slideUpModal .2s cubic-bezier(.16,1,.3,1)',
            overflow: 'hidden',
            fontFamily: 'var(--font-family-primary)',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 16px' }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#0a0a0a' }}>
                {boletoModal.action === 'solicitar' ? 'Solicitar Boletos SNE' : 'Boleto 40% Solicitado'}
              </span>
              <button onClick={() => setBoletoModal(null)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 32, height: 32, border: 'none', background: 'transparent',
                borderRadius: 6, cursor: 'pointer', color: 'var(--color-neutral-500)',
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-neutral-100)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div style={{ height: 1, background: 'var(--color-neutral-200)', margin: '0 0 0' }} />

            {boletoModal.action === 'solicitar' ? (
              /* ── Modal: Solicitar Boleto SNE ── */
              <>
                {/* Tabela */}
                <div style={{ padding: '20px 24px 0' }}>
                  <div style={{ display: 'flex', gap: 32, marginBottom: 12 }}>
                    <span style={{ fontSize: 13, color: 'var(--color-neutral-600)', fontWeight: 500, flex: 1 }}>Placa / AIT</span>
                    <span style={{ fontSize: 13, color: 'var(--color-neutral-600)', fontWeight: 500, flex: 1 }}>Status</span>
                  </div>
                  <div style={{ display: 'flex', gap: 32, paddingBottom: 16, borderBottom: '1px dashed var(--color-neutral-300)' }}>
                    <span style={{ fontSize: 14, color: '#0a0a0a', flex: 1 }}>
                      {boletoModal.row?.placa} / {boletoModal.row?.ait}
                    </span>
                    <span style={{ fontSize: 14, color: '#0a0a0a', flex: 1 }}>Disponível para solicitação</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#0a0a0a' }}>Boletos disponíveis para requisição</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#0a0a0a' }}>1</span>
                  </div>
                </div>
                <div style={{ height: 1, background: 'var(--color-neutral-200)' }} />
                {/* Obs */}
                <div style={{ padding: '16px 24px', fontSize: 13, color: 'var(--color-neutral-600)', lineHeight: 1.6 }}>
                  Obs: Ao clicar em "Solicitar Agora", boletos disponíveis serão solicitados e aparecerão na plataforma em até 72 horas. Você receberá um aviso quando estiverem anexados às AITs.
                </div>
                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '14px 24px', borderTop: '1px solid var(--color-neutral-200)' }}>
                  <button onClick={() => setBoletoModal(null)} style={{
                    height: 40, padding: '0 20px', border: '1.5px solid #f9401b', borderRadius: 100,
                    background: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                    color: '#f9401b', fontFamily: 'var(--font-family-primary)',
                  }}>Fechar</button>
                  <button onClick={() => setBoletoModal(null)} style={{
                    height: 40, padding: '0 20px', border: 'none', borderRadius: 100,
                    background: '#f9401b', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                    color: '#fff', fontFamily: 'var(--font-family-primary)',
                  }}>Solicitar agora</button>
                </div>
              </>
            ) : (
              /* ── Modal: Boleto já solicitado ── */
              <>
                <div style={{
                  padding: '32px 24px 24px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center',
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: 'var(--color-information-100)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-information-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#0a0a0a' }}>Boleto já solicitado</span>
                  <span style={{ fontSize: 13, color: 'var(--color-neutral-600)', lineHeight: 1.6, maxWidth: 380 }}>
                    O boleto com 40% de desconto para a AIT <strong>{boletoModal.row?.ait}</strong> já foi solicitado e estará disponível em até <strong>48 horas</strong> após a solicitação.
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '14px 24px', borderTop: '1px solid var(--color-neutral-200)' }}>
                  <button onClick={() => setBoletoModal(null)} style={{
                    height: 40, padding: '0 20px', border: '1.5px solid #f9401b', borderRadius: 100,
                    background: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                    color: '#f9401b', fontFamily: 'var(--font-family-primary)',
                  }}>Fechar</button>
                </div>
              </>
            )}
          </div>
        </div>,
        document.body
      )}

    </div>);

}

// ─── Style helpers ────────────────────────────────────────────────────────────
const btnBase = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  padding: '0 14px', height: 36,
  border: '1px solid var(--color-neutral-400)',
  borderRadius: 6, background: 'var(--color-neutral-100)',
  fontFamily: 'var(--font-family-primary)', fontSize: 13, fontWeight: 600,
  cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s'
};

const iconActionBtn = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  width: 36, height: 36,
  border: '1px solid var(--color-neutral-300)',
  borderRadius: 6, background: 'transparent',
  color: 'var(--color-neutral-600)', cursor: 'pointer',
  transition: 'background .15s'
};

const filterLabelStyle = {
  fontSize: 12, fontWeight: 600, color: 'var(--color-neutral-1000)',
  fontFamily: 'var(--font-family-primary)', lineHeight: 1
};

const filterInputWrap = {
  position: 'relative', display: 'flex', alignItems: 'center',
  border: '1px solid var(--color-neutral-300)', borderRadius: 8,
  background: 'var(--color-neutral-100)', height: 38, overflow: 'hidden'
};

const filterInputStyle = {
  flex: 1, border: 'none', outline: 'none', background: 'transparent',
  fontFamily: 'var(--font-family-primary)', fontSize: 13,
  color: 'var(--color-neutral-900)', padding: '0 36px 0 12px',
  height: '100%', width: '100%'
};

const filterInputIcon = {
  position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
  color: 'var(--color-neutral-500)', display: 'inline-flex', alignItems: 'center',
  pointerEvents: 'none'
};

const metaValStyle = {
  fontSize: 13, color: 'var(--color-neutral-800)',
  whiteSpace: 'nowrap', lineHeight: 1.3,
  fontFamily: 'var(--font-family-primary)'
};

const iconBtnStyle = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  width: 28, height: 28, border: 'none', background: 'transparent',
  borderRadius: 6, cursor: 'pointer', color: 'var(--color-neutral-600)',
  transition: 'background .12s, color .12s'
};

const pgNavBtn = (active) => ({
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  minWidth: 32, height: 32, padding: '0 4px',
  border: '1px solid',
  borderColor: active ? '#f9401b' : 'var(--color-neutral-300)',
  borderRadius: 8,
  background: active ? '#f9401b' : 'var(--color-neutral-100)',
  color: active ? '#fff' : 'var(--color-neutral-600)',
  fontSize: 13, fontWeight: active ? 700 : 400,
  cursor: active ? 'default' : 'pointer',
  fontFamily: 'var(--font-family-primary)',
  transition: 'all .15s'
});



window.InfracoesScreen = InfracoesScreen;