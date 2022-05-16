
const ConvertingDateToString = function (msec){
    return new Date(Number(msec)).toString('yyyy MM dd');
}

module.exports.ConvertingDateToString = ConvertingDateToString;