import { viewerModel } from '@/entities/viewer'
import { Card } from '@/shared/ui'
import { useUnit } from 'effector-react'

export const ReportsPage = () => {
  return (
    <div className='h-screen flex flex-col py-5 bg-cover bg-center relative'>
      <div className='grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible'>
        <ReportList />
      </div>

      <Total />
    </div>
  )
}

const ReportHead = () => (
  <thead>
    <tr>
      {TABLE_HEAD.map((head) => (
        <th key={head} className='border-b border-gray-100 bg-gray-200 p-4'>
          <p className='block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70'>
            {head}
          </p>
        </th>
      ))}
    </tr>
  </thead>
)

const ReportList = () => (
  <Card className='mb-4 overflow-scroll h-full w-full relative flex flex-col bg-clip-border'>
    <table className='w-full min-w-max table-auto text-left'>
      {/* <ReportHead /> */}

      <tbody className='divide-y-2'>
        {[1, 2, 3].map((reportRow) => {
          return <MemberReportRow key={reportRow} />
        })}
      </tbody>
    </table>
  </Card>
)

const TABLE_HEAD = ['Member', 'Project', 'Task', 'Work day', 'Timeline', 'Time']

const MemberReportRow = () => {
  const viewer = useUnit(viewerModel.$viewer)
  const classes = 'p-4'
  return (
    <tr className='flex w-full'>
      <td className={classes}>
        <p className='block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal'>
          {`${viewer?.lastName} ${viewer?.firstName}`}
        </p>
      </td>

      <td className={classes}>
        <p className='block antialiased font-sans text-sm leading-normal text-gray-900 font-normal'>
          Проект
        </p>
      </td>

      <td className={classes}>
        <p className='block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal'>
          Авторизация
        </p>
      </td>

      <td className={classes}>
        <p className='block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal'>
          12.05.2023
        </p>
      </td>

      <td className={classes}>
        <p className='block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal'>
          12:30 - 15:00
        </p>
      </td>

      <td className={classes}>
        <p className='block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal'>
          2h 30m
        </p>
      </td>
    </tr>
  )
}

const Total = () => (
  <div className='flex justify-end bg-slate-200/60 rounded-lg py-1 px-5'>
    <div>Total: 18h 17m</div>
  </div>
)
