const path = require('node:path')
const fs = require('fs-extra')
const yaml = require('js-yaml')
const glob = require('glob-promise')
const ffmpeg = require('fluent-ffmpeg')
const pathToFfmpeg = require('ffmpeg-static')

ffmpeg.setFfmpegPath(pathToFfmpeg)
;(async () => {
  const contents = await glob('contents/**/*.yaml')
  for (let content of contents) {
    const p = path.parse(content)
    const ogg = path.join(p.dir, `${p.name}.ogg`)
    const oggLoop = path.join(p.dir, `${p.name}-2-loop.ogg`)
    const mp3Loop = path.join(p.dir, `${p.name}-2-loop.mp3`)

    const year = path.parse(path.resolve(p.dir, '../..')).name
    const data = yaml.load(await fs.readFile(content, 'utf8'))
    if (!data.title) {
      throw new Error('data yaml error for ' + content)
    }

    await fs.mkdirs(path.dirname(path.join('public', ogg)))

    const options = [
      '-map_metadata',
      '-1',
      '-metadata',
      `title=${data.title}`,
      '-metadata',
      'artist=オリトイツキ',
      '-metadata',
      'album=music.sakana-no-bone.studio',
      '-metadata',
      `date=${year}`,
    ]
    ffmpeg(ogg).outputOptions(options).saveToFile(path.join('public', ogg))
    ffmpeg(oggLoop)
      .outputOptions(options)
      .saveToFile(path.join('public', oggLoop))
    ffmpeg(mp3Loop)
      .outputOptions(options)
      .saveToFile(path.join('public', mp3Loop))
  }
})()
