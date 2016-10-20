#!/usr/bin/env node

import meow from 'meow'
import isOnline from 'is-online'
import childProcess from 'child_process'
import chalk from 'chalk'

const cli = meow(`
  Usage
    $ nofi [flag] [npm-package]

  Options
    --save, -S
    --save-dev, -D
    --save-optional, -O

  Examples
    $ nofi -D some-npm-package
`, {
  alias: {
    S: 'save',
    D: 'save-dev',
    O: 'save-optional'
  }
})

const flagger = () => {
  if (cli.flags.save) return `--save ${cli.flags.save}`
  if (cli.flags.saveDev) return `--save-dev ${cli.flags.saveDev}`
  if (cli.flags.saveOptional) return `--save-optional ${cli.flags.saveOptional}`
}

isOnline((err, yup) => {
  if (err) throw err

  if (yup) {
    console.log(`${chalk.bold.green('Online.')} nofi will attempt to force an install from the internet. Ignore npm's cryptic warning.`)
    childProcess.execSync(`npm install --force ${flagger()}`)
  } else {
    console.log(`${chalk.bold.red('Not online.')} nofi will attempt to install from cache, but can't guarantee you have this package.`)
    childProcess.execSync(`npm install --cache-min Infinity ${flagger()}`)
  }
})
