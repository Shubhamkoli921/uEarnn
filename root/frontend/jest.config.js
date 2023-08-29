/** @type {import('jest').Config} */
const config = {
  moduleNameMapper: {
    axios: "axios/dist/node/axios.cjs",
  },
  testEnvironment: "jsdom",
};

export default config;
