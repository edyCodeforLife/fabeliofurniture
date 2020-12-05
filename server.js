const modRewrite = require('connect-modrewrite');
const express = require('express');
const path = require('path');
const port = 3000;
const expressStaticGzip = require('express-static-gzip');

let app = express();
app.use(
    modRewrite([
        '^/(.*).js$ - [L]',
        '^/assets/(.*)$ - [L]',
        '^/.*$ /index.html',
    ])
);

app.use(expressStaticGzip(path.join(__dirname, 'build')));
app.listen({ port, host: '0.0.0.0' }, err => {
    if (err) throw err;
    console.log(`> Ready on http://0.0.0.0:${port}`);
});
