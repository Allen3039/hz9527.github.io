const rollup = require('rollup');
const { inputOpt, outputOpt } = require('./config.js');

const watchOptions = {
  ...inputOpt,
  cache: true,
  output: [outputOpt],
  watch: {}
};

const watcher = rollup.watch(watchOptions);

watcher.on('event', event => {
  console.log(event.code);
  if (event.code === 'FATAL') {
    console.log(event)
  }
})
