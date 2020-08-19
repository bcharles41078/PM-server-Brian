ALTER TABLE project_lists
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS project_users CASCADE;
