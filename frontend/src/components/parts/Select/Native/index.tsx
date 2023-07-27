import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import apiClient from '@/libs/apiClient';
import { AuthInfo } from '@/context/auth';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default function MultipleSelectNative() {
  const auth = AuthInfo()
  const [personName, setPersonName] = React.useState<string[]>([]);
  const handleChangeMultiple = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { options } = event.target;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
    console.log(value)
  };
const handleAddNewPerson = async () => {
  const newChatRoom = await apiClient.post('/chat/newroom', {
    user1Id:auth.userId,
    user2Id:"7654321"
  })
  console.log(newChatRoom)
}
  return (
    <div className='chat_new_btn'>
      <FormControl sx={{ m: 1, minWidth: 250, maxWidth: 300 }}>
        <Select
          multiple
          native
          value={personName}
          // @ts-ignore Typings are not considering `native`
          onChange={handleChangeMultiple}
          label="Native"
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
          {names.map((name) => (
            <option key={name} value={name} onDoubleClick={handleAddNewPerson}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}