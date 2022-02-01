// Start server for car-service-repair.

const app = require("./app");

app.listen(3000, function() {
  console.log("listening on 3000");
});

// app.listen(port, () => console.log(`Server running on localhost:${port}`));