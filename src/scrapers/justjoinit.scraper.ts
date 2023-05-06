import puppeteer from 'puppeteer';
import config from '../config';

const getOffersOnScroll = () => {
  const getScrollableElement = () => {
    const elements = document.querySelectorAll('div');

    for (const el of elements) {
      const style = el.getAttribute('style');

      if (style && /overflow: auto; will-change: transform; direction: ltr;/.test(style)) {
        return el;
      }
    }

    return null;
  };

  const getScrollableElementHeight = (element: HTMLDivElement | null) => {
    const match = element?.style.height.match(/(\d+)/);

    if (Array.isArray(match)) {
      return parseInt(match[0]);
    }

    return null;
  };

  const getOffers = async () => {
    const elements = document.getElementsByTagName('a');
    const offers = [];

    for (const el of elements) {
      const href = el.getAttribute('href');
      if (href?.match(/\/offer/)) {
        offers.push(href);
      }
    }

    return offers;
  };

  const scrollPage = (element: HTMLDivElement, height: number) => {
    const offers: string[] = [];
    let currentHeight = 0;

    const timer = setInterval(async () => {
      const displayedOffers = await getOffers();
      offers.push(...displayedOffers);

      element.scrollTo(0, currentHeight);

      currentHeight += height;

      if (displayedOffers.length === 0 || currentHeight > element.scrollHeight) {
        clearInterval(timer);
      }
    }, 10);
  };

  const scrollableElement = getScrollableElement();
  const elementHeight = getScrollableElementHeight(scrollableElement);

  if (scrollableElement && elementHeight) {
    scrollPage(scrollableElement, elementHeight);
  }
};

const scraper = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(0);

  await page.goto(config.scrapers.justjoin.url);

  await page.setViewport({ width: 1920, height: 1024 });

  await page.evaluate(getOffersOnScroll);
};

export default scraper;
