const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

const carsDir = path.join(__dirname, "client/public/cars")
const OUT_W = 700
const OUT_H = 420

async function normalizeImage(filePath) {
    const name = path.basename(filePath)
    try {
        const trimmed = await sharp(filePath)
            .trim({ background: { r: 255, g: 255, b: 255 }, threshold: 50 })
            .toBuffer()

        await sharp(trimmed)
            .resize(OUT_W - 40, OUT_H - 40, { fit: "inside", withoutEnlargement: false })
            .toBuffer()
            .then(resized => sharp(resized).metadata().then(meta => ({ resized, meta })))
            .then(({ resized, meta }) => {
                const padTop = Math.round((OUT_H - meta.height) / 2)
                const padBottom = OUT_H - meta.height - padTop
                const padLeft = Math.round((OUT_W - meta.width) / 2)
                const padRight = OUT_W - meta.width - padLeft
                return sharp(resized)
                    .extend({
                        top: padTop,
                        bottom: padBottom,
                        left: padLeft,
                        right: padRight,
                        background: { r: 255, g: 255, b: 255, alpha: 0 },
                    })
                    .png()
                    .toFile(filePath + ".tmp.png")
            })

        fs.renameSync(filePath + ".tmp.png", filePath)
        console.log(`✓ ${name}`)
    } catch (err) {
        console.error(`✗ ${name}: ${err.message}`)
    }
}

async function run() {
    const files = fs.readdirSync(carsDir).filter(f => /\.(png|jpg|jpeg)$/i.test(f))
    console.log(`Normalizing ${files.length} images to ${OUT_W}x${OUT_H}...\n`)
    for (const file of files) {
        await normalizeImage(path.join(carsDir, file))
    }
    console.log("\nDone.")
}

run()
