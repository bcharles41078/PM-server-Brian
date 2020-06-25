CREATE TABLE project_lists (
  list_id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
  user_id INTEGER
  REFERENCES project_users(id) ON DELETE CASCADE NOT NULL
);
