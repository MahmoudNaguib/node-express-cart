module.exports = (field)=>(req, res, next)=>{
    if(req.files){
        for(let i=0; i<req.files.length;i++){
            if(req.files[i].fieldname){
                req.body[req.files[i].fieldname]=req.files[i].fieldname;
            }
        }
        next();
    }
    else{
        next();
    }
}