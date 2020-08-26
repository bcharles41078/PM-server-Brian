BEGIN;

TRUNCATE
    project_steps
RESTART IDENTITY CASCADE;

INSERT INTO project_steps (step_title)
VALUES
    ('Initiate'),
    ('Plan'),
    ('Execute'),
    ('Monitor & Control'),
    ('Close');
COMMIT;