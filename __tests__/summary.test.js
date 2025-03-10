/**
 * Unit tests for the action's main functionality, src/main.js
 */
const core = require('@actions/core')
const main = require('../src/main')
const path = require('node:path')
const fs = require('node:fs')
const { parseK6Summary } = require('../src/summary')

// Mock the GitHub Actions core library
const debugMock = jest.spyOn(core, 'debug').mockImplementation()
const getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
const setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
const setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('test', async () => {
    const k6Summary = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'fixtures', 'summary.json'), 'utf8')
    )

    const githubSummary = parseK6Summary(k6Summary)
  })
})
