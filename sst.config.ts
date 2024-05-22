import { SSTConfig } from "sst";
import { Web } from "./stacks";

export default {
  config(_input) {
    return {
      name: "expensify",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(Web);
  },
} satisfies SSTConfig;
