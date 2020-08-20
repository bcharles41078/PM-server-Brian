const xss = require('xss')

const typesService = {
  getAllTypes(db, user_id) {
    return db
      .from('project_lists')
      .select('*')
      .where('user_id', user_id)
  },

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
