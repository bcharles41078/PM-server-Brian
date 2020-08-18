BEGIN;

TRUNCATE
    project_details,
    project_lists,
    project_users
RESTART IDENTITY CASCADE;

INSERT INTO project_users (user_name, full_name, nickname, password)
VALUES
    ('bcharles', 'Brian Charles', 'Shaggy', '2a$16$yqo9twal0Pu.Bi/UivMmSui/.BnPxD8gJWOnygCFFhuALR4fYuW06'),
    ('bcharles1', 'Brian Charles 1', 'Shaggy1', '$2a$16$EH5E4VgbtXwRIf42ayWmRuNWEaEhenpGh4NnZbDv8HEVnEo5L/FSC'),
    ('bcharles2', 'Brian Charles 2', 'Shaggy2', '$2a$16$vTWy8MLEIRQNzPsPUQLOSer3ISGYvPBWi7JjoPxelLPpgJys57VDm'),
    ('bcharles3', 'Brian Charles 3', 'Shaggy3', '$2a$16$iVhL7G0enaOd7vESDaf6J.nV0WaErswWwA0jC.YIWF1MzYkRit/5W'),
    ('bcharles4', 'Brian Charles 4', 'Shaggy4', '2a$16$oTLxa/0xr0Dc4QF/iEZ7quLS9MyJFJ4CB4QWtXpf8JnY7Z37PSDhq');

INSERT INTO project_lists (title, user_id)
VALUES
    ('Work', 1),
    ('Home', 1),
    ('School', 1),
    ('Work', 2),
    ('Home', 2),
    ('Yard', 1);

INSERT INTO project_details (project_title, project_description, due_date, list_id, user_id)
VALUES
    ('Call goal', 'Make 400 calls a day everyday this week', '06/30/2020', 1, 1),
    ('Spring Cleaning', 'Clean oven and refrigerator', '6/25/2020', 2, 3),
    ('project 3', 'do it right', '07/15/2020', 1, 1),
    ('project 4', 'do it right', '07/15/2020', 1, 1),
    ('project 5', 'do it right', '07/15/2020', 1, 1),
    ('project 6', 'do it right', '07/15/2020', 1, 1),
    ('project 13', 'do it right', '07/15/2020', 2, 3),
    ('project 14', 'do it right', '07/15/2020', 2, 3),
    ('project 15', 'do it right', '07/15/2020', 2, 3),
    ('project 16', 'do it right', '07/15/2020', 2, 3);
COMMIT;