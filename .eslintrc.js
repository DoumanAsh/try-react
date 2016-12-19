module.exports = {
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "rules": {
        "semi": ["error", "always"],
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "globals": {
        "React": true
    },

    "plugins": [
        "react"
    ],
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
                "modules": true,
                "jsx": true
        }
    }
}
