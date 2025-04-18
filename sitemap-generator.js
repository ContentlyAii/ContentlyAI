const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

async function generateSitemap() {
  const sitemapStream = new SitemapStream({ hostname: 'https://contentlyaii-india.netlify.app' }); // Replace with your future custom domain

  sitemapStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  sitemapStream.write({ url: '/about', changefreq: 'monthly', priority: 0.7 });
  sitemapStream.write({ url: '/services', changefreq: 'monthly', priority: 0.7 });
  sitemapStream.write({ url: '/contact', changefreq: 'monthly', priority: 0.7 });
  sitemapStream.write({ url: '/blog', changefreq: 'weekly', priority: 0.8 });

  sitemapStream.end();

  const sitemap = await streamToPromise(sitemapStream).then(sm => sm.toString());
  createWriteStream('./public/sitemap.xml').write(sitemap);
}

generateSitemap()
  .then(() => console.log('✅ Sitemap generated successfully!'))
  .catch((err) => console.error('❌ Error generating sitemap:', err));
