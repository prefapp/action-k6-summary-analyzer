const core = require('@actions/core')
const fs = require('node:fs')
const { parseK6Summary } = require('./parse-k6-summary')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const path = core.getInput('path', { required: true })

    // Read the file
    const k6Summary = JSON.parse(fs.readFileSync(path, 'utf8'))

    const githubSummary = parseK6Summary(k6Summary)

    await core.summary.addHeading('K6 Summary').addTable(githubSummary).write()
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
