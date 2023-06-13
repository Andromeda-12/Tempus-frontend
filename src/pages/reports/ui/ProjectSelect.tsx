import { Select } from '@/shared/ui'

export const ProjectSelect = () => (
  <div>
    <Select
      className='!px-3 py-2'
      values={['Проект']}
      onValueChange={() => {}}
      placeholder='Select project'
    />
  </div>
)
