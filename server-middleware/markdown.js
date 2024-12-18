const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

module.exports = (req, res, next) => {
  try {
    const postsDir = path.resolve(__dirname, '../content/posts');
    const filenames = fs.readdirSync(postsDir);
    const posts = filenames.map((filename) => {
      const filePath = path.join(postsDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      return {
        ...data,
        content: marked(content),
        slug: filename.replace(/\.md$/, ''),
      };
    });
    res.end(JSON.stringify(posts));
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};
