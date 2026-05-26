// Sidebar.jsx — Frota 162 (Figma node 448:54479)
// Sidebar FIXA (sem hover/collapse). Estrutura com accordion no item "Gestão de multas".
// Itens sem tela ainda desenvolvida ficam não-clicáveis (cursor default).
//
// Esta é a cópia de referência fora do bundle. A versão que de fato roda
// está inline em index.html — mantenha as duas em sincronia.
const { useState: useSidebarState } = React;

// ─── Ícones (lucide-style 24×24, stroke 2) ───────────────────────────────────
const IconHome = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconFileText = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const IconCar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2"/>
    <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
  </svg>
);
const IconBarChart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="20" x2="12" y2="10"/>
    <line x1="18" y1="20" x2="18" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="16"/>
  </svg>
);
const IconWallet = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4"/>
    <path d="M22 12h-4a2 2 0 0 0 0 4h4z"/>
  </svg>
);
const IconUsers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconHelp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
// Renomeado para SbChevronDown porque `IconChevronDown` já está declarado no
// bloco do Header (mesmo escopo global do Babel inline).
const SbChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconLayers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
  </svg>
);
const IconLogOut = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

// ─── Estrutura do menu (espelho do Figma node 448:54479) ─────────────────────
// `enabled: false` → não clicável, cursor default. `enabled: true` → navegável.
const SIDEBAR_TREE = [
  { id: 'visao-geral',  label: 'Visão Geral',    icon: <IconHome />,     enabled: false },
  { id: 'multas',       label: 'Gestão de multas', icon: <IconFileText />, accordion: true, enabled: true, children: [
    { id: 'multas-transito',  label: 'Multas de trânsito',     enabled: true, badge: 'NOVO' },
    { id: 'notificacoes',     label: 'Notificações',           enabled: false },
    { id: 'infracoes',        label: 'Infrações',              enabled: false },
    { id: 'multas-admin',     label: 'Multas administrativas', enabled: false },
  ]},
  { id: 'gestao-frota', label: 'Gestão da Frota', icon: <IconCar />,      accordion: true, enabled: false },
  { id: 'relatorios',   label: 'Relatórios',      icon: <IconBarChart />, accordion: true, enabled: false },
  { id: 'carteira',     label: 'Carteira',        icon: <IconWallet />,   accordion: true, enabled: false },
  { id: 'usuarios',     label: 'Usuários',        icon: <IconUsers />,    accordion: true, enabled: false },
  { id: 'ajuda',        label: 'Ajuda',           icon: <IconHelp />,     accordion: true, enabled: false },
];

function Sidebar({ activeId = 'multas-transito', onSelect }) {
  const [openGroup, setOpenGroup] = useSidebarState('multas');
  // Default fechada (72px só com ícones). Hover expande para 280px com labels e sub-menu.
  const [expanded, setExpanded] = useSidebarState(false);

  const activeParentId = (() => {
    for (const node of SIDEBAR_TREE) {
      if (node.children?.some(c => c.id === activeId)) return node.id;
    }
    return null;
  })();

  function handleSelect(id, enabled) {
    if (!enabled) return;
    onSelect?.(id);
  }
  function toggleGroup(id) {
    setOpenGroup(prev => prev === id ? null : id);
  }

  function renderTopLevel(node) {
    const isAccordion = !!node.accordion;
    const isOpen = openGroup === node.id;
    const isActive = node.id === activeId || node.id === activeParentId;
    const clickable = node.enabled;

    if (isAccordion) {
      return (
        <div key={node.id} className="frota-sidebar__group">
          <div
            className={`frota-sidebar__item ${isActive ? 'is-active' : ''} ${clickable ? 'frota-sidebar__item--clickable' : 'frota-sidebar__item--disabled'}`}
            role="button"
            tabIndex={clickable ? 0 : -1}
            aria-expanded={isOpen}
            aria-disabled={!clickable}
            onClick={() => clickable && toggleGroup(node.id)}>
            <span className="frota-sidebar__icon">{node.icon}</span>
            <span className="frota-sidebar__label">{node.label}</span>
            <span className={`frota-sidebar__chevron ${isOpen ? 'frota-sidebar__chevron--up' : ''}`}>
              <SbChevronDown />
            </span>
          </div>
          {isOpen && node.children && (
            <div className="frota-sidebar__sublist">
              {node.children.map(child => {
                const subActive = child.id === activeId;
                const subClickable = child.enabled;
                return (
                  <div
                    key={child.id}
                    className={`frota-sidebar__subitem ${subActive ? 'is-active' : ''} ${subClickable ? 'frota-sidebar__subitem--clickable' : 'frota-sidebar__subitem--disabled'}`}
                    role={subClickable ? 'button' : undefined}
                    tabIndex={subClickable ? 0 : -1}
                    aria-current={subActive ? 'page' : undefined}
                    aria-disabled={!subClickable}
                    onClick={() => handleSelect(child.id, subClickable)}>
                    <span className="frota-sidebar__label">{child.label}</span>
                    {child.badge && (
                      <span className="frota-sidebar__tag">{child.badge}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        key={node.id}
        className={`frota-sidebar__item ${isActive ? 'is-active' : ''} ${clickable ? 'frota-sidebar__item--clickable' : 'frota-sidebar__item--disabled'}`}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : -1}
        aria-current={isActive ? 'page' : undefined}
        aria-disabled={!clickable}
        onClick={() => handleSelect(node.id, clickable)}>
        <span className="frota-sidebar__icon">{node.icon}</span>
        <span className="frota-sidebar__label">{node.label}</span>
      </div>
    );
  }

  return (
    <aside
      className={`frota-sidebar ${expanded ? 'is-expanded' : ''}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}>
      <nav className="frota-sidebar__nav">
        {SIDEBAR_TREE.map(renderTopLevel)}
      </nav>
      <div className="frota-sidebar__footer">
        <button
          className={`frota-sidebar__item frota-sidebar__item--clickable ${activeId === 'componentes' ? 'is-active' : ''}`}
          onClick={() => onSelect?.('componentes')}
          aria-label="Componentes"
          aria-current={activeId === 'componentes' ? 'page' : undefined}>
          <span className="frota-sidebar__icon"><IconLayers /></span>
          <span className="frota-sidebar__label">Componentes</span>
        </button>
        <button className="frota-sidebar__item frota-sidebar__item--clickable" aria-label="Sair">
          <span className="frota-sidebar__icon"><IconLogOut /></span>
          <span className="frota-sidebar__label">Sair</span>
        </button>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
