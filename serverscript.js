// Retreive data from the database
function getData() {
    var queryResult = db.Execute('SELECT * FROM table3 WHERE restaurant = @restaurant');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

function calculateAverage() {
    var avg;
    return db.Execute('SELECT AVG(rating) AS avg, restaurant FROM table3 group by restaurant');

}

// Create table
function createTable() {
    var result = {};

    var queryResult = db.Execute('SELECT TOP 1 * FROM table3');
    var row = JSON.parse(queryResult);

    if (row.length > 0 && typeof row[0].Error != 'undefined') {
        db.Execute('CREATE TABLE table3(id INTEGER PRIMARY KEY IDENTITY(1,1), userId nvarchar(50), value nvarchar(500), restaurant nvarchar(50), rating INTEGER, date TEXT);');
        result = '{"status":"tableCreated"}';
    } else
        result = '{"status":"tableExist"}';

    return JSON.stringify(result);
}

// Insert into the database
function insert() {
    if (args.Get("value").length > 500)
        return '{"result":"error"}';
    else {
        db.Execute('INSERT INTO table3 VALUES(@currentUser,@value, @restaurant, @rating, @date)');
        return getData();
    }
}