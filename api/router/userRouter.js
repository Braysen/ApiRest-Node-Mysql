const router = require('express').Router();
const jwt = require("jsonwebtoken");
const { getUsers,getUserByUserEmail } = require('../api/services/userService');
const auth = require("../api/controller/verifyToken");
const { compareSync } = require('bcrypt')

router.post("/login", async (req, res) => {
    try{
        const body = req.body
        getUserByUserEmail(body.email, (err, results) => {
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                })
            }
            const result = compareSync(body.password, results.password)
            if(result){
                results.password = undefined
                
                const token = jwt.sign({id: results.id},process.env.JWT_SECRET,{
                    expiresIn: 60 * 60 * 24
                });
                /*
                return res.json({
                    success: 1,
                    message: "Login successfully",
                    token: token,
                    id: results.id
                })*/
                res.status(200).json({auth: true, token});


            }else{
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                })
            }
        });
        
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.get("/",auth, async(req,res) => {
    getUsers((err, results) => {
        if(err){
            /* Mostramos mensaje de error en el servidor */
            console.log(err)
            /* Mostramos mensaje de error al front-end */
            res.status(500).json({error: 'the database cannot be accessed'});
            return;
        }
        
        return res.json({
            success: 1,
            data: results
        });

    });
});

module.exports = router;