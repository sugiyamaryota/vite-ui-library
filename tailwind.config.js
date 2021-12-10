module.exports = {
  jit: true,
  content: ['src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  prefix: 'mylib-'
}
