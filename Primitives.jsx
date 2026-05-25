// Primitives.jsx — Frota 162 Portal UI kit
// Cada componente espelha o SCSS correspondente em frota-ds/src/components/.

function Button({ variant = 'primary', size = 'medium', children, startIcon, endIcon, onClick, disabled, fullWidth, type = 'button' }) {
  return (
    <button
      type={type}
      className={`frota-button frota-button--${variant} frota-button--${size} ${fullWidth ? 'frota-button--full' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="frota-button__icon">{startIcon}</span>}
      <span>{children}</span>
      {endIcon && <span className="frota-button__icon">{endIcon}</span>}
    </button>
  );
}

// IconButton — atoms/iconButton
// variant: 'rounded' | 'outlined' | 'ghost'    size: 'small' | 'medium'
function IconButton({ variant = 'ghost', size = 'medium', color = 'neutral', onClick, children, disabled, ariaLabel }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className={`frota-icon-button frota-icon-button--${variant} frota-icon-button--${size} frota-icon-button--${color}`}
    >
      <span className="frota-icon-button__icon">{children}</span>
    </button>
  );
}

// Avatar — atoms/avatar
// variant: 'initials' | 'fallback'   size: 'small' | 'medium' | 'large'
function Avatar({ initials, size = 'medium', variant = 'initials' }) {
  return (
    <span className={`frota-avatar frota-avatar--${size} frota-avatar--${variant}`}>
      {initials}
    </span>
  );
}

// Badge wrapper — atoms/badge (wrapper exposes its `__indicator` at `position`)
function Badge({ children, count, color = 'primary', dot = false, position = 'top-right', invisible = false, max = 99 }) {
  const showIndicator = !invisible && (dot || (count !== undefined && count !== null));
  const display = count > max ? `${max}+` : count;
  return (
    <span className="frota-badge">
      {children}
      {showIndicator && (
        <span className={`frota-badge__indicator frota-badge__indicator--${color} frota-badge__indicator--${position} ${dot ? 'frota-badge__indicator--dot' : ''}`}>
          {!dot && display}
        </span>
      )}
    </span>
  );
}

// Tag — atoms/tag — UPPERCASE pill, for status labels/categories
// color: primary | secondary | neutral | info | success | warning | error
// accent: 'on' (filled) | 'off' (soft)
function Tag({ children, color = 'neutral', accent = 'off' }) {
  return (
    <span className={`frota-tag frota-tag--${color} frota-tag--accent-${accent}`}>
      <span className="frota-tag__label">{children}</span>
    </span>
  );
}

// Chip — atoms/chip — rounded-sm, border, for filters/interactive selects
// color: neutral | primary | primary-dark | red | red-dark | yellow | blue | green
function Chip({ children, color = 'neutral', selected = false, clickable = false, onClick, icon, disabled }) {
  const cls = [
    'frota-chip',
    `frota-chip--${color}`,
    selected && 'frota-chip--selected',
    clickable && 'frota-chip--clickable',
    disabled && 'frota-chip--disabled',
  ].filter(Boolean).join(' ');
  return (
    <span className={cls} onClick={clickable && !disabled ? onClick : undefined} role={clickable ? 'button' : undefined}>
      {icon && <span className="frota-chip__icon">{icon}</span>}
      <span className="frota-chip__label">{children}</span>
    </span>
  );
}

// Input — molecules/input
function Input({ value, defaultValue, onChange, placeholder, startIcon, endIcon, label, type = 'text', readOnly }) {
  return (
    <div className="frota-input-wrapper">
      {label && <label className="frota-input__label">{label}</label>}
      <div className="frota-input__control-container">
        {startIcon && <span className="frota-input__icon frota-input__icon--start">{startIcon}</span>}
        <input
          type={type}
          className="frota-input"
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
        />
        {endIcon && <span className="frota-input__icon frota-input__icon--end">{endIcon}</span>}
      </div>
    </div>
  );
}

// Tabs — atoms/tabs (underline style, NOT pill)
function Tabs({ items, activeId, onSelect }) {
  return (
    <div className="frota-tabs" role="tablist">
      {items.map(item => (
        <button
          key={item.id}
          role="tab"
          aria-selected={item.id === activeId}
          onClick={() => onSelect?.(item.id)}
          className={`frota-tabs__tab ${item.id === activeId ? 'frota-tabs__tab--active' : ''}`}
        >
          <span className="frota-tabs__tab-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

// KPI card — molecules/card with `__kpi` variant
function KpiCard({ label, value, subtitle, subtitleDir, icon }) {
  return (
    <div className="frota-card">
      <div className="frota-card__kpi">
        <div className="frota-card__kpi-top">
          {icon && <span className="frota-card__kpi-icon">{icon}</span>}
          <span className="frota-card__kpi-label">{label}</span>
        </div>
        <div className="frota-card__kpi-value">{value}</div>
        {subtitle && (
          <div className={`frota-card__kpi-subtitle ${subtitleDir || ''}`}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

// Generic Card wrapper
function Card({ title, description, children, footer }) {
  return (
    <div className="frota-card">
      {(title || description) && (
        <div className="frota-card__header">
          {title && <h3 className="frota-card__title">{title}</h3>}
          {description && <p className="frota-card__description">{description}</p>}
        </div>
      )}
      {children && <div className="frota-card__content">{children}</div>}
      {footer && <div className="frota-card__footer">{footer}</div>}
    </div>
  );
}

// ---------- Helpers ----------
function initialsOf(name) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

// Status → chip color map (DS)
const STATUS_CHIP = {
  'Em rota':      'green',
  'Abastecendo':  'blue',
  'Parado':       'neutral',
  'Manutenção':   'yellow',
  'Alerta':       'red',
};
function StatusChip({ status, selected = true }) {
  const color = STATUS_CHIP[status] || 'neutral';
  return <Chip color={color} selected={selected}>{status}</Chip>;
}

Object.assign(window, {
  Button, IconButton, Avatar, Badge, Tag, Chip, Input, Tabs,
  KpiCard, Card, StatusChip, initialsOf,
});
