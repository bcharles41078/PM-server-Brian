const xss = require('xss')

const typesService = {
  getById(db, id) {
    return db
      .from('project_lists AS type')
      .select(
        'type.list_id',
        'type.title',
        'type.date_created',
        'type.user_id',
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
      .leftJoin(
        'project_users AS usr',
        'type.user_id',
        'usr.id',
      )
      .where('type.id', id)
      .first()
  },

  insertType(db, newType) {
    return db
      .insert(newType)
      .into('project_lists')
      .returning('*')
      .then(([type]) => type)
      .then(type =>
        TypesService.getById(db, type.list_id)
      )
  },

  serializeTypes(type) {
    const { user } = type
    return {
      id: type.list_id,
      title: xss(type.title),
      date_created: new Date(type.date_created),
      user: {
        id: user.id,
        user_name: user.user_name,
        full_name: user.full_name,
        nickname: user.nickname,
        date_created: new Date(user.date_created),
        date_modified: new Date(user.date_modified) || null
      },
    }
  }
}

module.exports = typesService
