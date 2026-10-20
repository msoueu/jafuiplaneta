-- Rode isto no SQL Editor do seu projeto Supabase.
-- Pode rodar de novo à vontade: o script é seguro para repetir.
--
-- Cria a única tabela usada pelo jafuiplaneta (guarda o app inteiro como
-- um JSON, numa única linha) e deixa só quem está LOGADO ler e gravar.

create table if not exists app_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table app_state enable row level security;

-- Remove as regras antigas (que deixavam qualquer pessoa ler e gravar).
drop policy if exists "permitir leitura" on app_state;
drop policy if exists "permitir escrita" on app_state;
drop policy if exists "permitir atualizacao" on app_state;
drop policy if exists "logado le" on app_state;
drop policy if exists "logado insere" on app_state;
drop policy if exists "logado atualiza" on app_state;

-- Novas regras: só usuários autenticados.
create policy "logado le" on app_state
  for select to authenticated using (true);

create policy "logado insere" on app_state
  for insert to authenticated with check (true);

create policy "logado atualiza" on app_state
  for update to authenticated using (true) with check (true);
