function splitThreshold(threshold) {
  index = Math.max(threshold.indexOf('<'), threshold.indexOf('>'))

  if (index === -1) {
    throw new Error('Invalid threshold format')
  }

  const splittedThreshold = {
    metric: threshold.substring(0, index),
    expectedValue: threshold.substring(index)
  }

  return splittedThreshold
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

    if (thresholds === undefined) {
      continue
    }

    for (const [thresholdKey, thresholdValue] of Object.entries(thresholds)) {
      const name = key

      const pass = thresholdValue === true ? '✅ Pass' : '❌ Fail'

      const { metric, expectedValue } = splitThreshold(thresholdKey)

      const actualValue = value.hasOwnProperty(metric)
        ? value[metric]
        : value.value

      row = [name, metric, pass, expectedValue, actualValue]

      githubSummary.push(row)
    }
  }

  return githubSummary
}

module.exports = {
  parseK6Summary
}
