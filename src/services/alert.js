class AlertService {

  constructor($mdToast) {
    this.mdToast = $mdToast
  }

  displayAlert(message, options) {
    this.mdToast.show(
      this.mdToast.simple()
        .textContent(message)
        .position("bottom")
        .hideDelay(4000)
    )
  }

}

AlertService.$inject = ['$mdToast'];
export default AlertService
