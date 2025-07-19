import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern:'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4200',   
    viewportHeight : 1080,
    viewportWidth : 1920,
    excludeSpecPattern: ['**/1-getting-started','**/2-advanced-examples'],
    // video: true,
    // trashAssetsBeforeRuns	:true,
    // videoCompression: 23,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
