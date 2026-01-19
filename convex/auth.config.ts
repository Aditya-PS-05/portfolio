const domain = process.env.NEXT_PUBLIC_AUTH_DOMAIN;

export default {
  providers: domain
    ? [
        {
          domain,
          applicationID: "convex",
        },
      ]
    : [],
};
