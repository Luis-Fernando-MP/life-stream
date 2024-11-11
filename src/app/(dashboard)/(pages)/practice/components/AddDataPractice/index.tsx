'use client'

import { IPracticeTreeResolver, practiceTreeResolver } from '@/resolvers/practiceTreeResolver'
import { acl } from '@/shared/activeClass'
import useChartView from '@pages/chart/hooks/useChartView'
import { NetworkIcon } from 'lucide-react'
import { JSX, memo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import usePracticeStoreTrees from '../../hooks/usePracticeStoreTrees'
import './style.scss'

interface IAddDataPractice {
  className?: string
}

const AddDataPractice = ({ className }: IAddDataPractice): JSX.Element => {
  const view = useChartView(s => s.view)
  const { tails, setTrees, trees } = usePracticeStoreTrees()
  const form = useForm<IPracticeTreeResolver>({
    mode: 'onChange',
    resolver: practiceTreeResolver,
    defaultValues: {
      quantity: 1
    }
  })

  const { register, setValue, handleSubmit, watch, formState, trigger } = form
  const { quantity, tree } = formState.errors

  const paragraphFromView = view === 'tree' ? 'Árbol' : 'Tabla'

  const onSubmit = async ({ quantity, tree }: IPracticeTreeResolver) => {
    const selectTree = trees[tree]
    if (!selectTree) toast.error('El árbol no existe')
    Array(quantity)
      .fill(0)
      .forEach(() => {
        const randomId = Math.floor(10000000 + Math.random() * 90000000)
        console.log(selectTree.insert({ id: randomId }))
      })

    setTrees({
      ...trees
    })
    console.log()

    console.log('OK', quantity, tree)
  }

  const onError = () => {
    toast.error('completa los requerimientos')
  }

  return (
    <article className={`${className} addDataPractice`}>
      <h4>Agregar {paragraphFromView}</h4>
      ...
      <h4>Agregar Datos</h4>
      <p>Escoge un {paragraphFromView}:</p>
      <form onSubmit={handleSubmit(onSubmit, onError)} className='addDataPractice-form'>
        <button type='submit' className='addDataPractice-submit'>
          AGREGAR NODOS
        </button>
        <section className={`addDataPractice-form__field ${acl(!!quantity, 'error')}`}>
          <div className='addDataPractice-form__trees'>
            {Object.entries(tails).map(([k, v]) => {
              return (
                <button
                  type='button'
                  key={k + 'add'}
                  className={`addDataPractice-tree ${acl(watch('tree') === k)}`}
                  onClick={() => {
                    setValue('tree', k)
                    trigger('tree')
                  }}
                >
                  <h5>{k}</h5>
                  <NetworkIcon />
                  <p>{v.length} nodos</p>
                </button>
              )
            })}
          </div>
          {tree && <p className='error-message'>{tree.message}</p>}
        </section>
        <div className={`addDataPractice-form__field ${acl(!!quantity, 'error')}`}>
          <p>Cantidad de nodos:</p>
          <input autoComplete='off' {...register('quantity', { valueAsNumber: true })} />
          {quantity && <p className='error-message'>{quantity.message}</p>}
        </div>
      </form>
    </article>
  )
}

export default memo(AddDataPractice)
