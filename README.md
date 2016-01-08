## LHBZR
LHBZR is a experimental personal website made with Web Audio API via Soundcloud and Web Graphics Library using Three.js.

### Getting Started
```sh
# Clone this repository.
git clone https://github.com/lhbzr/lhbzr.github.io.git

# Enter in the folder.
cd lhbzr

# Install dependencies.
npm install
```

### Main Files
```sh
lhbzr
├── .gitignore
├── CNAME
├── gulpfile.js
├── package.json
├── README.md
│── src
│   ├── css
│   ├── html
│   ├── img
│   ├── js
│   ├── svg
└── tasks
    ├── build.js
    ├── css.js
    ├── html.js
    ├── img.js
    ├── js.js
    ├── svg.js
    ├── sync.js
    └── watch.js
```

### Tasks
- `gulp html`: Compile HTML Files with Jade.
- `gulp css`: Compile CSS Files with SASS, Autoprefixer and Combine Media Queries.
- `gulp js`: Compile JavaScript Files with Browserify and Uglify.
- `gulp img`: Minify Image Files with Imagemin.
- `gulp svg`: Compile SVG Files with SVGStore.
- `gulp sync`: Start a Server with Browsersync.
- `gulp watch`: Run `gulp sync` and watch file changes.
- `gulp build`: Run `gulp html`, `gulp css`, `gulp js`, `gulp img` and `gulp svg`.
