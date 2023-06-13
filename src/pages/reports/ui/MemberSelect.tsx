import { Select } from '@/shared/ui'

export const MemberSelect = () => (
  <div>
    <Select
      className='!px-3 py-2'
      values={['Фрошгайзер Андрей', 'Чернобривец Илья']}
      onValueChange={() => {}}
      placeholder='Select member'
    />
  </div>
)
