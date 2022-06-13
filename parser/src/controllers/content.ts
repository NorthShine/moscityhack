import ApiError from '../exceptions/api-errors';
import { Response, Request, NextFunction } from 'express';
import { firefox } from 'playwright';

interface UserComment {
  user: string;
  text: string;
  dateCreated: string;
}

export const getContent = async (req: Request, res: Response, next: NextFunction) => {
  const { url } = req.query;

  if (!url) {
    return next(ApiError.badRequest('Missing url'));
  }

  if (typeof url !== 'string') {
    return next(ApiError.badRequest("Query param 'url' has to be of type string"));
  }

  try {
    const browser = await firefox.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url, {
      waitUntil: 'load',
      timeout: 0
    });
    await page.waitForSelector('body');
    const data = await page.evaluate(() => {
      const body = document.body;

      const getContentElement = (body: HTMLElement): HTMLElement => {
        const article = body.querySelector('article');
        if (article) {
          return article;
        }
        const main = body.querySelector('main');
        if (main) {
          return main;
        }
        return body;
      };

      const contentElement = getContentElement(body);

      const formatText = (str: string): string => {
        return str.replace(/\s+/gi, ' ').trim();
      };

      const getInnerText = (el: Document | Element | HTMLElement | null, selector: string) => {
        const target = el?.querySelector(selector) as HTMLElement | null;
        return target?.innerText ?? '';
      }

      const getAuthor = (document: Document): string => {
        const metaAuthor = document
          .querySelector('meta[name="author"]')?.getAttribute('content');
        if (metaAuthor) {
          return metaAuthor;
        }

        const schemaAuthor = getInnerText(
          document,
          '[itemtype$="schema.org/Person"][itemprop="author"] [itemprop="name"]'
        );
        if (schemaAuthor) {
          return schemaAuthor;
        }

        const author = ['^', '$'].reduce((acc, sign) => {
          if (!acc) {
            const result = getInnerText(
              document,
              `[class${sign}="author"], [id${sign}="author"], [name${sign}="author"]`
            );
            acc = result;
          }
          return acc;
        }, '');

        if (author) {
          return author;
        }

        return '';
      };

      const getDescription = (document: Document): string => {
        const metaDescription = document.querySelector('meta[name="description"], meta[name="Description"]')
          ?.getAttribute('content');
        return metaDescription ?? '';
      }

      const ARTICLES_TYPES = ['NewsArticle', 'Article'];

      const isArticle = Array.from(
        document.querySelectorAll('script[type="application/ld+json"]')
      ).some((script) => {
        try {
          const json = JSON.parse((script as HTMLElement).innerText);
          const type = json['@type'];
          return ARTICLES_TYPES.includes(type);
        } catch (err) {
          return false;
        }
      });

      return {
        title: document.title,
        author: formatText(getAuthor(document)),
        lastModified: document.lastModified,
        isArticle,
        description: formatText(getDescription(document)),
        text: formatText(contentElement.innerText),
      };
    });
    await browser.close();
    return res.status(200).json(data).end();
  } catch (err) {
    next(err);
  }
};
