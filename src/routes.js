import express from "express";
import { createMember, deleteMember, getMember, getMembers, getUnvaccinatedCount, updateMember } from "./controllers.js";

const routes = express.Router();

routes.get("/unvaccinated", getUnvaccinatedCount);
routes.post("/", createMember);
routes.get("/", getMembers);
routes.put("/:id", updateMember);
routes.get("/:id", getMember);
routes.delete("/:id", deleteMember);


export default routes;
