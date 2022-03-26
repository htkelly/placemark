const helpers = (hbs) => {
  hbs.registerHelper("isAdmin", (user) => {
    return !!user.scope.includes("admin");
  });
};

export default helpers;
