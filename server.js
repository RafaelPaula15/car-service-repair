// Start server for car-service-repair.

const app = require("./app");
const PORT = process.env.PORT || 3000;
// app.set("PORT", PORT);

// app.listen(3000, function() {
//   console.log("listening on 3000");
// });

app.listen(PORT, () => console.log(`Server running on localhost:${PORT}}`));