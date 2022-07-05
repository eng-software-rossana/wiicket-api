import { Router } from "express";
import { User } from "./model/user";

const routes = Router();
let user = new User();

routes.get("/user", async (req, res) => {
  let foundUser = await user.getUser(req.body.user_id).then((result) => {
    return result;
  });
  return res.json({ foundUser });
});

routes.post("/user", async (req, res) => {
  let createdUser = await user.createUser(req.body).then((result) => {
    return result;
  });
  return res.json({ user_id: createdUser });
});

routes.patch("/user", async (req, res) => {
  let updatedUser = await user.updateUser(req.body).then((result) => {
    return result;
  });
  return res.json({ user: updatedUser });
});

routes.delete("/user", async (req, res) => {
  let deletedUser = await user.deleteUser(req.body).then((result) => {
    return result;
  });
  return res.json({ "deleted": deletedUser })
})

export default routes;
