const got = require('got').default;
const { sites: WEBSITES } = require('./sites.json');

(async () => {
  WEBSITES.forEach(async (url) => {
    const { body } = await got(url, {
      https: {
        rejectUnauthorized: false,
      },
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        Pragma: 'no-cache',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
      },
    });

    const scriptUrl = /\['_setAu', '(\/\w+\/\w+)'\]/i.exec(body);

    if (!scriptUrl) return;

    const res = await got(`${url}${scriptUrl[1]}`, {
      https: {
        rejectUnauthorized: false,
      },
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        Pragma: 'no-cache',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
      },
    });

    const ver = res.body.split('ver:')[1]?.split(',ke_cnt_lmt')[0];

    if (!ver) return;

    console.log(`${url}${scriptUrl[1]}`, ver);
  });
})();
