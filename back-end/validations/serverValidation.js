module.exports = function(req, res, next) {
    const { email, name, password } = req.body;
  
    function validEmail(user_Email) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user_Email);
    }

    function validPass(user_Password) {
      return user_Password.length > 4;
    }
   
    if (req.path === "/register") {
      //console.log(!email.length);
      if (![email, name, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.json("Invalid Email");
      } else if (!validPass(password)) {
        return res.json("Invalid Password. Password length should be longer than 5 characters");
      }
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.json("Invalid Email");
      } else if (!validPass(password)) {
        return res.json("Invalid Password. Password length should be longer than 5 characters");
      }
    }
  
    next();
  };