 apiproxy.js
export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send(Укажите целевой URL в параметрах (url=...));
  }

  try {
     Делаем запрос к заблокированному сайту со стороны Vercel
    const response = await fetch(url, {
      headers {
        'User-Agent' 'Mozilla5.0 (Windows NT 10.0; Win64; x64) AppleWebKit537.36'
      }
    });

    const html = await response.text();

     Явно удаляем или переопределяем заголовки кликджекинга
    res.setHeader('Access-Control-Allow-Origin', '');
    res.setHeader('Content-Type', 'texthtml; charset=utf-8');
    
     Отправляем очищенный HTML обратно на ваш фронтенд
    return res.status(200).send(html);
  } catch (error) {
    return res.status(500).send(Не удалось загрузить страницу через прокси);
  }
}
