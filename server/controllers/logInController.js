// GET loginPage
exports.loginPage = async (req, res) => {
    const locals = {
        title: 'Logowanie - FitCoach',
        description: 'FitCoach to aplikacja dedykowana dla osób, które chcą monitorować swoją wagę i postęp w drodze do osiągnięcia celów związanych z formą fizyczną.',
    }
    res.render('login/index', {
        locals,
        layout: '../views/layouts/login'
    });
}
