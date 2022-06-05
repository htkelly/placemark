export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2a$10$jhHuOAqvenkTfB6JkoZv5eNyqwPBwIgagpg.8bVpzl9ZBQFpFk1IC",
      scope: ["admin", "user"],
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2a$10$9TX5duWA7Qi2U4r85b47YeSJWoEv2ygzM1IuwFHUYITQy0gk1d2h.",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "$2a$10$Zpibmu33Ukf6zXo9p7Cj3.SGMhG4oJfJzkupaAUjbBYSYx6HCQ2ji",
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
    place_1: {
      name: "The Glucksman",
      description: "Contemporary art gallery on the grounds of University College Cork",
      location: {
        latitude: 51.895495970732824,
        longitude: -8.490267726987343,
      },
      categoryid: "->categories.cork",
    },
    place_2: {
      name: "English Market",
      description: "Vibrant food market in the heart of Cork city",
      location: {
        latitude: 51.89789771896542,
        longitude: -8.474833592837065,
      },
      categoryid: "->categories.cork",
    },
    place_3: {
      name: "Saint Fin Barre's Cathedral",
      description: "Gothic revival cathedral on the south side of Cork city",
      location: {
        latitude: 51.894945336063174,
        longitude: -8.480138242328158,
      },
      categoryid: "->categories.cork",
    },
  },
};
