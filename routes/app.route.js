module.exports = (app) => {
  const App = require("../controller/app.controller.js");
  const Users = require("../model/app.model");
  const bcrypt = require("bcrypt");

  app.post("/create", async (req, res) => {
    const { username, password, email } = req.body;
    const oldUser = await Users.findOne({ email });

    try {
      if (!username || !password || !email) {
        res.status(400).send("All input is required");
      }
      if (oldUser) {
        res.status(409).send("User with same email Id is already exist");
      } else {
        const user = new Users(req.body);
        const save = await user.save();
        const encryptedPassword = await bcrypt.hash(password, 10);
        console.log("encryptedPassword", encryptedPassword);

        res.send(save);
      }
    } catch (e) {
      console.log("hello", e);
    }
  });

  app.get("/get-all", App.findAll);

  app.get("/user/:userId", App.findOne);
  

  app.put("/user/:userId", App.update);

  app.delete("/user/:userId", App.delete);
};
