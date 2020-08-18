const xss = require('xss')

const ProjectsService = {
  getAllProjects(db, user_id) {
    return db
      .from('project_details')
      .select('*')
      .where('user_id', user_id)
  },

  getById(db, id) {
    return ProjectsService.getAllTypes(db)
      .where('detail_id', id)
      .first()
  },

  getProjectsForTypes(db, type_id, user_id) {
      return db
        .from('project_details')
        .select('*')
        .where('list_id', type_id)
        .where('user_id', user_id)
    
  },

  insertProject(db, newProject) {
    return db
      .insert(newProject)
      .into('project_details')
      .returning('*')
      .then(([project]) => project)
      // .then(type =>
      //   typesService.getById(db, type.list_id)
      // )
  },

  serializeProjects(proj) {
    const { author } = proj
    return {
      id: proj.detail_id,
      title: xss(proj.project_title),
      project_description: xss(proj.project_description),
      due_date: xss(proj.due_date),
      date_created: new Date(proj.date_created),
    }
  },
}

module.exports = ProjectsService
