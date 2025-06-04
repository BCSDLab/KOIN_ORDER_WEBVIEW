module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      padding: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      boxShadow: {
        '1': '0px 1px 1px 0px rgba(0 0 0 / 2%), 0px 2px 4px 0px rgba(0 0 0 / 4%)',
      },
    },
  },
  plugins: [],
}
