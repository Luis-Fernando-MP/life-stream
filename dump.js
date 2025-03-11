import { config } from 'dotenv'
import 'dotenv/config'
import mysqldump from 'mysqldump'

config({ path: '.env' })

const DUMP_FILE = './dump.sql'

async function performDump() {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env
  if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME || !DB_PORT) {
    throw new Error('Missing environment variables')
  }

  await mysqldump({
    connection: {
      host: DB_HOST,
      user: DB_USER,
      port: Number(DB_PORT),
      password: DB_PASSWORD,
      database: DB_NAME
    },
    dumpToFile: DUMP_FILE
  })

  console.log(`Dump saved to ${DUMP_FILE}`)
}

performDump().catch(console.error)
