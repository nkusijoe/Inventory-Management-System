const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAll);
router.post('/register', userController.register);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);
router.post('/login', userController.login);
router.get('/details', userController.isAdmin, userController.getUserDetails);

module.exports = router;
