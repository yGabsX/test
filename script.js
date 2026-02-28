const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

for (const tab of tabs) {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    panels.forEach((p) => p.classList.remove('active'));

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.getElementById(tab.getAttribute('aria-controls')).classList.add('active');
  });
}

const form = document.getElementById('anuncio-form');
const resultado = document.getElementById('resultado');

const priceReference = {
  jipe: 85000,
  quadriciclo: 45000,
  moto: 28000,
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const tipo = document.getElementById('tipo').value;
  const modelo = document.getElementById('modelo').value;
  const ano = Number(document.getElementById('ano').value);
  const preco = Number(document.getElementById('preco').value);
  const uso = Number(document.getElementById('uso').value);
  const estado = document.getElementById('estado').value;
  const manutencao = document.getElementById('manutencao').value;
  const mods = document.getElementById('mods').value;

  const idade = new Date().getFullYear() - ano;
  let score = 50;

  const referencia = priceReference[tipo] ?? 30000;
  const ratioPreco = preco / referencia;

  if (ratioPreco <= 0.8) score += 18;
  else if (ratioPreco <= 1.0) score += 10;
  else if (ratioPreco <= 1.2) score += 2;
  else score -= 12;

  if (idade <= 3) score += 12;
  else if (idade <= 7) score += 6;
  else if (idade <= 12) score += 1;
  else score -= 6;

  if (uso <= 15000) score += 10;
  else if (uso <= 35000) score += 4;
  else score -= 8;

  if (estado === 'excelente') score += 12;
  if (estado === 'bom') score += 6;
  if (estado === 'regular') score -= 5;
  if (estado === 'ruim') score -= 15;

  if (manutencao === 'sim') score += 10;
  if (manutencao === 'parcial') score += 3;
  if (manutencao === 'nao') score -= 10;

  if (mods.trim()) score += 2;

  score = Math.max(0, Math.min(100, score));

  let parecer = 'Não recomendado';
  let classe = 'ruim';
  let dicas = [
    'Faça vistoria completa de motor, suspensão e transmissão.',
    'Peça laudo cautelar e confira documentação.',
  ];

  if (score >= 75) {
    parecer = 'Vale a pena';
    classe = 'bom';
    dicas = [
      'Preço e condição parecem competitivos para o mercado.',
      'Ainda assim, confirme histórico de revisões e itens de segurança.',
    ];
  } else if (score >= 55) {
    parecer = 'Pode valer, com negociação';
    classe = 'medio';
    dicas = [
      'Há potencial, mas tente negociar valor e revisar itens de desgaste.',
      'Cheque pneus, freios, tração e possíveis folgas em trilha pesada.',
    ];
  }

  resultado.classList.remove('hidden');
  resultado.innerHTML = `
    <div class="score ${classe}">${parecer} • Nota ${score}/100</div>
    <p><strong>Modelo:</strong> ${modelo} (${ano})</p>
    <ul>
      ${dicas.map((dica) => `<li>${dica}</li>`).join('')}
    </ul>
    <p><small>Análise automática baseada nos dados informados. Use como apoio na decisão final.</small></p>
  `;
});

const cards = document.getElementById('cards');
const marketplaceLinks = [
  {
    title: 'Jipes 4x4 preparados para trilha',
    desc: 'Busca por jipes com foco em 4x4, snorkel, guincho e suspensão elevada.',
    url: 'https://www.facebook.com/marketplace/search/?query=jipe%204x4%20trilha',
  },
  {
    title: 'Quadriciclos para trilha',
    desc: 'Busca por quadriciclos de marcas populares para uso off-road.',
    url: 'https://www.facebook.com/marketplace/search/?query=quadriciclo%20trilha',
  },
  {
    title: 'Motos de trilha',
    desc: 'Busca por CRF, KTM, Yamaha e outras motos de trilha.',
    url: 'https://www.facebook.com/marketplace/search/?query=moto%20de%20trilha',
  },
  {
    title: 'UTV / Side by Side',
    desc: 'Busca por opções para trilhas mais técnicas e grupos.',
    url: 'https://www.facebook.com/marketplace/search/?query=utv%20side%20by%20side',
  },
  {
    title: 'Peças e acessórios off-road',
    desc: 'Busca por pneus mud, guinchos, para-choques e acessórios para trilha.',
    url: 'https://www.facebook.com/marketplace/search/?query=acess%C3%B3rios%20off-road',
  },
  {
    title: 'Anúncios recentes por preço',
    desc: 'Busca por veículos de trilha com foco em oportunidades de preço.',
    url: 'https://www.facebook.com/marketplace/search/?query=trilha%20off-road%20barato',
  },
];

cards.innerHTML = marketplaceLinks
  .map(
    (item) => `
      <article class="ad-card">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <a href="${item.url}" target="_blank" rel="noopener noreferrer">Abrir busca no Marketplace</a>
      </article>
    `,
  )
  .join('');
