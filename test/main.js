import test from 'ava'
import webdriver from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'
import chromedriver from 'chromedriver'
import config from './config.json'

const path = chromedriver.path
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);
const driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

test('has the correct title', async t => {
  driver.get('http://localhost:8080')
  const title = driver.getTitle()
    .then(title => {
      return title
    })
  t.is(await title, 'Markdown Author');
  driver.quit();
});

test('a user can login', t => {
  t.plan(1);
  driver.get('http://localhost:8080')
  const title = driver.getTitle()
    .then(title => {
      return title
    })
  const username = driver.findElement(webdriver.By.id('username'))
  const password = driver.findElement(webdriver.By.id('password'))

  username.sendKeys(config.username)
  password.sendKeys(config.password)

  const btn = driver.findElement(webdriver.By.css('button[type=submit]'))
  btn.click()

  const selector = webdriver.By.id('my-account')
  driver.wait(
    webdriver.until.elementLocated(selector),
    4000
  );

  return driver.findElement(selector)
    .then(resp => {
      t.pass()
    })
    .catch(err => {
      t.fail()
    })
  driver.quit();
});
