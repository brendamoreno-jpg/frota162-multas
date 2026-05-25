// AdvancedFiltersDrawer.jsx — Drawer de filtros avançados — Frota 162 DS
// Props: open, activeTab, onClose, onApply, onClear

(function injectDrawerStyles() {
  if (document.getElementById('drawer-style-v2')) return;
  const style = document.createElement('style');
  style.id = 'drawer-style-v2';
  style.textContent = `
    @keyframes drawer-slidein {
      from { transform: translateX(100%); }
      to   { transform: translateX(0); }
    }
    @keyframes drawer-overlay-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes drawer-tooltip-in {
      from { opacity: 0; transform: translateX(-50%) translateY(4px); }
      to   { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    .afd-overlay  { animation: drawer-overlay-in 220ms ease forwards; }
    .afd-panel    { animation: drawer-slidein 240ms cubic-bezier(.16,1,.3,1) forwards; }
    .afd-tooltip  { animation: drawer-tooltip-in 150ms ease forwards; }

    .afd-field-ctrl {
      width: 100%; height: 36px;
      padding: 0 32px 0 10px;
      border: 1px solid var(--color-neutral-400);
      border-radius: 6px;
      background: #fff;
      font-family: var(--font-family-primary);
      font-size: 13px;
      color: var(--color-neutral-1000);
      appearance: none; -webkit-appearance: none;
      cursor: pointer;
      transition: border-color .15s, box-shadow .15s;
      box-sizing: border-box;
    }
    .afd-field-ctrl:focus {
      outline: none;
      border-color: var(--color-primary-500);
      box-shadow: 0 0 0 2px var(--color-primary-200);
    }
    .afd-field-ctrl.afd-disabled {
      background: #f5f5f5;
      border-color: #eceded;
      color: #c4c4c5;
      pointer-events: none;
      opacity: 0.5;
      cursor: default;
    }
    .afd-field-ctrl-input {
      padding-right: 10px;
    }
    .afd-select-wrap {
      position: relative; width: 100%;
    }
    .afd-select-wrap::after {
      content: '';
      position: absolute; right: 10px; top: 50%;
      transform: translateY(-50%);
      width: 0; height: 0;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 5px solid var(--color-neutral-600);
      pointer-events: none;
    }
    .afd-select-wrap.afd-disabled::after {
      border-top-color: #c4c4c5;
    }
    .afd-scrollbar::-webkit-scrollbar { width: 4px; }
    .afd-scrollbar::-webkit-scrollbar-thumb { background: var(--color-neutral-300); border-radius: 4px; }
  `;
  document.head.appendChild(style);
})();

const { useState: useAfdState, useEffect: useAfdEffect, useRef: useAfdRef } = React;

// ─── Dados hierárquicos de empresa (compartilhados com InfracoesScreen) ───────
window.MOCK_EMPRESA_TREE = [
  {
    id: 'e1', label: 'Frota 162 Ltda',
    children: [
      {
        id: 'd1', label: 'Divisão Centro-Oeste',
        children: [
          { id: 's1', label: 'Subdivisão Brasília', children: [] },
          { id: 's2', label: 'Subdivisão Goiânia',  children: [] },
        ]
      },
      { id: 'd2', label: 'Divisão Sudeste', children: [] },
    ]
  },
  {
    id: 'e2', label: 'Transportes Alfa S.A.',
    children: [
      { id: 'd3', label: 'Divisão Norte', children: [] },
      {
        id: 'd4', label: 'Divisão Sul',
        children: [
          { id: 's3', label: 'Subdivisão Porto Alegre', children: [] },
        ]
      },
    ]
  },
  { id: 'e3', label: 'Logística Beta Eireli', children: [] },
  { id: 'e4', label: 'Distribuidora Gama ME',  children: [] },
  { id: 'e5', label: 'Express Delta Ltda',      children: [] },
];
window.flattenEmpresaTree = function flattenEmpresaTree(nodes, level) {
  level = level || 0;
  return nodes.reduce(function(acc, n) {
    acc.push({ id: n.id, label: n.label, level: level, hasChildren: !!(n.children && n.children.length) });
    if (n.children && n.children.length) {
      acc = acc.concat(window.flattenEmpresaTree(n.children, level + 1));
    }
    return acc;
  }, []);
};

// ─── Ícones ───────────────────────────────────────────────────────────────────
const AfdIconX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const AfdIconInfo = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const AfdIconChevron = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

// ─── Tooltip de disabled ──────────────────────────────────────────────────────
function DisabledTooltip({ text }) {
  const [hov, setHov] = useAfdState(false);
  return (
    <span
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span style={{ color: '#c4c4c5', display: 'flex', alignItems: 'center' }}>
        <AfdIconInfo />
      </span>
      {hov && (
        <span className="afd-tooltip" style={{
          position: 'absolute',
          bottom: 'calc(100% + 6px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1c1c1e',
          color: '#fff',
          fontSize: 12,
          fontWeight: 400,
          fontFamily: 'var(--font-family-primary)',
          padding: '6px 10px',
          borderRadius: 6,
          whiteSpace: 'normal',
          maxWidth: 220,
          width: 'max-content',
          zIndex: 9999,
          pointerEvents: 'none',
          lineHeight: 1.4,
          textAlign: 'center',
        }}>
          {text}
          {/* seta */}
          <span style={{
            position: 'absolute',
            top: '100%', left: '50%',
            transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid #1c1c1e',
          }} />
        </span>
      )}
    </span>
  );
}

// ─── Label com tooltip opcional ───────────────────────────────────────────────
function FieldLabel({ label, disabled, tooltipText }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 5,
      marginBottom: 6,
    }}>
      <span style={{
        fontFamily: 'var(--font-family-primary)',
        fontSize: 13, fontWeight: 600,
        color: disabled ? '#c4c4c5' : 'var(--color-neutral-700)',
        cursor: disabled ? 'default' : 'auto',
        lineHeight: 1,
      }}>{label}</span>
      {disabled && tooltipText && <DisabledTooltip text={tooltipText} />}
    </div>
  );
}

// ─── Campo select (portal dropdown — mesma interação do tipo de data) ────────
function AfdSelect({ label, options, value, onChange, disabled, tooltipText }) {
  const [open,    setOpen]    = useAfdState(false);
  const [dropPos, setDropPos] = useAfdState({});
  const wrapRef  = useAfdRef(null);
  const dropRef  = useAfdRef(null);

  // Normalise options to { value, label }
  var opts = (options || []).map(function(o) {
    return typeof o === 'string' ? { value: o, label: o } : o;
  });

  var selectedLabel = (opts.find(function(o) { return o.value === value; }) || {}).label || null;

  function openDrop() {
    if (disabled || !wrapRef.current) return;
    var r = wrapRef.current.getBoundingClientRect();
    var spaceBelow = window.innerHeight - r.bottom;
    var dropH = Math.min(opts.length * 38 + 8, 300);
    var top = spaceBelow >= dropH + 8 ? r.bottom + 4 : r.top - dropH - 4;
    setDropPos({ top: top, left: r.left, width: r.width });
    setOpen(true);
  }

  useAfdEffect(function() {
    if (!open) return;
    function h(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target) &&
          dropRef.current  && !dropRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', h);
    return function() { document.removeEventListener('mousedown', h); };
  }, [open]);

  return (
    <div ref={wrapRef} style={{ display: 'flex', flexDirection: 'column' }}>
      <FieldLabel label={label} disabled={disabled} tooltipText={tooltipText} />
      <div
        onClick={disabled ? undefined : (open ? function() { setOpen(false); } : openDrop)}
        style={{
          position: 'relative', display: 'flex', alignItems: 'center',
          height: 36, padding: '0 28px 0 10px', boxSizing: 'border-box',
          border: '1px solid ' + (open ? 'var(--color-primary-500)' : (disabled ? '#eceded' : 'var(--color-neutral-400)')),
          borderRadius: 6, background: disabled ? '#f5f5f5' : '#fff',
          cursor: disabled ? 'default' : 'pointer',
          fontFamily: 'var(--font-family-primary)', fontSize: 13,
          color: disabled ? '#c4c4c5' : (selectedLabel ? 'var(--color-neutral-1000)' : 'var(--color-neutral-700)'),
          opacity: disabled ? 0.5 : 1,
          boxShadow: open ? '0 0 0 2px var(--color-primary-200)' : 'none',
          transition: 'border-color .15s, box-shadow .15s',
          userSelect: 'none',
        }}
      >
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selectedLabel || 'Selecione'}
        </span>
        {selectedLabel && !disabled ? (
          <span
            onMouseDown={function(e) { e.stopPropagation(); onChange(''); setOpen(false); }}
            style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--color-neutral-500)', display: 'flex' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </span>
        ) : (
          <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%) ' + (open ? 'rotate(180deg)' : ''), pointerEvents: 'none', display: 'flex', color: disabled ? '#c4c4c5' : 'var(--color-neutral-600)', transition: 'transform .2s' }}>
            <AfdIconChevron />
          </span>
        )}
      </div>

      {open && !disabled && ReactDOM.createPortal(
        <div ref={dropRef} style={{
          position: 'fixed', top: dropPos.top, left: dropPos.left, width: dropPos.width,
          zIndex: 9999, background: '#fff',
          border: '1px solid var(--color-neutral-300)', borderRadius: 8,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          padding: '4px 0', maxHeight: 300, overflowY: 'auto',
          fontFamily: 'var(--font-family-primary)',
        }}>
          {opts.map(function(opt) {
            var isSel = value === opt.value;
            return (
              <div key={opt.value}
                onClick={function() { onChange(opt.value); setOpen(false); }}
                style={{
                  padding: '9px 14px', cursor: 'pointer', fontSize: 13,
                  background: isSel ? 'var(--color-primary-100)' : 'transparent',
                  color: isSel ? 'var(--color-primary-600)' : 'var(--color-neutral-1000)',
                  fontWeight: isSel ? 600 : 400,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  transition: 'background .1s',
                }}
                onMouseEnter={function(e) { if (!isSel) e.currentTarget.style.background = 'var(--color-neutral-100)'; }}
                onMouseLeave={function(e) { if (!isSel) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{opt.label}</span>
                {isSel && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-500)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginLeft: 8 }}><polyline points="20 6 9 17 4 12"/></svg>
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

// ─── Campo empresa com autocomplete (igual ao filtro da listagem) ─────────────
function AfdTreeSelect({ label, value, onChange, disabled, tooltipText }) {
  const [query,    setQuery]    = useAfdState('');
  const [isTyping, setIsTyping] = useAfdState(false);
  const [open,     setOpen]     = useAfdState(false);
  const [focused,  setFocused]  = useAfdState(false);
  const [dropRect, setDropRect] = useAfdState(null);
  const wrapRef  = useAfdRef(null);
  const inputRef = useAfdRef(null);

  const flat = window.flattenEmpresaTree(window.MOCK_EMPRESA_TREE);
  const filtered = isTyping && query.trim()
    ? flat.filter(function(n) { return n.label.toLowerCase().indexOf(query.toLowerCase()) >= 0; })
    : flat;

  const displayValue = isTyping ? query : (value || '');

  function openDropdown() {
    if (disabled) return;
    if (wrapRef.current) {
      var r = wrapRef.current.getBoundingClientRect();
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
    if (inputRef.current) inputRef.current.blur();
  }

  function handleClear(e) {
    e.preventDefault();
    onChange('');
    setIsTyping(false);
    setQuery('');
    setOpen(false);
  }

  useAfdEffect(function() {
    if (!open) return;
    function h(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false); setIsTyping(false); setQuery(''); setFocused(false);
      }
    }
    document.addEventListener('mousedown', h);
    return function() { document.removeEventListener('mousedown', h); };
  }, [open]);

  const INDENT_PX = [0, 16, 28];
  const isFocusedOrOpen = focused || open;

  return (
    <div ref={wrapRef} style={{ display: 'flex', flexDirection: 'column' }}>
      <FieldLabel label={label} disabled={disabled} tooltipText={tooltipText} />
      <div style={{
        position: 'relative', display: 'flex', alignItems: 'center',
        height: 36, boxSizing: 'border-box',
        border: '1px solid ' + (isFocusedOrOpen ? 'var(--color-primary-500)' : (disabled ? '#eceded' : 'var(--color-neutral-400)')),
        borderRadius: 6, background: disabled ? '#f5f5f5' : '#fff',
        boxShadow: isFocusedOrOpen ? '0 0 0 2px var(--color-primary-200)' : 'none',
        opacity: disabled ? 0.5 : 1,
        transition: 'border-color .15s, box-shadow .15s',
      }}>
        <input
          ref={inputRef}
          value={displayValue}
          placeholder="Busque e selecione"
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={function() { setFocused(false); }}
          onChange={handleChange}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'var(--font-family-primary)', fontSize: 13,
            color: 'var(--color-neutral-900)', padding: '0 28px 0 10px',
            height: '100%', width: '100%', cursor: disabled ? 'default' : 'text',
          }}
        />
        {value && !disabled ? (
          <span onMouseDown={handleClear} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-neutral-500)', display: 'inline-flex', cursor: 'pointer' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </span>
        ) : (
          <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%) ' + (open ? 'rotate(180deg)' : ''), pointerEvents: 'none', display: 'flex', color: disabled ? '#c4c4c5' : 'var(--color-neutral-600)', transition: 'transform .2s' }}>
            <AfdIconChevron />
          </span>
        )}
      </div>

      {open && !disabled && filtered.length > 0 && dropRect && ReactDOM.createPortal(
        <div style={{
          position: 'fixed', top: dropRect.top, left: dropRect.left, width: dropRect.width,
          zIndex: 9999, background: '#fff',
          border: '1px solid var(--color-neutral-300)', borderRadius: 8,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          maxHeight: 300, overflowY: 'auto',
          fontFamily: 'var(--font-family-primary)',
        }}>
          {filtered.map(function(node) {
            var isSelected = value === node.label;
            var indent = INDENT_PX[node.level] || 0;
            return (
              <div key={node.id}
                onMouseDown={function() { handleSelect(node); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 12px 8px ' + (10 + indent) + 'px',
                  cursor: 'pointer',
                  background: isSelected ? 'var(--color-primary-100)' : 'transparent',
                  fontWeight: node.level === 0 ? 600 : 400, fontSize: 13,
                  color: isSelected ? 'var(--color-primary-600)' : 'var(--color-neutral-1000)',
                  borderBottom: node.level === 0 ? '0.5px solid var(--color-neutral-200)' : 'none',
                  transition: 'background .1s',
                }}
                onMouseEnter={function(e) { if (!isSelected) e.currentTarget.style.background = 'var(--color-neutral-100)'; }}
                onMouseLeave={function(e) { e.currentTarget.style.background = isSelected ? 'var(--color-primary-100)' : 'transparent'; }}
              >
                {node.level > 0 && (
                  <span style={{ width: 3, height: 3, borderRadius: '50%', flexShrink: 0, background: node.level === 1 ? 'var(--color-neutral-500)' : 'var(--color-neutral-300)' }} />
                )}
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{node.label}</span>
                {isSelected && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-500)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
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

// ─── Multi-select com autocomplete (AIT) — campo IS o input, sem busca interna ─
function AfdMultiSelect({ label, value, onChange, disabled, tooltipText }) {
  const [query,    setQuery]    = useAfdState('');
  const [isTyping, setIsTyping] = useAfdState(false);
  const [open,     setOpen]     = useAfdState(false);
  const [focused,  setFocused]  = useAfdState(false);
  const [dropRect, setDropRect] = useAfdState(null);
  const wrapRef  = useAfdRef(null);
  const inputRef = useAfdRef(null);

  var selected = Array.isArray(value) ? value : [];

  function getOptions() { return window.MOCK_AIT_OPTIONS || []; }

  var filtered = isTyping && query.trim()
    ? getOptions().filter(function(o) { return o.toLowerCase().indexOf(query.toLowerCase()) >= 0; })
    : getOptions();

  // Quando não está digitando, mostra os selecionados no input; digitando, mostra o query
  var displayValue = isTyping
    ? query
    : selected.length > 0
      ? selected.slice(0, 2).join(', ') + (selected.length > 2 ? ' +' + (selected.length - 2) : '')
      : '';

  function openDropdown() {
    if (disabled || !wrapRef.current) return;
    var r = wrapRef.current.getBoundingClientRect();
    setDropRect({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 260) });
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

  function toggleItem(opt) {
    var next = selected.includes(opt)
      ? selected.filter(function(s) { return s !== opt; })
      : selected.concat(opt);
    onChange(next);
    setIsTyping(false);
    setQuery('');
    // mantém o dropdown aberto para seleção múltipla
    if (inputRef.current) inputRef.current.focus();
  }

  function handleClear(e) {
    e.preventDefault();
    onChange([]);
    setIsTyping(false);
    setQuery('');
    setOpen(false);
  }

  useAfdEffect(function() {
    if (!open) return;
    function h(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false); setIsTyping(false); setQuery(''); setFocused(false);
      }
    }
    document.addEventListener('mousedown', h);
    return function() { document.removeEventListener('mousedown', h); };
  }, [open]);

  var isFocusedOrOpen = focused || open;

  return (
    <div ref={wrapRef} style={{ display: 'flex', flexDirection: 'column' }}>
      <FieldLabel label={label} disabled={disabled} tooltipText={tooltipText} />
      <div style={{
        position: 'relative', display: 'flex', alignItems: 'center',
        height: 36, boxSizing: 'border-box',
        border: '1px solid ' + (isFocusedOrOpen ? 'var(--color-primary-500)' : (disabled ? '#eceded' : 'var(--color-neutral-400)')),
        borderRadius: 6, background: disabled ? '#f5f5f5' : '#fff',
        boxShadow: isFocusedOrOpen ? '0 0 0 2px var(--color-primary-200)' : 'none',
        opacity: disabled ? 0.5 : 1,
        transition: 'border-color .15s, box-shadow .15s',
      }}>
        <input
          ref={inputRef}
          value={displayValue}
          placeholder="Busque e selecione"
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={function() { setFocused(false); }}
          onChange={handleChange}
          className="inf-placeholder-input"
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'var(--font-family-primary)', fontSize: 13,
            color: selected.length > 0 && !isTyping ? 'var(--color-neutral-1000)' : 'var(--color-neutral-900)',
            padding: '0 28px 0 10px',
            height: '100%', width: '100%', cursor: disabled ? 'default' : 'text',
          }}
        />
        {selected.length > 0 && !disabled ? (
          <span onMouseDown={handleClear} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-neutral-500)', display: 'inline-flex', cursor: 'pointer' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </span>
        ) : (
          <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%) ' + (open ? 'rotate(180deg)' : ''), pointerEvents: 'none', display: 'flex', color: disabled ? '#c4c4c5' : 'var(--color-neutral-600)', transition: 'transform .2s' }}>
            <AfdIconChevron />
          </span>
        )}
      </div>

      {open && !disabled && dropRect && ReactDOM.createPortal(
        <div style={{
          position: 'fixed', top: dropRect.top, left: dropRect.left, width: dropRect.width,
          zIndex: 9999, background: '#fff',
          border: '1px solid var(--color-neutral-300)', borderRadius: 8,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          padding: '4px 0', maxHeight: 280, overflowY: 'auto',
          fontFamily: 'var(--font-family-primary)',
        }}>
          {filtered.length === 0 && (
            <div style={{ padding: '12px 14px', fontSize: 13, color: 'var(--color-neutral-500)' }}>Nenhum resultado</div>
          )}
          {filtered.map(function(opt) {
            var isSel = selected.includes(opt);
            return (
              <div key={opt}
                onMouseDown={function(e) { e.preventDefault(); toggleItem(opt); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '9px 14px', cursor: 'pointer',
                  background: isSel ? 'var(--color-primary-100)' : 'transparent',
                  color: isSel ? 'var(--color-primary-600)' : 'var(--color-neutral-1000)',
                  fontWeight: isSel ? 600 : 400, fontSize: 13,
                  transition: 'background .1s',
                }}
                onMouseEnter={function(e) { if (!isSel) e.currentTarget.style.background = 'var(--color-neutral-100)'; }}
                onMouseLeave={function(e) { e.currentTarget.style.background = isSel ? 'var(--color-primary-100)' : 'transparent'; }}
              >
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{opt}</span>
                {isSel && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-500)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </div>
  );
}

// ─── Autocomplete simples (Veículos / placa) ──────────────────────────────────
function AfdAutocompleteSelect({ label, value, onChange, disabled, tooltipText, placeholder, options: optionsProp }) {
  const [query,    setQuery]    = useAfdState('');
  const [isTyping, setIsTyping] = useAfdState(false);
  const [open,     setOpen]     = useAfdState(false);
  const [focused,  setFocused]  = useAfdState(false);
  const [dropRect, setDropRect] = useAfdState(null);
  const wrapRef  = useAfdRef(null);
  const inputRef = useAfdRef(null);

  function getOptions() { return optionsProp || window.MOCK_PLACA_OPTIONS || []; }

  const filtered = isTyping && query.trim()
    ? getOptions().filter(function(o) { return o.toLowerCase().indexOf(query.toLowerCase()) >= 0; })
    : getOptions();

  const displayValue = isTyping ? query : (value || '');

  function openDropdown() {
    if (disabled) return;
    if (wrapRef.current) {
      var r = wrapRef.current.getBoundingClientRect();
      setDropRect({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 220) });
    }
    setOpen(true);
  }

  function handleFocus() { setFocused(true); setIsTyping(false); setQuery(''); openDropdown(); }

  function handleChange(e) { setIsTyping(true); setQuery(e.target.value); openDropdown(); }

  function handleSelect(opt) {
    onChange(opt);
    setIsTyping(false); setQuery(''); setOpen(false);
    if (inputRef.current) inputRef.current.blur();
  }

  function handleClear(e) {
    e.preventDefault();
    onChange(''); setIsTyping(false); setQuery(''); setOpen(false);
  }

  useAfdEffect(function() {
    if (!open) return;
    function h(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false); setIsTyping(false); setQuery(''); setFocused(false);
      }
    }
    document.addEventListener('mousedown', h);
    return function() { document.removeEventListener('mousedown', h); };
  }, [open]);

  const isFocusedOrOpen = focused || open;

  return (
    <div ref={wrapRef} style={{ display: 'flex', flexDirection: 'column' }}>
      <FieldLabel label={label} disabled={disabled} tooltipText={tooltipText} />
      <div style={{
        position: 'relative', display: 'flex', alignItems: 'center',
        height: 36, boxSizing: 'border-box',
        border: '1px solid ' + (isFocusedOrOpen ? 'var(--color-primary-500)' : (disabled ? '#eceded' : 'var(--color-neutral-400)')),
        borderRadius: 6, background: disabled ? '#f5f5f5' : '#fff',
        boxShadow: isFocusedOrOpen ? '0 0 0 2px var(--color-primary-200)' : 'none',
        opacity: disabled ? 0.5 : 1,
        transition: 'border-color .15s, box-shadow .15s',
      }}>
        <input
          ref={inputRef}
          value={displayValue}
          placeholder={placeholder || 'Busque e selecione'}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={function() { setFocused(false); }}
          onChange={handleChange}
          className="inf-placeholder-input"
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'var(--font-family-primary)', fontSize: 13,
            color: 'var(--color-neutral-900)', padding: '0 28px 0 10px',
            height: '100%', width: '100%', cursor: disabled ? 'default' : 'text',
          }}
        />
        {value && !disabled ? (
          <span onMouseDown={handleClear} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-neutral-500)', display: 'inline-flex', cursor: 'pointer' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </span>
        ) : (
          <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%) ' + (open ? 'rotate(180deg)' : ''), pointerEvents: 'none', display: 'flex', color: disabled ? '#c4c4c5' : 'var(--color-neutral-600)', transition: 'transform .2s' }}>
            <AfdIconChevron />
          </span>
        )}
      </div>

      {open && !disabled && filtered.length > 0 && dropRect && ReactDOM.createPortal(
        <div style={{
          position: 'fixed', top: dropRect.top, left: dropRect.left, width: dropRect.width,
          zIndex: 9999, background: '#fff',
          border: '1px solid var(--color-neutral-300)', borderRadius: 8,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          maxHeight: 260, overflowY: 'auto',
          fontFamily: 'var(--font-family-primary)',
        }}>
          {filtered.map(function(opt) {
            var isSel = value === opt;
            return (
              <div key={opt}
                onMouseDown={function() { handleSelect(opt); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 12px', cursor: 'pointer',
                  background: isSel ? 'var(--color-primary-100)' : 'transparent',
                  fontWeight: isSel ? 600 : 400, fontSize: 13,
                  color: isSel ? 'var(--color-primary-600)' : 'var(--color-neutral-1000)',
                  transition: 'background .1s',
                }}
                onMouseEnter={function(e) { if (!isSel) e.currentTarget.style.background = 'var(--color-neutral-100)'; }}
                onMouseLeave={function(e) { e.currentTarget.style.background = isSel ? 'var(--color-primary-100)' : 'transparent'; }}
              >
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{opt}</span>
                {isSel && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-500)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
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

// ─── Campo input ──────────────────────────────────────────────────────────────
function AfdInput({ label, placeholder, value, onChange, disabled, tooltipText }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <FieldLabel label={label} disabled={disabled} tooltipText={tooltipText} />
      <input
        className={`afd-field-ctrl afd-field-ctrl-input${disabled ? ' afd-disabled' : ''}`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => !disabled && onChange(e.target.value)}
      />
    </div>
  );
}

// ─── Date filter para o drawer ───────────────────────────────────────────────
function AfdDateFilter({ activeTab, value, onChange, disabled, tooltipText }) {
  // value: { dateType, startDate, endDate }
  const dateType  = value.dateType  || null;
  const startDate = value.startDate || null;
  const endDate   = value.endDate   || null;

  const [typeOpen,   setTypeOpen]   = useAfdState(false);
  const [calOpen,    setCalOpen]    = useAfdState(false);
  const [hoverDate,  setHoverDate]  = useAfdState(null);
  const [phase,      setPhase]      = useAfdState('start');
  const [viewMonth,  setViewMonth]  = useAfdState(function() {
    var d = startDate || new Date(); return { year: d.getFullYear(), month: d.getMonth() };
  });
  const [typeDropPos, setTypeDropPos] = useAfdState({});
  const [calDropPos,  setCalDropPos]  = useAfdState({});
  const typeRef = useAfdRef(null);
  const typeDropRef = useAfdRef(null);
  const calRef  = useAfdRef(null);
  const calDropRef  = useAfdRef(null);

  var allOpts = window.DATE_TYPE_OPTIONS || [];
  var availableOpts = allOpts.filter(function(o) { return o.tabs.indexOf(activeTab) >= 0; });
  var selectedLabel = (availableOpts.find(function(o) { return o.id === dateType; }) || {}).label || null;

  var MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  var DAYS   = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

  function fmtDate(d) {
    if (!d) return '';
    return [String(d.getDate()).padStart(2,'0'), String(d.getMonth()+1).padStart(2,'0'), d.getFullYear()].join('/');
  }
  function isSameDay(a, b) { return a && b && a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }

  var displayRange = startDate && endDate ? fmtDate(startDate)+' – '+fmtDate(endDate)
    : startDate ? fmtDate(startDate)+' – ...' : '';

  function openTypeDrop() {
    if (disabled || !typeRef.current) return;
    var r = typeRef.current.getBoundingClientRect();
    setTypeDropPos({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 300) });
    setTypeOpen(true);
  }
  function openCal() {
    if (disabled || !calRef.current) return;
    var r = calRef.current.getBoundingClientRect();
    var top = (window.innerHeight - r.bottom) >= 340 ? r.bottom + 4 : r.top - 344;
    setCalDropPos({ top: top, left: r.left });
    setCalOpen(true);
    setPhase(startDate ? 'end' : 'start');
  }

  useAfdEffect(function() {
    if (!typeOpen) return;
    function h(e) {
      if (typeRef.current && !typeRef.current.contains(e.target) &&
          typeDropRef.current && !typeDropRef.current.contains(e.target)) setTypeOpen(false);
    }
    document.addEventListener('mousedown', h);
    return function() { document.removeEventListener('mousedown', h); };
  }, [typeOpen]);

  useAfdEffect(function() {
    if (!calOpen) return;
    function h(e) {
      if (calRef.current && !calRef.current.contains(e.target) &&
          calDropRef.current && !calDropRef.current.contains(e.target)) { setCalOpen(false); setHoverDate(null); }
    }
    document.addEventListener('mousedown', h);
    return function() { document.removeEventListener('mousedown', h); };
  }, [calOpen]);

  function handleDayClick(date) {
    if (phase === 'start') {
      onChange({ dateType: dateType, startDate: date, endDate: null });
      setPhase('end');
    } else {
      var s = startDate, e = date;
      if (date < startDate) { s = date; e = startDate; }
      onChange({ dateType: dateType, startDate: s, endDate: e });
      setPhase('start'); setCalOpen(false); setHoverDate(null);
    }
  }

  var yr = viewMonth.year, mo = viewMonth.month;
  var firstDow = new Date(yr, mo, 1).getDay();
  var daysInMo = new Date(yr, mo + 1, 0).getDate();
  var cells = [];
  for (var i = 0; i < firstDow; i++) cells.push(null);
  for (var d = 1; d <= daysInMo; d++) cells.push(new Date(yr, mo, d));
  var todayStr = new Date().toDateString();

  var BSTY = { background: 'none', border: 'none', cursor: 'pointer', borderRadius: 4, fontFamily: 'var(--font-family-primary)', fontSize: 13, color: 'var(--color-neutral-600)' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <FieldLabel label="Data" disabled={disabled} tooltipText={tooltipText} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Type select */}
        <div ref={typeRef} style={{ position: 'relative' }}>
          <div onClick={typeOpen ? function() { setTypeOpen(false); } : openTypeDrop}
            className={disabled ? 'afd-disabled' : ''}
            style={{
              position: 'relative', display: 'flex', alignItems: 'center',
              height: 36, padding: '0 28px 0 10px', boxSizing: 'border-box',
              border: '1px solid '+(typeOpen ? 'var(--color-primary-500)' : (disabled ? '#eceded' : 'var(--color-neutral-400)')),
              borderRadius: 6, background: disabled ? '#f5f5f5' : '#fff',
              cursor: disabled ? 'default' : 'pointer',
              fontFamily: 'var(--font-family-primary)', fontSize: 13,
              color: disabled ? '#c4c4c5' : (selectedLabel ? 'var(--color-neutral-1000)' : 'var(--color-neutral-700)'),
              overflow: 'hidden', whiteSpace: 'nowrap', opacity: disabled ? 0.5 : 1,
              boxShadow: typeOpen ? '0 0 0 2px var(--color-primary-200)' : 'none',
              transition: 'border-color .15s',
            }}>
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedLabel || 'Tipo de data'}</span>
            {selectedLabel && !disabled ? (
              <span onMouseDown={function(e) { e.stopPropagation(); onChange({ dateType: null, startDate: startDate, endDate: endDate }); }}
                style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--color-neutral-500)', display: 'flex' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </span>
            ) : (
              <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%) '+(typeOpen ? 'rotate(180deg)' : ''), pointerEvents: 'none', display: 'flex', color: disabled ? '#c4c4c5' : 'var(--color-neutral-600)', transition: 'transform .2s' }}>
                <AfdIconChevron />
              </span>
            )}
          </div>
          {typeOpen && !disabled && ReactDOM.createPortal(
            <div ref={typeDropRef} style={{
              position: 'fixed', top: typeDropPos.top, left: typeDropPos.left, width: typeDropPos.width,
              zIndex: 9999, background: '#fff', border: '1px solid var(--color-neutral-300)',
              borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              padding: '4px 0', maxHeight: 300, overflowY: 'auto',
              fontFamily: 'var(--font-family-primary)',
            }}>
              {availableOpts.map(function(opt) {
                var isSel = dateType === opt.id;
                return (
                  <div key={opt.id}
                    onClick={function() { onChange({ dateType: opt.id, startDate: startDate, endDate: endDate }); setTypeOpen(false); }}
                    style={{
                      padding: '9px 14px', cursor: 'pointer', fontSize: 13,
                      background: isSel ? 'var(--color-primary-100)' : 'transparent',
                      color: isSel ? 'var(--color-primary-600)' : 'var(--color-neutral-1000)',
                      fontWeight: isSel ? 600 : 400,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      transition: 'background .1s',
                    }}
                    onMouseEnter={function(e) { if (!isSel) e.currentTarget.style.background = 'var(--color-neutral-100)'; }}
                    onMouseLeave={function(e) { if (!isSel) e.currentTarget.style.background = 'transparent'; }}
                  >
                    {opt.label}
                    {isSel && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-500)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    )}
                  </div>
                );
              })}
            </div>,
            document.body
          )}
        </div>
        {/* Date range */}
        <div ref={calRef} style={{ position: 'relative' }}>
          <div onClick={calOpen ? function() { setCalOpen(false); } : openCal}
            className={disabled ? 'afd-disabled' : ''}
            style={{
              position: 'relative', display: 'flex', alignItems: 'center',
              height: 36, padding: '0 28px 0 10px', boxSizing: 'border-box',
              border: '1px solid '+(calOpen ? 'var(--color-primary-500)' : (disabled ? '#eceded' : 'var(--color-neutral-400)')),
              borderRadius: 6, background: disabled ? '#f5f5f5' : '#fff',
              cursor: disabled ? 'default' : 'pointer',
              fontFamily: 'var(--font-family-primary)', fontSize: 13,
              color: disabled ? '#c4c4c5' : (displayRange ? 'var(--color-neutral-1000)' : 'var(--color-neutral-700)'),
              overflow: 'hidden', whiteSpace: 'nowrap', opacity: disabled ? 0.5 : 1,
              boxShadow: calOpen ? '0 0 0 2px var(--color-primary-200)' : 'none',
              transition: 'border-color .15s',
            }}>
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayRange || 'DD/MM/AAAA – DD/MM/AAAA'}</span>
            {(startDate || endDate) && !disabled ? (
              <span onMouseDown={function(e) { e.stopPropagation(); onChange({ dateType: dateType, startDate: null, endDate: null }); setPhase('start'); }}
                style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--color-neutral-500)', display: 'flex' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </span>
            ) : (
              <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', color: disabled ? '#c4c4c5' : 'var(--color-neutral-600)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </span>
            )}
          </div>
          {calOpen && !disabled && ReactDOM.createPortal(
            <div ref={calDropRef} style={{
              position: 'fixed', top: calDropPos.top, left: calDropPos.left,
              width: 280, zIndex: 9999, background: '#fff',
              border: '1px solid var(--color-neutral-200)', borderRadius: 12,
              boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
              fontFamily: 'var(--font-family-primary)',
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 10px' }}>
                <button onClick={function() { var d = new Date(yr, mo-1,1); setViewMonth({year:d.getFullYear(),month:d.getMonth()}); }}
                  style={{ ...BSTY, padding: '4px 8px', fontSize: 16, display: 'flex' }}
                  onMouseEnter={function(e){e.currentTarget.style.background='var(--color-neutral-200)';}}
                  onMouseLeave={function(e){e.currentTarget.style.background='none';}}>‹</button>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-neutral-900)' }}>{MONTHS[mo]} {yr}</span>
                <button onClick={function() { var d = new Date(yr, mo+1,1); setViewMonth({year:d.getFullYear(),month:d.getMonth()}); }}
                  style={{ ...BSTY, padding: '4px 8px', fontSize: 16, display: 'flex' }}
                  onMouseEnter={function(e){e.currentTarget.style.background='var(--color-neutral-200)';}}
                  onMouseLeave={function(e){e.currentTarget.style.background='none';}}>›</button>
              </div>
              <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--color-neutral-500)', marginBottom: 6, fontWeight: 500 }}>
                {phase === 'start' ? 'Selecione a data inicial' : 'Selecione a data final'}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 12px' }}>
                {DAYS.map(function(d) { return (<div key={d} style={{ textAlign:'center',fontSize:11,fontWeight:600,color:'var(--color-neutral-500)',padding:'4px 0' }}>{d}</div>); })}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, padding: '4px 12px 8px' }}>
                {cells.map(function(date, i) {
                  if (!date) return React.createElement('div', {key:'e'+i});
                  var isStart = isSameDay(date, startDate);
                  var isEnd   = isSameDay(date, endDate);
                  var isToday = date.toDateString() === todayStr;
                  var rangeEnd = phase === 'end' && hoverDate ? hoverDate : endDate;
                  var inRange = false;
                  if (startDate && rangeEnd) {
                    var lo = startDate < rangeEnd ? startDate : rangeEnd;
                    var hi = startDate < rangeEnd ? rangeEnd : startDate;
                    inRange = date > lo && date < hi;
                  }
                  var isSel = isStart || isEnd;
                  return (
                    <div key={date.toISOString()}
                      onClick={function() { handleDayClick(date); }}
                      onMouseEnter={function() { if (phase==='end') setHoverDate(date); }}
                      onMouseLeave={function() { if (phase==='end') setHoverDate(null); }}
                      style={{
                        display:'flex', alignItems:'center', justifyContent:'center',
                        height:34, borderRadius:6, cursor:'pointer', fontSize:13, userSelect:'none',
                        background: isSel ? 'var(--color-primary-500)' : inRange ? 'var(--color-primary-100)' : 'transparent',
                        color: isSel ? '#fff' : isToday ? 'var(--color-primary-600)' : 'var(--color-neutral-900)',
                        fontWeight: isSel ? 700 : isToday ? 600 : 400,
                        transition: 'background .1s',
                      }}
                      onMouseOver={function(e) { if (!isSel && !inRange) e.currentTarget.style.background = 'var(--color-neutral-200)'; }}
                      onMouseOut={function(e) {
                        if (!isSel && !inRange) e.currentTarget.style.background = 'transparent';
                        else if (inRange) e.currentTarget.style.background = 'var(--color-primary-100)';
                      }}
                    >{date.getDate()}</div>
                  );
                })}
              </div>
              <div style={{ padding: '8px 16px 12px', borderTop: '1px solid var(--color-neutral-200)' }}>
                <button onClick={function() { onChange({ dateType: dateType, startDate: null, endDate: null }); setPhase('start'); }}
                  style={{ ...BSTY, padding: '4px 8px' }}
                  onMouseEnter={function(e){e.currentTarget.style.color='var(--color-primary-500)';}}
                  onMouseLeave={function(e){e.currentTarget.style.color='var(--color-neutral-600)';}}>Limpar datas</button>
              </div>
            </div>,
            document.body
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Header de grupo ──────────────────────────────────────────────────────────
function GroupHeader({ label, first }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 500,
      fontFamily: 'var(--font-family-primary)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      color: 'var(--color-neutral-500)',
      paddingBottom: 8,
      borderBottom: '0.5px solid var(--color-neutral-200)',
      marginBottom: 12,
      marginTop: first ? 0 : 32,
    }}>{label}</div>
  );
}

// ─── Estado inicial ───────────────────────────────────────────────────────────
const AFD_INITIAL = {
  empresa: '', centroCusto: '',
  ait: [], placa: '',
  orgaoAutuador: '', codigoCtb: '', recorrivel: '', uf: '',
  dateFilter: { dateType: null, startDate: null, endDate: null },
  condutorVinculado: '', condutorIndicadoFormal: '',
  statusIndicacao: '', tipoIndicacao: '',
  infracaoTratada: '', ativos: '', infracaoCancelada: '', descontoCond: '',
  possuiBoleto: '', incluirPagas: '', possuiAnexo: '',
};

// ─── Regras de disabled por tab ───────────────────────────────────────────────
const DISABLED_BY_TAB = {
  indicacao: new Set(['incluirPagas', 'condutorIndicadoFormal']),
  pagamento: new Set(['tipoIndicacao']),
  todas:     new Set(),
};

// ─── Componente principal ─────────────────────────────────────────────────────
function AdvancedFiltersDrawer({ open, activeTab = 'todas', onClose, onApply, onClear }) {
  const [filters, setFilters] = useAfdState(AFD_INITIAL);

  useAfdEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  function set(key, val) { setFilters(prev => ({ ...prev, [key]: val })); }

  function handleClear() {
    setFilters(AFD_INITIAL);
    onClear?.();
  }

  function handleApply() {
    onApply?.(filters);
    onClose();
  }

  const disabledKeys = DISABLED_BY_TAB[activeTab] || new Set();

  const tooltipText = activeTab === 'indicacao'
    ? 'Este filtro não se aplica à aba Indicação de condutor'
    : activeTab === 'pagamento'
    ? 'Este filtro não se aplica à aba Pagamento'
    : '';

  function dis(key) { return disabledKeys.has(key); }
  function tip(key) { return dis(key) ? tooltipText : ''; }

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="afd-overlay"
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 800,
          background: 'rgba(0,0,0,0.35)',
        }}
      />

      {/* Painel */}
      <div
        className="afd-panel"
        style={{
          position: 'fixed', top: 0, right: 0,
          width: 480, height: '100vh', zIndex: 900,
          background: '#fff',
          borderLeft: '1px solid var(--color-neutral-300)',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
          display: 'flex', flexDirection: 'column',
          fontFamily: 'var(--font-family-primary)',
        }}
      >
        {/* ── Header ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid var(--color-neutral-200)',
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-neutral-900)', lineHeight: 1.3 }}>
              Filtros avançados
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 32, height: 32, border: 'none', background: 'transparent',
              color: 'var(--color-neutral-600)', cursor: 'pointer', borderRadius: 6,
              transition: 'background .15s, color .15s', flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-neutral-200)'; e.currentTarget.style.color = 'var(--color-neutral-900)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-neutral-600)'; }}
          >
            <AfdIconX />
          </button>
        </div>

        {/* ── Corpo scrollável ── */}
        <div className="afd-scrollbar" style={{
          flex: 1, overflowY: 'auto',
          padding: '20px 20px 8px',
        }}>

          {/* ── ORGANIZAÇÃO ── */}
          <GroupHeader label="Organização" first />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <AfdTreeSelect label="Empresa" value={filters.empresa} onChange={v => set('empresa', v)}
              disabled={dis('empresa')} tooltipText={tip('empresa')} />
            <AfdSelect label="Centro de custo" value={filters.centroCusto} onChange={v => set('centroCusto', v)}
              options={['Todos', 'CC-001 Operações', 'CC-002 Logística', 'CC-003 Distribuição', 'CC-004 Administrativo']}
              disabled={dis('centroCusto')} tooltipText={tip('centroCusto')} />
          </div>

          {/* ── INFRAÇÃO ── */}
          <GroupHeader label="Infração" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <AfdMultiSelect label="AIT" value={filters.ait} onChange={v => set('ait', v)}
              disabled={dis('ait')} tooltipText={tip('ait')} />
            <AfdAutocompleteSelect label="Veículo (placa)" value={filters.placa} onChange={v => set('placa', v)}
              placeholder="Busque pela placa" disabled={dis('placa')} tooltipText={tip('placa')} />
            <AfdDateFilter
              activeTab={activeTab}
              value={filters.dateFilter}
              onChange={v => set('dateFilter', v)}
              disabled={false}
            />
            <AfdSelect label="Órgão autuador" value={filters.orgaoAutuador} onChange={v => set('orgaoAutuador', v)}
              options={['Todos', 'DETRAN-SP', 'DETRAN-MG', 'DETRAN-RJ', 'DETRAN-RS', 'DETRAN-PR', 'CET-SP', 'CET-RJ', 'PRF', 'PMSP', 'DER-SP', 'SINFRA-BA', 'SEMOB-DF']}
              disabled={dis('orgaoAutuador')} tooltipText={tip('orgaoAutuador')} />
            <AfdAutocompleteSelect label="Enquadramento / Código CTB"
              placeholder="Ex: 55680"
              value={filters.codigoCtb} onChange={v => set('codigoCtb', v)}
              options={window.MOCK_CTB_OPTIONS}
              disabled={dis('codigoCtb')} tooltipText={tip('codigoCtb')} />
            <AfdSelect label="Recorrível" value={filters.recorrivel} onChange={v => set('recorrivel', v)}
              options={['Todos', 'Não recorrido', 'A recorrer', 'Recorrido', 'Não elegível']}
              disabled={dis('recorrivel')} tooltipText={tip('recorrivel')} />
            <AfdSelect label="UF / Estado" value={filters.uf} onChange={v => set('uf', v)}
              options={['Todos', 'SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'DF', 'GO', 'PE', 'CE', 'AM', 'PA']}
              disabled={dis('uf')} tooltipText={tip('uf')} />
          </div>

          {/* ── CONDUTOR ── */}
          <GroupHeader label="Condutor" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <AfdAutocompleteSelect label="Condutor vinculado" value={filters.condutorVinculado} onChange={v => set('condutorVinculado', v)}
              options={['Rebeca Valetich', 'Wagner Daniel', 'Antônio Pereira', 'Carlos Mendes', 'Ana Paula Souza', 'Fernanda Lima', 'Rogério Alves']}
              placeholder="Busque e selecione" disabled={dis('condutorVinculado')} tooltipText={tip('condutorVinculado')} />
            <AfdAutocompleteSelect label="Condutor indicado" value={filters.condutorIndicadoFormal} onChange={v => set('condutorIndicadoFormal', v)}
              options={['Rebeca Valetich', 'Wagner Daniel', 'Antônio Pereira', 'Carlos Mendes', 'Ana Paula Souza', 'Fernanda Lima']}
              placeholder="Busque e selecione" disabled={dis('condutorIndicadoFormal')} tooltipText={tip('condutorIndicadoFormal')} />
          </div>

          {/* ── INDICAÇÃO ── */}
          <GroupHeader label="Indicação" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <AfdSelect label="Status da indicação" value={filters.statusIndicacao} onChange={v => set('statusIndicacao', v)}
              options={[
                'Todos',
                'Indique agora', 'Em processamento', 'Enviada ao órgão',
                'Documentos incorretos', 'Falha na indicação', 'Indeferida pelo órgão',
                'Indique no órgão', 'Indicação vencida', 'Aguardando aceite do condutor',
                'Recusado pelo condutor', 'Vencida sem ação do condutor', 'Condutor indicado', 'Cancelada',
              ]}
              disabled={dis('statusIndicacao')} tooltipText={tip('statusIndicacao')} />
            <AfdSelect label="Tipo de indicação" value={filters.tipoIndicacao} onChange={v => set('tipoIndicacao', v)}
              options={['Todos', 'CPF', 'Formulário']}
              disabled={dis('tipoIndicacao')} tooltipText={tip('tipoIndicacao')} />
          </div>

          {/* ── STATUS E TRATAMENTO ── */}
          <GroupHeader label="Status e tratamento" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <AfdSelect label="Infração tratada" value={filters.infracaoTratada} onChange={v => set('infracaoTratada', v)}
              options={['Todos', 'Sim', 'Não', 'Em andamento', 'Em avaliação', 'Aguardando Retorno Gestor', 'Em análise RH']}
              disabled={dis('infracaoTratada')} tooltipText={tip('infracaoTratada')} />
            <AfdSelect label="Ativos" value={filters.ativos} onChange={v => set('ativos', v)}
              options={['Ativos', 'Inativos', 'Todos']}
              disabled={dis('ativos')} tooltipText={tip('ativos')} />
            <AfdSelect label="Infração cancelada" value={filters.infracaoCancelada} onChange={v => set('infracaoCancelada', v)}
              options={['Todos', 'Sim', 'Não']}
              disabled={dis('infracaoCancelada')} tooltipText={tip('infracaoCancelada')} />
            <AfdSelect label="Desconto do condutor aplicado" value={filters.descontoCond} onChange={v => set('descontoCond', v)}
              options={['Todos', 'Sim', 'Não']}
              disabled={dis('descontoCond')} tooltipText={tip('descontoCond')} />
          </div>

          {/* ── BOLETO E PAGAMENTO ── */}
          <GroupHeader label="Boleto e pagamento" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 24 }}>
            <AfdSelect label="Possui boleto" value={filters.possuiBoleto} onChange={v => set('possuiBoleto', v)}
              options={['Todos', 'Sim', 'Não', 'Desconto 40%']}
              disabled={dis('possuiBoleto')} tooltipText={tip('possuiBoleto')} />
            <AfdSelect label="Incluir infrações pagas" value={filters.incluirPagas} onChange={v => set('incluirPagas', v)}
              options={['Todas', 'Apenas pagas', 'Apenas não pagas']}
              disabled={dis('incluirPagas')} tooltipText={tip('incluirPagas')} />
            <AfdSelect label="Possui anexo" value={filters.possuiAnexo} onChange={v => set('possuiAnexo', v)}
              options={['Todos', 'Sim', 'Não']}
              disabled={dis('possuiAnexo')} tooltipText={tip('possuiAnexo')} />
          </div>

        </div>

        {/* ── Footer ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px',
          borderTop: '1px solid var(--color-neutral-200)',
          background: '#fff',
          flexShrink: 0,
        }}>
          <button
            onClick={handleClear}
            style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '0 14px', height: 36, border: 'none',
              background: 'transparent', fontFamily: 'var(--font-family-primary)',
              fontSize: 13, fontWeight: 600, color: 'var(--color-neutral-600)',
              cursor: 'pointer', borderRadius: 6, transition: 'color .15s, background .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-neutral-900)'; e.currentTarget.style.background = 'var(--color-neutral-200)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-neutral-600)'; e.currentTarget.style.background = 'transparent'; }}
          >
            Limpar tudo
          </button>
          <button
            onClick={handleApply}
            style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '0 20px', height: 36,
              border: 'none',
              borderRadius: 6, background: '#f9401b',
              fontFamily: 'var(--font-family-primary)',
              fontSize: 13, fontWeight: 600, color: '#fff',
              cursor: 'pointer', transition: 'background .15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#d93518'}
            onMouseLeave={e => e.currentTarget.style.background = '#f9401b'}
          >
            Aplicar filtros
          </button>
        </div>
      </div>
    </>
  );
}

window.AdvancedFiltersDrawer = AdvancedFiltersDrawer;
