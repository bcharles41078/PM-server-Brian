
/* eslint-disable quotes */
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex');


function makeUsersArray() {
  return [
    {
      user_id: 1,
      name: 'admin',
      username: 'admin',
      // password = 'pass',
      password: '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG',
      nickname: 'admin'
    },
    {
      user_id: 2,
      name: 'test2',
      username: 'test2',
      //password = Password1!
      password: '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG',
      nickname: 'test2'
    },
    {
      user_id: 3,
      name: 'test3',
      username: 'test3',
      //password = Password1!
      password: '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG',
      nickname: 'test3'
    }
  ];
}
function makeProjectsArray() {
  return [
    {
      detail_id: 1,
      project_title: 'project 1',
      project_description: 'desc 1',
      dateDue: '01/01/2020'
    },
    {
      detail_id: 2,
      project_title: 'project 2',
      project_description: 'desc 2',
      dateDue: '01/01/2020'
    },
    {
      detail_id: 3,
      project_title: 'project 3',
      project_description: 'desc 3',
      dateDue: '01/01/2020'
    }
  ];
}

function seedProjects(db, projects) {
  return db.into('quotes').insert(projects)
    .then(() =>
      db.raw(
        `SELECT setval('projects_project_id_seq',?)`,
        [projects[projects.length - 1].project_id]
      )
    );
}

function seedUsers(db, users) {
  return db.into('users').insert(users)
    .then(() =>
      db.raw(
        `SELECT setval('users_user_id_seq',?)`,
        [users[users.length - 1].user_id]
      )
    );
}

function makeKnexInstance() {
  return knex({
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
  });
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      users,
      quotes,
      blessings,
      curses
      RESTART IDENTITY CASCADE`
  );
}

module.exports = {
  makeKnexInstance,
  makeUsersArray,
  makeProjectsArray,
  seedProjects,
  cleanTables,
  seedUsers,
  
  
};