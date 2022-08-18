function deleteProduct(id) {
  fetch(`/api/cart/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      const { _id } = data;
      return fetch(`/api/cart/${_id}/product/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    })
    .then((res) => {
      window.location.reload();
    });
}
