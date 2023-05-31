

const indexController = {}

indexController.index = (req, res) =>{
    res.render('index')
}

indexController.personas = (req, res) =>{
    res.render('personas')
}

indexController.index2 = (req, res) =>{
    res.render('index2')
}

export default indexController