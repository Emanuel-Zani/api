const validateGame = (req,res,next) => {
    const {name,image,description,released,rating,platforms} = req.body;

    if(!name || !image || !description || !released || !rating || !platforms) 
    return res.status(400).json({error: "Missing data."});
    next();
}

module.exports={
    validateGame,
}