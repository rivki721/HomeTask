import express from "express";
import cors from "cors";
import routes from "./src/routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ type: "application/json" }));
app.use(cors());
app.use('/members', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
