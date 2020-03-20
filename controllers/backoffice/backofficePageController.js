
let backofficePageController = {
  moradorDashboard: (req,res) => {
    res.render("backoffice/morador/dashboard", {titulo:"Dashboard - Morador"})
  }
}


module.exports = backofficePageController