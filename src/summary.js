function splitThreshold(threshold) {
  index = Math.min(threshold.indexOf('<'), threshold.indexOf('>'))

  if (index === -1) {
    throw new Error('Invalid threshold format')
  }

  return {
    metric: threshold[index],
    expectedValue: threshold.substring(index + 1)
  }
}

function parseK6Summary(summary) {
  const { metrics } = summary

  const githubSummaryHeader = [
    { data: 'Name', header: true },
    { data: 'Metric', header: true },
    { data: 'Result', header: true },
    { data: 'Expected value', header: true },
    { data: 'Actual value', header: true }
  ]

  const githubSummary = [githubSummaryHeader]

  // iterate over the metrics key and value pairs
  for (const [key, value] of Object.entries(metrics)) {
    const { thresholds } = value

    for (const [thresholdKey, thresholdValue] of Object.entries(thresholds)) {
      const name = key

      const pass = thresholdValue === true ? '✅ Pass' : '❌ Fail'

      const { metric, expectedValue } = splitThreshold(thresholdKey)

      const actualValue =
        value[metric] !== undefined ? value[metric] : value[value]

      githubSummary.push([name, metric, pass, expectedValue, actualValue])
    }
  }
}

module.exports = {
  parseK6Summary
}
