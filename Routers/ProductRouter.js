const express = require("express");
const Product_OC = require("../Models/ProductModel");
const { verifyUsers, verifyAdmin } = require("./verify");
const ProductRouter = express.Router();
ProductRouter.post("/", verifyAdmin, async (req, res) => {
  const newProduct = new Product_OC(req.body);

  try {
    const ProductSaved = await newProduct.save();
    res.status(201).json(ProductSaved);
  } catch (er) {
    res.status(500).json(er);
  }
});

ProductRouter.get("/", async (req, res) => {
  const categ = req.query.category;

  try {
    if (categ) {
      const Products_List = await Product_OC.find({
        category: {
          $in: [categ],
        },
      });
      const ProductsDatas = Products_List.map((Product) => {
        const { createdAt, updatedAt, __v, ...others } = Product._doc;
        return others;
      });
      return res.status(200).json(ProductsDatas);
    } else {
      const Products = await Product_OC.find();
      const ProductsDatas = await Products.map((Product) => {
        const { createdAt, updatedAt, __v, ...others } = Product._doc;
        return others;
      });

      res.status(200).json(ProductsDatas);
    }
  } catch (er) {
    res.status(500).json(er);
  }
});

ProductRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const OneProduct = await Product_OC.findById(id);
    res.status(200).json(OneProduct);
  } catch (er) {

    res.status(500).json({ error: "item no found" });
  }
});

ProductRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updated = await Product_OC.findByIdAndUpdate(id, req.body);
    res.status(200).json({ done: "your product has updated" });
  } catch (er) {
    res.status(500).json(er);
  }
});

ProductRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const productDeleted = await Product_OC.findByIdAndDelete(id);
    res.status(200).json({ data: "your product has deleted" });
  } catch (er) {
    res.status(500).json(er);
  }
});

module.exports = ProductRouter;
