#!/usr/bin/env node

import App from './core'
import { Terminal } from '@saber2pr/node'
import { join } from 'path'

const [root_dir, out_file = join(root_dir, 'bundle.css')] = Terminal.getParams()

if (root_dir === '-v') {
  Terminal.getCurrentPkgConfig(__dirname).then(pgk => console.log(pgk.version))
} else {
  App(root_dir, out_file)
    .then(_ => Terminal.success(`less-bundle success: ${out_file}`))
    .catch(console.log)
}
