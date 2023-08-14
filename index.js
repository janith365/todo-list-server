import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Item from "./collections/item.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

await mongoose.connect(process.env.ATLAS_URL + "/todoListDB");

app
  .route("/")
  .get(async (req, res) => {
    const items = await Item.find();
    res.send(items);
  })
  .post(async (req, res) => {
    const itemName = req.body.itemName;
    if (!itemName) {
      res.status(400);
      res.send("Invalid input!");
    } else {
      const item = new Item({ name: itemName });
      try {
        await item.save();
        res.send(`Successfully saved item: ${item}`);
      } catch (error) {
        res.status(500);
        res.send("Save failed! Please try again!");
      }
    }
  })
  .delete(async (req, res) => {
    const itemName = req.body.itemName;
    if (!itemName) {
      res.status(400);
      res.send("Invalid input!");
    } else {
      try {
        await Item.deleteOne({ name: itemName });
        res.send(`Successfully deleted item: ${itemName}`);
      } catch (error) {
        res.status(500);
        res.send("Delete failed! Please try again!");
      }
    }
  });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
