import puppeteer from 'puppeteer';

const scrollToBottom = () => {
  const getScrollableElement = () => {
    const elements = document.querySelectorAll('div');

    for (let i = 0; i < elements.length; i++) {
      const style = elements[i].getAttribute('style');

      if (style && /overflow: auto; will-change: transform; direction: ltr;/.test(style)) {
        return elements[i];
      }
    }

    return null;
  };

  const scrollableElement = getScrollableElement();

  if (scrollableElement) {
    let currentHeight = 0;

    const timer = setInterval(() => {
      scrollableElement.scrollTo(0, currentHeight);
      currentHeight += 1024;

      if (currentHeight > scrollableElement.scrollHeight) {
        clearInterval(timer);
      }
    }, 1000);
  }
};

const scraper = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(0);

  await page.goto('https://justjoin.it/');

  await page.setViewport({ width: 1920, height: 1024 });

  await page.evaluate(scrollToBottom);
};

export default scraper;
