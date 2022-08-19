// Product counter

function increaseCount(a, b, max) {
  var input = b.previousElementSibling;
  var value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;
  if (value < max) {
    value++;
    input.value = value;
  }
}
function decreaseCount(a, b) {
  var input = b.nextElementSibling;
  var value = parseInt(input.value, 10);
  if (value > 1) {
    value = isNaN(value) ? 0 : value;
    value--;
    input.value = value;
  }
}

function addProduct(id, name, price, description, code, thumbnail) {
  const stock = document.getElementById(`${id}-count`).value;
  fetch(`/api/cart/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      const { _id } = data;
      return fetch(`/api/cart/${_id}/product/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          stock: parseInt(stock),
          description,
          code,
          thumbnail,
        }),
      });
    })
    .then(() => {
      window.location.reload();
    });
}
