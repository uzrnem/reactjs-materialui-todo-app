import { Typography } from '@mui/material';
import { useState } from 'react';

export default function useStateHook() {
    
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button variant="outlined" onClick={() => setOpen(true)}>Show Alert</Button>
            {
                open && <Typography sx={{m: '1em'}}>Are you sure you want to delete this item?</Typography>
            }
        </div>
    )
}