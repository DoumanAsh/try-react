module.exports = {
    files: {
        javascripts: {
            joinTo: {
                'vendor.js': /^(?!app)/,
                'app.js': /^app/
            }
        },
        stylesheets: {joinTo: 'app.css'}
    },

    plugins: {
        babel: {
            presets: ['es2015', 'react']
        },
        stylus: {
            includeCss: true,
            plugins: ['autoprefixer-stylus']
        },
        eslint: {
            pattern: /^app\/.*\.jsx*?$/,
            warnOnly: true
        }
  }
};
