import { createSignal, onMount } from 'solid-js'
import { Title } from 'solid-start'
import { NCSolanaSelector } from '@nightlylabs/wallet-selector-solana'
import { StandardWalletAdapter } from '@solana/wallet-standard'
import { Connection, PublicKey, SystemProgram, Transaction as SolanaTx } from '@solana/web3.js'

const selector = new NCSolanaSelector({
  appInitData: {
    appMetadata: {
      name: 'Test application',
      description: 'If you see this message, you will be soon testing new Nightly Connect',
      icon: 'https://pbs.twimg.com/profile_images/1509999443692687367/T5-8VrZq_400x400.jpg',
      additionalInfo: 'Courtesy of Nightly Connect team'
    }
  }
})

const connection = new Connection('https://api.devnet.solana.com')

export default function Home() {
  const [adapter, setAdapter] = createSignal<StandardWalletAdapter>()
  onMount(() => {
    selector.onSelectWallet = (newAdapter) => {
      setAdapter(newAdapter)
    }
  })
  return (
    <main>
      <Title>Hello World</Title>
      <button
        onClick={() => {
          selector.openModal()
        }}>
        Connect
      </button>
      <button
        onClick={async () => {
          const adapt = adapter()

          if (!adapt || adapt.publicKey === null) {
            return
          }

          const ix = SystemProgram.transfer({
            fromPubkey: adapt.publicKey,
            lamports: 1_000_000,
            toPubkey: new PublicKey('147oKbjwGDHEthw7sRKNrzYiRiGqYksk1ravTMFkpAnv')
          })
          const tx = new SolanaTx().add(ix).add(ix).add(ix).add(ix).add(ix)
          const a = await connection.getRecentBlockhash()
          tx.recentBlockhash = a.blockhash
          tx.feePayer = adapt.publicKey
          const signedTx = await adapt.signTransaction!(tx)
          const id = await connection.sendRawTransaction(signedTx!.serialize())
          console.log(id)
        }}>
        Connect
      </button>
    </main>
  )
}
