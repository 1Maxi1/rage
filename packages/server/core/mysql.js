var mysql = require('mysql');

module.exports =
{
	Handle: null,
	Connect: function (callback)
	{
		this.Handle = mysql.createConnection(
		{
			host: '127.0.0.1',
			user: 'test',
			password: '123456', // пароль от базы данных
			database: 'server', // название базы данных
		});
		this.Handle.connect(function (e)
		{
			if (!e)
			{
				console.log("\x1b[36m[MYSQL]\x1b[37m Успешное подключение!");
				callback();
			}
			else console.log("\x1b[36m[MYSQL]\x1b[37m ТЫ НАКОСЯЧИЛ С ДБ!" + e);
		});
		this.Handle.on('error', function (err)
		{
			console.log("\x1b[31m Warning: SQL ОШИБКА " + err.code);
		});
	}
};