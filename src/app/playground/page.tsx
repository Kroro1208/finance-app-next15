import PageHeader from '@/components/PageHeader'

const PlayGround = () => {
  return (
    <main className='space-y-8'>
      <h1 className='text-4xl mt-8'>Playground</h1>
      <div>
        <h2 className='mb-4 text-lg font-mono'>Page Header</h2>
        <hr className='mb-4 border-gray-200 dark:border-gray-800'/>
        <PageHeader className='mt-8'/>
      </div>
    </main>
  )
}

export default PlayGround
