const xss = require('xss')

const typesService = {
  getAllTypes(db, user_id) {
    return db
      .from('project_lists')
      .select('*')
      .where('user_id', user_id)
  },

  // getById(db, id) {
  //   return typesService.getAllTypes(db)
  //     .where('list.id', id)
  //     .first()
  // },

  // getById(db, id) {
  //   return db
  //     .from('project_lists AS type')
  //     .select(
  //       'type.list_id',
  //       'type.title',
  //       'type.date_created',
  //       'type.user_id',
  //       db.raw(
  //         `json_strip_nulls(
  //           row_to_json(
  //             (SELECT tmp FROM (
  //               SELECT
  //                 usr.id,
  //                 usr.user_name,
  //                 usr.full_name,
  //                 usr.nickname,
  //                 usr.date_created,
  //                 usr.date_modified
  //             ) tmp)
  //           )
  //         ) AS "user"`
  //       )
  //     )
  //     .leftJoin(
  //       'project_users AS usr',
  //       'type.user_id',
  //       'usr.id',
  //     )
  //     .where('type.id', id)
  //     .first()
  // },

  insertType(db, newType) {
    return db
      .insert(newType)
      .into('project_lists')
      .returning('*')
      .then(([type]) => type)
      // .then(type =>
      //   typesService.getById(db, type.list_id)
      // )
  },

  serializeTypes(type) {
    return {
      id: type.list_id,
      title: xss(type.title),
      date_created: new Date(type.date_created),
      user_id : xss(type.user_id)
    }
  }
}

module.exports = typesService
