class controller {
  constructor(page) {
    this.page = page
    this.form = {
      body: page.Body.toString()
    }
  }
}
controller.$inject = ['page']
export default controller
