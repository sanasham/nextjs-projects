import ZAI from 'z-ai-web-dev-sdk'
import fs from 'fs'
import path from 'path'

const OUT = path.resolve(process.cwd(), 'public/products')
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true })

type Job = { name: string; prompt: string; size: string }

const jobs: Job[] = [
  {
    name: 'hero',
    size: '1152x864',
    prompt:
      'Premium overhead flat-lay of traditional South Indian Andhra Telugu feast on a rustic dark wooden table: assortment of colorful homemade pickles (mango, gongura, tomato) in ceramic bowls, murukulu and mixture snacks, a bowl of rice, brass spoons, fresh red chillies and curry leaves scattered, warm golden natural lighting, rich saturated colors, professional food photography, high detail, appetizing, editorial quality, no text',
  },
  {
    name: 'cat-pickles',
    size: '1024x1024',
    prompt:
      'Three glass jars of homemade Indian pickles — mango, gongura, tomato — on a cream linen surface with fresh ingredients (raw mango, red chillies, mustard seeds) around them, soft warm light, premium product photography, top-down, no text, no labels',
  },
  {
    name: 'cat-snacks',
    size: '1024x1024',
    prompt:
      'A rustic arrangement of South Indian traditional snacks — golden murukulu, spicy mixture, chegodilu — in a woven basket on warm cream background with curry leaves, premium food photography, top-down, appetizing, no text',
  },
  {
    name: 'cat-sweets',
    size: '1024x1024',
    prompt:
      'Traditional Indian sweets — golden laddoos, ariselu, kaja — arranged on a brass plate with marigold flowers on warm cream background, warm light, premium food photography, top-down, no text',
  },
  {
    name: 'cat-spices',
    size: '1024x1024',
    prompt:
      'Small wooden bowls of colorful Indian spice powders — red chilli powder, turmeric, coriander, garam masala — on a cream surface with whole spices scattered, warm light, premium product photography, top-down, no text',
  },
  {
    name: 'gongura-pickle',
    size: '1024x1024',
    prompt:
      'A glass jar of Andhra gongura (sorrel leaves) pickle, deep red-green color, served in a small ceramic bowl with fresh gongura leaves and red chillies on a cream background, premium product photography, appetizing, no text, no labels',
  },
  {
    name: 'tomato-pickle',
    size: '1024x1024',
    prompt:
      'A glass jar of homemade tomato pickle, rich red color, served in a small ceramic bowl with fresh ripe tomatoes and curry leaves on a cream background, premium product photography, appetizing, no text, no labels',
  },
  {
    name: 'garlic-pickle',
    size: '1024x1024',
    prompt:
      'A glass jar of garlic pickle with whole peeled garlic cloves in red chilli oil, served in a small ceramic bowl with fresh garlic bulbs on a cream background, premium product photography, appetizing, no text, no labels',
  },
  {
    name: 'chicken-pickle',
    size: '1024x1024',
    prompt:
      'A glass jar of Andhra chicken pickle with tender boneless chicken pieces in spiced red oil, served in a small ceramic bowl with whole red chillies on a cream background, premium product photography, appetizing, no text, no labels',
  },
  {
    name: 'mixture',
    size: '1024x1024',
    prompt:
      'A glass jar of Andhra spicy mixture (savory snack mix) with sev, boondi, curry leaves and peanuts, served in a small ceramic bowl on a cream background, premium product photography, appetizing, no text, no labels',
  },
  {
    name: 'murukulu',
    size: '1024x1024',
    prompt:
      'A glass jar of golden crispy murukulu (chakli) spiral snacks, a few served in a small ceramic bowl on a cream background, premium product photography, appetizing, no text, no labels',
  },
  {
    name: 'sweet',
    size: '1024x1024',
    prompt:
      'A glass jar of traditional Andhra ariselu (golden sweet discs) with sesame and jaggery, a few served on a brass plate with marigold on a cream background, premium product photography, appetizing, no text, no labels',
  },
  {
    name: 'about-story',
    size: '1152x864',
    prompt:
      'An elderly Indian grandmother in a traditional saree hand-mixing a large brass pot of mango pickle in a sunlit rustic kitchen with jars of spices on wooden shelves, warm authentic atmosphere, professional editorial food photography, no text',
  },
]

async function genOne(zai: Awaited<ReturnType<typeof ZAI.create>>, job: Job): Promise<void> {
  const outPath = path.join(OUT, `${job.name}.png`)
  if (fs.existsSync(outPath)) {
    console.log(`[skip] ${job.name}`)
    return
  }
  console.log(`[start] ${job.name} (${job.size})`)
  try {
    const res = await zai.images.generations.create({ prompt: job.prompt, size: job.size })
    const b64 = res.data[0].base64
    fs.writeFileSync(outPath, Buffer.from(b64, 'base64'))
    console.log(`[ok] ${job.name}`)
  } catch (e) {
    console.error(`[fail] ${job.name}:`, (e as Error).message)
  }
}

async function main() {
  const zai = await ZAI.create()
  // Run in parallel batches of 3 to avoid overwhelming the API
  const batchSize = 1
  for (let i = 0; i < jobs.length; i += batchSize) {
    const batch = jobs.slice(i, i + batchSize)
    await Promise.all(batch.map((j) => genOne(zai, j)))
  }
  console.log('ALL DONE')
  console.log('files:', fs.readdirSync(OUT))
}

main().catch((e) => { console.error('FATAL', e); process.exit(1) })
