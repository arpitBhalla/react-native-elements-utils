#!/usr/bin/env node
const envinfo = require('envinfo');

envinfo
  .run(
    {
      System: ['OS'],
      Binaries: ['Node', 'Yarn', 'npm'],
      npmPackages: ['styled-components', '@rneui/themed', 'expo'],
    },
    { json: true, showNotFound: true }
  )
  .then((env) => console.log(env));
