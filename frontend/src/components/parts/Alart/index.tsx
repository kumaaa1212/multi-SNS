import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface Props {
  contents: string
}

export default function BasicAlerts(props:Props) {
  const { contents } = props
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">{contents}</Alert>
    </Stack>
  );
}