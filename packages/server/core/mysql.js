var mysql = require('mysql2');

module.exports =
{
	Handle: null,
	Connect: function (callback)
	{
		this.Handle = mysql.createConnection(
		{
			host: '127.0.0.1',
			user: '123',
			password: '123', // пароль от базы данных
			database: '123', // название базы данных
		});
		this.Handle.connect(function (e)
		{
			if (!e)
			{
				console.log("\x1b[36m[MYSQL]\x1b[37m Successful connection!");
				callback();
			}
			else console.log("\x1b[36m[MYSQL]\x1b[37m Can't get tired of connecting to DB:" + e);
		});
		this.Handle.on('error', function (err)
		{
			console.log("\x1b[31m Warning: SQL ERROR" + err.code);
		});
	}
};
