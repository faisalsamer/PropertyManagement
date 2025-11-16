'use client'
import Input from './costume-ui/input'
import InputGroup from './costume-ui/input-group'

const AddOwner = () => {
  const styles = {
    inputsContainer: 'grid grid-cols-2 items-start gap-5'
  }

  return (
    <div className='flex flex-col gap-7.5'>
      <div className={styles.inputsContainer}>
        <InputGroup label='First Name' isRequired>
          <Input placeholder='E.g. Mohammed' required />
        </InputGroup>
        <InputGroup label='Last Name'>
          <Input placeholder='E.g. Ali' />
        </InputGroup>
      </div>
      <div className={styles.inputsContainer}>
        <InputGroup label='Phone Number' isRequired>
          <Input
            placeholder='E.g. +6011286643'
            note='Used to redirect to Whatsapp'
            required
          />
        </InputGroup>
        <InputGroup label='Email'>
          <Input type='email' placeholder='E.g. Ali' />
        </InputGroup>
      </div>
    </div>
  )
}

export default AddOwner
