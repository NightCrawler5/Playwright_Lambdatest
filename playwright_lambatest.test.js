const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

require('dotenv').config();

(async () => {
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': '114.0',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Sample Build',
      'name': 'Test Case 1',
      'user': process.env['LT_USERNAME'],
      'accessKey': process.env['LT_ACCESS_KEY'],
      'network': true,
      'video': true,
      'console': true
    }
  }

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  const page = await browser.newPage()

  await page.goto('https://www.lambdatest.com/selenium-playground/')
  await page.getByRole('link', { name: 'Simple Form Demo' }).click()
  await expect.soft(page).toHaveURL(/.*simple-form-demo/)
  var welcomeText = "Welcome to LambdaTest"
  await page.waitForLoadState("load")
  await page.getByPlaceholder('Please enter your Message').fill(welcomeText)
  await page.getByRole('button', { name: 'Get Checked Value' }).click()
  await page.waitForLoadState("domcontentloaded")
  
  try {
    expect(await page.locator('#message').textContent()).toBe(welcomeText)
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
  } catch {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' } })}`)
  }

  await browser.close()
})();

(async () => {
  const capabilities = {
    'browserName': 'pw-webkit', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'MacOS Big sur',
      'build': 'Playwright Sample Build',
      'name': 'Test Case 2',
      'user': process.env['LT_USERNAME'],
      'accessKey': process.env['LT_ACCESS_KEY'],
      'network': true,
      'video': true,
      'console': true
    }
  }

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  const page = await browser.newPage()

  await page.goto('https://www.lambdatest.com/selenium-playground/');
  await page.getByRole('link', { name: 'Drag & Drop Sliders' }).click();
  await page.waitForSelector("//*[@id='rangeSuccess']/preceding-sibling::*")
  const slider = page.locator("//*[@id='rangeSuccess']/preceding-sibling::*")
  let targetVal = "95";
  let isCompleted = false;
  if(slider){
      var counter = 0
      while(!isCompleted){
          let srcbound = await slider.boundingBox();
          if(srcbound){
              await slider.hover({ force: true, position: { x: counter, y: 0 } })
              await page.mouse.down();
              counter = counter + 5;
              await slider.hover({ force: true, position: { x: counter, y: 0 } })
              await page.mouse.up();
              let newVal = await page.locator("#rangeSuccess").textContent();              
              if(newVal == targetVal){
                  isCompleted = true;
              }
          }
      }
  }

  try {
    expect(await page.locator("#rangeSuccess").textContent()).toBe(targetVal)
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
  } catch {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' } })}`)
  }

  await browser.close()
})();

(async () => {
  const capabilities = {
    'browserName': 'pw-firefox', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 11',
      'build': 'Playwright Sample Build',
      'name': 'Test Case 3',
      'user': process.env['LT_USERNAME'],
      'accessKey': process.env['LT_ACCESS_KEY'],
      'network': true,
      'video': true,
      'console': true
    }
  }

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  const page = await browser.newPage()

  await page.goto('https://www.lambdatest.com/selenium-playground/');
  await page.getByRole('link', { name: 'Input Form Submit' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  expect(page.locator("input#name[required]:invalid")).toBeVisible()
  await page.getByPlaceholder('Name', { exact: true }).fill('New User');
  await page.getByPlaceholder('Email', { exact: true }).fill('testemail@abcd.com');
  await page.getByPlaceholder('Password').fill('123456');
  await page.getByPlaceholder('Company').fill('MyCompany');
  await page.getByPlaceholder('Website').fill('MyCompany.com');
  await page.getByRole('combobox').selectOption({label: "United States"});
  await page.getByPlaceholder('City').fill('HellsKitchen');
  await page.getByPlaceholder('Address 1').fill('Street 123');
  await page.getByPlaceholder('Address 2').fill('Lane 1');
  await page.getByPlaceholder('State').fill('New York');
  await page.getByPlaceholder('Zip code').fill('1234568');
  await page.getByRole('button', { name: 'Submit' }).click();
  expect(await page.locator("//*[@id='seleniumform']/following-sibling::*").textContent()).toStrictEqual("Thanks for contacting us, we will get back to you shortly.")

  try {
    expect(await page.locator("//*[@id='seleniumform']/following-sibling::*").textContent()).toStrictEqual("Thanks for contacting us, we will get back to you shortly.")
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
  } catch {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' } })}`)
  }

  await browser.close()
})();
