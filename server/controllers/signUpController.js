// GET signupPage
exports.signupPage = async (req, res) => {
    const locals = {
        title: 'Rejestracja - FitCoach',
        description: 'FitCoach to aplikacja dedykowana dla osób, które chcą monitorować swoją wagę i postęp w drodze do osiągnięcia celów związanych z formą fizyczną.'
    }
    res.render('signup/index', {
        locals,
        layout: '../views/layouts/signup'
    });
}