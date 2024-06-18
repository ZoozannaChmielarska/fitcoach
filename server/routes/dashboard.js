const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Middleware to check if user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

router.get('/dashboard',ensureAuthenticated, dashboardController.dashboard);
router.get('/dashboard/profile',ensureAuthenticated, dashboardController.dashboardProfile);
router.get('/dashboard/editProfile',ensureAuthenticated, dashboardController.dashboardEditProfile);
router.post('/dashboard/editProfile', ensureAuthenticated, dashboardController.postDashboardEditProfile);
router.get('/dashboard/dailyLog', ensureAuthenticated, dashboardController.dashboardDailyLog);
router.post('/dashboard/dailyLog', ensureAuthenticated, dashboardController.postDashboardDailyLog);
router.post('/dashboard/deleteAccount', dashboardController.postDashboardDeleteAccount);

module.exports = router;
