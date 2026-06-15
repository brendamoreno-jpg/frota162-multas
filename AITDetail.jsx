// AITDetail.jsx — Tela de detalhe do AIT — Frota 162
// Design: Figma node 1:6767
(function() { // IIFE wrapper — garante execução correta após compilação Babel

const { useState: useDetState } = React;

// ─── Icons ────────────────────────────────────────────────────────────────────
const DetIconArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
);
const DetIconPrint = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
);
const DetIconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);
const DetIconMoreVert = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
);
const DetIconDoc = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
);
const DetIconBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);
const DetIconInfo = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);
const DetIconChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
);
const DetIconExternalLink = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);
const DetIconMapPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const DetIconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const DetIconClock = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const DetIconRobot = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><path d="M8 15h.01"/><path d="M16 15h.01"/></svg>
);
const DetIconSmartphone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
);
const DetIconMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const DetIconShield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
);
const DetIconUploadCloud = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>
);
const DetIconSend = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);
const DetIconXCircle = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
const DetIconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const DetIconAlertTriangle = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);
const DetIconCar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
);
const DetIconDollar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
const DetIconRefresh = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
);
const DetIconPaperclip = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
);
const DetIconLinkOut = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);
const DetIconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);
const DetIconTrash = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
);
const DetIconPen = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);
const DetIconBarcode = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5v14"/><path d="M8 5v14"/><path d="M12 5v14"/><path d="M17 5v14"/><path d="M21 5v14"/></svg>
);
const DetIconLock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const DetIconDots = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
);
const DetIconMessageSquare = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);

// ─── Empty state reutilizável para blocos do detalhe ──────────────────────────
function DetBlockEmptyState({ title, description }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '32px 16px', textAlign: 'center', gap: 8,
    }}>
      <span style={{
        fontSize: 16, fontWeight: 700, color: 'var(--color-neutral-900)',
        fontFamily: 'var(--font-family-primary)',
      }}>{title}</span>
      <span style={{
        fontSize: 14, fontWeight: 400, color: 'var(--color-neutral-600)',
        fontFamily: 'var(--font-family-primary)', maxWidth: 420,
      }}>{description}</span>
    </div>
  );
}

// ─── EventIcon ────────────────────────────────────────────────────────────────
function EventIcon({ type, size = 'sm' }) {
  const map = {
    success:     <DetIconCheck />,
    warning:     <DetIconAlertTriangle />,
    error:       <DetIconXCircle />,
    robot:       <DetIconRobot />,
    cdt:         <DetIconSmartphone />,
    info_active: <DetIconSend />,
    upload:      <DetIconUploadCloud />,
    check:       <DetIconShield />,
    info:        <DetIconInfo />,
    past:        <DetIconDoc />,
    mail:        <DetIconMail />,
    user:        <DetIconUser />,
    pay_clock:   <DetIconClock />,
    pay_dollar:  <DetIconDollar />,
  };
  return map[type] || <DetIconInfo />;
}

// ─── Mock SNE ─────────────────────────────────────────────────────────────────
const MOCK_SNE = {
  indicacaoTipo: 'sne',
  statusVariant: 'condutor_indicado',
  codigoInfracao: '73662',
  nomeInfracao: 'Avançar Sinal Vermelho',
  dataInfracao: '15/03/2025',
  horaInfracao: '09:15',
  orgao: 'DETRAN-SP',
  local: 'Av. Paulista, 1578',
  uf: 'SP',
  valor: 'R$ 293,47',
  valorDesconto: 'R$ 176,08',
  gravidade: 'Gravíssima',
  placa: 'TES8G37',
  veiculo: 'Volkswagen Gol 2021',
  prazoIndicacao: '14/06/2025',
  prazoIndicacaoDias: 0,
  prazoOrgao: '28/06/2025',
  condutor: { nome: 'Carlos Eduardo Silva', cpf: '123.456.789-00' },
  // campos da aba Informações
  aitOriginal: null,
  dataCriacao: '15/03/2025',
  pontos: 7,
  multiplicador: null,
  tipo: 'Notificação',
  enderecoCompleto: 'Av. Paulista, 1578',
  cidade: 'São Paulo',
  bairro: 'Bela Vista',
  dataNotificacao: '20/03/2025',
  dataEmissaoNotificacao: '18/03/2025',
  infrator: 'Condutor',
  condutaAdequada: 'Não',
  suspendeCNH: 'Sim',
  infracaoTratada: 'Não',
  recorrivel: 'Sim',
  renainf: 'Não',
  // dados do veículo
  renavam: '12345678901112',
  empresa: 'FROTA 162 LTDA',
  // dados do pagamento
  valorPago: null,
  valorDescontadoCondutor: null,
  dataVencimento: '28/06/2025',
  dataPagamento: null,
  centroCusto: null,
  pago: 'Não',
  statusBoletoSne: 'Não solicitado',
  descontoCondutorAplicado: null,
  // condutor responsável
  cnhCondutor: '12345678-9',
  cedulaCnh: null,
  rgCondutor: '32.453.534-3',
  dataIndicacao2: '05/05/2026',
  // multas relacionadas e anexos
  multasRelacionadas: [],
  anexos: [
    { tipo: 'Documento da multa', nome: 'espelho-ait-SP04127832.pdf', dataInclusao: '15/03/2025', vencimento: '14/06/2025' },
  ],
  timeline: [
    {
      id: 'condutor_indicado', type: 'success',
      date: '18/05/2026 09:47',
      title: 'Condutor indicado',
      description: 'Carlos Eduardo Silva aceitou a indicação via Carteira Digital de Trânsito (CDT).',
      badge: { label: 'CONDUTOR INDICADO', bg: 'var(--color-success-200)', color: 'var(--color-success-800)' },
    },
    {
      id: 'lembrete_1d', type: 'mail',
      date: '17/05/2026',
      title: 'Lembrete enviado (1 dia antes do prazo)',
      description: 'E-mail automático enviado ao condutor com link direto para a CDT.',
    },
    {
      id: 'lembrete_3d', type: 'mail',
      date: '15/05/2026',
      title: 'Lembrete enviado (3 dias antes do prazo)',
      description: 'E-mail automático enviado ao condutor.',
    },
    {
      id: 'lembrete_7d', type: 'mail',
      date: '11/05/2026',
      title: 'Lembrete enviado (7 dias antes do prazo)',
      description: 'E-mail automático enviado ao condutor.',
    },
    {
      id: 'aguardando_cdt', type: 'cdt',
      date: '05/05/2026 14:26',
      title: 'Aguardando resposta do condutor na CDT',
      description: 'Indicação disponível na Carteira Digital de Trânsito. O condutor deve aceitar ou recusar.',
      badge: { label: 'AGUARDANDO ACEITE', bg: 'var(--color-information-200)', color: 'var(--color-information-800)' },
      details: ['Prazo para aceite: 18/05/2026', 'Gestor pode cancelar a indicação nessa fase'],
    },
    {
      id: 'cpf_enviado', type: 'check',
      date: '05/05/2026 14:23',
      title: 'Indicação via CPF enviada com sucesso',
      description: 'A indicação foi processada e enviada ao órgão autuador com sucesso.',
      details: ['Condutor: CPF 123.456.789-00'],
    },
    {
      id: 'condutor_vinculado', type: 'user',
      date: '05/05/2026 14:20',
      title: 'Condutor vinculado via CPF',
      description: 'Gestor informou CPF 123.456.789-00 + AIT SP04127832. Nenhum documento necessário.',
    },
    {
      id: 'elegibilidade', type: 'check',
      date: '05/05/2026 14:18',
      title: 'Empresa habilitada para indicação via CPF',
      description: 'Notificação elegível para indicação online ✓',
    },
    {
      id: 'recebida', type: 'past',
      date: '15/03/2025',
      title: 'Notificação recebida',
      description: 'AIT SP04127832  ·  73662 — Avançar Sinal Vermelho  ·  DETRAN-SP',
      action: { label: 'Baixar espelho' },
    },
  ],
};

// ─── Mock Formulário ──────────────────────────────────────────────────────────
const MOCK_FORMULARIO = {
  indicacaoTipo: 'formulario',
  statusVariant: 'enviada_orgao',
  codigoInfracao: '68400',
  nomeInfracao: 'Dirigir em Velocidade Acima do Permitido',
  dataInfracao: '12/02/2025',
  horaInfracao: '11:52',
  orgao: 'DETRAN-RJ',
  local: 'Via Dutra - KM 188',
  uf: 'RJ',
  valor: 'R$ 195,23',
  valorDesconto: 'R$ 117,14',
  gravidade: 'Grave',
  placa: 'FZJ0F53',
  veiculo: 'Mercedes-Benz Actros 2020',
  prazoIndicacao: '24/06/2025',
  prazoIndicacaoDias: 0,
  prazoOrgao: '08/07/2025',
  condutor: null,
  // campos da aba Informações
  aitOriginal: null,
  dataCriacao: '12/02/2025',
  pontos: 5,
  multiplicador: null,
  tipo: 'Notificação',
  enderecoCompleto: 'Via Dutra, KM 188',
  cidade: 'Volta Redonda',
  bairro: '-',
  dataNotificacao: '20/02/2025',
  dataEmissaoNotificacao: '18/02/2025',
  infrator: 'Condutor',
  condutaAdequada: 'Não',
  suspendeCNH: 'Não',
  infracaoTratada: 'Não',
  recorrivel: 'Sim',
  renainf: 'Não',
  renavam: '98765432100001',
  empresa: 'FROTA 162 LTDA',
  valorPago: null,
  valorDescontadoCondutor: null,
  dataVencimento: '08/07/2025',
  dataPagamento: null,
  centroCusto: null,
  pago: 'Não',
  statusBoletoSne: null,
  descontoCondutorAplicado: null,
  cnhCondutor: null,
  cedulaCnh: null,
  rgCondutor: null,
  dataIndicacao2: null,
  multasRelacionadas: [],
  anexos: [
    { tipo: 'Documento da multa', nome: 'espelho-ait-RJ01985432.pdf', dataInclusao: '12/02/2025', vencimento: '24/06/2025' },
    { tipo: 'Formulário IC', nome: 'formulario-ic-assinado.pdf', dataInclusao: '13/05/2026', vencimento: '24/06/2025' },
    { tipo: 'CNH', nome: 'cnh-condutor-valida.pdf', dataInclusao: '16/05/2026', vencimento: null },
  ],
  timeline: [
    {
      id: 'enviada_orgao', type: 'info_active',
      date: '17/05/2026 16:30',
      title: 'Documentos enviados ao DETRAN-RJ',
      description: 'Documentos encaminhados ao órgão autuador para processamento da indicação.',
      badge: { label: 'ENVIADA AO ÓRGÃO', bg: 'var(--color-information-200)', color: 'var(--color-information-800)' },
    },
    {
      id: 'docs_aprovados', type: 'success',
      date: '17/05/2026 15:50',
      title: 'Documentos aprovados',
      description: 'CNH atualizada e demais documentos validados. Indicação liberada para envio ao órgão.',
    },
    {
      id: 'docs_corrigidos', type: 'upload',
      date: '16/05/2026 10:15',
      title: 'Documentos corrigidos e reenviados pelo gestor',
      description: 'Gestor anexou a CNH atualizada e resubmeteu o pacote de documentos.',
      details: ['Formulário IC assinado pelo condutor', 'CNH válida até 03/2028 ✓', 'Contrato Social'],
    },
    {
      id: 'docs_incorretos', type: 'warning',
      date: '14/05/2026 09:22',
      title: 'Documentos incorretos — gestor notificado',
      description: 'CNH enviada estava vencida (vencimento 05/2023). Gestor notificado por e-mail para corrigir e reenviar.',
      badge: { label: 'DOCUMENTOS INCORRETOS', bg: 'var(--color-warning-200)', color: 'var(--color-warning-800)' },
      details: ['Problema: CNH com vencimento expirado (05/2023)', 'Ação necessária: reenviar CNH válida'],
    },
    {
      id: 'em_analise', type: 'info',
      date: '13/05/2026 14:05',
      title: 'Documentos em análise',
      description: 'Documentos recebidos e em verificação de conformidade.',
      badge: { label: 'EM PROCESSAMENTO', bg: 'var(--color-neutral-300)', color: 'var(--color-neutral-800)' },
    },
    {
      id: 'upload_docs', type: 'upload',
      date: '13/05/2026 13:48',
      title: 'Documentos anexados pelo gestor',
      description: 'Gestor realizou upload dos documentos obrigatórios para indicação via formulário.',
      details: ['Formulário IC assinado pelo condutor', 'CNH (vencimento 05/2023 — inválida)', 'Contrato Social / Termo de Responsabilidade'],
    },
    {
      id: 'elegibilidade', type: 'check',
      date: '13/05/2026 13:45',
      title: 'Dentro do prazo para indicação por formulário',
      description: 'Verificado: dentro dos 5 dias internos de prazo ✓  ·  Indicação via formulário habilitada.',
    },
    {
      id: 'recebida', type: 'past',
      date: '12/02/2025',
      title: 'Notificação recebida',
      description: 'AIT RJ01985432  ·  68400 — Dirigir em Velocidade Acima do Permitido  ·  DETRAN-RJ',
      action: { label: 'Baixar espelho' },
    },
  ],
};

// ─── Mock padrão ──────────────────────────────────────────────────────────────
const MOCK_DEFAULT = {
  indicacaoTipo: null,
  statusVariant: 'indique_agora',
  codigoInfracao: '55680',
  nomeInfracao: 'Excesso de velocidade superior a 50% do limite permitido',
  dataInfracao: '10/10/2025',
  horaInfracao: '16:41',
  orgao: 'DEPARTAMENTO DE POLÍCIA RODOVIÁRIA FEDERAL',
  local: 'BR 116 - KM 234.10 - C',
  uf: 'GO',
  valor: 'R$ 130,16',
  valorDesconto: 'R$ 78,10',
  gravidade: 'Gravíssima',
  placa: 'ABC-1D23',
  veiculo: 'Scania R 440 2022',
  prazoIndicacao: '26/08/2026',
  prazoIndicacaoDias: 12,
  prazoOrgao: '15/09/2026',
  condutor: null,
  // campos da aba Informações
  aitOriginal: null,
  dataCriacao: '10/10/2025',
  pontos: 7,
  multiplicador: null,
  tipo: 'Notificação',
  enderecoCompleto: 'BR 116 - KM 234.10 - C',
  cidade: 'Goiânia',
  bairro: '-',
  dataNotificacao: '20/10/2025',
  dataEmissaoNotificacao: '18/10/2025',
  infrator: 'Condutor',
  condutaAdequada: 'Não',
  suspendeCNH: 'Não',
  infracaoTratada: 'Não',
  recorrivel: 'Sim',
  renainf: 'Não',
  renavam: '11223344556677',
  empresa: 'FROTA 162 LTDA',
  valorPago: null,
  valorDescontadoCondutor: null,
  dataVencimento: '15/09/2026',
  dataPagamento: null,
  centroCusto: null,
  pago: 'Não',
  statusBoletoSne: 'BOLETO DISPONÍVEL',
  descontoCondutorAplicado: null,
  cnhCondutor: null,
  cedulaCnh: null,
  rgCondutor: null,
  dataIndicacao2: null,
  multasRelacionadas: [],
  anexos: [
    { tipo: 'Documento da multa', nome: 'espelho-ait-ABC-1D23.pdf', dataInclusao: '10/10/2025', vencimento: '26/08/2026' },
  ],
  timeline: [
    {
      id: 'prazo', type: 'info_active',
      date: '',
      title: 'Vencimento da indicação na plataforma',
      description: 'Vence em 12 dias  ·  Prazo: 26/08/2026',
    },
    {
      id: 'boleto', type: 'success',
      date: '',
      title: 'Solicite o boleto de 40% de desconto',
      description: 'Pague R$ 78,10 no lugar de R$ 130,16. Válido até 26/08/2026.',
    },
    {
      id: 'indicar', type: 'user',
      date: '',
      title: 'Indicar condutor',
      description: 'Indique o condutor agora pela plataforma, de forma simplificada, via CPF ou por meio do Formulário de Indicação.',
      action: { label: 'Indicar condutor' },
    },
    {
      id: 'recebida', type: 'past',
      date: '10/10/2025',
      title: 'Notificação recebida',
      description: 'AIT ABC-1D23  ·  55680 — Excesso de velocidade  ·  DEPARTAMENTO DE POLÍCIA RODOVIÁRIA FEDERAL',
      action: { label: 'Baixar espelho' },
    },
  ],
};

// ─── Mock Pagamento ───────────────────────────────────────────────────────────
const MOCK_PAGAMENTO = {
  indicacaoTipo: 'sne',
  statusVariant: 'pago',
  codigoInfracao: '55500',
  nomeInfracao: 'Não Usar Cinto de Segurança',
  dataInfracao: '15/03/2025',
  horaInfracao: '14:30',
  orgao: 'DETRAN-SP',
  local: 'Av. Paulista, 3610',
  uf: 'SP',
  valor: 'R$ 88,38',
  valorDesconto: 'R$ 53,03',
  gravidade: 'Grave',
  placa: 'EDC3R67',
  veiculo: 'Volkswagen Gol 2021',
  prazoIndicacao: '05/07/2026',
  prazoIndicacaoDias: 0,
  prazoOrgao: '20/07/2026',
  condutor: 'Pedro Alves Martins',
  aitOriginal: null,
  dataCriacao: '15/03/2025',
  pontos: 5,
  multiplicador: null,
  tipo: 'Notificação',
  enderecoCompleto: 'Av. Paulista, 3610',
  cidade: 'São Paulo',
  bairro: 'Bela Vista',
  dataNotificacao: '25/03/2025',
  dataEmissaoNotificacao: '23/03/2025',
  infrator: 'Condutor',
  condutaAdequada: 'Não',
  suspendeCNH: 'Não',
  infracaoTratada: 'Sim',
  recorrivel: 'Sim',
  renainf: 'Não',
  renavam: '99887766554433',
  empresa: 'FROTA 162 LTDA',
  valorPago: 'R$ 88,38',
  valorDescontadoCondutor: null,
  dataVencimento: '26/08/2026',
  dataPagamento: '26/08/2026',
  centroCusto: 'Operações SP',
  pago: 'Sim',
  statusBoletoSne: 'PAGO',
  descontoCondutorAplicado: null,
  cnhCondutor: '12345678900',
  cedulaCnh: '12345678',
  rgCondutor: '44.555.666-7',
  dataIndicacao2: '16/07/2026',
  multasRelacionadas: [],
  anexos: [
    { tipo: 'Documento da multa',       nome: 'espelho-ait-SP11000003.pdf',    dataInclusao: '15/03/2025', vencimento: '26/08/2026' },
    { tipo: 'Comprovante de pagamento', nome: 'comprovante-SP11000003.pdf',    dataInclusao: '26/08/2026', vencimento: null },
  ],
  timeline: [
    { id: 'dl_ago',         type: 'date_label',  title: '26/08/2026' },
    { id: 'venc_pagamento', type: 'info',
      title: 'Vencimento do pagamento',
      description: 'Vence hoje · Prazo: 26/08/2026' },
    { id: 'multa_paga',     type: 'success',
      date: '26/08/2026 10:14',
      title: 'Multa paga com sucesso!',
      description: 'O pagamento da multa foi identificado com sucesso.' },
    { id: 'pgto_proc',      type: 'pay_clock',
      date: '26/08/2026 09:58',
      title: 'Pagamento em processamento',
      description: 'Pagamento em andamento. Em breve será confirmado.' },
    { id: 'dl_18jul',       type: 'date_label',  title: '18/07/2026' },
    { id: 'pgto_aguard',    type: 'pay_clock',
      date: '18/07/2026 14:32',
      title: 'Pagamento aguardando aprovação',
      description: 'O pagamento está aguardando aprovação do responsável pelos pagamentos da sua empresa.' },
    { id: 'dl_17jul',       type: 'date_label',  title: '17/07/2026' },
    { id: 'multa_disp',     type: 'pay_dollar',
      date: '17/07/2026',
      title: 'Sua multa está disponível para pagamento',
      description: 'Pague sua multa agora pela plataforma ou emita o boleto para pagamento externo.',
      actions: [
        { label: 'Baixar boleto' },
        { label: 'Pague agora', primary: true },
      ] },
    { id: 'venc_indic',     type: 'info',
      title: 'Vencimento da indicação na plataforma',
      description: '' },
    { id: 'dl_16jul',       type: 'date_label',  title: '16/07/2026' },
    { id: 'indic_ok',       type: 'success',
      date: '16/07/2026 11:30',
      title: 'Indicação de condutor foi concluída com sucesso',
      description: 'A notificação agora passa a ser de penalidade e a responsabilidade foi transferida para o condutor indicado.' },
    { id: 'dl_sne',         type: 'date_label',  title: '05/07/2026' },
    { id: 'cdt_aceite',     type: 'cdt',
      date: '05/07/2026 09:47',
      title: 'Condutor aceitou via CDT',
      description: 'Pedro Alves Martins aceitou a indicação via Carteira Digital de Trânsito (CDT).',
      badge: { label: 'CONDUTOR INDICADO', bg: 'var(--color-success-200)', color: 'var(--color-success-800)' } },
    { id: 'cpf_enviado',    type: 'check',
      date: '01/07/2026 14:23',
      title: 'Indicação via CPF enviada com sucesso',
      description: 'A indicação foi processada e enviada ao órgão autuador com sucesso.',
      details: ['Condutor: CPF 987.654.321-00'] },
    { id: 'condutor_vinc',  type: 'user',
      date: '01/07/2026 14:20',
      title: 'Condutor vinculado via CPF',
      description: 'Gestor informou CPF 987.654.321-00 + AIT SP11000003. Nenhum documento necessário.' },
    { id: 'dl_not',         type: 'date_label',  title: '15/03/2025' },
    { id: 'recebida',       type: 'past',
      date: '15/03/2025',
      title: 'Notificação recebida',
      description: 'AIT SP11000003 · 55500 — Não Usar Cinto de Segurança · DETRAN-SP',
      action: { label: 'Baixar espelho' } },
  ],
};

// ─── Mock Indique Agora ───────────────────────────────────────────────────────
const MOCK_INDIQUE_AGORA = {
  indicacaoTipo: null,
  statusVariant: 'indique_agora',
  codigoInfracao: '60501',
  nomeInfracao: 'Parar sobre a Faixa de Pedestres',
  dataInfracao: '15/03/2025',
  horaInfracao: '08:30',
  orgao: 'CET-SP',
  local: 'Rua da Consolação, 900',
  uf: 'SP',
  valor: 'R$ 195,23',
  valorDesconto: 'R$ 117,14',
  gravidade: 'Grave',
  placa: 'GHJ5K21',
  veiculo: 'Fiat Ducato 2022',
  prazoIndicacao: '17/07/2026',
  prazoIndicacaoDias: 3,
  prazoOrgao: '31/07/2026',
  condutor: null,
  aitOriginal: null,
  dataCriacao: '15/03/2025',
  pontos: 5,
  multiplicador: null,
  tipo: 'Notificação',
  enderecoCompleto: 'Rua da Consolação, 900',
  cidade: 'São Paulo',
  bairro: 'Consolação',
  dataNotificacao: '22/03/2025',
  dataEmissaoNotificacao: '20/03/2025',
  infrator: 'Condutor',
  condutaAdequada: 'Não',
  suspendeCNH: 'Não',
  infracaoTratada: 'Não',
  recorrivel: 'Sim',
  renainf: 'Não',
  renavam: '55544433322211',
  empresa: 'FROTA 162 LTDA',
  valorPago: null,
  valorDescontadoCondutor: null,
  dataVencimento: '31/07/2026',
  dataPagamento: null,
  centroCusto: null,
  pago: 'Não',
  statusBoletoSne: 'BOLETO DISPONÍVEL',
  descontoCondutorAplicado: null,
  cnhCondutor: null,
  cedulaCnh: null,
  rgCondutor: null,
  dataIndicacao2: null,
  multasRelacionadas: [],
  anexos: [
    { tipo: 'Documento da multa', nome: 'espelho-ait-SP11000004.pdf', dataInclusao: '15/03/2025', vencimento: '17/07/2026' },
  ],
  timeline: [
    { id: 'dl_17jul',    type: 'date_label',   title: '17/07/2026' },
    { id: 'venc_indic',  type: 'info_active',
      title: 'Vencimento da indicação na plataforma',
      description: 'Vence em 3 dias · Prazo: 17/07/2026' },
    { id: 'dl_15mar',    type: 'date_label',   title: '15/03/2025' },
    { id: 'boleto_40',   type: 'success',
      title: 'Solicite o boleto de 40% de desconto',
      description: 'Pague R$ 117,14 no lugar de R$ 195,23. Ao emitir o boleto com desconto de 40%, não será mais possível indicar condutor para esta infração.' },
    { id: 'indicar',     type: 'user',
      title: 'Indicar condutor responsável',
      description: 'Indique o condutor agora pela plataforma via CPF ou Formulário de Indicação.',
      action: { label: 'Indique agora', variant: 'orange' } },
    { id: 'recebida',    type: 'past',
      date: '15/03/2025',
      title: 'Notificação recebida',
      description: 'AIT SP11000004 · 60501 — Parar sobre a Faixa de Pedestres · CET-SP',
      action: { label: 'Baixar espelho' } },
  ],
};

// ─── Mock Condutor Indicado via CPF ──────────────────────────────────────────
const MOCK_CPF_CONCLUIDO = {
  indicacaoTipo: 'sne',
  statusVariant: 'condutor_indicado',
  codigoInfracao: '55412',
  nomeInfracao: 'Usar Celular ao Volante',
  dataInfracao: '20/02/2025',
  horaInfracao: '10:00',
  orgao: 'SEMOB-GO',
  local: 'Av. Anhanguera, 4500',
  uf: 'GO',
  valor: 'R$ 293,47',
  valorDesconto: 'R$ 176,08',
  gravidade: 'Gravíssima',
  placa: 'MNP7T34',
  veiculo: 'Toyota Corolla 2023',
  prazoIndicacao: '17/07/2026',
  prazoIndicacaoDias: 0,
  prazoOrgao: '31/07/2026',
  condutor: { nome: 'Carlos Eduardo Silva', cpf: '234.567.890-11' },
  aitOriginal: null,
  dataCriacao: '20/02/2025',
  pontos: 7,
  multiplicador: null,
  tipo: 'Notificação',
  enderecoCompleto: 'Av. Anhanguera, 4500',
  cidade: 'Goiânia',
  bairro: 'Setor Central',
  dataNotificacao: '28/02/2025',
  dataEmissaoNotificacao: '26/02/2025',
  infrator: 'Condutor',
  condutaAdequada: 'Não',
  suspendeCNH: 'Sim',
  infracaoTratada: 'Não',
  recorrivel: 'Sim',
  renainf: 'Não',
  renavam: '33344455566677',
  empresa: 'FROTA 162 LTDA',
  valorPago: null,
  valorDescontadoCondutor: null,
  dataVencimento: '31/07/2026',
  dataPagamento: null,
  centroCusto: null,
  pago: 'Não',
  statusBoletoSne: null,
  descontoCondutorAplicado: null,
  cnhCondutor: '98765432-1',
  cedulaCnh: '98765432',
  rgCondutor: '11.222.333-4',
  dataIndicacao2: '16/07/2026',
  multasRelacionadas: [],
  anexos: [
    { tipo: 'Documento da multa', nome: 'espelho-ait-SP11000005.pdf', dataInclusao: '20/02/2025', vencimento: '17/07/2026' },
  ],
  timeline: [
    { id: 'dl_17jul',     type: 'date_label',  title: '17/07/2026' },
    { id: 'venc_indic',   type: 'info_active',
      title: 'Vencimento da indicação na plataforma',
      description: 'Vence hoje · Prazo: 17/07/2026' },
    { id: 'dl_16jul',     type: 'date_label',  title: '16/07/2026' },
    { id: 'indic_ok',     type: 'success',
      date: '16/07/2026 14:05',
      title: 'Indicação de condutor foi concluída com sucesso',
      description: 'A notificação agora passa a ser de penalidade e a responsabilidade foi transferida para o condutor indicado.' },
    { id: 'dl_15jul',     type: 'date_label',  title: '15/07/2026' },
    { id: 'cdt_aceite',   type: 'cdt',
      date: '15/07/2026 11:22',
      title: 'Condutor aceitou a indicação',
      description: 'Condutor aceitou a indicação pela Carteira Digital de Trânsito.',
      badge: { label: 'CONDUTOR INDICADO', bg: 'var(--color-success-200)', color: 'var(--color-success-800)' } },
    { id: 'aguard_cdt',   type: 'cdt',
      date: '10/07/2026 09:00',
      title: 'Aguardando aceite do condutor: Carlos Eduardo Silva',
      description: 'Peça para o condutor acessar a Carteira Digital de Trânsito e aceitar a indicação.',
      badge: { label: 'AGUARDANDO ACEITE', bg: 'var(--color-information-200)', color: 'var(--color-information-800)' } },
    { id: 'boleto_40',    type: 'info',
      title: 'Solicite o boleto de 40% de desconto',
      description: 'Ao emitir o boleto com desconto de 40%, não será mais possível indicar condutor. Válido até 17/07/2026.' },
    { id: 'indicar',      type: 'user',
      title: 'Indicar condutor responsável',
      description: 'Condutor vinculado via CPF 234.567.890-11.',
      action: { label: 'Indicado via CPF', variant: 'done' } },
    { id: 'recebida',     type: 'past',
      date: '20/02/2025',
      title: 'Notificação recebida',
      description: 'AIT SP11000005 · 55412 — Usar Celular ao Volante · SEMOB-GO',
      action: { label: 'Baixar espelho' } },
  ],
};

// ─── Mock Condutor Indicado via Formulário ────────────────────────────────────
const MOCK_FORMULARIO_CONCLUIDO = {
  indicacaoTipo: 'formulario',
  statusVariant: 'condutor_indicado',
  codigoInfracao: '55411',
  nomeInfracao: 'Não Usar Cinto de Segurança (passageiro)',
  dataInfracao: '05/04/2025',
  horaInfracao: '14:15',
  orgao: 'DETRAN-MG',
  local: 'Av. Afonso Pena, 2000',
  uf: 'MG',
  valor: 'R$ 293,47',
  valorDesconto: 'R$ 176,08',
  gravidade: 'Grave',
  placa: 'QRS8U45',
  veiculo: 'Renault Master 2021',
  prazoIndicacao: '17/07/2026',
  prazoIndicacaoDias: 0,
  prazoOrgao: '31/07/2026',
  condutor: 'Ana Clara Rodrigues',
  aitOriginal: null,
  dataCriacao: '05/04/2025',
  pontos: 5,
  multiplicador: null,
  tipo: 'Notificação',
  enderecoCompleto: 'Av. Afonso Pena, 2000',
  cidade: 'Belo Horizonte',
  bairro: 'Funcionários',
  dataNotificacao: '12/04/2025',
  dataEmissaoNotificacao: '10/04/2025',
  infrator: 'Condutor',
  condutaAdequada: 'Não',
  suspendeCNH: 'Não',
  infracaoTratada: 'Não',
  recorrivel: 'Sim',
  renainf: 'Não',
  renavam: '77788899900011',
  empresa: 'FROTA 162 LTDA',
  valorPago: null,
  valorDescontadoCondutor: null,
  dataVencimento: '31/07/2026',
  dataPagamento: null,
  centroCusto: null,
  pago: 'Não',
  statusBoletoSne: null,
  descontoCondutorAplicado: null,
  cnhCondutor: null,
  cedulaCnh: null,
  rgCondutor: null,
  dataIndicacao2: '16/07/2026',
  multasRelacionadas: [],
  anexos: [
    { tipo: 'Documento da multa', nome: 'espelho-ait-SP11000006.pdf', dataInclusao: '05/04/2025', vencimento: '17/07/2026' },
    { tipo: 'Formulário IC', nome: 'formulario-ic-SP11000006.pdf', dataInclusao: '12/07/2026', vencimento: '17/07/2026' },
    { tipo: 'CNH', nome: 'cnh-ana-clara.pdf', dataInclusao: '12/07/2026', vencimento: null },
  ],
  timeline: [
    { id: 'dl_17jul',     type: 'date_label',  title: '17/07/2026' },
    { id: 'venc_indic',   type: 'info_active',
      title: 'Vencimento da indicação na plataforma',
      description: 'Vence hoje · Prazo: 17/07/2026' },
    { id: 'dl_16jul',     type: 'date_label',  title: '16/07/2026' },
    { id: 'indic_ok',     type: 'success',
      date: '16/07/2026 10:30',
      title: 'Indicação de condutor foi concluída com sucesso',
      description: 'A notificação agora passa a ser de penalidade e a responsabilidade foi transferida para o condutor indicado.' },
    { id: 'dl_15jul',     type: 'date_label',  title: '15/07/2026' },
    { id: 'orgao_aceitou', type: 'user',
      date: '15/07/2026 16:00',
      title: 'O órgão autuador aceitou a indicação',
      description: 'Sua indicação foi aceita pelo DETRAN-MG.' },
    { id: 'enviada_orgao', type: 'user',
      date: '14/07/2026 09:20',
      title: 'Indicação enviada ao órgão autuador',
      description: 'A indicação foi enviada ao DETRAN-MG e pode demorar até 5 dias úteis para conclusão.' },
    { id: 'docs_proc',    type: 'user',
      date: '12/07/2026 11:45',
      title: 'Documentos enviados: estamos processando a indicação',
      description: 'Os documentos serão processados e, em breve, você receberá uma notificação com o resultado.' },
    { id: 'boleto_40',    type: 'info',
      title: 'Solicite o boleto de 40% de desconto',
      description: 'Ao emitir o boleto com desconto de 40%, não será mais possível indicar condutor. Válido até 17/07/2026.' },
    { id: 'indicar',      type: 'user',
      title: 'Indicar condutor responsável',
      description: 'Ana Clara Rodrigues indicada via Formulário de Indicação de Condutora.',
      action: { label: 'Indicado via Formulário', variant: 'done' } },
    { id: 'recebida',     type: 'past',
      date: '05/04/2025',
      title: 'Notificação recebida',
      description: 'AIT SP11000006 · 55411 — Não Usar Cinto de Segurança (passageiro) · DETRAN-MG',
      action: { label: 'Baixar espelho' } },
  ],
};

// ─── Mock Pague Agora (penalidade em aberto) ──────────────────────────────────
const MOCK_PAGUE_AGORA = {
  indicacaoTipo: null,
  statusVariant: 'em_aberto',
  codigoInfracao: '60502',
  nomeInfracao: 'Estacionar em Local Proibido',
  dataInfracao: '15/01/2025',
  horaInfracao: '13:00',
  orgao: 'CET-SP',
  local: 'Rua Augusta, 150',
  uf: 'SP',
  valor: 'R$ 130,16',
  valorDesconto: null,
  gravidade: 'Leve',
  placa: 'VWX9A56',
  veiculo: 'Mercedes-Benz Sprinter 2020',
  prazoIndicacao: null,
  prazoIndicacaoDias: null,
  prazoOrgao: null,
  condutor: 'João Carlos Pereira',
  aitOriginal: null,
  dataCriacao: '15/01/2025',
  pontos: 3,
  multiplicador: null,
  tipo: 'Penalidade',
  enderecoCompleto: 'Rua Augusta, 150',
  cidade: 'São Paulo',
  bairro: 'Consolação',
  dataNotificacao: '22/01/2025',
  dataEmissaoNotificacao: '20/01/2025',
  infrator: 'Condutor',
  condutaAdequada: 'Não',
  suspendeCNH: 'Não',
  infracaoTratada: 'Sim',
  recorrivel: 'Sim',
  renainf: 'Não',
  renavam: '22233344455566',
  empresa: 'FROTA 162 LTDA',
  valorPago: null,
  valorDescontadoCondutor: null,
  dataVencimento: '26/08/2026',
  dataPagamento: null,
  centroCusto: null,
  pago: 'Não',
  statusBoletoSne: null,
  descontoCondutorAplicado: null,
  cnhCondutor: null,
  cedulaCnh: null,
  rgCondutor: null,
  dataIndicacao2: null,
  multasRelacionadas: [],
  anexos: [
    { tipo: 'Documento da multa', nome: 'espelho-ait-SP11000007.pdf', dataInclusao: '15/01/2025', vencimento: '26/08/2026' },
  ],
  timeline: [
    { id: 'dl_26ago',    type: 'date_label',    title: '26/08/2026' },
    { id: 'venc_pgto',   type: 'info_payment',
      title: 'Vencimento do pagamento',
      description: 'Vence hoje · Prazo: 26/08/2026' },
    { id: 'dl_17jul',    type: 'date_label',    title: '17/07/2026' },
    { id: 'multa_disp',  type: 'pay_dollar',
      date: '17/07/2026',
      title: 'Sua multa está disponível para pagamento',
      description: 'Pague sua multa agora pela plataforma ou emita o boleto para pagamento externo.',
      actions: [
        { label: 'Baixar boleto' },
        { label: 'Pague agora', variant: 'orange' },
      ] },
    { id: 'recebida',    type: 'past',
      date: '15/01/2025',
      title: 'Multa recebida',
      description: 'AIT SP11000007 · 60502 — Estacionar em Local Proibido · CET-SP',
      action: { label: 'Baixar espelho' } },
  ],
};

// ─── Mock Pagamento Vencido ───────────────────────────────────────────────────
const MOCK_VENCIDO = {
  indicacaoTipo: 'sne',
  statusVariant: 'vencido',
  codigoInfracao: '55500',
  nomeInfracao: 'Não Usar Cinto de Segurança',
  dataInfracao: '10/12/2024',
  horaInfracao: '17:45',
  orgao: 'PRF-BA',
  local: 'BR-324 KM 536',
  uf: 'BA',
  valor: 'R$ 293,47',
  valorDesconto: null,
  gravidade: 'Grave',
  placa: 'BCD1E23',
  veiculo: 'Scania R 450 2020',
  prazoIndicacao: null,
  prazoIndicacaoDias: null,
  prazoOrgao: null,
  condutor: 'Marcos Vinicius Souza',
  aitOriginal: null,
  dataCriacao: '10/12/2024',
  pontos: 5,
  multiplicador: null,
  tipo: 'Penalidade',
  enderecoCompleto: 'BR-324, KM 536',
  cidade: 'Feira de Santana',
  bairro: '-',
  dataNotificacao: '18/12/2024',
  dataEmissaoNotificacao: '16/12/2024',
  infrator: 'Condutor',
  condutaAdequada: 'Não',
  suspendeCNH: 'Não',
  infracaoTratada: 'Sim',
  recorrivel: 'Sim',
  renainf: 'Não',
  renavam: '44455566677788',
  empresa: 'FROTA 162 LTDA',
  valorPago: null,
  valorDescontadoCondutor: null,
  dataVencimento: '26/08/2026',
  dataPagamento: null,
  centroCusto: null,
  pago: 'Não',
  statusBoletoSne: null,
  descontoCondutorAplicado: null,
  cnhCondutor: null,
  cedulaCnh: null,
  rgCondutor: null,
  dataIndicacao2: null,
  multasRelacionadas: [],
  anexos: [
    { tipo: 'Documento da multa', nome: 'espelho-ait-SP11000008.pdf', dataInclusao: '10/12/2024', vencimento: '26/08/2026' },
  ],
  timeline: [
    { id: 'dl_26ago',     type: 'date_label',   title: '26/08/2026' },
    { id: 'realiz_pgto',  type: 'pay_dollar',
      title: 'Realize o pagamento da multa',
      description: 'Pague agora pela plataforma ou atualize o boleto. Juros e encargos podem ser aplicados.',
      actions: [
        { label: 'Atualizar boleto' },
        { label: 'Pague agora', variant: 'orange' },
      ] },
    { id: 'prazo_exp',    type: 'error',
      title: 'Prazo de pagamento expirado',
      description: 'Juros e encargos podem ser aplicados conforme as regras do órgão autuador.' },
    { id: 'venc_pgto',    type: 'info',
      title: 'Vencimento do pagamento',
      description: 'Venceu em 26/08/2026' },
    { id: 'dl_17jul',     type: 'date_label',   title: '17/07/2026' },
    { id: 'multa_disp',   type: 'pay_dollar',
      date: '17/07/2026',
      title: 'Sua multa está disponível para pagamento',
      description: 'Pague sua multa agora pela plataforma ou emita o boleto para pagamento externo.' },
    { id: 'venc_indic',   type: 'info',
      title: 'Vencimento da indicação na plataforma',
      description: 'Venceu em 17/07/2026' },
    { id: 'dl_16jul',     type: 'date_label',   title: '16/07/2026' },
    { id: 'indic_ok',     type: 'success',
      date: '16/07/2026 11:00',
      title: 'Indicação de condutor foi concluída com sucesso',
      description: 'A responsabilidade foi transferida para o condutor indicado.' },
    { id: 'dl_15jul',     type: 'date_label',   title: '15/07/2026' },
    { id: 'cdt_aceite',   type: 'cdt',
      date: '15/07/2026 08:55',
      title: 'Condutor aceitou a indicação',
      description: 'Condutor aceitou a indicação pela Carteira Digital de Trânsito.',
      badge: { label: 'CONDUTOR INDICADO', bg: 'var(--color-success-200)', color: 'var(--color-success-800)' } },
    { id: 'aguard_cdt',   type: 'cdt',
      date: '10/07/2026 10:30',
      title: 'Aguardando aceite do condutor',
      description: 'Peça para o condutor acessar a Carteira Digital de Trânsito e aceitar a indicação.',
      badge: { label: 'AGUARDANDO ACEITE', bg: 'var(--color-information-200)', color: 'var(--color-information-800)' } },
    { id: 'boleto_40',    type: 'info',
      title: 'Solicite o boleto de 40% de desconto',
      description: 'Ao emitir o boleto com desconto de 40%, não será mais possível indicar condutor.' },
    { id: 'indicar',      type: 'user',
      title: 'Indicar condutor responsável',
      description: 'Indique o condutor agora pela plataforma via CPF ou Formulário de Indicação.',
      action: { label: 'Indique agora', variant: 'done' } },
    { id: 'recebida',     type: 'past',
      date: '10/12/2024',
      title: 'Multa recebida',
      description: 'AIT SP11000008 · 55500 — Não Usar Cinto de Segurança · PRF-BA',
      action: { label: 'Baixar espelho' } },
  ],
};

// ─── Mock Pagamento Completo (timeline completa) ──────────────────────────────
const MOCK_PAGO_COMPLETO = {
  indicacaoTipo: 'sne',
  statusVariant: 'pago',
  codigoInfracao: '60503',
  nomeInfracao: 'Transitar na Contramão',
  dataInfracao: '22/01/2025',
  horaInfracao: '08:00',
  orgao: 'DETRAN-RS',
  local: 'Av. Ipiranga, 6000',
  uf: 'RS',
  valor: 'R$ 293,47',
  valorDesconto: null,
  gravidade: 'Gravíssima',
  placa: 'EFG2F34',
  veiculo: 'Volkswagen Constellation 2019',
  prazoIndicacao: null,
  prazoIndicacaoDias: null,
  prazoOrgao: null,
  condutor: 'Luiz Felipe Mendes',
  aitOriginal: null,
  dataCriacao: '22/01/2025',
  pontos: 7,
  multiplicador: null,
  tipo: 'Penalidade',
  enderecoCompleto: 'Av. Ipiranga, 6000',
  cidade: 'Porto Alegre',
  bairro: 'Partenon',
  dataNotificacao: '29/01/2025',
  dataEmissaoNotificacao: '27/01/2025',
  infrator: 'Condutor',
  condutaAdequada: 'Não',
  suspendeCNH: 'Sim',
  infracaoTratada: 'Sim',
  recorrivel: 'Sim',
  renainf: 'Não',
  renavam: '99988877766655',
  empresa: 'FROTA 162 LTDA',
  valorPago: 'R$ 293,47',
  valorDescontadoCondutor: null,
  dataVencimento: '26/08/2026',
  dataPagamento: '26/08/2026',
  centroCusto: 'Operações Sul',
  pago: 'Sim',
  statusBoletoSne: 'PAGO',
  descontoCondutorAplicado: null,
  cnhCondutor: '55544433-2',
  cedulaCnh: '55544433',
  rgCondutor: '55.666.777-8',
  dataIndicacao2: '16/07/2026',
  multasRelacionadas: [],
  anexos: [
    { tipo: 'Documento da multa', nome: 'espelho-ait-SP11000009.pdf', dataInclusao: '22/01/2025', vencimento: '26/08/2026' },
    { tipo: 'Comprovante de pagamento', nome: 'comprovante-SP11000009.pdf', dataInclusao: '26/08/2026', vencimento: null },
  ],
  timeline: [
    { id: 'dl_26ago',     type: 'date_label',  title: '26/08/2026' },
    { id: 'venc_pgto',    type: 'info',
      title: 'Vencimento do pagamento',
      description: 'Vence hoje · Prazo: 26/08/2026' },
    { id: 'multa_paga',   type: 'success',
      date: '26/08/2026 10:14',
      title: 'Multa paga com sucesso!',
      description: 'O pagamento da multa foi identificado com sucesso.' },
    { id: 'pgto_proc',    type: 'pay_clock',
      date: '26/08/2026 09:58',
      title: 'Pagamento em processamento',
      description: 'Pagamento em andamento. Em breve será confirmado.' },
    { id: 'dl_18jul',     type: 'date_label',  title: '18/07/2026' },
    { id: 'pgto_aguard',  type: 'pay_clock',
      date: '18/07/2026 14:32',
      title: 'Pagamento aguardando aprovação',
      description: 'O pagamento está aguardando aprovação do responsável pelos pagamentos da sua empresa.' },
    { id: 'dl_17jul',     type: 'date_label',  title: '17/07/2026' },
    { id: 'multa_disp',   type: 'pay_dollar',
      date: '17/07/2026',
      title: 'Sua multa está disponível para pagamento',
      description: 'Pague sua multa agora pela plataforma ou emita o boleto para pagamento externo.',
      actions: [
        { label: 'Baixar boleto', variant: 'done' },
        { label: 'Pague agora', variant: 'done' },
      ] },
    { id: 'venc_indic',   type: 'info',
      title: 'Vencimento da indicação na plataforma',
      description: 'Venceu em 17/07/2026' },
    { id: 'dl_16jul',     type: 'date_label',  title: '16/07/2026' },
    { id: 'indic_ok',     type: 'success',
      date: '16/07/2026 11:30',
      title: 'Indicação de condutor foi concluída com sucesso',
      description: 'A responsabilidade foi transferida para o condutor indicado.' },
    { id: 'dl_15jul',     type: 'date_label',  title: '15/07/2026' },
    { id: 'cdt_aceite',   type: 'cdt',
      date: '15/07/2026 09:47',
      title: 'Condutor aceitou a indicação',
      description: 'Luiz Felipe Mendes aceitou a indicação pela Carteira Digital de Trânsito.',
      badge: { label: 'CONDUTOR INDICADO', bg: 'var(--color-success-200)', color: 'var(--color-success-800)' } },
    { id: 'aguard_cdt',   type: 'cdt',
      date: '10/07/2026 09:00',
      title: 'Aguardando aceite do condutor',
      description: 'Peça para o condutor acessar a Carteira Digital de Trânsito e aceitar a indicação.',
      badge: { label: 'AGUARDANDO ACEITE', bg: 'var(--color-information-200)', color: 'var(--color-information-800)' } },
    { id: 'boleto_40',    type: 'info',
      title: 'Solicite o boleto de 40% de desconto',
      description: 'Ao emitir o boleto com desconto de 40%, não será mais possível indicar condutor.' },
    { id: 'indicar',      type: 'user',
      title: 'Indicar condutor responsável',
      description: 'Luiz Felipe Mendes vinculado via CPF.',
      action: { label: 'Indique agora', variant: 'done' } },
    { id: 'recebida',     type: 'past',
      date: '22/01/2025',
      title: 'Multa recebida',
      description: 'AIT SP11000009 · 60503 — Transitar na Contramão · DETRAN-RS',
      action: { label: 'Baixar espelho' } },
  ],
};

// SP11000001 segue o mesmo status da listagem: INDIQUE AGORA (clona o SNE, ainda sem condutor).
const MOCK_INDIQUE_SP01 = {
  ...MOCK_SNE,
  statusVariant: 'indique_agora',
  indicacaoTipo: null,
  condutor: null,
  placa: 'QAZ1W23',
  statusBoletoSne: 'Não solicitado',
};

// SP04127850 segue o status do card: PAGUE AGORA (em_aberto). Clona o PAGUE AGORA com os dados corretos.
const MOCK_PAGUE_SP850 = {
  ...MOCK_PAGUE_AGORA,
  codigoInfracao: '73662',
  nomeInfracao: 'Avançar Sinal Vermelho',
  dataInfracao: '10/03/2025',
  dataCriacao: '10/03/2025',
  orgao: 'DETRAN-SP',
  local: 'Av. Paulista, 1578',
  enderecoCompleto: 'Av. Paulista, 1578',
  bairro: 'Bela Vista',
  valor: 'R$ 293,47',
  placa: 'DTX0021',
  gravidade: 'Gravíssima',
  pontos: 7,
  veiculo: 'Volkswagen Gol 2021',
  dataVencimento: '15/08/2025',
  condutor: null,
};

// Deriva um mock de detalhe a partir do row da listagem, garantindo que o
// status e os dados principais do detalhe batam com o card. Usado como fallback
// quando o AIT não tem um mock dedicado.
function buildDetailFromRow(row) {
  if (!row) return MOCK_DEFAULT;
  return {
    ...MOCK_DEFAULT,
    statusVariant: row.statusVariant,
    indicacaoTipo: row.indicacaoTipo || null,
    codigoInfracao: row.codigoInfracao,
    nomeInfracao: row.nomeInfracao,
    placa: row.placa,
    orgao: row.orgao,
    valor: row.valor,
    dataInfracao: row.dataInfracao,
    dataCriacao: row.dataInfracao,
    vencimento: row.vencimento,
    dataVencimento: row.vencimento,
    tipo: row.tipo === 'penalidade' ? 'Penalidade' : 'Notificação',
    condutor: row.condutor ? (typeof row.condutor === 'string' ? { nome: row.condutor } : row.condutor) : null,
    prazoIndicacao: row.prazoDataFormatada || null,
    prazoIndicacaoDias: typeof row.prazoIndicacao === 'number' ? row.prazoIndicacao : null,
    indLabel: row.indLabel, indBg: row.indBg, indColor: row.indColor,
  };
}

function getMock(aitId) {
  if (aitId === 'SP11000001') return MOCK_INDIQUE_SP01;
  if (aitId === 'SP04127850') return MOCK_PAGUE_SP850;
  if (aitId === 'SP04127832') return MOCK_SNE;
  if (aitId === 'RJ01985432' || aitId === 'SP11000002') return MOCK_FORMULARIO;
  if (aitId === 'SP11000003') return MOCK_PAGAMENTO;
  if (aitId === 'SP11000004') return MOCK_INDIQUE_AGORA;
  if (aitId === 'SP11000005') return MOCK_CPF_CONCLUIDO;
  if (aitId === 'SP11000006') return MOCK_FORMULARIO_CONCLUIDO;
  if (aitId === 'SP11000007') return MOCK_PAGUE_AGORA;
  if (aitId === 'SP11000008') return MOCK_VENCIDO;
  if (aitId === 'SP11000009') return MOCK_PAGO_COMPLETO;
  // Fallback robusto: deriva do row da listagem para o detalhe refletir o card.
  const row = (window.MOCK_ROWS || []).find(function(r) { return r.ait === aitId; });
  if (row) return buildDetailFromRow(row);
  return MOCK_DEFAULT;
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────
function Tooltip({ text, children }) {
  const [vis, setVis] = useDetState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setVis(true)} onMouseLeave={() => setVis(false)}>
      {children}
      {vis && (
        <span style={{
          position: 'absolute', bottom: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)',
          background: '#1c1c1e', color: '#fff', fontSize: 11, padding: '5px 9px', borderRadius: 5,
          whiteSpace: 'nowrap', zIndex: 999, pointerEvents: 'none',
          fontFamily: 'var(--font-family-primary)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}>{text}</span>
      )}
    </span>
  );
}

// ─── Panel header (icon container + title + divider) ─────────────────────────
function PanelHeader({ icon, title }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 4, flexShrink: 0,
          background: 'var(--color-primary-200)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--color-primary-600)',
        }}>{icon}</div>
        <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-neutral-900)', fontFamily: 'var(--font-family-primary)' }}>{title}</span>
      </div>
      <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />
    </div>
  );
}

// ─── Sidebar field com divider ────────────────────────────────────────────────
function SidebarField({ label, value, valueColor, last, tooltip }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: last ? 0 : 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{
            fontSize: 12, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.04em',
            color: 'var(--color-neutral-700)', fontFamily: 'var(--font-family-primary)',
          }}>{label}</span>
          {tooltip && (
            <Tooltip text={tooltip}>
              <span style={{ color: 'var(--color-neutral-400)', display: 'inline-flex', cursor: 'default' }}><DetIconInfo /></span>
            </Tooltip>
          )}
        </div>
        <span style={{
          fontSize: 14, fontWeight: 700, lineHeight: 1.5,
          color: valueColor || 'var(--color-neutral-900)', fontFamily: 'var(--font-family-primary)',
        }}>{value}</span>
      </div>
      {!last && <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />}
    </div>
  );
}

// ─── Estilos de card: Alert (bg colorida, rounded-12) ────────────────────────
const ALERT_CFG = {
  success:      { bg: 'var(--color-success-100)',     iconColor: 'var(--color-success-600)',      titleColor: 'var(--color-success-800)' },
  warning:      { bg: 'var(--color-warning-100)',     iconColor: 'var(--color-warning-600)',      titleColor: 'var(--color-warning-800)' },
  error:        { bg: 'var(--color-error-100)',       iconColor: 'var(--color-error-600)',        titleColor: 'var(--color-error-700)' },
  cdt:          { bg: 'var(--color-information-100)', iconColor: 'var(--color-information-600)',  titleColor: 'var(--color-information-800)' },
  info_active:  { bg: 'var(--color-information-100)', iconColor: 'var(--color-information-600)',  titleColor: 'var(--color-information-800)' },
  info_payment: { bg: 'var(--color-primary-200)',     iconColor: 'var(--color-primary-600)',      titleColor: 'var(--color-primary-800)' },
  info:         { bg: 'var(--color-neutral-200)',     iconColor: 'var(--color-neutral-600)',      titleColor: 'var(--color-neutral-800)' },
  check:        { bg: 'var(--color-success-100)',     iconColor: 'var(--color-success-600)',      titleColor: 'var(--color-success-800)' },
};

function AlertCard({ event }) {
  const cfg = ALERT_CFG[event.type] || ALERT_CFG.info;
  return (
    <div style={{
      background: cfg.bg, borderRadius: 12, padding: 12,
      display: 'flex', gap: 12, alignItems: 'flex-start',
      fontFamily: 'var(--font-family-primary)',
    }}>
      <span style={{ color: cfg.iconColor, display: 'inline-flex', flexShrink: 0, marginTop: 1 }}>
        <EventIcon type={event.type} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: event.description ? 4 : 0 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: cfg.titleColor, lineHeight: 1.5 }}>{event.title}</span>
          {event.badge && (
            <span style={{
              padding: '2px 8px', borderRadius: 100,
              background: event.badge.bg, color: event.badge.color,
              fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
            }}>{event.badge.label}</span>
          )}
        </div>
        {event.description && (
          <p style={{ margin: 0, fontSize: 12, color: 'var(--color-neutral-700)', lineHeight: 1.55 }}>{event.description}</p>
        )}
        {event.details && event.details.length > 0 && (
          <ul style={{ margin: '6px 0 0', padding: '0 0 0 14px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {event.details.map((d, i) => (
              <li key={i} style={{ fontSize: 11, color: 'var(--color-neutral-600)', lineHeight: 1.5 }}>{d}</li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, alignSelf: 'center' }}>
        {event.date && <span style={{ fontSize: 11, color: 'var(--color-neutral-500)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{event.date}</span>}
        <span style={{ color: 'var(--color-neutral-400)', display: 'inline-flex' }}><DetIconChevronRight /></span>
      </div>
    </div>
  );
}

// ─── Action card (branco com borda, rounded-8) ────────────────────────────────
const ACTION_CFG = {
  robot:      { iconBg: 'var(--color-primary-200)',     iconColor: 'var(--color-primary-600)' },
  upload:     { iconBg: 'var(--color-neutral-200)',     iconColor: 'var(--color-neutral-700)' },
  user:       { iconBg: 'var(--color-primary-200)',     iconColor: 'var(--color-primary-600)' },
  past:       { iconBg: 'var(--color-information-100)', iconColor: 'var(--color-information-600)' },
  pay_clock:  { iconBg: 'var(--color-primary-200)',     iconColor: 'var(--color-primary-600)' },
  pay_dollar: { iconBg: 'var(--color-primary-200)',     iconColor: 'var(--color-primary-600)' },
};

function ActionCard({ event }) {
  const cfg = ACTION_CFG[event.type] || ACTION_CFG.past;
  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      border: '1px solid var(--color-neutral-400)',
      borderRadius: 8, padding: 16,
      display: 'flex', gap: 16, alignItems: 'center',
      fontFamily: 'var(--font-family-primary)',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 4, flexShrink: 0,
        background: cfg.iconBg, color: cfg.iconColor,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <EventIcon type={event.type} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: 'var(--color-neutral-900)', lineHeight: 1.4 }}>{event.title}</p>
        {event.description && (
          <p style={{ margin: 0, fontSize: 14, color: 'var(--color-neutral-700)', lineHeight: 1.5 }}>{event.description}</p>
        )}
        {event.details && event.details.length > 0 && (
          <ul style={{ margin: '5px 0 0', padding: '0 0 0 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {event.details.map((d, i) => (
              <li key={i} style={{ fontSize: 12, color: 'var(--color-neutral-600)', lineHeight: 1.5 }}>{d}</li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {event.date && <span style={{ fontSize: 11, color: 'var(--color-neutral-500)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{event.date}</span>}
        {event.action && (() => {
          const act = event.action;
          const isOrange = act.variant === 'orange';
          const isDone   = act.variant === 'done';
          const isDownload = !act.variant;
          return (
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '6px 12px', borderRadius: 8,
              border: isOrange ? 'none' : isDone ? 'none' : '1px solid var(--color-neutral-400)',
              background: isOrange ? 'var(--color-primary-500)' : isDone ? 'var(--color-neutral-300)' : 'var(--color-neutral-100)',
              fontFamily: 'var(--font-family-primary)',
              fontSize: 12, fontWeight: 700,
              color: isOrange ? '#fff' : isDone ? 'var(--color-neutral-600)' : 'var(--color-neutral-900)',
              cursor: isDone ? 'default' : 'pointer', whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => { if (!isDone) e.currentTarget.style.opacity = '0.85'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >{isDownload && <DetIconDownload />} {act.label}</button>
          );
        })()}
        {event.actions && event.actions.map((act, idx) => {
          const isOrange = act.variant === 'orange';
          const isDone   = act.variant === 'done' || act.primary;
          return (
            <button key={idx} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '6px 12px', borderRadius: 8,
              border: (isOrange || isDone) ? 'none' : '1px solid var(--color-neutral-400)',
              background: isOrange ? 'var(--color-primary-500)' : isDone ? 'var(--color-neutral-300)' : 'var(--color-neutral-100)',
              fontFamily: 'var(--font-family-primary)',
              fontSize: 12, fontWeight: 700,
              color: isOrange ? '#fff' : isDone ? 'var(--color-neutral-600)' : 'var(--color-neutral-900)',
              cursor: isDone ? 'default' : 'pointer', whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => { if (!isDone) e.currentTarget.style.opacity = '0.85'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >{act.label}</button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Mail item (lembrete — compacto) ─────────────────────────────────────────
function MailItem({ event }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 14px',
      background: 'var(--color-neutral-100)',
      border: '1px solid var(--color-neutral-300)',
      borderRadius: 8,
      fontFamily: 'var(--font-family-primary)',
    }}>
      <span style={{ color: 'var(--color-neutral-500)', display: 'inline-flex', flexShrink: 0 }}><DetIconMail /></span>
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-neutral-700)' }}>{event.title}</span>
        {event.description && (
          <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-neutral-500)', lineHeight: 1.4 }}>{event.description}</p>
        )}
      </div>
      <span style={{ fontSize: 11, color: 'var(--color-neutral-400)', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>{event.date}</span>
    </div>
  );
}

// ─── Dot color por tipo ───────────────────────────────────────────────────────
function getDotColor(type) {
  const map = {
    success: 'var(--color-success-500)', check: 'var(--color-success-500)',
    warning: 'var(--color-warning-500)', error: 'var(--color-error-500)',
    cdt: 'var(--color-information-400)', info_active: 'var(--color-information-500)', info_payment: 'var(--color-primary-500)', info: 'var(--color-neutral-400)',
    robot: 'var(--color-primary-500)', user: 'var(--color-primary-400)',
    upload: 'var(--color-neutral-500)',
    mail: 'var(--color-neutral-300)', past: 'var(--color-neutral-400)',
    pay_clock: 'var(--color-error-400)', pay_dollar: 'var(--color-error-400)',
    date_label: 'var(--color-neutral-900)',
  };
  return map[type] || 'var(--color-neutral-400)';
}

// ─── Componente de evento da timeline ─────────────────────────────────────────
const ACTION_TYPES = new Set(['robot', 'upload', 'user', 'past', 'pay_clock', 'pay_dollar']);
function TLEvent({ event }) {
  if (event.type === 'date_label') return (
    <div style={{ paddingBottom: 4, paddingTop: 2 }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-neutral-900)', fontFamily: 'var(--font-family-primary)' }}>
        {event.title}
      </span>
    </div>
  );
  if (event.type === 'mail') return <MailItem event={event} />;
  if (ACTION_TYPES.has(event.type)) return <ActionCard event={event} />;
  return <AlertCard event={event} />;
}

// ─── InfoField — campo label + value (aba Informações) ───────────────────────
function InfoField({ label, value }) {
  const display = (value === null || value === undefined || value === '') ? '—' : String(value);
  return (
    <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
      <span style={{
        fontSize: 12, fontWeight: 400, textTransform: 'uppercase',
        letterSpacing: '0.04em', color: 'var(--color-neutral-700)',
        fontFamily: 'var(--font-family-primary)', lineHeight: 1.4,
      }}>{label}</span>
      <span style={{
        fontSize: 14, fontWeight: 700, color: 'var(--color-neutral-900)',
        fontFamily: 'var(--font-family-primary)', lineHeight: 1.5, wordBreak: 'break-word',
      }}>{display}</span>
    </div>
  );
}

// ─── VDivider — separador vertical entre campos em linha ─────────────────────
function VDivider() {
  return <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--color-neutral-300)', flexShrink: 0 }} />;
}

// ─── InfoRow — linha de campos com dividers verticais ────────────────────────
function InfoRow({ children }) {
  const kids = React.Children.toArray(children);
  return (
    <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
      {kids.map((child, i) => (
        <React.Fragment key={i}>
          <div style={{ flex: '1 0 0', padding: '0 16px', minWidth: 0 }}>
            {child}
          </div>
          {i < kids.length - 1 && <VDivider />}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── SectionLabel — separador de seção entre linhas ──────────────────────────
function SectionLabel({ label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '4px 0',
    }}>
      <div style={{ flex: 1, height: 1, background: 'var(--color-neutral-300)' }} />
      <span style={{
        fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.06em', color: 'var(--color-neutral-600)',
        fontFamily: 'var(--font-family-primary)', whiteSpace: 'nowrap',
      }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: 'var(--color-neutral-300)' }} />
    </div>
  );
}

// ─── Tela principal ────────────────────────────────────────────────────────────
// ─── More Dropdown ────────────────────────────────────────────────────────────
const STATUS_TRATAMENTO_OPTIONS = [
  { id: 'nao_tratada',    label: 'Não tratada',                 iconBg: null,                        iconColor: null,                      icon: null },
  { id: 'tratada',        label: 'Infração tratada',            iconBg: 'var(--color-success-200)',  iconColor: 'var(--color-success-700)', icon: 'check' },
  { id: 'em_andamento',   label: 'Tratamento em andamento',     iconBg: 'var(--color-information-200)', iconColor: 'var(--color-information-700)', icon: 'clock' },
  { id: 'aguard_gestor',  label: 'Aguardando retorno do gestor', iconBg: 'var(--color-warning-200)',  iconColor: 'var(--color-warning-700)', icon: 'user' },
  { id: 'analise_rh',     label: 'Em análise RH',               iconBg: 'var(--color-error-200)',    iconColor: 'var(--color-error-700)',   icon: 'lock' },
  { id: 'em_avaliacao',   label: 'Em avaliação',                iconBg: 'var(--color-success-200)',  iconColor: 'var(--color-success-700)', icon: 'dots' },
];

function StatusTratamentoIcon({ icon, bg, color }) {
  if (!icon) return null;
  const iconEl = {
    check: <DetIconCheck />,
    clock: <DetIconClock />,
    user:  <DetIconUser />,
    lock:  <DetIconLock />,
    dots:  <DetIconDots />,
  }[icon];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 20, height: 20, borderRadius: 20,
      background: bg, color: color, flexShrink: 0,
    }}>{iconEl}</span>
  );
}

function MoreDropdown({ onClose, anchorRect, tipo }) {
  const [subOpen, setSubOpen] = useDetState(false);
  const [statusSelected, setStatusSelected] = useDetState('nao_tratada');

  const dropTop  = anchorRect ? anchorRect.bottom + 8 : 120;
  const dropRight = anchorRect ? window.innerWidth - anchorRect.right : 32;

  const menuItemStyle = (hovered) => ({
    display: 'flex', alignItems: 'center', gap: 8,
    padding: 8, borderRadius: 8, cursor: 'pointer',
    background: hovered ? 'var(--color-neutral-200)' : 'transparent',
    fontFamily: 'var(--font-family-primary)',
    fontSize: 14, color: 'var(--color-neutral-900)',
    width: '100%', boxSizing: 'border-box',
  });

  const iconStyle = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 24, height: 24, flexShrink: 0,
    color: 'var(--color-primary-500)',
  };

  function MenuItem({ icon, label, onClick, chevron, danger }) {
    const [hov, setHov] = useDetState(false);
    return (
      <div
        style={{
          ...menuItemStyle(hov),
          color: danger ? 'var(--color-error-600)' : 'var(--color-neutral-900)',
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={onClick}
      >
        <span style={{ ...iconStyle, color: danger ? 'var(--color-error-500)' : 'var(--color-primary-500)' }}>{icon}</span>
        <span style={{ flex: 1, fontSize: 14, fontWeight: 400, lineHeight: 1.5 }}>{label}</span>
        {chevron && <span style={{ color: 'var(--color-neutral-500)', display: 'inline-flex' }}><DetIconChevronRight /></span>}
      </div>
    );
  }

  return ReactDOM.createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 990 }}
      onClick={onClose}
    >
      {/* Main dropdown */}
      <div
        style={{
          position: 'fixed', top: dropTop, right: dropRight, zIndex: 991,
          background: 'var(--color-neutral-100)',
          border: '1px solid var(--color-neutral-400)',
          borderRadius: 8, boxShadow: '2px 4px 24px rgba(0,0,0,0.16)',
          padding: 2, minWidth: 240,
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <MenuItem icon={<DetIconDownload />}  label="Baixar boleto"                  onClick={onClose} />
          <MenuItem icon={<DetIconRefresh />}   label="Atualizar boleto"               onClick={onClose} />
          {tipo !== 'Notificação' && <MenuItem icon={<DetIconBarcode />}   label="Solicitar boleto 40%"               onClick={onClose} />}

          {/* Status de tratamento — sub-menu trigger */}
          <div style={{ position: 'relative' }}
            onMouseEnter={() => setSubOpen(true)}
            onMouseLeave={() => setSubOpen(false)}
          >
            <MenuItem
              icon={<DetIconShield />}
              label="Status de tratamento"
              chevron={true}
              onClick={e => { e.stopPropagation(); setSubOpen(!subOpen); }}
            />
            {subOpen && (
              <div
                style={{
                  position: 'absolute', top: 0, right: 'calc(100% + 4px)', zIndex: 992,
                  background: 'var(--color-neutral-100)',
                  border: '1px solid var(--color-neutral-400)',
                  borderRadius: 8, boxShadow: '2px 4px 24px rgba(0,0,0,0.16)',
                  padding: 2, minWidth: 240,
                }}
                onClick={e => e.stopPropagation()}
              >
                <div style={{ padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {STATUS_TRATAMENTO_OPTIONS.map(opt => {
                    const isSelected = opt.id === statusSelected;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => { setStatusSelected(opt.id); setSubOpen(false); onClose(); }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8, padding: 8,
                          borderRadius: 8, cursor: 'pointer',
                          background: isSelected ? 'var(--color-primary-200)' : 'transparent',
                          fontFamily: 'var(--font-family-primary)',
                          fontSize: 14, color: 'var(--color-neutral-900)',
                          boxSizing: 'border-box',
                        }}
                        onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--color-neutral-200)'; }}
                        onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                      >
                        <StatusTratamentoIcon icon={opt.icon} bg={opt.iconBg} color={opt.iconColor} />
                        <span style={{ flex: 1, fontSize: 14, lineHeight: 1.5 }}>{opt.label}</span>
                        {isSelected && (
                          <span style={{ color: 'var(--color-primary-600)', display: 'inline-flex' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <MenuItem icon={<DetIconPrint />}    label="Imprimir"                            onClick={onClose} />
          <MenuItem icon={<DetIconPrint />}    label="Imprimir notificação de desconto"    onClick={onClose} />
          <MenuItem icon={<DetIconDownload />} label="Baixar formulário de indicação"      onClick={onClose} />
          <MenuItem icon={<DetIconPen />}      label="Editar perfil da multa"              onClick={onClose} />
          <MenuItem icon={<DetIconTrash />}    label="Excluir multa"                       onClick={onClose} danger={true} />
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Visibilidade da tab bar + aba "Histórico" na tela de detalhe ────────────
// Ocultos a pedido — NÃO removidos. Para reexibir, troque para true.
// Com false, a tela mostra apenas Resumo + Dados da multa (sem tabs).
const SHOW_DETAIL_TABS = false;

// ─── Regras de exibição das ações do topo (Figma node 237:16178) ─────────────
// "Ver documentos" (06): só quando a indicação foi POR FORMULÁRIO (ait.indicacaoTipo === 'formulario').
// "Indicar condutor" (08): só quando ainda é possível indicar o condutor.
// "Pagar multa" (09): só quando é possível pagar pela plataforma.
// "Baixar espelho" e o menu (⋮) não têm regra — sempre visíveis.
const STATUS_PODE_INDICAR = new Set(['indique_agora', 'documentos_incorretos', 'falha_indicacao']);
const STATUS_PODE_PAGAR   = new Set(['em_aberto']);

function AITDetail({ aitId, onBack }) {
  const [activeTab, setActiveTab] = useDetState(SHOW_DETAIL_TABS ? 'acompanhe' : 'informacoes');
  const [moreMenuOpen, setMoreMenuOpen] = useDetState(false);
  const [moreAnchorRect, setMoreAnchorRect] = useDetState(null);
  const ait = getMock(aitId);

  const STATUS_CFG = {
    indique_agora:         { text: 'INDIQUE AGORA',     bg: '#2a89ef',                       color: '#fff' },
    condutor_indicado:     { text: 'CONDUTOR INDICADO', bg: 'var(--color-success-100)',       color: 'var(--color-success-700)' },
    enviada_orgao:         { text: 'ENVIADA AO ÓRGÃO',  bg: 'var(--color-information-100)',   color: 'var(--color-information-700)' },
    em_processamento:      { text: 'EM PROCESSAMENTO',  bg: 'var(--color-neutral-200)',       color: 'var(--color-neutral-700)' },
    aguardando_aceite:     { text: 'AGUARDANDO ACEITE', bg: 'var(--color-information-100)',   color: 'var(--color-information-700)' },
    documentos_incorretos: { text: 'DOC. INCORRETOS',   bg: 'var(--color-warning-100)',       color: 'var(--color-warning-700)' },
    pago:                  { text: 'PAGO',               bg: 'var(--color-success-100)',       color: 'var(--color-success-700)' },
    recusado_condutor:     { text: 'RECUSADO',           bg: 'var(--color-error-100)',         color: 'var(--color-error-700)' },
    em_aberto:             { text: 'PAGUE AGORA',        bg: '#f9401b',                       color: '#fff' },
    vencido:               { text: 'PGTO. VENCIDO',      bg: 'var(--color-error-100)',         color: 'var(--color-error-700)' },
    recusado:              { text: 'PGTO. RECUSADO',     bg: 'var(--color-error-100)',         color: 'var(--color-error-700)' },
    processando:           { text: 'EM PROCESSAMENTO',   bg: 'var(--color-neutral-200)',       color: 'var(--color-neutral-700)' },
    aguardando_aprovacao:  { text: 'AGUARDANDO APROV.',  bg: 'var(--color-warning-100)',       color: 'var(--color-warning-700)' },
    falha_indicacao:       { text: 'FALHA NA INDICAÇÃO', bg: 'var(--color-warning-100)',       color: 'var(--color-warning-700)' },
    indeferida_orgao:      { text: 'INDEFERIDA PELO ÓRGÃO', bg: 'var(--color-warning-100)',    color: 'var(--color-warning-700)' },
    indique_orgao:         { text: 'INDIQUE NO ÓRGÃO',   bg: 'var(--color-neutral-200)',       color: 'var(--color-neutral-700)' },
    indique_no_orgao:      { text: 'INDIQUE NO ÓRGÃO',   bg: 'var(--color-neutral-200)',       color: 'var(--color-neutral-700)' },
    indicacao_vencida:     { text: 'INDICAÇÃO VENCIDA',  bg: 'var(--color-error-100)',         color: 'var(--color-error-700)' },
    vencida_sem_acao:      { text: 'VENCIDA SEM AÇÃO',   bg: 'var(--color-error-100)',         color: 'var(--color-error-700)' },
    cancelado:             { text: 'CANCELADO',          bg: 'var(--color-neutral-200)',       color: 'var(--color-neutral-700)' },
    cancelado_pelo_gestor: { text: 'CANCELADO PELO GESTOR', bg: 'var(--color-neutral-200)',    color: 'var(--color-neutral-700)' },
  };
  const status = STATUS_CFG[ait.statusVariant] || STATUS_CFG.em_processamento;

  const tabs = [
    { id: 'acompanhe',   label: 'Histórico' },
    { id: 'informacoes', label: 'Dados da multa' },
  ];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      overflow: 'hidden', background: '#fafafa',
      fontFamily: 'var(--font-family-primary)',
    }}>
      {/* Conteúdo scrollável */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 24, minHeight: '100%' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
            <button onClick={onBack} style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              border: 'none', background: 'transparent', padding: 0,
              fontSize: 12, color: 'var(--color-primary-600)', fontWeight: 400,
              cursor: 'pointer', fontFamily: 'var(--font-family-primary)',
              textTransform: 'uppercase', letterSpacing: '0.04em',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Infrações
            </button>
            <span style={{ color: 'var(--color-neutral-400)' }}>›</span>
            <span style={{ color: 'var(--color-neutral-800)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>AIT {aitId}</span>
          </div>

          {/* Page header: título + ações */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: 'var(--color-neutral-900)', lineHeight: 1.5 }}>
                  AIT {aitId}
                </h1>
                <span style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '3px 10px', borderRadius: 20,
                  background: status.bg, color: status.color,
                  fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.03em', whiteSpace: 'nowrap',
                }}>{status.text}</span>
              </div>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 400, color: 'var(--color-neutral-800)', lineHeight: 1.5 }}>
                {ait.codigoInfracao} — {ait.nomeInfracao}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              {/* 06 — Ver documentos: só quando a indicação foi por formulário */}
              {ait.indicacaoTipo === 'formulario' && (
                <button style={btnSecondary}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--color-neutral-200)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--color-neutral-100)'}
                ><DetIconDoc /> Ver documentos</button>
              )}
              {/* Baixar espelho: sempre visível */}
              <button style={btnSecondary}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-neutral-200)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--color-neutral-100)'}
              ><DetIconDownload /> Baixar espelho</button>
              {/* 08 — Indicar condutor: só quando é possível indicar */}
              {STATUS_PODE_INDICAR.has(ait.statusVariant) && (
                <button style={btnPrimary}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-600)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary-500)'}
                ><DetIconUser /> Indicar condutor</button>
              )}
              {/* 09 — Pagar multa: só quando é possível pagar pela plataforma */}
              {STATUS_PODE_PAGAR.has(ait.statusVariant) && (
                <button style={btnPrimary}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-600)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary-500)'}
                ><DetIconDollar /> Pagar multa</button>
              )}
              <button style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 40, height: 40, padding: 12,
                border: '1px solid var(--color-neutral-400)', borderRadius: 8,
                background: moreMenuOpen ? 'var(--color-neutral-200)' : 'var(--color-neutral-100)',
                color: 'var(--color-neutral-700)', cursor: 'pointer',
              }}
                onClick={e => { const rect = e.currentTarget.getBoundingClientRect(); setMoreAnchorRect(rect); setMoreMenuOpen(!moreMenuOpen); }}
                onMouseEnter={e => { if (!moreMenuOpen) e.currentTarget.style.background = 'var(--color-neutral-200)'; }}
                onMouseLeave={e => { if (!moreMenuOpen) e.currentTarget.style.background = 'var(--color-neutral-100)'; }}
              ><DetIconMoreVert /></button>
              {moreMenuOpen && <MoreDropdown onClose={() => setMoreMenuOpen(false)} anchorRect={moreAnchorRect} tipo={ait.tipo} />}
            </div>
          </div>

          {/* Tab bar — pill container (Figma style) — ocultável via SHOW_DETAIL_TABS */}
          {SHOW_DETAIL_TABS && (
          <div style={{
            background: 'var(--color-neutral-100)',
            border: '1px solid var(--color-neutral-300)',
            borderRadius: 8, padding: 4,
            display: 'flex', gap: 0,
          }}>
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  flex: 1, padding: '8px 8px', cursor: 'pointer',
                  border: isActive ? '1px solid var(--color-primary-400)' : '1px solid transparent',
                  background: isActive ? 'var(--color-primary-200)' : 'transparent',
                  borderRadius: 8, whiteSpace: 'nowrap', transition: 'all .15s',
                  fontSize: 14, fontWeight: 700, color: 'var(--color-neutral-900)',
                  fontFamily: 'var(--font-family-primary)',
                }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--color-neutral-200)'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                >{tab.label}</button>
              );
            })}
          </div>
          )}

          {/* Layout persistente: Resumo + conteúdo da tab */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>

            {/* ── Sidebar Resumo (sempre visível) ── */}
            <div style={{
              width: 280, flexShrink: 0,
              background: 'var(--color-neutral-100)',
              border: '1px solid var(--color-neutral-300)',
              borderRadius: 8, padding: 24,
              display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              {/* Header */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 4, flexShrink: 0,
                    background: 'var(--color-primary-200)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--color-primary-600)',
                  }}><DetIconDoc /></div>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-neutral-900)', fontFamily: 'var(--font-family-primary)' }}>Resumo</span>
                </div>
                <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />
              </div>

              {/* DATA DA MULTA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-neutral-700)', fontFamily: 'var(--font-family-primary)' }}>Data da multa</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-neutral-900)', fontFamily: 'var(--font-family-primary)' }}>{ait.dataInfracao} {ait.horaInfracao}</span>
              </div>
              <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />

              {/* PLACA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-neutral-700)', fontFamily: 'var(--font-family-primary)' }}>Placa</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-neutral-900)', fontFamily: 'var(--font-family-primary)' }}>{ait.placa}</span>
              </div>
              <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />

              {/* VALOR */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-neutral-700)', fontFamily: 'var(--font-family-primary)' }}>Valor</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-neutral-900)', fontFamily: 'var(--font-family-primary)' }}>{ait.valor}</span>
                  <span style={{
                    padding: '2px 8px', borderRadius: 1000,
                    background: 'var(--color-neutral-300)', color: 'var(--color-neutral-800)',
                    fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.03em', fontFamily: 'var(--font-family-primary)', whiteSpace: 'nowrap',
                  }}>{ait.valorDesconto} - com desconto</span>
                </div>
              </div>
              <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />

              {/* PRAZO DE INDICAÇÃO/DEFESA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-neutral-700)', fontFamily: 'var(--font-family-primary)' }}>Prazo de indicação/defesa</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-neutral-900)', fontFamily: 'var(--font-family-primary)' }}>{ait.prazoIndicacao}</span>
                  <Tooltip text="Prazo oficial do órgão">
                    <span style={{ color: 'var(--color-neutral-400)', display: 'inline-flex', cursor: 'default' }}><DetIconInfo /></span>
                  </Tooltip>
                </div>
                {ait.prazoIndicacaoDias > 0 && (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '2px 8px', borderRadius: 100, width: 'fit-content',
                    background: ait.prazoIndicacaoDias <= 5 ? 'var(--color-error-100)' : ait.prazoIndicacaoDias <= 15 ? 'var(--color-warning-100)' : 'var(--color-neutral-200)',
                    color: ait.prazoIndicacaoDias <= 5 ? 'var(--color-error-700)' : ait.prazoIndicacaoDias <= 15 ? 'var(--color-warning-700)' : 'var(--color-neutral-700)',
                    fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-family-primary)',
                  }}><DetIconClock /> {ait.prazoIndicacaoDias} dias restantes</span>
                )}
              </div>
              <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />

              {/* CONDUTOR RESPONSÁVEL */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-neutral-700)', fontFamily: 'var(--font-family-primary)' }}>Condutor responsável</span>
                {ait.condutor ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 14, fontWeight: 700, color: 'var(--color-primary-600)', fontFamily: 'var(--font-family-primary)', cursor: 'pointer' }}>
                    {ait.condutor.nome} <DetIconLinkOut />
                  </span>
                ) : (
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-neutral-900)', fontFamily: 'var(--font-family-primary)' }}>—</span>
                )}
              </div>
            </div>

            {/* ── Área de conteúdo da tab ── */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>

              {SHOW_DETAIL_TABS && activeTab === 'acompanhe' && (
                <div style={{
                  background: 'var(--color-neutral-100)',
                  border: '1px solid var(--color-neutral-300)',
                  borderRadius: 8, padding: 32,
                  display: 'flex', flexDirection: 'column', gap: 16,
                }}>
                <PanelHeader icon={<DetIconBell />} title="Histórico" />

                {(!ait.timeline || ait.timeline.length === 0) ? (
                  <DetBlockEmptyState
                    title="Ainda não há dados da indicação de condutor"
                    description="Quando o processo de indicação de condutor for iniciado, as informações aparecerão aqui."
                  />
                ) : (
                  <>
                    {/* Badge de tipo de indicação */}
                    {ait.indicacaoTipo && (
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '4px 10px', borderRadius: 6, width: 'fit-content',
                        background: ait.indicacaoTipo === 'sne' ? 'var(--color-information-100)' : 'var(--color-neutral-200)',
                        border: `1px solid ${ait.indicacaoTipo === 'sne' ? 'var(--color-information-300)' : 'var(--color-neutral-400)'}`,
                        fontSize: 12, fontWeight: 700,
                        color: ait.indicacaoTipo === 'sne' ? 'var(--color-information-700)' : 'var(--color-neutral-700)',
                      }}>
                        {ait.indicacaoTipo === 'sne' ? <DetIconUser /> : <DetIconUploadCloud />}
                        {ait.indicacaoTipo === 'sne' ? 'Indicação via CPF' : 'Indicação via Formulário'}
                      </div>
                    )}

                    {/* Timeline */}
                    <div style={{ position: 'relative' }}>
                      {ait.timeline.map((event, i) => {
                        const isFirst = i === 0;
                        const isLast = i === ait.timeline.length - 1;
                        const isMail = event.type === 'mail';
                        return (
                          <div key={event.id} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                            {/* Dot column */}
                            <div style={{
                              width: 10, flexShrink: 0,
                              display: 'flex', flexDirection: 'column', alignItems: 'center',
                              alignSelf: 'stretch',
                            }}>
                              <div style={{ width: 1, height: isFirst ? 0 : 12, background: 'var(--color-neutral-300)', flexShrink: 0 }} />
                              <div style={{
                                width: isMail ? 6 : 10, height: isMail ? 6 : 10,
                                borderRadius: '50%', flexShrink: 0,
                                background: getDotColor(event.type),
                                margin: isMail ? '2px 2px' : 0,
                              }} />
                              {!isLast && <div style={{ width: 1, flex: 1, minHeight: 8, background: 'var(--color-neutral-300)' }} />}
                            </div>
                            {/* Card */}
                            <div style={{ flex: 1, minWidth: 0, paddingBottom: isLast ? 0 : 8 }}>
                              <TLEvent event={event} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
              )}

              {activeTab === 'informacoes' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: 'var(--font-family-primary)' }}>

              {/* ── Bloco 1: Dados da multa ── */}
              <div style={{
                background: 'var(--color-neutral-100)', border: '1px solid var(--color-neutral-300)',
                borderRadius: 8, padding: 32, display: 'flex', flexDirection: 'column', gap: 20,
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 6, flexShrink: 0, background: 'var(--color-primary-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-600)' }}><DetIconDoc /></div>
                    <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-neutral-900)' }}>Dados da multa</span>
                  </div>
                  <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />
                </div>
                <div style={{ padding: '0 16px' }}>
                  <InfoField label="Código da infração / Enquadramento" value={`${ait.codigoInfracao} — ${ait.nomeInfracao}`} />
                </div>
                <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />
                <InfoRow>
                  <InfoField label="AIT" value={aitId} />
                  <InfoField label="AIT Original" value={ait.aitOriginal} />
                  <InfoField label="Data de Criação" value={ait.dataCriacao} />
                  <InfoField label="Gravidade" value={ait.gravidade} />
                </InfoRow>
                <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />
                <InfoRow>
                  <InfoField label="Pontos" value={ait.pontos} />
                  <InfoField label="Gravidade" value={ait.gravidade} />
                  <InfoField label="Multiplicador" value={ait.multiplicador} />
                  <InfoField label="Tipo" value={ait.tipo} />
                </InfoRow>
                <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />
                <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
                  <div style={{ flex: '2 0 0', padding: '0 16px', minWidth: 0 }}><InfoField label="Órgão Autuador" value={ait.orgao} /></div>
                  <VDivider />
                  <div style={{ flex: '1 0 0', padding: '0 16px', minWidth: 0 }}><InfoField label="Valor com Desconto" value={ait.valorDesconto} /></div>
                  <VDivider />
                  <div style={{ flex: '1 0 0', padding: '0 16px', minWidth: 0 }}><InfoField label="Valor" value={ait.valor} /></div>
                </div>
                <SectionLabel label="Local" />
                <InfoRow>
                  <InfoField label="Endereço" value={ait.enderecoCompleto} />
                  <InfoField label="Cidade" value={ait.cidade} />
                  <InfoField label="Bairro" value={ait.bairro} />
                  <InfoField label="UF" value={ait.uf} />
                </InfoRow>
                <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />
                <InfoRow>
                  <InfoField label="Data da Infração" value={ait.dataInfracao} />
                  <InfoField label="Hora da Infração" value={ait.horaInfracao} />
                </InfoRow>
                <SectionLabel label="Notificação" />
                <InfoRow>
                  <InfoField label="Data da Notificação" value={ait.dataNotificacao} />
                  <InfoField label="Data da Emissão da Notificação" value={ait.dataEmissaoNotificacao} />
                  <InfoField label="Limite de Indicação / Defesa" value={ait.prazoIndicacao} />
                </InfoRow>
                <SectionLabel label="Tratamento" />
                <InfoRow>
                  <InfoField label="Infrator" value={ait.infrator} />
                  <InfoField label="Conduta Adequada?" value={ait.condutaAdequada} />
                  <InfoField label="Suspende a CNH?" value={ait.suspendeCNH} />
                  <InfoField label="Infração Tratada" value={ait.infracaoTratada} />
                </InfoRow>
                <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />
                <InfoRow>
                  <InfoField label="Recorrível?" value={ait.recorrivel} />
                  <InfoField label="RENAINF?" value={ait.renainf} />
                </InfoRow>
              </div>

              {/* ── Bloco 2: Dados do veículo ── */}
              <div style={{
                background: 'var(--color-neutral-100)', border: '1px solid var(--color-neutral-300)',
                borderRadius: 8, padding: 32, display: 'flex', flexDirection: 'column', gap: 20,
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 6, flexShrink: 0, background: 'var(--color-primary-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-600)' }}><DetIconCar /></div>
                    <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-neutral-900)' }}>Dados do veículo</span>
                  </div>
                  <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />
                </div>
                <InfoRow>
                  <InfoField label="Placa do Veículo" value={ait.placa} />
                  <InfoField label="RENAVAM" value={ait.renavam} />
                  <InfoField label="Empresa" value={ait.empresa} />
                </InfoRow>
              </div>

              {/* ── Bloco 3: Dados do pagamento ── */}
              <div style={{
                background: 'var(--color-neutral-100)', border: '1px solid var(--color-neutral-300)',
                borderRadius: 8, padding: 32, display: 'flex', flexDirection: 'column', gap: 20,
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 6, flexShrink: 0, background: 'var(--color-primary-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-600)' }}><DetIconDollar /></div>
                    <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-neutral-900)' }}>Dados do pagamento</span>
                  </div>
                  <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />
                </div>
                <InfoRow>
                  <InfoField label="Valor" value={ait.valor} />
                  <InfoField label="Valor com Desconto" value={ait.valorDesconto} />
                  <InfoField label="Valor Pago" value={ait.valorPago} />
                  <InfoField label="Valor Descontado Condutor" value={ait.valorDescontadoCondutor} />
                </InfoRow>
                <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />
                <InfoRow>
                  <InfoField label="Data de Vencimento" value={ait.dataVencimento} />
                  <InfoField label="Data de Pagamento" value={ait.dataPagamento} />
                  <InfoField label="Centro de Custo" value={ait.centroCusto} />
                  <InfoField label="Pago?" value={ait.pago} />
                </InfoRow>
                <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />
                <InfoRow>
                  <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-neutral-700)' }}>Status Solicitação Boleto</span>
                    {ait.statusBoletoSne === 'BOLETO DISPONÍVEL' ? (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 20, width: 'fit-content',
                        background: '#e8f3ea', color: '#405c44',
                        fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em',
                      }}>{ait.statusBoletoSne}</span>
                    ) : (
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-neutral-900)' }}>{ait.statusBoletoSne || '—'}</span>
                    )}
                  </div>
                  <InfoField label="Desconto Condutor Aplicado?" value={ait.descontoCondutorAplicado} />
                </InfoRow>
              </div>

              {/* ── Bloco 4: Condutor responsável ── */}
              <div style={{
                background: 'var(--color-neutral-100)', border: '1px solid var(--color-neutral-300)',
                borderRadius: 8, padding: 32, display: 'flex', flexDirection: 'column', gap: 20,
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 6, flexShrink: 0, background: 'var(--color-primary-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-600)' }}><DetIconUser /></div>
                    <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-neutral-900)' }}>Condutor responsável</span>
                  </div>
                  <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />
                </div>
                {(!ait.condutor && !ait.cnhCondutor && !ait.rgCondutor && !ait.dataIndicacao2) ? (
                  <DetBlockEmptyState
                    title="Você ainda não possui um condutor responsável"
                    description="Realize a indicação do condutor para transferir a responsabilidade da infração para ele ou vincule um condutor"
                  />
                ) : (
                  <>
                    <InfoRow>
                      <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
                        <span style={{ fontSize: 12, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-neutral-700)' }}>Condutor Indicado</span>
                        {ait.condutor ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 14, fontWeight: 700, color: 'var(--color-primary-600)' }}>
                            {ait.condutor.nome} <DetIconLinkOut />
                          </span>
                        ) : (
                          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-neutral-900)' }}>—</span>
                        )}
                      </div>
                      <InfoField label="CNH" value={ait.cnhCondutor} />
                      <InfoField label="Número da Cédula da CNH" value={ait.cedulaCnh} />
                    </InfoRow>
                    <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />
                    <InfoRow>
                      <InfoField label="RG" value={ait.rgCondutor} />
                      <InfoField label="Data da Indicação" value={ait.dataIndicacao2} />
                    </InfoRow>
                  </>
                )}
              </div>

              {/* ── Bloco 6: Anexos ── */}
              <div style={{
                background: 'var(--color-neutral-100)', border: '1px solid var(--color-neutral-300)',
                borderRadius: 8, padding: 32, display: 'flex', flexDirection: 'column', gap: 20,
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 6, flexShrink: 0, background: 'var(--color-primary-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-600)' }}><DetIconPaperclip /></div>
                      <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-neutral-900)' }}>Anexos</span>
                    </div>
                    <button style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '6px 14px', borderRadius: 8,
                      border: '1px solid var(--color-primary-500)',
                      background: 'transparent', color: 'var(--color-primary-600)',
                      fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-family-primary)',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-100)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    ><DetIconPlus /> Adicionar</button>
                  </div>
                  <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />
                </div>
                {ait.anexos && ait.anexos.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', padding: '8px 16px', borderBottom: '1px solid var(--color-neutral-300)' }}>
                      {['Tipo', 'Nome', 'Data de Inclusão', 'Vencimento', 'Ações'].map((col, idx) => (
                        <span key={col} style={{ flex: idx === 4 ? '0 0 80px' : 1, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-neutral-700)', textAlign: idx === 4 ? 'center' : 'left' }}>{col}</span>
                      ))}
                    </div>
                    {ait.anexos.map((a, i) => (
                      <div key={i} style={{ display: 'flex', padding: '12px 16px', borderBottom: i < ait.anexos.length - 1 ? '1px solid var(--color-neutral-200)' : 'none', alignItems: 'center' }}>
                        <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'var(--color-primary-600)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>{a.tipo} <DetIconLinkOut /></span>
                        <span style={{ flex: 1, fontSize: 13, color: 'var(--color-neutral-700)' }}>{a.nome}</span>
                        <span style={{ flex: 1, fontSize: 13, color: 'var(--color-neutral-900)' }}>{a.dataInclusao}</span>
                        <span style={{ flex: 1, fontSize: 13, color: 'var(--color-neutral-900)' }}>{a.vencimento || '—'}</span>
                        <div style={{ flex: '0 0 80px', display: 'flex', justifyContent: 'center' }}>
                          <button style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            width: 32, height: 32, borderRadius: 6,
                            border: '1px solid var(--color-neutral-300)',
                            background: 'var(--color-neutral-100)', color: 'var(--color-neutral-700)',
                            cursor: 'pointer',
                          }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-neutral-200)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'var(--color-neutral-100)'}
                          ><DetIconDownload /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <DetBlockEmptyState
                    title="Nenhum anexo cadastrado"
                    description="Os anexos ficarão disponíveis aqui"
                  />
                )}
              </div>

              {/* ── Bloco 7: Observações ── */}
              <div style={{
                background: 'var(--color-neutral-100)', border: '1px solid var(--color-neutral-300)',
                borderRadius: 8, padding: 32, display: 'flex', flexDirection: 'column', gap: 20,
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 6, flexShrink: 0, background: 'var(--color-primary-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-600)' }}><DetIconMessageSquare /></div>
                      <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-neutral-900)' }}>Observações</span>
                    </div>
                    <button style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '6px 14px', borderRadius: 8,
                      border: '1px solid var(--color-primary-500)',
                      background: 'transparent', color: 'var(--color-primary-600)',
                      fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-family-primary)',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-100)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    ><DetIconPlus /> Adicionar</button>
                  </div>
                  <div style={{ height: 1, background: 'var(--color-neutral-300)' }} />
                </div>
                {ait.observacoes && ait.observacoes.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {ait.observacoes.map((obs, i) => (
                      <div key={i} style={{
                        padding: '12px 16px', borderRadius: 8,
                        background: '#fff', border: '1px solid var(--color-neutral-300)',
                        display: 'flex', flexDirection: 'column', gap: 4,
                      }}>
                        <span style={{ fontSize: 13, color: 'var(--color-neutral-900)', fontFamily: 'var(--font-family-primary)' }}>{obs.texto}</span>
                        <span style={{ fontSize: 11, color: 'var(--color-neutral-600)', fontFamily: 'var(--font-family-primary)' }}>{obs.autor} · {obs.data}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <DetBlockEmptyState
                    title="Nenhuma observação cadastrada"
                    description="As observações ficarão disponíveis aqui"
                  />
                )}
              </div>

              </div>
              )}

            </div>{/* fim área conteúdo da tab */}
          </div>{/* fim layout persistente */}

        </div>
      </div>
    </div>
  );
}

// ─── Style helpers ─────────────────────────────────────────────────────────────
const btnSecondary = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  padding: '0 16px', height: 40,
  border: '1px solid var(--color-neutral-400)', borderRadius: 8,
  background: 'var(--color-neutral-100)',
  fontFamily: 'var(--font-family-primary)',
  fontSize: 14, fontWeight: 700, color: 'var(--color-neutral-900)',
  cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background .15s',
};

const btnPrimary = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  padding: '0 16px', height: 40,
  border: 'none', borderRadius: 8,
  background: 'var(--color-primary-500)',
  fontFamily: 'var(--font-family-primary)',
  fontSize: 14, fontWeight: 700, color: '#fff',
  cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background .15s',
};

window.AITDetail = AITDetail;
})(); // fim IIFE
