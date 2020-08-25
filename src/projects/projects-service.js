const xss = require('xss')

const ProjectsService = {
  getAllProjects(db, user_id) {
    return db
      .from('project_details')
      .select('project.id',
        'project_title', 
        'project_description', 
        'due_date'
      )
      .where('user_id', user_id)
      .orderBy('due_date');
    },

 

  deleteProjectById(db, detail_id){
    return db
      .from('project_details')
      .where('detail_id', detail_id)
      .del();
  },

  updateProject(db, detail_id, updatedProject){
    return db 
      .from('project_details')
      .update({
        detail_id: detail_id,
        project_title: updatedProject.project_title,
        project_description: updatedProject.project_description,
        due_date: updatedProject.due_date
      })
      .where('detail_id', detail_id)
  },

  insertProject(db, newProject) {
    return db
      .insert(newProject)
      .into('project_details')
      .returning('*')
      .then(([project]) => project)
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
