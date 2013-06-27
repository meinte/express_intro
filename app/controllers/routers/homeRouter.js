exports.home=function(req, res){
    res.locals({
        data:{test1:"123"}
    });

     res.render('index.html');
}