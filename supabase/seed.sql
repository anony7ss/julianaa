-- 1) Create an auth user in Supabase Auth first.
-- 2) Then replace the UUID below with that auth.users.id and run this line:
-- insert into public.profiles (id, name, role)
-- values ('00000000-0000-0000-0000-000000000000', 'Juliana Admin', 'admin')
-- on conflict (id) do update set name = excluded.name, role = excluded.role;

insert into public.categories (id, name, slug, description, color) values
  ('11111111-1111-4111-8111-111111111111', 'Ultima Hora', 'ultima-hora', 'Manchetes importantes demais para esperar.', '#971222'),
  ('22222222-2222-4222-8222-222222222222', 'Fofocas do Amor', 'fofocas-do-amor', 'Tudo que a redacao descobriu sobre esse casal.', '#c75064'),
  ('33333333-3333-4333-8333-333333333333', 'Crimes de Fofura', 'crimes-de-fofura', 'Casos gravissimos de charme, sorriso e chamego digital.', '#6f0b18'),
  ('44444444-4444-4444-8444-444444444444', 'Plantao Saudade', 'plantao-saudade', 'Cobertura ininterrupta da falta que a Juu faz.', '#a67437'),
  ('55555555-5555-4555-8555-555555555555', 'Declaracoes Oficiais', 'declaracoes-oficiais', 'Comunicados oficiais do coracao.', '#25384a'),
  ('66666666-6666-4666-8666-666666666666', 'Juliana Awards', 'juliana-awards', 'Premiacoes em que a Juliana ganha de novo.', '#6c7f70'),
  ('77777777-7777-4777-8777-777777777777', 'Momentos Historicos', 'momentos-historicos', 'Arquivo permanente de mensagens, prints e memorias online.', '#443a3d')
on conflict (id) do update set
  name = excluded.name,
  slug = excluded.slug,
  description = excluded.description,
  color = excluded.color;

insert into public.authors (id, name, avatar_url, bio) values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Redacao Juu News', null, 'Equipe oficial dedicada a investigar tudo que deixa a Juliana ainda mais incrivel.'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'Reporter Apaixonado', null, 'Correspondente enviado diretamente do coracao.'),
  ('cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'Agencia Oficial do Amor', null, 'Fonte confiavel em carinho, saudade e exageros verdadeiros.'),
  ('dddddddd-dddd-4ddd-8ddd-dddddddddddd', 'Departamento de Fofura', null, 'Peritos independentes em sorrisos perigosamente lindos.')
on conflict (id) do update set
  name = excluded.name,
  avatar_url = excluded.avatar_url,
  bio = excluded.bio;

insert into public.posts (
  id, title, slug, subtitle, content, cover_image_url, category_id, author_id,
  status, views, featured, breaking_news, tags, published_at, scheduled_at
) values
  (
    '10101010-1010-4010-8010-101010101010',
    'URGENTE: Juliana e oficialmente declarada a mulher mais linda do mundo',
    'juliana-mulher-mais-linda-do-mundo',
    'Fontes extremamente confiaveis confirmam o caso.',
    'A redacao do Juu News recebeu nesta manha um dossie completo e absolutamente imparcial confirmando que Juliana ocupa, mais uma vez, o primeiro lugar no ranking mundial de beleza, carisma e capacidade de deixar o namorado bobo.' || E'\n\n' ||
    'Especialistas ouvidos pela reportagem afirmam que o sorriso dela tem efeitos imediatos no humor, na paz interior e na vontade de escrever declaracoes dramaticas.' || E'\n\n' ||
    'O caso segue sendo acompanhado de perto, embora todos ja saibam o resultado: Juliana vence de novo.',
    '/images/cat-breaking-news.png',
    '11111111-1111-4111-8111-111111111111',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'published',
    842,
    true,
    true,
    array['verificada', 'amor', 'plantao'],
    '2026-06-07T09:00:00.000Z',
    null
  ),
  (
    '20202020-2020-4020-8020-202020202020',
    'Plantao Saudade: namorado sente falta de Juliana pela 78a vez no dia',
    'plantao-saudade-78-vezes',
    'Contador interno precisou ser recalibrado depois de nova crise de carinho.',
    'A situacao ficou seria por volta das 14h, quando o namorado olhou para o nada e percebeu que estava com saudade outra vez.' || E'\n\n' ||
    'O Departamento de Fofura informou que o indice e considerado alto, mas esperado em casos de namoro web: Juliana por perto na memoria e longe na tela.' || E'\n\n' ||
    'A recomendacao oficial e simples: mensagem bonita, foto favorita e promessa de chamada quando der.',
    '/images/cat-love-letters.png',
    '44444444-4444-4444-8444-444444444444',
    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    'published',
    678,
    true,
    false,
    array['saudade', 'rotina', 'confirmado'],
    '2026-06-06T15:30:00.000Z',
    null
  ),
  (
    '30303030-3030-4030-8030-303030303030',
    'Investigacao aponta: sorriso da Juliana pode causar dependencia emocional',
    'sorriso-da-juliana-dependencia-emocional',
    'Peritos dizem que nao ha tratamento, apenas admiracao continua.',
    'Depois de analisar registros, lembrancas e reacoes espontaneas, a equipe concluiu que o sorriso da Juliana possui alta taxa de reincidencia afetiva.' || E'\n\n' ||
    'Segundo o laudo, uma unica aparicao pode melhorar o dia inteiro e ainda deixar vestigios de felicidade por horas.' || E'\n\n' ||
    'A defesa argumenta que ela nao tem culpa de ser assim. A redacao concorda.',
    '/images/cat-news-editor.png',
    '33333333-3333-4333-8333-333333333333',
    'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
    'published',
    731,
    false,
    false,
    array['sorriso', 'laudo', 'fofura'],
    '2026-06-05T18:45:00.000Z',
    null
  ),
  (
    '40404040-4040-4040-8040-404040404040',
    'Especialistas confirmam que mensagem da Juu resolve 99% dos problemas',
    'mensagem-da-juu-resolve-problemas',
    'O 1% restante pede outra chamada.',
    'Um estudo conduzido sem nenhuma neutralidade emocional constatou que uma mensagem da Juu e capaz de reorganizar pensamentos, acalmar o mundo e fazer qualquer dia parecer mais leve.' || E'\n\n' ||
    'A metodologia incluiu conversa online, vontade de chamada e uma saudade de namoro web que nao colabora.' || E'\n\n' ||
    'O resultado foi unanime: mensagem da Juu deveria ser patrimonio oficial.',
    '/images/cat-rose-nap.png',
    '55555555-5555-4555-8555-555555555555',
    'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    'published',
    589,
    true,
    false,
    array['mensagem', 'oficial', 'bem-estar'],
    '2026-06-04T12:00:00.000Z',
    null
  ),
  (
    '50505050-5050-4050-8050-505050505050',
    'Juliana Awards: premio de pessoa mais incrivel vai para Juliana novamente',
    'juliana-awards-pessoa-mais-incrivel',
    'A concorrencia pediu recontagem, mas o resultado continuou igual.',
    'Desde dezembro de 2025, a categoria Pessoa Mais Incrivel tem uma favorita absoluta: Juliana.' || E'\n\n' ||
    'A cerimonia contou com mensagens, risadas e aquele orgulho bobo de quem sabe que encontrou uma raridade mesmo a distancia.' || E'\n\n' ||
    'A organizacao informou que o trofeu sera entregue em forma de carinho, elogios e uma materia especial.',
    '/images/cat-news-editor.png',
    '66666666-6666-4666-8666-666666666666',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'published',
    914,
    true,
    false,
    array['awards', 'premio', 'juliana'],
    '2026-06-03T20:00:00.000Z',
    null
  )
on conflict (id) do update set
  title = excluded.title,
  slug = excluded.slug,
  subtitle = excluded.subtitle,
  content = excluded.content,
  cover_image_url = excluded.cover_image_url,
  category_id = excluded.category_id,
  author_id = excluded.author_id,
  status = excluded.status,
  views = excluded.views,
  featured = excluded.featured,
  breaking_news = excluded.breaking_news,
  tags = excluded.tags,
  published_at = excluded.published_at,
  scheduled_at = excluded.scheduled_at;

insert into public.love_quotes (id, quote, active) values
  ('90000000-0000-4000-8000-000000000001', 'Se eu sei o que e amor, e porque todo caminho meu aprendeu seu nome.', true),
  ('90000000-0000-4000-8000-000000000002', 'Toda noticia boa do meu dia parece ter voce como fonte.', true),
  ('90000000-0000-4000-8000-000000000003', 'O mundo fica mais gentil quando eu penso no seu sorriso.', true)
on conflict (id) do update set quote = excluded.quote, active = excluded.active;

insert into public.timeline_events (id, title, description, event_date, image_url) values
  ('80000000-0000-4000-8000-000000000001', 'O primeiro capitulo', 'Dezembro de 2025: o mes em que a conversa virou manchete principal.', '2025-12-01', '/images/cat-news-editor.png'),
  ('80000000-0000-4000-8000-000000000002', 'A primeira saudade web oficial', 'Quando a redacao percebeu que namoro web tambem vira pauta urgente.', '2026-01-01', '/images/cat-love-letters.png'),
  ('80000000-0000-4000-8000-000000000003', 'Primeiro encontro em pauta', 'A editoria ainda nao sabe quando vai acontecer, mas ja trata o assunto como cobertura especial.', '2026-06-01', '/images/cat-rose-nap.png')
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  event_date = excluded.event_date,
  image_url = excluded.image_url;

insert into public.rankings (id, title, description) values
  ('70000000-0000-4000-8000-000000000001', 'Top 5 motivos da Juliana ser perfeita', 'A lista oficial, revisada por nenhuma pessoa imparcial.'),
  ('70000000-0000-4000-8000-000000000002', 'Top 5 frases classicas dela', 'Arquivo afetivo das expressoes que merecem coluna fixa.')
on conflict (id) do update set title = excluded.title, description = excluded.description;

insert into public.ranking_items (id, ranking_id, position, title, description) values
  ('71000000-0000-4000-8000-000000000001', '70000000-0000-4000-8000-000000000001', 1, 'O sorriso que muda o dia', 'Tem efeito imediato e comprovado na felicidade.'),
  ('71000000-0000-4000-8000-000000000002', '70000000-0000-4000-8000-000000000001', 2, 'O jeito de cuidar', 'Carinho nos detalhes, do tipo que fica na memoria.'),
  ('71000000-0000-4000-8000-000000000003', '70000000-0000-4000-8000-000000000001', 3, 'A risada', 'Trilha sonora oficial das melhores noticias.'),
  ('71000000-0000-4000-8000-000000000004', '70000000-0000-4000-8000-000000000001', 4, 'A paciencia com meus dramas', 'Categoria especial reconhecida pela redacao.'),
  ('71000000-0000-4000-8000-000000000005', '70000000-0000-4000-8000-000000000001', 5, 'Ser a Juu', 'Nao precisa explicar. E justamente isso.'),
  ('72000000-0000-4000-8000-000000000001', '70000000-0000-4000-8000-000000000002', 1, 'Depois eu vejo', 'Promessa que a redacao respeita com carinho.'),
  ('72000000-0000-4000-8000-000000000002', '70000000-0000-4000-8000-000000000002', 2, 'Para de drama', 'Emitida quando o reporter apaixonado exagera na saudade.'),
  ('72000000-0000-4000-8000-000000000003', '70000000-0000-4000-8000-000000000002', 3, 'Que lindo', 'A frase que deixa qualquer pauta melhor.')
on conflict (id) do update set
  ranking_id = excluded.ranking_id,
  position = excluded.position,
  title = excluded.title,
  description = excluded.description;
