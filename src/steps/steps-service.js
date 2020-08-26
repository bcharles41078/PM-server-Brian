const xss = require('xss')

const StepsService = {
  getAllSteps(db, user_id) {
    return db
      .from('project_steps')
      .select('*');
    },

    serializeSteps(step) {
        const { author } = step
        return {
          step_id: step.step_id,
          step: xss(step.step_title)
        };
    }
}
    
    module.exports = StepsService
