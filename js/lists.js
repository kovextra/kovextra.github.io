$("#productButton").on("click", () => {
  getProducts();
  $("#productButton").hide();
});

$("#todoButton").on("click", () => {
  getTodos();
  $("#todoButton").hide();
});

async function getTodos() {
  let response = await fetch("https://jsonplaceholder.typicode.com/todos");
  let json = await response.json();
  let fullList = JSON.parse(JSON.stringify(json));
  teaseTodo_jQuery(fullList, 0);
}

async function getProducts() {
  const res = await fetch("https://dummyjson.com/products");
  const resJSON = await res.json();
  if (resJSON?.products?.length > 0) renderProducts(resJSON.products);
}

function renderProducts(productJSON) {
  let productList = document.createElement("div");
  let productTitles = productJSON.map((singleProductJSON, index) => {
    return `<div class='card'>Item #${
      index + 1 + " " + singleProductJSON.title
    }</div>`;
  });
  document.querySelector("#product-list").append(productList);

  // To display all products at once, uncomment here
  // productList.innerHTML = productTitles.join(" ");

  // To display each product gradually
  teaseProducts(productList, productTitles, 0);
}

function teaseProducts(productList, productTitles, i) {
  console.log(productTitles[i]);
  productList.innerHTML += productTitles[i];
  if (i < productTitles.length - 1)
    setTimeout(() => teaseProducts(productList, productTitles, ++i), 400);
}

function teaseTodo_jQuery(list, i) {
  let td = list[i];
  let card = $("<div></div>");
  card.html(td.title);
  card.addClass("card");
  card.addClass(td.completed ? "completed-todo" : "incomplete-todo");
  card.appendTo("#to-do-list");

  if (td.completed) {
    setTimeout(() => {
      card.html(td.title + "\n- DONE");
    }, 1000);
    setTimeout(() => card.hide("slow"), 2000);
  }

  if (i < list.length)
    setTimeout(() => {
      teaseTodo_jQuery(list, ++i);
    }, 400);
}
