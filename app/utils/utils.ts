import * as Signer from '@ucanto/principal/ed25519'
import { importDAG } from '@ucanto/core/delegation'
import { CarReader } from '@ipld/car'
import * as Client from '@web3-storage/w3up-client'

const uploadImageFile = async (file: any) => {
  const principal = Signer.parse(process.env.NEXT_PUBLIC_W3UP_KEY || '')
  const client = await Client.create({ principal })

  const proof = await parseProof(process.env.NEXT_PUBLIC_W3UP_PROOF)
  const space = await client.addSpace(proof)
  await client.setCurrentSpace(space.did())
  
  const fileCid = await client.uploadFile(file)
  return fileCid
}

async function parseProof (data: any) {
  const blocks: any = []
  const reader = await CarReader.fromBytes(Buffer.from(data, 'base64'))
  for await (const block of reader.blocks()) {
    blocks.push(block)
  }
  return importDAG(blocks)
}

export default uploadImageFile;