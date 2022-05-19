let defaultPresets;
if (process.env.BABEL_ENV === 'es') {
  defaultPresets = [];
} else {
  defaultPresets = [
    [
      '@babel/preset-env',
      {
        modules: ['esm'].includes(process.env.BABEL_ENV) ? false : 'commonjs',
      },
    ],
  ];
}

const productionPlugins = [];
module.exports = {
  presets: defaultPresets.concat(['@babel/preset-typescript']),
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-object-assign',
  ],
  env: {
    cjs: {
      plugins: productionPlugins,
      ignore: ['**/*.test.ts'],
    },
    es: {
      plugins: [
        ...productionPlugins,
        ['@babel/plugin-transform-runtime', { useESModules: true }],
      ],
      ignore: ['**/*.test.ts'],
    },
    esm: {
      plugins: [
        ...productionPlugins,
        ['@babel/plugin-transform-runtime', { useESModules: true }],
      ],
      ignore: ['**/*.test.ts'],
    },
  },
};
