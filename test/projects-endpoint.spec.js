const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const supertest = require('supertest');
const { expect } = require('chai');

describe('Project Endpoints', function () {
  let db;
  const { testProjects } = helpers.makeFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());
  before('cleanup', () => helpers.cleanTables(db));
  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('GET /api/projects/', () => {
    beforeEach('insert project', () => {
      helpers.makeUsersArray(db, testProjects);
    });

    it('responds 200 and projects', () => {
      return supertest(app)
        .get('/api/projects/')
        .expect(200)
        .expect(res => {
          expect(res.body).to.have.property('project');
          expect(res.body).to.have.property('source');
          expect(testProjects.some(project => project.project_text === res.body.project));
          expect(testProjects.some(project => res.body.project === project.project_text ? res.body.source === project.project_source : false));
        });
    });
  });

});