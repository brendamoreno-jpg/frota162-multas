// Header.jsx — Frota 162 top bar (desktop)
// Mirrors frota-ds/src/components/organisms/header/Header.scss
const { useState: useHeaderState, useEffect: useHeaderEffect, useRef: useHeaderRef } = React;

// --- Icons ---
const IconEye = () =>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
  </svg>;

const IconEyeOff = () =>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>;

const IconBell = () =>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>;

const IconChevronDown = () =>
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>;


const DEFAULT_USER = { initials: 'BH', name: 'Brenda Helen', email: 'brenda@frota162.com.br' };

function Header({ user = DEFAULT_USER, balanceValue = 'R$ 12.847,30', notifications = 3 }) {
  const [showBalance, setShowBalance] = useHeaderState(false);
  const [open, setOpen] = useHeaderState(false);
  const dropRef = useHeaderRef(null);

  useHeaderEffect(() => {
    if (!open) return;
    const onDoc = (e) => {if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false);};
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <header className="frota-header">
      <div className="frota-header__desktop">
        {/* LEFT — logo */}
        <div className="frota-header__logo">
          <img src="assets/frota-logo-official.svg" alt="Frota 162" />
        </div>

        {/* CENTER — promotional banner */}
        <div className="frota-header__banner">
          <Tag color="primary" accent="on">Plano Pro</Tag>
          <span>Renovação em 23 dias · Aumente seu limite</span>
        </div>

        {/* RIGHT — actions */}
        <div className="frota-header__actions">
          <button className="frota-header__balance" onClick={() => setShowBalance((v) => !v)} aria-label="Alternar visibilidade do saldo" style={{ borderRadius: "8px", border: "1.5px solid rgb(24, 24, 24)" }}>
            <div className="frota-header__balance-content">
              <span className="frota-header__balance-label">Saldo</span>
              <span className="frota-header__balance-value">{showBalance ? balanceValue : 'R$ •••••'}</span>
            </div>
            <span className="frota-header__balance-icon">
              {showBalance ? <IconEye /> : <IconEyeOff />}
            </span>
          </button>

          <div className="frota-header__divider" />

          <div className="frota-header__notification">
            <Badge count={notifications} color="error" position="top-right" max={99}>
              <IconButton variant="ghost" size="medium" color="primary" ariaLabel="Notificações">
                <IconBell />
              </IconButton>
            </Badge>
          </div>

          <div className="frota-header__dropdown-wrapper" ref={dropRef}>
            <button className="frota-header__account-trigger" onClick={() => setOpen((v) => !v)}>
              <Avatar initials={user.initials} size="medium" />
              <span>Minha conta</span>
              <IconChevronDown />
            </button>
            {open &&
            <div className="frota-header__dropdown" role="menu">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar initials={user.initials} size="large" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--color-neutral-1000)' }}>{user.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-neutral-700)' }}>{user.email}</div>
                  </div>
                </div>
                <hr className="frota-header__dropdown-divider" />
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
                  <li><button className="frota-dropdown-menu__item" onClick={() => setOpen(false)}>Minha empresa</button></li>
                  <li><button className="frota-dropdown-menu__item" onClick={() => setOpen(false)}>Usuários</button></li>
                  <li><button className="frota-dropdown-menu__item" onClick={() => setOpen(false)}>Configurações</button></li>
                </ul>
                <hr className="frota-header__dropdown-divider" />
                <button className="frota-dropdown-menu__item frota-dropdown-menu__item--danger" onClick={() => setOpen(false)}>Sair</button>
              </div>
            }
          </div>
        </div>
      </div>
    </header>);

}

window.Header = Header;