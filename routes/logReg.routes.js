const router = require('express').Router()
const logRegControllers = require('../controllers/logReg.controller')

router.get('/', logRegControllers.index)
router.get('/registration', logRegControllers.showRegistrationForm)
router.post('/register', logRegControllers.register)
router.get('/login', logRegControllers.showLoginForm)
router.post('/signin', logRegControllers.signin)

module.exports = router
