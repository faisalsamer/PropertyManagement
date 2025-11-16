import Input from './costume-ui/input'
import InputGroup from './costume-ui/input-group'
import Select from './costume-ui/select'
import { malaysiaStates } from '@/utils/data'

const AddProject = () => {
  return (
    <div className='flex flex-col gap-7.5'>
      <InputGroup label='Name' isRequired>
        <Input
          placeholder='E.g. Heights Residence Condominium'
          className='w-full'
          maxLength={50}
          required
        />
      </InputGroup>
      <InputGroup label='State' isRequired>
        <Select
          label='States'
          items={malaysiaStates}
          placeholder='Select a state'
          required
        />
      </InputGroup>
    </div>
  )
}

export default AddProject
