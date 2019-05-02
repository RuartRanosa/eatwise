const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")

process.env.SECRET_KEY = 'secret'
// NOTE: queries will be changer depending on future database procedures

exports.register = function(req, res){
	var conn = res.locals.connection	
	const userData = {
        username: req.body.username,
        display_name: req.body.display_name,
        email: req.body.email,
        password: req.body.password,
        location: "here"
    }
    conn.query("select email from user where email = '"+req.body.email+"';", (err, result)=>{
    	if(!err && result.length === 0){
		    conn.query('call addUser(false, "'+userData.username+'", "'+userData.email+'", "'+userData.display_name+'", "'+userData.password+'", "'+userData.location+'");', (err, res) => {
					console.log("Register successful!")
					res.send(res)
				
			})
    	}else{
    		console.log(result)
    		res.send(200, "User is already registered")
    	}
    })
}

exports.login = function(req, res){
	var conn = res.locals.connection	
    conn.query('select userId, adminAccess, username, displayName, email, CAST(aes_decrypt(password, "secret") AS CHAR(10000) CHARACTER SET utf8) as password from user where email = "'+req.body.email+'";', (err, result) => {
		if(!err && result.length > 0){
			if (req.body.password === result[0].password) {

					console.log("creating token")
                    const payload = {
                        userId: result[0].userId,
                        username: result[0].username,
                        display_name: result[0].displayName,
                        email: result[0].email,
                        adminAccess: result[0].adminAccess
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    console.log("Logged in!!!")
                    res.send(token)
                } else {
                    res.json({ error: "User does not exist" })
                }
		}else{
           res.send(400, 'Couldnt get a connection');
        }
	})
}

exports.viewUsers = function(req, res){
	var conn = res.locals.connection
	conn.query('select * from user;', (err, result) => {
		if(!err){
			console.log(result[0].password)
			res.send(result)
		}else{
            res.send(400, 'Couldnt get a connection');
        }
	})
}

exports.addUser = function(req, res){
	var conn = res.locals.connection
	conn.query('insert into user(adminAccess, username, displayName, password, location) values('+req.body.adminAccess+', "'+req.body.username+'", "'+req.body.displayName+'", "'+req.body.password+'", "'+req.body.location+'");', (err, result) => {
		if(!err){
			console.log(result)
			res.send(result)
		}else{
            res.send(400, 'Couldnt get a connection');
        }
	})
}

exports.updateUser = function(req, res){
	var conn = res.locals.connection
	var userId = req.body.id
	var username = req.body.username
	// console.log(userId)
	conn.query('update user set username = "'+username+'" where userId = '+userId+';', (err, result) => {
		if(!err){
			console.log(result)
			res.send(result)
		}else{
            res.send(400, 'Couldnt get a connection');
        }
	})
}

exports.deleteUser = function(req, res){
	var conn = res.locals.connection
	var userId = req.body.id
	// console.log(userId)
	conn.query('delete from user where userId = '+userId+';', (err, result) => {
		if(!err){
			console.log(result)
			res.send(result)
		}else{
            res.send(400, 'Couldnt get a connection');
        }
	})
}