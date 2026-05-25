// AITListState.jsx — Estados da listagem de AITs — Frota 162
// Props: state = 'loading' | 'empty' | 'empty_filtered' | 'error' | 'success'
//        children = conteúdo da lista (state === 'success')
//        onClearFilters, onRetry

const { useState: useAITState } = React;

// ─── Shimmer keyframe (injetado uma vez) ─────────────────────────────────────
(function injectShimmer() {
  if (document.getElementById('ait-shimmer-style')) return;
  const style = document.createElement('style');
  style.id = 'ait-shimmer-style';
  style.textContent = `
    @keyframes ait-shimmer {
      0%   { background-position: -800px 0; }
      100% { background-position:  800px 0; }
    }
    .ait-skeleton-cell {
      height: 12px;
      border-radius: 4px;
      background: linear-gradient(
        90deg,
        var(--color-neutral-300) 25%,
        var(--color-neutral-200) 50%,
        var(--color-neutral-300) 75%
      );
      background-size: 800px 100%;
      animation: ait-shimmer 1.4s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
})();

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard({ index }) {
  // Widths alternados para ritmo visual
  const w = [
    { badge: 90, title: 180, sub: 120, meta: [68, 110, 90, 72, 60] },
    { badge: 80, title: 220, sub: 140, meta: [68, 90, 100, 60, 52] },
    { badge: 110, title: 160, sub: 100, meta: [68, 130, 80, 88, 64] },
  ][index % 3];

  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      border: '1px solid var(--color-neutral-300)',
      borderRadius: 8,
      padding: '12px 16px',
    }}>
      {/* Linha 1: badge + título */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          <div className="ait-skeleton-cell" style={{ width: w.badge, height: 22, borderRadius: 20 }} />
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div className="ait-skeleton-cell" style={{ width: w.title }} />
          <div className="ait-skeleton-cell" style={{ width: w.sub }} />
        </div>
      </div>
      {/* Linha 2: metadados */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
          {w.meta.map((mw, i) => (
            <div key={i} className="ait-skeleton-cell" style={{ width: mw }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[0,1,2].map(i => (
            <div key={i} className="ait-skeleton-cell" style={{ width: 28, height: 28, borderRadius: 6 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Loading state ────────────────────────────────────────────────────────────
function LoadingState() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {Array.from({ length: 15 }, (_, i) => (
        <SkeletonCard key={i} index={i} />
      ))}
    </div>
  );
}

// ─── Ícone documento + lupa ───────────────────────────────────────────────────
const IconDocSearch = ({ color = 'var(--color-neutral-300)' }) => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <rect x="14" y="8" width="40" height="52" rx="4" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="22" y1="22" x2="46" y2="22" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="22" y1="31" x2="46" y2="31" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="22" y1="40" x2="36" y2="40" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="54" cy="57" r="12" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="63" y1="66" x2="70" y2="73" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

// ─── Ícone alerta ─────────────────────────────────────────────────────────────
const IconAlertCircle = ({ color = 'var(--color-error-300)' }) => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="32" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="40" y1="24" x2="40" y2="44" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    <circle cx="40" cy="54" r="2.5" fill={color}/>
  </svg>
);

// ─── Empty / Error base ───────────────────────────────────────────────────────
function StateLayout({ icon, title, titleColor, subtitle, action }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'flex-start', paddingTop: 80,
      textAlign: 'center', padding: '80px 24px 40px',
      fontFamily: 'var(--font-family-primary)',
    }}>
      <div style={{ marginBottom: 20 }}>{icon}</div>
      <div style={{
        fontSize: 18, fontWeight: 700,
        color: titleColor || 'var(--color-neutral-700)',
        marginBottom: 8, lineHeight: 1.3,
      }}>{title}</div>
      <div style={{
        fontSize: 14, color: 'var(--color-neutral-600)',
        marginBottom: action ? 24 : 0, lineHeight: 1.5, maxWidth: 360,
      }}>{subtitle}</div>
      {action}
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
function AITListState({ state = 'success', children, onClearFilters, onRetry }) {
  if (state === 'loading') {
    return <LoadingState />;
  }

  if (state === 'empty') {
    return (
      <StateLayout
        icon={<IconDocSearch />}
        title="Nenhuma infração encontrada"
        subtitle="Sua frota não tem infrações registradas."
      />
    );
  }

  if (state === 'empty_filtered') {
    return (
      <StateLayout
        icon={<IconDocSearch />}
        title="Nenhum resultado para os filtros aplicados"
        subtitle="Tente remover ou ajustar os filtros."
        action={
          <button
            onClick={onClearFilters}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '0 16px', height: 36,
              border: '1px solid var(--color-neutral-400)',
              borderRadius: 6, background: 'var(--color-neutral-100)',
              fontFamily: 'var(--font-family-primary)',
              fontSize: 13, fontWeight: 600,
              color: 'var(--color-neutral-900)', cursor: 'pointer',
              transition: 'all .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary-500)'; e.currentTarget.style.color = 'var(--color-primary-500)'; e.currentTarget.style.background = 'var(--color-primary-200)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-neutral-400)'; e.currentTarget.style.color = 'var(--color-neutral-900)'; e.currentTarget.style.background = 'var(--color-neutral-100)'; }}
          >
            Limpar filtros
          </button>
        }
      />
    );
  }

  if (state === 'error') {
    return (
      <StateLayout
        icon={<IconAlertCircle />}
        title="Não foi possível carregar as infrações"
        titleColor="var(--color-error-700)"
        subtitle="Tente novamente ou entre em contato com o suporte."
        action={
          <button
            onClick={onRetry}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '0 16px', height: 36,
              border: '1px solid var(--color-primary-500)',
              borderRadius: 6, background: 'var(--color-primary-500)',
              fontFamily: 'var(--font-family-primary)',
              fontSize: 13, fontWeight: 600, color: '#fff',
              cursor: 'pointer', transition: 'all .15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-600)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary-500)'}
          >
            Tentar novamente
          </button>
        }
      />
    );
  }

  // success — renderiza children (lista normal)
  return children || null;
}

window.AITListState = AITListState;
