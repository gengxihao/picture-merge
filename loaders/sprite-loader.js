const spritesmith = require('spritesmith');
const fs = require('fs');
const path = require('path');

module.exports = function (source) {
    console.log(source, '0000000')
    const callback = this.async();
    const imgs = source.match(/url\((\S*)\?_sprite/g);
    let matchedImg = [];
    for (let i = 0; i < imgs.length; i++) {
        const img = imgs[i].match(/url\((\S*)\?_sprite/)[1];
        matchedImg.push(path.join(__dirname, img));
    }
    spritesmith.run({
        src: matchedImg
    }, (err, result) => {
        fs.writeFileSync(path.join(process.cwd(), 'dist/sprite.jpg'), result.image);
        source = source.replace(/url\((\S*)\?_sprite/g, (match) => {
            return `url("dist/sprite.jpg"`;
        })

        fs.writeFileSync(path.join(process.cwd(), 'dist/index.css'), source);
        callback(null, source);
    })
}

