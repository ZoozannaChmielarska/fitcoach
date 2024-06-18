// GET homePage
exports.homePage = async (req, res) => {
    const locals = {
        title: 'FitCoach',
        description: 'FitCoach to aplikacja dedykowana dla osób, które chcą monitorować swoją wagę i postęp w drodze do osiągnięcia celów związanych z formą fizyczną.',
    }
    res.render('index', locals);
}
