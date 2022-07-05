import { response, Router } from "express";
import { User } from "./model/user";

const routes = Router();
let user = new User();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});
routes.post("/user", (req, res) => {
//   let result = user.createUser(req.body).finally(() => { return JSON.parse(res.body) })
  let result = user.createUser(req.body).then((res) => { return true })
  console.log("esse é o result: ", result);
  console.log("saimos");
});

export default routes;
