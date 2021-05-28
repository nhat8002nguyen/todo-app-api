const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerValidation = require("../validations/registerValidation");
const signInValidation = require("../validations/signInValidation");

const router = require("express").Router();

router.post("/register", async (req, res) => {
    const { error } = await registerValidation(req.body);
    if (error) return res.send({ error: error.details[0].message });

    // check email already exist !
    const checkedUser = await User.findOne({ email: req.body.email });
    if (checkedUser)
        return res.status(400).send({ error: "Email already exist !" });

    //hashed password and save user
    if (req.body.password !== req.body.rePassword)
        return res.status(400).send({ message: "passwords must the same !" });

    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        await user.save();
        res.send(user);
    } catch (err) {
        res.status(400).send({ error: err });
    }
});

router.post("/signin", async (req, res) => {
    const { error } = signInValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const validUser = await User.findOne({ email: req.body.email });
    if (!validUser)
        return res.status(400).send({ error: "Email is not exist !" });

    const validPassword = await bcrypt.compare(
        req.body.password,
        validUser.password
    );
    if (!validPassword) res.status(400).send({ error: "invalid password" });

    const userToken = jwt.sign(
        { id: validUser._id },
        process.env.TOKEN_SECRET,
        { expiresIn: "3600" }
    );

    res.header("auth-token", userToken).send({
        ...validUser._doc,
        token: userToken,
    });
});

module.exports = router;
