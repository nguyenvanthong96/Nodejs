const express = require("express");
const router = express.Router();
const Joi = require("joi");


const tasks = [{
    name:"",
    status: "To Do",
    crearedAt: "",
    id: "",
   
}] ;

const validateTask = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        status: Joi.string().default("To Do"),
        createdAt: Joi.date(),
        id: Joi.string(),
    });
    return schema.validate(user);
};
router.get("/", (req, res) => {
    res.send(tasks);
});
router.post("/", (req, res) => {
    const {error} = validateTask(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    };
    const user = {
        id: tasks.length + 1,
        name: req.body.name,
    };
    tasks.push(user);
    res.send(user);    
    });
 router.put("/:id", (req, res) => {
    const user = tasks.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).send({
            message: "user not found",
        });
    }
    user.name = req.body.name;
    res.send(user);
    });
router.delete("/:id", (req, res) => {
        const user = tasks.find(u => u.id === parseInt(req.params.id));
    
        if (!user) {
            return res.status(404).send({
                message: "user not found",
            });
        }
        const index = tasks.indexOf(user);
        tasks.splice(index, 1);
        res.send(user);
    });


 module.exports = router ;