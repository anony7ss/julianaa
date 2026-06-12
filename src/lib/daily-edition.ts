import type { DailyEdition, QuizQuestion } from "@/types/content";

const SAO_PAULO_TIME_ZONE = "America/Sao_Paulo";
const EDITORIAL_START_DATE_KEY = "2025-12-01";

type DailyTopic = {
  label: string;
  mood: string;
  category: string;
  tags: string[];
  headline: string;
  subtitle: string;
  note: string;
  body: string[];
  quizQuestion: string;
  quizAnswer: string;
  quizDecoys: string[];
  headlinePool: string[];
};

const dailyTopics: DailyTopic[] = [
  {
    label: "Plantao leve",
    mood: "saudade",
    category: "Plantao Saudade",
    tags: ["saudade", "chamada", "mensagem"],
    headline: "Plantao apura nova saudade antes da proxima chamada",
    subtitle: "A pauta apareceu cedo e pediu mensagem bonita, paciencia e carinho.",
    note: "O primeiro encontro segue sem data marcada, entao a redacao cobre cada detalhe com calma.",
    body: [
      "A edicao de hoje abriu com saudade discreta, daquelas que aparecem no meio do dia e pedem uma mensagem bonita.",
      "Como ainda nao existe data marcada para o primeiro encontro, a cobertura segue acompanhando conversas, lembrancas e vontade de chamada.",
      "A recomendacao oficial e simples: falar com carinho, guardar o drama para a materia e lembrar que dezembro de 2025 continua sendo o primeiro capitulo.",
    ],
    quizQuestion: "Qual e a recomendacao oficial do plantao de hoje?",
    quizAnswer: "Mensagem bonita e chamada quando der",
    quizDecoys: ["Silencio editorial", "Cancelar a pauta"],
    headlinePool: [
      "Fontes afirmam que saudade apareceu cedo e pediu cobertura especial",
      "Plantao confirma: uma mensagem bonita pode mudar o clima do dia",
      "Redacao acompanha vontade de chamada em tempo real",
    ],
  },
  {
    label: "Arquivo afetivo",
    mood: "memoria",
    category: "Momentos Historicos",
    tags: ["memoria", "conversa", "arquivo"],
    headline: "Arquivo encontra lembranca simples e transforma em manchete",
    subtitle: "Nem todo dia precisa de acontecimento enorme para virar noticia principal.",
    note: "A pauta de hoje vem de uma lembranca pequena, mas importante o bastante para ficar guardada.",
    body: [
      "A editoria de arquivo revisitou uma lembranca e decidiu que ela merecia uma pagina nova no jornal.",
      "A historia ainda tem muita coisa para acontecer, inclusive o primeiro encontro, mas ja tem material suficiente para render edicoes especiais.",
      "A conclusao da reuniao foi unanime: quando a Juu vira assunto, ate detalhe pequeno ganha cara de manchete.",
    ],
    quizQuestion: "O que o arquivo afetivo transformou em manchete hoje?",
    quizAnswer: "Uma lembranca simples",
    quizDecoys: ["Uma planilha fria", "Um assunto aleatorio"],
    headlinePool: [
      "Arquivo afetivo declara que lembranca pequena tambem merece capa",
      "Redacao revisita dezembro de 2025 e encontra pauta nova",
      "Momento simples entra para a colecao oficial do Juu News",
    ],
  },
  {
    label: "Fofoca boa",
    mood: "fofura",
    category: "Fofocas do Amor",
    tags: ["fofura", "elogio", "redacao"],
    headline: "Bastidores indicam que Juliana segue sendo o assunto favorito",
    subtitle: "A investigacao nao encontrou neutralidade, mas encontrou muitos motivos.",
    note: "A pauta muda todo dia, mas a fonte principal continua a mesma: carinho sem economia.",
    body: [
      "A equipe de bastidores apurou novas evidencias de que falar da Juu melhora a pauta, o humor e ate a escolha da manchete.",
      "Nao houve tentativa real de imparcialidade, porque o caso envolve carinho demais para caber em uma nota seca.",
      "O fechamento da edicao recomenda elogio espontaneo, uma frase bonita e uma foto de gato para acompanhar.",
    ],
    quizQuestion: "Qual e a fonte principal da fofoca boa de hoje?",
    quizAnswer: "Carinho sem economia",
    quizDecoys: ["Boato sem amor", "Ata de reuniao vazia"],
    headlinePool: [
      "Departamento de Fofura confirma nova pauta sobre a Juu",
      "Bastidores apontam excesso de carinho na edicao do dia",
      "Fontes proximas a redacao recomendam elogio imediato",
    ],
  },
  {
    label: "Laudo oficial",
    mood: "investigacao",
    category: "Crimes de Fofura",
    tags: ["laudo", "fofura", "sorriso"],
    headline: "Laudo do dia aponta risco alto de sorriso virar noticia",
    subtitle: "Peritos dizem que a unica resposta possivel e admirar com responsabilidade.",
    note: "A edicao automatica escolheu uma investigacao leve para deixar a capa menos previsivel.",
    body: [
      "O setor de investigacoes analisou o caso e encontrou sinais claros de fofura em nivel editorial.",
      "Segundo o laudo, uma conversa boa pode mudar a temperatura do dia e transformar qualquer silencio em vontade de escrever.",
      "A materia segue aberta, porque novas evidencias podem surgir a qualquer momento em forma de mensagem, foto ou risada.",
    ],
    quizQuestion: "Qual foi o risco apontado pelo laudo de hoje?",
    quizAnswer: "Sorriso virar noticia",
    quizDecoys: ["A pauta ficar sem carinho", "O gato perder a pose"],
    headlinePool: [
      "Peritos apontam fofura em nivel editorial na pauta do dia",
      "Investigacao encontra sinais de sorriso com alto impacto emocional",
      "Laudo recomenda admiracao continua e elogios bem escritos",
    ],
  },
  {
    label: "Carta curta",
    mood: "declaracao",
    category: "Declaracoes Oficiais",
    tags: ["declaracao", "carta", "carinho"],
    headline: "Declaracao curta ganha status de comunicado oficial",
    subtitle: "A redacao decidiu que uma frase bem colocada tambem merece capa.",
    note: "Hoje a troca automatica priorizou um texto mais intimo, sem exagerar no rotulo.",
    body: [
      "O comunicado de hoje nao tenta ser enorme. Ele so registra que a Juu continua sendo uma noticia boa dentro da rotina.",
      "A distancia ainda faz parte da pauta, mas nao ocupa o titulo principal. O destaque fica para o carinho que segue aparecendo.",
      "No fim da edicao, a redacao aprovou uma regra simples: quando faltar assunto, escreve-se com verdade.",
    ],
    quizQuestion: "O que ganhou status de comunicado oficial hoje?",
    quizAnswer: "Uma frase bem colocada",
    quizDecoys: ["Uma previsao sem graca", "Um ranking cancelado"],
    headlinePool: [
      "Comunicado oficial registra carinho sem precisar de data exata",
      "Declaracao do dia escolhe ser curta, bonita e direta",
      "Redacao aprova frase simples como pauta principal",
    ],
  },
  {
    label: "Ranking do dia",
    mood: "premio",
    category: "Juliana Awards",
    tags: ["ranking", "awards", "premio"],
    headline: "Juliana Awards abre nova categoria so para elogiar de novo",
    subtitle: "A concorrencia tentou participar, mas a pauta ja tinha vencedora.",
    note: "O algoritmo alterna categorias para a home nao parecer sempre igual.",
    body: [
      "A cerimonia diaria abriu com uma categoria improvisada: melhor motivo para sorrir ao ver uma mensagem.",
      "O resultado saiu rapido, porque a redacao nao encontrou candidata mais forte que a Juu.",
      "A premiacao de hoje sera entregue em forma de manchete, frase bonita e um gato dramatico na editoria.",
    ],
    quizQuestion: "Qual categoria improvisada abriu o Juliana Awards de hoje?",
    quizAnswer: "Melhor motivo para sorrir ao ver uma mensagem",
    quizDecoys: ["Melhor desculpa para ignorar a pauta", "Melhor silencio do dia"],
    headlinePool: [
      "Awards diario entrega mais um premio simbolico para Juliana",
      "Nova categoria confirma favoritismo absoluto da Juu",
      "Juri afetivo aprova premiacao sem pedido de recontagem",
    ],
  },
  {
    label: "Gato editor",
    mood: "gatos",
    category: "Gatos da Redacao",
    tags: ["gatos", "redacao", "fofo"],
    headline: "Gato editor assume a capa e exige pauta mais fofa",
    subtitle: "A equipe obedeceu imediatamente e escolheu uma noticia com cara de carinho.",
    note: "Quando a pauta precisa de leveza, os gatos entram como foto oficial da edicao.",
    body: [
      "O gato editor apareceu na reuniao de pauta e vetou qualquer noticia sem fofura suficiente.",
      "Depois da avaliacao, a capa ganhou mais leveza, mais carinho e uma recomendacao expressa de visitar a galeria.",
      "A redacao informa que novos gatos podem assumir outras edicoes sem aviso previo.",
    ],
    quizQuestion: "O que o gato editor exigiu na capa de hoje?",
    quizAnswer: "Uma pauta mais fofa",
    quizDecoys: ["Uma pauta sem imagem", "Um jornal sem carinho"],
    headlinePool: [
      "Gato da redacao aprova edicao com alto indice de fofura",
      "Capa do dia ganha reforco felino e clima mais leve",
      "Editor felino recomenda noticia bonita e foto dramatica",
    ],
  },
  {
    label: "Hoje recomendado",
    mood: "rotina",
    category: "Hoje no Juu News",
    tags: ["hoje", "rotina", "recomendado"],
    headline: "Edicao de hoje recomenda uma pausa para pensar na Juu",
    subtitle: "A noticia nao precisa ser urgente para merecer atencao.",
    note: "A troca diaria tambem muda quiz, frase e ordem das noticias principais.",
    body: [
      "A pauta recomendada do dia e simples: parar um minuto, lembrar da Juu e deixar o site trocar de assunto sozinho.",
      "A edicao automatica reorganiza manchetes, quiz e destaques usando a data atual no horario de Sao Paulo.",
      "A ideia e manter o blog vivo sem inventar fatos demais: todo dia uma nova capa, com o mesmo cuidado no tom.",
    ],
    quizQuestion: "O que a edicao automatica muda todo dia?",
    quizAnswer: "Manchetes, quiz e destaques",
    quizDecoys: ["A senha do admin", "O nome do site"],
    headlinePool: [
      "Hoje no Juu News mistura frase, gato e noticia recomendada",
      "Edicao automatica reorganiza a capa sem perder o tom",
      "Pauta diaria deixa o blog vivo com novas combinacoes",
    ],
  },
];

export function getSaoPauloDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SAO_PAULO_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const getPart = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${getPart("year")}-${getPart("month")}-${getPart("day")}`;
}

export function getDailyEdition(date = new Date()): DailyEdition {
  const dateKey = getSaoPauloDateKey(date);
  const issueNumber = getIssueNumber(dateKey);
  const topic = pickBySeed(dailyTopics, `${dateKey}:topic`);
  const secondaryHeadline = pickBySeed(topic.headlinePool, `${dateKey}:secondary-headline`);
  const tertiaryHeadline = pickBySeed(
    dailyTopics.flatMap((item) => item.headlinePool),
    `${dateKey}:tertiary-headline`,
  );

  const quizQuestion: QuizQuestion = {
    question: topic.quizQuestion,
    options: orderBySeed([topic.quizAnswer, ...topic.quizDecoys], `${dateKey}:quiz-options`),
    answer: topic.quizAnswer,
  };

  return {
    dateKey,
    issueNumber,
    label: `Edicao ${issueNumber}`,
    mood: topic.mood,
    headline: topic.headline,
    subtitle: topic.subtitle,
    note: topic.note,
    category: topic.category,
    tags: topic.tags,
    generatedPost: {
      title: topic.headline,
      subtitle: topic.subtitle,
      body: topic.body,
    },
    quizQuestion,
    headlinePool: [topic.headline, secondaryHeadline, tertiaryHeadline],
  };
}

export function getDailyQuizQuestions(baseQuestions: QuizQuestion[], date = new Date()) {
  const edition = getDailyEdition(date);
  const rotatedQuestions = orderBySeed(baseQuestions, `${edition.dateKey}:quiz-base`);

  return [edition.quizQuestion, ...rotatedQuestions].slice(0, Math.min(5, baseQuestions.length + 1));
}

export function getDailyPostOrder<T extends { id?: string; slug?: string; title?: string }>(
  items: T[],
  date = new Date(),
  salt = "posts",
) {
  const dateKey = getSaoPauloDateKey(date);

  return orderBySeed(items, `${dateKey}:${salt}`, (item, index) => item.id ?? item.slug ?? item.title ?? String(index));
}

function pickBySeed<T>(items: T[], seed: string) {
  return items[hashString(seed) % items.length];
}

function orderBySeed<T>(items: T[], seed: string, getKey: (item: T, index: number) => string = (_, index) => String(index)) {
  return items
    .map((item, index) => ({
      item,
      index,
      score: hashString(`${seed}:${getKey(item, index)}`),
    }))
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .map(({ item }) => item);
}

function getIssueNumber(dateKey: string) {
  return Math.max(1, daysBetween(EDITORIAL_START_DATE_KEY, dateKey) + 1);
}

function daysBetween(startKey: string, endKey: string) {
  return Math.floor((dateKeyToUtc(endKey) - dateKeyToUtc(startKey)) / 86_400_000);
}

function dateKeyToUtc(dateKey: string) {
  const [year = 1970, month = 1, day = 1] = dateKey.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

function hashString(input: string) {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}
