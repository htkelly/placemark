export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
    },
  },
  categories: {
    _model: "Category",
    cork: {
      name: "Cork favourite places",
      userid: "->users.bart",
    },
  },
  places: {
    _model: "Place",
    place: {
      name: "The Glucksman",
      description: "Contemporary art gallery on the grounds of University College Cork",
      location: {
        latitude: 51.895495970732824,
        longitude: -8.490267726987343,
      },
      categoryid: "->categories.cork",
    },
  },
};
