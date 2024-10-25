import type { JSX } from 'react'

import { useDataStore } from './store'

const ArrayView = (): JSX.Element => {
  const { data } = useDataStore()

  return (
    <div className='overflow-auto'>
      {Object.entries(data).map(([key, items]) => (
        <section key={key} className='overflow-hidden'>
          <header className='bg-gradient-to-r from-purple-500 to-pink-500'>
            <div className='text-white'>{key.charAt(0).toUpperCase() + key.slice(1)}</div>
          </header>
          <article className='p-4'>
            <section className='h-[300px]'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                {items.map((item, index) => (
                  <section className='proveedor' key={item.id}>
                    <section className='tooltip'>
                      <div>
                        <div className='cursor-pointer rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md'>
                          <span className='font-mono text-sm text-gray-700'>Item {index + 1}</span>
                        </div>
                      </div>
                      <article id='tooltip' className='w-64 p-0'>
                        <section className='h-[200px] w-full p-4' id='scroll'>
                          <pre className='whitespace-pre-wrap break-words text-xs'>
                            {JSON.stringify(item, null, 2)}
                          </pre>
                        </section>
                      </article>
                    </section>
                  </section>
                ))}
              </div>
            </section>
          </article>
        </section>
      ))}
    </div>
  )
}

export default ArrayView
