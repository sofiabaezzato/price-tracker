import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
      baseUrl: 'http://localhost:3000',
      
    },
    env: {
      test_email: "",
      test_password: ""
    },
    chromeWebSecurity: false,
  },
);
