'use client'

import { IPracticeTreeResolver, practiceTreeResolver } from '@/resolvers/practiceTreeResolver'
import { acl } from '@/shared/activeClass'
import useChartView from '@pages/chart/hooks/useChartView'
import { NetworkIcon, Table } from 'lucide-react'
import { JSX, memo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import usePracticeStoreTrees from '../../hooks/usePracticeStoreTrees'
import './style.scss'

const AddNewPracticeNode = (): JSX.Element => {
  const { tails, setTrees, trees, setTails } = usePracticeStoreTrees()
  const view = useChartView(s => s.view)

  const form = useForm<IPracticeTreeResolver>({
    mode: 'onChange',
    resolver: practiceTreeResolver,
    defaultValues: {
      quantity: 1
    }
  })
  const { register, setValue, handleSubmit, watch, formState, trigger } = form
  const { quantity, key } = formState.errors

  const handleAddTreeNewNode = (key: string, quantity: number) => {
    const selectTree = trees[key]
    if (!selectTree) toast.error('El árbol no existe')
    Array(quantity)
      .fill(0)
      .forEach(() => {
        const randomId = Math.floor(Math.random() * 1000000)
        selectTree.insert({ id: randomId })
      })
    setTrees({
      ...trees,
      [key]: selectTree
    })
  }

  const handleAddListNewNode = (key: string, quantity: number) => {
    const selectList = tails[key]
    if (!selectList) toast.error('La lista no existe')
    Array(quantity)
      .fill(0)
      .forEach(() => {
        const randomId = Math.floor(Math.random() * 1000000)
        selectList.push({ id: randomId })
      })
    setTails({
      ...tails,
      [key]: selectList
    })
  }

  const handleAddNewNode = async ({ quantity, key }: IPracticeTreeResolver) => {
    if (view === 'tree') return handleAddTreeNewNode(key, quantity)
    handleAddListNewNode(key, quantity)
  }

  const onError = () => {
    toast.error('completa los requerimientos')
  }

  return (
    <form onSubmit={handleSubmit(handleAddNewNode, onError)} className='addDataPractice-form'>
      <button type='submit' className='addDataPractice-submit'>
        AGREGAR {watch('quantity') || 0} NODOS
      </button>

      <section className={`addDataPractice-form__field ${acl(!!quantity, 'error')}`}>
        <div className={`addDataPractice-form__field ${acl(!!quantity, 'error')}`}>
          <h5>Cantidad de nodos:</h5>
          <input autoComplete='off' {...register('quantity', { valueAsNumber: true })} />
          {quantity && <p className='error-message'>{quantity.message}</p>}
        </div>

        <div className='addDataPractice-form__trees'>
          {view === 'tree' &&
            Object.entries(trees).map(([k, tree]) => {
              const size = tree.inOrder().order.length
              return (
                <button
                  type='button'
                  key={k + 'add'}
                  className={`addDataPractice-tree ${acl(watch('key') === k)}`}
                  onClick={() => {
                    setValue('key', k)
                    trigger('key')
                  }}
                >
                  <h5>{k}</h5>
                  <NetworkIcon />
                  <p>{size} nodos</p>
                </button>
              )
            })}
          {view !== 'tree' &&
            Object.entries(tails).map(([k, v]) => {
              return (
                <button
                  type='button'
                  key={k + 'add'}
                  className={`addDataPractice-tree ${acl(watch('key') === k)}`}
                  onClick={() => {
                    setValue('key', k)
                    trigger('key')
                  }}
                >
                  <h5>{k}</h5>
                  <Table />
                  <p>{v.length} nodos</p>
                </button>
              )
            })}
        </div>
        {key && <p className='error-message'>{key.message}</p>}
      </section>
    </form>
  )
}

export default memo(AddNewPracticeNode)
