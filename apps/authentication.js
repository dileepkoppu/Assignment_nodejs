const appRoot = require('app-root-path')
const {Usermodel} = require(appRoot+'/models.js')
const {validation} = require(appRoot+'/apps/utils/userSchema_validation')
const {validPassword,genPassword,issueJWT} = require(appRoot+'/apps/utils/passwordandtokenutils')






signup=async(req,res)=>{
    try {
        if (req.body.phoneNo) {
            userphoneNocheck =await Usermodel.findOne({"phoneNo":req.body.phoneNo})
            if (!userphoneNocheck) {
                var userData=req.body
                if(!req.body.role_ids){
                    userData.role_ids="customer"
                }
                validate =validation(req.body)
                if (!validate.error) {
                    const {salt,hash}=genPassword(userData.password)
                    delete userData.conformPassword
                    delete userData.password
                    userData.salt=salt
                    userData.hash=hash
                    const user = new Usermodel(userData)
                    const userSave =await user.save()
                    return res.status(201).send({success:true,"message":"user successfully created"})
                    }
                 else {
                    return res.status(422).send({success:false,"message":validate.error.message})                
                    }
            } else {
             return res.status(422).send({success:false,"message":"phoneNo Already exists"})
            }
        }else{
            return  res.status(422).send({success:false,"message":"Please enter all fields"})
        } 
    }catch (error) {
       return  res.status(400).json({success:false,"message":"something went wrong please try again"})
    }
}



login = async(req, res, next)=>{
    try {
        await Usermodel.findOne({ phoneNo:req.body.phoneNo})
                .then((user) => {
                    if (!user) {
                        return res.status(401).json({ 
                            success: false,  "message": "phoneNo is invalid" });
                    }
                    const isValid = validPassword(req.body.password, user.hash, user.salt);
                    if (isValid) {
                        const tokenObject = issueJWT(user);
                        return res.status(200).json({ success: true, data:{token: tokenObject.token, expiresIn: tokenObject.expires,role:user.role_ids}});

                    } else {
                        return res.status(401).json({ success: false,  "message": "you entered the wrong password" });
                    }
                })
                .catch((err) => {
                    return res.status(401).json({ success: false,  "message": "you entered the wrong Phone Number" });
                });
    }catch (error) {
        return res.status(401).json({ success: false,  "message": "Something when wrong please try again"});
    }}


module.exports.login =login

module.exports.signup = signup