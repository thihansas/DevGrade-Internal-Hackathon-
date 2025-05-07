module.exports = {
  setupFiles: ['./jest.setup.js'],
  testEnvironment: 'node',
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './',
      outputName: 'test-results.xml'
    }]
  ]
};