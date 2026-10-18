-- Rode isto no SQL Editor do seu projeto Supabase (é um passo único).
-- Cria a única tabela usada pelo jafuiplaneta: guarda todo o app
-- (filmes, perfil, nome) como um JSON, numa única linha.

create table if not exists app_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- Deixa a tabela liberada para leitura e escrita usando a chave "anon"
-- (a chave pública do projeto). Como é um app pessoal, sem login, não há
-- necessidade de autenticação — só quem tiver o link do site consegue usar.
alter table app_state enable row level security;

create policy "permitir leitura" on app_state
  for select using (true);

create policy "permitir escrita" on app_state
  for insert with check (true);

create policy "permitir atualizacao" on app_state
  for update using (true);
