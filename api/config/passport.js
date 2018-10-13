const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mysql = require('mysql')

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'ngtuananh',
	database: 'nuxt_node'
});

//connect
db.connect((err) => {
	if (err) {
		throw err;
	} else {
		console.log('Mysql connected ...');
	}
});

module.exports = function(passport) {
	passport.use(new LocalStrategy(function(email, password, done) {
		let sql = `SELECT * FROM users  WHERE users.email = ${email}`
		let query = db.query(sql, (err, user) => {
			if (err) {
				throw err;
			}
			if (!user) {
				return done(null, false, {message: 'Nouser found'})
			}
			bcrypt.compare(passport, user.password, function(err, isMatch) {
				if (err) {
					throw err;
				}
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, {message: 'password not match'})
				}
			})
		})
	}))

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	})

	passport.deserializeUser(function(id, done) {
		let sql = `SELECT * FROM users WHERE users.id = ${id}`
		let query = db.query(sql, (err, user) => {
			if (err) {
				throw err;
			} else {
				//console.log(user[0])
				res.json(user[0])
				done(err, user);
			}
		})
	})
}


