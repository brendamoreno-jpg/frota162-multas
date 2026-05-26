// InfracoesScreenV2.jsx — variante da tela de Multas com a faixa lateral dos
// cards refletindo o estado de pendência (precisa ação, em andamento, alerta,
// concluído, inativo) em vez do tipo (notificação vs penalidade).
//
// Reutiliza inteiramente o InfracoesScreen base; a única diferença é o valor
// da prop `stripeMode`. Mantenha em sincronia com o bloco equivalente em
// index.html (procure por `window.InfracoesScreenV2`).
function InfracoesScreenV2(props) {
  return <InfracoesScreen {...props} stripeMode="status" />;
}

window.InfracoesScreenV2 = InfracoesScreenV2;
