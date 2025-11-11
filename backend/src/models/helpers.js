function csvToArray(csv) {
if (!csv) return [];
return csv.split(',').map(s => s.trim()).filter(Boolean);
}


function arrayToCsv(arr) {
if (!arr || !arr.length) return '';
return arr.map(s => s.trim()).filter(Boolean).join(',');
}


module.exports = { csvToArray, arrayToCsv };