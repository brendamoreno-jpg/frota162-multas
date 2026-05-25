// Sidebar.jsx — Frota 162 collapsing sidebar
// 64px → 240px on hover. Uses Badge DS atom for counts.
const { useState: useSidebarState } = React;

const DEFAULT_SIDEBAR_ITEMS = [
  { id: 'multas', label: 'Multas', badge: '6.766', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>
    </svg>
  )},
  { id: 'veiculos', label: 'Veículos', badge: null, icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
    </svg>
  )},
  { id: 'motoristas', label: 'Motoristas', badge: null, icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  )},
];

function Sidebar({ items = DEFAULT_SIDEBAR_ITEMS, activeId = 'multas', onSelect }) {
  const [expanded, setExpanded] = useSidebarState(false);
  return (
    <aside
      className={`frota-sidebar ${expanded ? 'expanded' : ''}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <nav className="frota-sidebar__nav">
        {items.map(item => {
          const active = item.id === activeId;
          return (
            <button
              key={item.id}
              className={`frota-sidebar__item ${active ? 'active' : ''}`}
              onClick={() => onSelect?.(item.id)}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
            >
              <span className="frota-sidebar__icon">{item.icon}</span>
              <span className="frota-sidebar__label">{item.label}</span>
              {item.badge && expanded ? (
                <Tag color={active ? 'primary' : 'neutral'} accent={active ? 'on' : 'off'}>{item.badge}</Tag>
              ) : null}
            </button>
          );
        })}
      </nav>
      <div className="frota-sidebar__footer">
        <button className="frota-sidebar__item" aria-label="Sair">
          <span className="frota-sidebar__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </span>
          <span className="frota-sidebar__label">Sair</span>
        </button>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
