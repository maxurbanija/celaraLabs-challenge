export const data = {
  validUser: {
    username: "johndoe19",
    password: "supersecret",
  },

  invalidUser: {
    username: "wronguser",
    password: "wrongpassword",
  },

  checkout: {
    billingAddress: {
      firstname: "John Doe",
      email: "john.doe@example.com",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
    payment: {
      cardname: "John Doe",
      cardnumber: "4111111111111111",
      expmonth: "December",
      expyear: "2026",
      cvv: "123",
    },
  },

  search: {
    validSearchWord: "automation",
    expectedResultMessage: "Found one result for automation",
    emptySearchMessage: "Please provide a search word.",
  },

  grid: {
    position7ItemName: "Super Pepperoni",
    position7ItemPrice: "$10",
  },

  login: {
    wrongCredentialsError: "Wrong credentials",
    emptyFieldsError: "Fields can not be empty",
  },

  checkout_messages: {
    orderConfirmedTitle: "Order Confirmed!",
    checkboxAlertMessage: "checkbox must be selected",
  },
};
