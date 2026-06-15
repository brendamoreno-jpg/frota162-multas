// BulkActionBar.jsx — Barra de ações em massa — Frota 162 DS (node 4056:6361)
// Props:
//   count          {number}                                — quantos itens selecionados
//   selectionType  {'na_only'|'np_only'|'mixed'}           — tipo da seleção
//   activeTab      {'todas'|'indicacao'|'pagamento'}       — tab ativa da listagem
//   onClose        {fn}                                    — limpar seleção

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
    <path d="M3 5v14"/><path d="M8 5v14"/><path d="M12 5v14"/><path d="M17 5v14"/><path d="M21 5v14"/>
  </svg>
);
const BulkIconNotifDescontada = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/>
    <line x1="2" y1="10" x2="22" y2="10"/>
    <polyline points="12 14 12 19"/><polyline points="9 16 12 13 15 16"/>
  </svg>
);
const BulkIconXCircle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);
const BulkIconRefreshCcw = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10"/>
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
  </svg>
);
const BulkIconChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const BulkIconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const BulkIconRotate = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><polyline points="3 3 3 8 8 8"/>
  </svg>
);
const BulkIconFolder = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

// ─── Botão individual (solto) ─────────────────────────────────────────────────
function BulkBtn({ icon, label, disabled, tooltip, onClick, trailing }) {
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

  return (
    <button
      style={base}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}>
      {icon}
      {label}
      {trailing && (
        <span style={{ display: 'inline-flex', color: 'var(--color-neutral-600)', marginLeft: 2 }}>{trailing}</span>
      )}
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
}

// ─── Dropdown agrupador ───────────────────────────────────────────────────────
// Props:
//   icon, label  — visual do botão
//   items        — [{ icon, label, disabled?, tooltip?, checked?, onClick? }]
//   align        — 'left' | 'right' (default 'left' = alinha pela borda esquerda do botão)
function BulkDropdownBtn({ icon, label, items, align = 'left' }) {
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState({ top: 0, left: 0 });
  const [hov, setHov] = React.useState(false);
  const btnRef = React.useRef(null);

  function toggle(e) {
    e.stopPropagation();
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      const MENU_MIN = 260;
      const overflowsRight = r.left + MENU_MIN > window.innerWidth - 12;
      const useRight = align === 'right' || overflowsRight;
      if (useRight) {
        setPos({ top: r.bottom + 4, left: r.right, anchor: 'right' });
      } else {
        setPos({ top: r.bottom + 4, left: r.left, anchor: 'left' });
      }
    }
    setOpen((v) => !v);
  }

  React.useEffect(() => {
    if (!open) return;
    function onOutside(e) {
      if (btnRef.current && !btnRef.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const btnStyle = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '8px 12px',
    background: open || hov ? 'var(--color-neutral-200)' : '#ffffff',
    border: '1px solid var(--color-neutral-400)',
    borderRadius: 8,
    fontFamily: 'var(--font-family-primary)',
    fontSize: 12, fontWeight: 700, lineHeight: '15px',
    color: 'var(--color-neutral-1000)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'background .12s',
    flexShrink: 0,
    position: 'relative',
  };

  const dropdownStyle = {
    position: 'fixed', zIndex: 9999, background: '#fff',
    border: '1px solid #ddddde', borderRadius: 8, padding: 2,
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)', minWidth: 240,
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
    <span ref={btnRef} style={{ display: 'inline-flex', position: 'relative' }}>
      <button
        style={btnStyle}
        onClick={toggle}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}>
        {icon}
        {label}
        <span style={{
          display: 'inline-flex', color: 'var(--color-neutral-600)',
          marginLeft: 2,
          transform: open ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform .15s',
        }}>
          <BulkIconChevronDown/>
        </span>
      </button>

      {open && ReactDOM.createPortal(
        <div
          style={{
            ...dropdownStyle,
            top: pos.top,
            ...(pos.anchor === 'right'
              ? { left: pos.left, transform: 'translateX(-100%)' }
              : { left: pos.left }),
          }}
          onClick={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '6px 4px' }}>
            {items.map((item, idx) => (
              <BulkDropdownItem
                key={item.label + idx}
                item={item}
                onClose={() => setOpen(false)}
                itemStyle={itemStyle} />
            ))}
          </div>
        </div>,
        document.body,
      )}
    </span>
  );
}

function BulkDropdownItem({ item, onClose, itemStyle }) {
  const [hov, setHov] = React.useState(false);
  const disabled = !!item.disabled;
  const bg = disabled
    ? 'transparent'
    : hov ? 'var(--color-neutral-100)' : 'transparent';

  return (
    <button
      onClick={(e) => {
        if (disabled) return;
        e.stopPropagation();
        item.onClick && item.onClick();
        onClose();
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      disabled={disabled}
      style={{
        ...itemStyle,
        background: bg,
        cursor: disabled ? 'not-allowed' : 'pointer',
        color: disabled ? 'var(--color-neutral-500)' : '#0a0a0a',
        position: 'relative',
      }}>
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 24, height: 24, flexShrink: 0,
        color: disabled ? 'var(--color-neutral-500)' : '#f9401b',
      }}>
        {item.icon}
      </span>
      <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {item.label}
      </span>
      {item.checked && (
        <span style={{ color: '#f9401b', flexShrink: 0, marginLeft: 8 }}>
          <BulkIconCheck/>
        </span>
      )}
      {disabled && item.tooltip && hov && (
        <span style={{
          position: 'absolute', top: '50%', right: 'calc(100% + 8px)',
          transform: 'translateY(-50%)',
          background: '#1c1c1e', color: '#fff',
          fontSize: 11, padding: '4px 8px', borderRadius: 4,
          whiteSpace: 'nowrap', zIndex: 99999, pointerEvents: 'none',
          fontFamily: 'var(--font-family-primary)',
        }}>{item.tooltip}</span>
      )}
    </button>
  );
}

// ─── Status de tratamento (botão solto com submenu próprio) ────────────────────
const BULK_STATUS_TRATAMENTO = ['Não tratada', 'Em tratamento', 'Tratada', 'Não tratar'];

function BulkStatusTratamento() {
  const [selected, setSelected] = React.useState('Não tratada');
  const items = BULK_STATUS_TRATAMENTO.map((opt) => ({
    icon: <span style={{ width: 8, height: 8, borderRadius: '50%', background: selected === opt ? '#f9401b' : 'var(--color-neutral-400)' }}/>,
    label: opt,
    checked: selected === opt,
    onClick: () => setSelected(opt),
  }));
  return (
    <BulkDropdownBtn
      icon={<BulkIconTag/>}
      label="Status de tratamento"
      items={items} />
  );
}

// ─── Notificação descontada do condutor (item toggle) ──────────────────────────
function useNotifDescontada() {
  const [val, setVal] = React.useState(null); // null | 'sim' | 'nao'
  return [val, setVal];
}

// ─── Lógica de filtragem por tab + selectionType ──────────────────────────────
// Retorna se a ação deve aparecer na tab atual.
const TAB_VISIBILITY = {
  todas:     { '3tabs': true,  'todas_indicacao': true,  'todas_pagamento': true,  'pagamento': false, 'indicacao': false },
  indicacao: { '3tabs': true,  'todas_indicacao': true,  'todas_pagamento': false, 'pagamento': false, 'indicacao': true },
  pagamento: { '3tabs': true,  'todas_indicacao': false, 'todas_pagamento': true,  'pagamento': true,  'indicacao': false },
};
function showOn(activeTab, scope) {
  const map = TAB_VISIBILITY[activeTab] || TAB_VISIBILITY.todas;
  return !!map[scope];
}

// Em na_only/np_only desabilita a ação cruzada com tooltip
function disabledForSelection(selectionType, side) {
  // side: 'indicacao' | 'pagamento'
  if (side === 'indicacao' && selectionType === 'np_only') {
    return { disabled: true, tooltip: 'Disponível apenas para Indicação de Condutor' };
  }
  if (side === 'pagamento' && selectionType === 'na_only') {
    return { disabled: true, tooltip: 'Disponível apenas para Multas a Pagar' };
  }
  return { disabled: false };
}

// ─── Conteúdo dos dropdowns ───────────────────────────────────────────────────
function CondutorItems({ activeTab, selectionType, notifDescontada, setNotifDescontada }) {
  const items = [];
  // Vincular condutor — 3 tabs; disabled para np_only
  if (showOn(activeTab, '3tabs')) {
    const ds = disabledForSelection(selectionType, 'indicacao');
    items.push({ icon: <BulkIconUser/>, label: 'Vincular condutor', ...ds });
  }
  // Baixar formulário — Todas · Indicação
  if (showOn(activeTab, 'todas_indicacao')) {
    const ds = disabledForSelection(selectionType, 'indicacao');
    items.push({ icon: <BulkIconDownload/>, label: 'Baixar formulário', ...ds });
  }
  // Imprimir notificação de desconto — 3 tabs
  if (showOn(activeTab, '3tabs')) {
    items.push({ icon: <BulkIconPrint/>, label: 'Imprimir notificação de desconto' });
  }
  // Notificação descontada do condutor
  if (showOn(activeTab, '3tabs')) {
    items.push({ icon: <BulkIconNotifDescontada/>, label: 'Notificação descontada do condutor' });
  }
  return items;
}

function BoletosItems({ activeTab, selectionType, onSolicitarBoleto }) {
  const items = [];

  // Solicitar boleto 40% de desconto — Todas · Indicação
  if (showOn(activeTab, 'todas_indicacao')) {
    const ds = disabledForSelection(selectionType, 'indicacao');
    items.push({ icon: <BulkIconFileText/>, label: 'Solicitar boleto 40% de desconto', ...ds,
      onClick: onSolicitarBoleto,
    });
  }
  // Solicitar pagamento em lote — Pagamento
  if (showOn(activeTab, 'pagamento')) {
    const ds = disabledForSelection(selectionType, 'pagamento');
    items.push({ icon: <BulkIconCreditCard/>, label: 'Solicitar pagamento em lote', ...ds });
  }
  // Atualizar boleto vencido — Todas · Pagamento (multas vencidas com boleto vencido)
  if (showOn(activeTab, 'todas_pagamento')) {
    const ds = disabledForSelection(selectionType, 'pagamento');
    items.push({ icon: <BulkIconRefreshCcw/>, label: 'Atualizar boleto vencido', ...ds });
  }
  // Atualizar boleto 20% — 3 tabs (boletos vencidos de multas ainda não vencidas)
  if (showOn(activeTab, '3tabs')) {
    items.push({ icon: <BulkIconRefreshCcw/>, label: 'Atualizar boleto 20%' });
  }
  // Baixar boleto — 3 tabs
  if (showOn(activeTab, '3tabs')) {
    items.push({ icon: <BulkIconDownload/>, label: 'Baixar boleto' });
  }
  // Imprimir boleto — 3 tabs
  if (showOn(activeTab, '3tabs')) {
    items.push({ icon: <BulkIconPrint/>, label: 'Imprimir boleto' });
  }
  // Alterar status para pago — Todas · Pagamento
  if (showOn(activeTab, 'todas_pagamento')) {
    const ds = disabledForSelection(selectionType, 'pagamento');
    items.push({ icon: <BulkIconCheck/>, label: 'Alterar status para pago', ...ds });
  }
  return items;
}

function MaisAcoesItems({ activeTab, inativo, setInativo }) {
  const items = [];
  if (showOn(activeTab, '3tabs')) {
    // Inativar / Reativar — toggle soft delete
    items.push({
      icon: inativo ? <BulkIconRotate/> : <BulkIconXCircle/>,
      label: inativo ? 'Reativar' : 'Inativar',
      onClick: () => setInativo((v) => !v),
    });
    items.push({ icon: <BulkIconFolder/>, label: 'Baixar arquivos da multa' });
    items.push({
      icon: <BulkIconFileText/>, label: 'Protocolo de Multa',
      disabled: true, tooltip: 'A definir',
    });
  }
  return items;
}

// ─── Componente principal ─────────────────────────────────────────────────────
// Props:
//   onSolicitarBoleto  {fn}  — abre modal "Solicitar boleto 40%" (passado por InfracoesScreen)
function BulkActionBar({ count, selectionType = 'na_only', activeTab = 'todas', onClose, onSolicitarBoleto }) {
  const [notifDescontada, setNotifDescontada] = React.useState(null);
  const [inativo, setInativo] = React.useState(false); // toggle visual local: Inativar ↔ Reativar

  if (!count || count === 0) return null;

  const condutorItems = CondutorItems({ activeTab, selectionType, notifDescontada, setNotifDescontada });
  const boletosItems  = BoletosItems({ activeTab, selectionType, onSolicitarBoleto });
  const maisItems     = MaisAcoesItems({ activeTab, inativo, setInativo });

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

      {/* Direita — ações agrupadas */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <BulkBtn icon={<BulkIconEraser/>} label="Limpar seleção" onClick={onClose} />

        {/* Status de tratamento — standalone (alta frequência) */}
        <BulkStatusTratamento/>

        {/* Dropdowns agrupados */}
        {condutorItems.length > 0 && (
          <BulkDropdownBtn icon={<BulkIconUser/>} label="Condutor" items={condutorItems} />
        )}
        {boletosItems.length > 0 && (
          <BulkDropdownBtn icon={<BulkIconCreditCard/>} label="Boletos" items={boletosItems} />
        )}
        {maisItems.length > 0 && (
          <BulkDropdownBtn icon={<BulkIconFolder/>} label="Mais ações" items={maisItems} align="right" />
        )}
      </div>
    </div>
  );
}

window.BulkActionBar = BulkActionBar;
