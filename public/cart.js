function deleteProduct(id) {
  fetch(`/api/cart/`)
    .then((response) => response.json())
    .then((data) => {
      const { _id } = data;
      return fetch(`/api/cart/${_id}/product/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    })
    .then(() => {
      window.location.reload();
    });
}

function checkout() {
  fetch(`/api/cart/checkout`).then(() => window.location.reload());
}

href = "/api/cart/checkout";
