BEGIN;

TRUNCATE
    project_details,
    project_lists,
    project_users
RESTART IDENTITY CASCADE;

INSERT INTO project_users (user_name, full_name, nickname, password)
VALUES
    ('bcharles', 'Brian Charles', 'Shaggy', 'password'),
    ('bcharles1', 'Brian Charles 1', 'Shaggy1', 'password1'),
    ('bcharles2', 'Brian Charles 2', 'Shaggy2', 'password2'),
    ('bcharles3', 'Brian Charles 3', 'Shaggy3', 'password3'),
    ('bcharles4', 'Brian Charles 4', 'Shaggy4', 'password4');

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
    ('Spring Cleaning', 'Clean oven and refrigerator', '6/25/2020', 2, 3);

COMMIT;