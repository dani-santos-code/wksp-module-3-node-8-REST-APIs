const handleSubmit = () => {
  event.preventDefault();
  const sel = document.getElementById("order").value;

  fetch("/<API>", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      const { status, error } = data;
      if (status === "success") {
        //do something
      } else if (error) {
        // send error message
      }
    });
};
