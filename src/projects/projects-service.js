const xss = require('xss')

const ProjectsService = {
  getAllTypes(db) {
    return db
      .from('project_details AS prj')
      .select(
        'prj.detail_id',
        'prj.project_title',
        'prj.due_date',
        'prj.project_description',
        'prj.date_created',
        'prj.list_id',
        'prj.user_id',
        
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'id', usr.id,
              'user_name', usr.user_name,
              'full_name', usr.full_name,
              'nickname', usr.nickname,
              'date_created', usr.date_created,
              'date_modified', usr.date_modified
            )
          ) AS "author"` 
        ),
      )
      .leftJoin(
        'project_lists AS type',
        'type.list_id',
        'prj.detail_id',
      )
      .leftJoin(
        'project_users AS usr',
        'prj.user_id',
        'usr.id',
      )
      .groupBy('type.list_id', 'usr.id', 'prj.detail_id')
  },

  getById(db, id) {
    return ProjectsService.getAllTypes(db)
      .where('prj.detail_id', id)
      .first()
  },

  getProjectsForTypes(db, type_id) {
    return db
      .from('project_details AS proj')
      .select(
        'proj.detail_id',
        'proj.project_title',
        'proj.project_description',
        'proj.due_date',
        'proj.date_created',
        'proj.list_id',
        'proj.user_id',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  usr.id,
                  usr.user_name,
                  usr.full_name,
                  usr.nickname,
                  usr.date_created,
                  usr.date_modified
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .where('proj.list_id', type_id)
      .leftJoin(
        'project_users AS usr',
        'proj.user_id',
        'usr.id',
      )
      .groupBy('proj.list_id', 'usr.id')
  },

  serializeProjects(proj) {
    const { author } = proj
    return {
      id: proj.detail_id,
      title: xss(proj.project_title),
      project_description: xss(proj.project_description),
      due_date: xss(proj.due_date),
      date_created: new Date(proj.date_created),
      author: {
        id: author.user_id,
        user_name: author.user_name,
        full_name: author.full_name,
        nickname: author.nickname,
        date_created: new Date(author.date_created),
        date_modified: new Date(author.date_modified) || null
      },
    }
  },

//   serializeTypes(type) {
//     const { user } = type
//     return {
//       id: type.list_id,
//       title: type.title,
//       date_created: new Date(comment.date_created),
//       user: {
//         id: user.id,
//         user_name: user.user_name,
//         full_name: user.full_name,
//         nickname: user.nickname,
//         date_created: new Date(user.date_created),
//         date_modified: new Date(user.date_modified) || null
//       },
//     }
//   },
}

module.exports = ProjectsService
