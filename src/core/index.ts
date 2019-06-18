/*
 * @Author: saber2pr
 * @Date: 2019-06-18 19:35:57
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-18 19:38:50
 */
import less from 'less'
import { FS } from '@saber2pr/node'
import { extname } from 'path'

export default (root_dir: string, out_file: string) =>
  FS.search(root_dir)
    .then(files => files.filter(name => extname(name) === '.less'))
    .then(less_files => Promise.all(less_files.map(file => FS.readFile(file))))
    .then(buffers => buffers.map(buffer => buffer.toString()))
    .then(texts => Promise.all(texts.map(text => less.render(text))))
    .then(outputs => outputs.map(output => output.css))
    .then(stylesheet => stylesheet.join(''))
    .then(css_bundle => FS.writeFile(out_file, css_bundle))
