const logRegModel = require('../models/logReg.model')
const bcrypt = require('bcryptjs')

class LogReg {
  constructor() {
    console.log("I'm from controller!!!")
  }

  /* 
   @Method:index
   @Description:To Show the index page

*/
  async index(req, res) {
    try {
      res.render('index')
    } catch (err) {
      throw err
    }
  }

  /* 
   @Method:showRegistrationForm
   @Description:To Show the Registration form

*/

  async showRegistrationForm(req, res) {
    try {
      res.render('registration')
    } catch (err) {
      throw err
    }
  }

  /*
     @Method:register
     @Description:To Create user

  */

  async register(req, res) {
    try {
      if (req.body.password === req.body.confirmpassword) {
        console.log(req.body)
        req.body.password = bcrypt.hashSync(
          req.body.password,
          bcrypt.genSaltSync(10)
        )
        console.log(req.body)
        let registerData = await logRegModel.create(req.body)
        if (registerData && registerData._id) {
          console.log('Registration Successfully')
          res.redirect('/registration')
        } else {
          console.log('Registration Not Done Successfully')
          res.redirect('/registration')
        }
      }
    } catch (err) {
      throw err
    }
  }

  /* 
    @Method:showLoginForm
    @Description:To Show Login Form
  
*/

  async showLoginForm(req, res) {
    try {
      res.render('login')
    } catch (err) {
      throw err
    }
  }

  /* 
  @Method:signin
  @Description:user signin

*/

  async signin(req, res) {
    try {
      let isUserExists = await logRegModel.findOne({
        email: req.body.email,
      })
      if (isUserExists) {
        const hasPassword = isUserExists.password
        if (bcrypt.compareSync(req.body.password, hasPassword)) {
          console.log('Logged In...')
        } else {
          console.log('Wrong Password..')
        }
      } else {
        console.log('Email does not exists!!')
      }
      console.log(isUserExists)
    } catch (err) {
      throw err
    }
  }
}

module.exports = new LogReg()
