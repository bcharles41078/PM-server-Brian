CREATE TABLE project_notes (
    note_id SERIAL PRIMARY KEY,
    note TEXT NOT NULL,
    detail_id INTEGER
        REFERENCES project_details(detail_id) ON DELETE CASCADE NOT NULL
);
