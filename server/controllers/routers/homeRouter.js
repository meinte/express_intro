exports.home=function(req, res){
    res.locals({
        data:{test:"123"}
    });

     res.render('index.html');
}