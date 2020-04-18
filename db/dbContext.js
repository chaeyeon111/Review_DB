/*function spPostExecute(qry,params,callback){
    var newdata = [];

    request = new Request(qur, function (err, rowCount){
        utility.sendDbResponse(err,rowCount,newdata,callback);
    });

    params.forEach(params => {
        request.addParameter(param.name, param.type,param.val);

    });

    request.on('row',function (columns) {
        utility.buildRow(columns,newdata);
    });

    connection.callProcedure(request);
}

module.exports = {
    post: spPostExecute
};
*/
