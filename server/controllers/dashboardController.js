const User = require('../models/User');

// Get dashboard
exports.dashboard = async (req, res) => {
    const user = await User.findById(req.user.id);
    const sortedLogs = user.dailyLogs.sort((a, b) => b.date - a.date);
    const dailyLogs = user.dailyLogs;
    const mostRecentLog = sortedLogs[0];
    let weight = mostRecentLog ? mostRecentLog.weight : user.weight;
    let bmi, bmiCategory, bmr, tdee;
    if (weight && user.height && user.age) {
        bmi = (weight / ((user.height / 100) ** 2)).toFixed(1);
        if (bmi < 18.5) {
            bmiCategory = 'Niedowaga';
        } else if (bmi < 25) {
            bmiCategory = 'Norma';
        } else if (bmi < 30) {
            bmiCategory = 'Nadwaga';
        } else {
            bmiCategory = 'Otyłość';
        }
        if (user.sex === 'male') {
            bmr = (10 * weight) + (6.25 * user.height) - (5 * user.age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * user.height) - (5 * user.age) - 161;
        }
        bmr = Math.round(bmr);
        const activityFactor = user.activityLevel === 'sedentary' ? 1.2 : user.activityLevel === 'lightlyActive' ? 1.375 : user.activityLevel === 'moderatelyActive' ? 1.55 : user.activityLevel === 'veryActive' ? 1.725 : 1.9;
        tdee = bmr * activityFactor;
        if (user.goal === 'lose') {
            tdee -= 500;
        } else if (user.goal === 'gain') {
            tdee += 500;
        }
        tdee = Math.round(tdee);
    } else {
        bmi = 'Podaj swoją wagę oraz wzrost';
        bmiCategory = 'Podaj swoją wagę oraz wzrost';
        bmr = 'Podaj swoją wagę, wzrost i wiek';
        tdee = 'Podaj swoją wagę, wzrost, wiek, płeć, poziom aktywności oraz cel';
    }
    
    let dailyLogsWithWeightGain = [];
    let estimatedWeights = [];

    if (dailyLogs.length > 0 && user.weight !== undefined) {
        let reversedLogs = dailyLogs.reverse();

        dailyLogsWithWeightGain = reversedLogs.map((log, index) => {
            let weightGainPotential = (log.calorieIntake - tdee) / 7700;
            return {
                ...log,
                weightGainPotential: weightGainPotential
            };
        });

        estimatedWeights = [user.weight + dailyLogsWithWeightGain[0].weightGainPotential];
        for (let i = 1; i < dailyLogsWithWeightGain.length; i++) {
            estimatedWeights.push(estimatedWeights[i - 1] + dailyLogsWithWeightGain[i].weightGainPotential);
        }

        // Reverse the logs and the estimated weights back to their original order
        dailyLogsWithWeightGain.reverse();
        estimatedWeights.reverse();
        reversedLogs.reverse();

        // Assign the estimated weights to the logs
        for (let i = 0; i < dailyLogsWithWeightGain.length; i++) {
            dailyLogsWithWeightGain[i].estimatedWeight = parseFloat((estimatedWeights[i]).toFixed(2));
        }
    }

    const locals = {
        title: 'Dashboard - FitCoach',
        description: 'FitCoach to aplikacja dedykowana dla osób, które chcą monitorować swoją wagę i postęp w drodze do osiągnięcia celów związanych z formą fizyczną.',
        user: user,
        bmi: bmi,
        bmiCategory: bmiCategory,
        bmr: bmr,
        tdee: tdee,
        dailyLogs: dailyLogs,
        dailyLogsWithWeightGain: dailyLogsWithWeightGain,
        estimatedWeights: estimatedWeights
    }
    res.render('dashboard/index', {
        locals,
        layout: '../views/layouts/dashboard'
    });
};
// Get profile
exports.dashboardProfile = async (req, res) => {
    const locals = {
        title: 'Profil - FitCoach',
        description: 'FitCoach to aplikacja dedykowana dla osób, które chcą monitorować swoją wagę i postęp w drodze do osiągnięcia celów związanych z formą fizyczną.',
        user: req.user
    }
    res.render('dashboard/profile', {
        locals,
        layout: '../views/layouts/dashboard'
    });
};

// Get editProfile
exports.dashboardEditProfile = async (req, res) => {
    const locals = {
        title: 'Edytuj - FitCoach',
        description: 'FitCoach to aplikacja dedykowana dla osób, które chcą monitorować swoją wagę i postęp w drodze do osiągnięcia celów związanych z formą fizyczną.',
        user: req.user
    }
    res.render('dashboard/editProfile', {
        locals,
        layout: '../views/layouts/dashboard'
    });
};

// Post editProfile
exports.postDashboardEditProfile = async (req, res) => {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.redirect('/dashboard/profile');
};

// Get dailyLog
exports.dashboardDailyLog = async (req, res) => {
    const locals = {
        title: 'Daily - FitCoach',
        description: 'FitCoach to aplikacja dedykowana dla osób, które chcą monitorować swoją wagę i postęp w drodze do osiągnięcia celów związanych z formą fizyczną.',
        user: req.user
    }
    res.render('dashboard/dailyLog', {
        locals,
        layout: '../views/layouts/dashboard'
    });
};

// Post dailyLog
exports.postDashboardDailyLog = async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const log = {
        date: today,
        weight: parseFloat(req.body.weight),
        calorieIntake: req.body.calIntake
    };

    const user = await User.findOne({ _id: req.user.id });

    const existingLogIndex = user.dailyLogs.findIndex(log => log.date.setHours(0, 0, 0, 0) === today.getTime());

    if (existingLogIndex !== -1) {
        user.dailyLogs[existingLogIndex] = log;
    } else {
        user.dailyLogs.push(log);
    }

    await user.save();

    res.redirect('/dashboard');
};

// Post  deleteAccount
exports.postDashboardDeleteAccount = async (req, res) => {
    try {
        // Remove user from the database
        await User.findByIdAndDelete(req.user.id);
        res.redirect('/');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}; 
