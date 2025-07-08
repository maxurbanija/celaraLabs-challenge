export const locators = {
  input_username: 'input[name="username"]',
  input_password: 'input[name="password"]',
  button_login: "#signin-button",
  message_welcome: "#welcome-message",
  message_welcome_title: "#welcome-message h2",
  message_welcome_username: '#welcome-message p[data-id="username"]',
  message_error: "#message",

  input_firstname: "#fname",
  input_email: "#email",
  input_address: "#adr",
  input_city: "#city",
  input_state: "#state",
  input_zip: "#zip",

  input_cardname: "#cname",
  input_cardnumber: "#ccnum",
  select_expmonth: "#expmonth",
  input_expyear: "#expyear",
  input_cvv: "#cvv",

  checkbox_shipping_same_as_billing: 'input[name="sameadr"]',
  button_continue_checkout: ".btn",

  order_confirmation: "#order-confirmation",
  order_confirmation_title: "#order-confirmation h1",
  order_number: '#order-confirmation p[data-id="ordernumber"]',

  cart_container: ".container:has(h4:text('Cart'))",
  cart_products: ".container p:has(a)",
  cart_product_prices: ".container p:has(a) .price",
  cart_total: ".container p:has-text('Total') .price",

  grid_container: "#menu.grid-container",
  grid_items: ".item",
  grid_item_by_position: (position: number) => `.item:has([data-test-id="card-number"]:text("${position}"))`,
  grid_item_name: '[data-test-id="item-name"]',
  grid_item_price: "#item-price",
  grid_item_image: "img",
  grid_item_button: '[data-test-id="add-to-order"]',

  search_form: 'form[action="/search-engine"]',
  search_input: 'input[name="searchWord"]',
  search_button: 'button[type="submit"]',
  search_result: "#result",
  search_result_container: ".result-container",
};
