CREATE TABLE project_details (
    detail_id SERIAL PRIMARY KEY,
    project_title TEXT NOT NULL,
    project_description TEXT NOT NULL,
    due_date TIMESTAMPTZ NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
    list_id INTEGER
        REFERENCES project_lists(list_id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER
        REFERENCES project_users(id) ON DELETE CASCADE NOT NULL
);
