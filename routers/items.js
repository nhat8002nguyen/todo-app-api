const router = require("express").Router();
const Item = require("../models/Item");
const itemValidation = require("../validations/itemValidation");
const verify = require("../verify");

router.get("/items", verify, async (req, res) => {
    try {
        const items = await Item.find({});
        res.send({ items: items });
    } catch (err) {
        res.status(400).send({ message: error });
    }
});

router.post("/items", verify, async (req, res) => {
    const { error } = itemValidation(req.body);
    if (error) return res.send({ message: error.details[0].message });

    const item = new Item({
        name: req.body.name,
        detail: req.body.detail,
    });

    try {
        await item.save();
        res.send(item);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.delete("/items", verify, async (req, res) => {
    const id = req.query.id;
    try {
        const item = await Item.deleteOne({ _id: id });
        res.send(item);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;
