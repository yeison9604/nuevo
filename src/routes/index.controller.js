

const indexController = {}


indexController.index = (req, res) =>{
    res.render('index')
}

indexController.personas = (req, res) =>{
    res.render('personas')
}

indexController.login = (req, res) =>{
    res.render('login')
}

indexController.registro = (req, res) =>{
    res.render('registro')
}

export default indexController