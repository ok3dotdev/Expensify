import { NextjsSite, NextjsSiteProps, StackContext } from "sst/constructs";

const getEnv = (key: string) => {
  const value = process.env[key];

  if (!value) {
    console.log(
      `Environment variable ${key} is not set. Defaulting to an empty string.`
    );
    return "";
  }

  return value;
};

const environment = {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: getEnv(
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
  ),
  CLERK_PUBLISHABLE_KEY: getEnv("CLERK_PUBLISHABLE_KEY"),
  CLERK_SECRET_KEY: getEnv("CLERK_SECRET_KEY"),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: getEnv("NEXT_PUBLIC_CLERK_SIGN_IN_URL"),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: getEnv("NEXT_PUBLIC_CLERK_SIGN_UP_URL"),
  DATABASE_URL: getEnv("DATABASE_URL"),
  NEXT_PUBLIC_APP_URL: getEnv("NEXT_PUBLIC_APP_URL"),
  PLAID_CLIENT_TOKEN: getEnv("PLAID_CLIENT_TOKEN"),
  PLAID_SECRET_TOKEN: getEnv("PLAID_SECRET_TOKEN"),
  LEMONSQUEEZY_STORE_ID: getEnv("LEMONSQUEEZY_STORE_ID"),
  LEMONSQUEEZY_PRODUCT_ID: getEnv("LEMONSQUEEZY_PRODUCT_ID"),
  LEMONSQUEEZY_API_KEY: getEnv("LEMONSQUEEZY_API_KEY"),
  LEMONSQUEEZY_WEBHOOK_SECRET: getEnv("LEMONSQUEEZY_WEBHOOK_SECRET"),
};

export function Web({ stack }: StackContext) {
  const options: NextjsSiteProps = {
    path: ".",
    environment,
  };

  if (stack.stage === "production") {
    // TODO: Add route 53 custom domain from hosted zone when we get one
    // options.customDomain = {y
    //   domainName: "cutom-domain.com",
    //   domainAlias: "www.custom-domaun.com",
    // };
  }

  const web = new NextjsSite(stack, "web", options);

  stack.addOutputs({
    WebUrl: web.url,
  });

  return { web };
}
