import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Delete as DeleteIcon, CreateRounded as EditIcon, AddCircle } from '@mui/icons-material';
import { Stack, Box, Container, Paper, InputBase, IconButton, Snackbar, Alert, Slide,
    Dialog, DialogTitle, Typography, Button, TextField, Checkbox } from '@mui/material';

const Notification = (props) => {
    const { onClose, open, message } = props;

    const vertical = 'bottom'
    const horizontal = 'right'

    return (
    <Snackbar open={open} autoHideDuration={4000} onClose={() => onClose()}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical, horizontal }}
    > <Alert
        onClose={() => onClose()}
        severity={message.severity} // warning // error // success
        variant="filled"
        sx={{ width: '100%' }}
        >{message.text}</Alert>
    </Snackbar>
    );
}

const DeleteDialog = ({ onClose, selectedValue, open }) => {
    return (
        <Dialog onClose={e => onClose(false)} open={open}>
            <DialogTitle>Delete?</DialogTitle>
            <Typography sx={{m: '1em'}}>are you sure you want to delete `{selectedValue}`?</Typography>
            <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{m: '1em'}}>
                <Button color="primary" onClick={e => onClose(false)}>Cancel</Button>
                <Button color="warning" onClick={e => onClose(true)}>Delete</Button>
            </Stack>
        </Dialog>
    );
}

const EditDialog = ({ onClose, value, open }) => {
    const [name, setName] = useState(value);
    return (
        <Dialog onClose={e => onClose(false)} open={open}>
            <DialogTitle>Edit?</DialogTitle>
            <TextField sx={{m: '1em'}} label="Edit Todo" variant="standard"
                value={name} onChange={(e) => setName(e.target.value)}/>
            <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{m: '1em'}}>
                <Button color="primary" onClick={e => onClose(false, name)}>Cancel</Button>
                <Button color="warning" onClick={e => onClose(true, name)}>Update</Button>
            </Stack>
        </Dialog>
    );
}

export default function IconLabelButtons() {
    const [name, setName] = useState("");
    const [list, setList] = useState([]);
    const [openDeleteDialoge, setOpenDeleteDialoge] = useState(false);
    const [openEditDialoge, setOpenEditDialoge] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(-1);
    const [openAlert, setOpenAlert] = useState(false);
    const [message, setMessage] = useState({ text: "", severity: "" });

    const handleEditModalOpen = (item) => {
        setCurrentTodo(item);
        setOpenEditDialoge(true);
    };

    const handleDeleteModalOpen = (item) => {
        setCurrentTodo(item);
        setOpenDeleteDialoge(true);
    };

    const handleEditModalClose = (isUpdate, value) => {
        if (isUpdate) {
            editTodo(currentTodo, null, value);
        }
        setOpenEditDialoge(false);
        setCurrentTodo(null);
    }

    const handleAlertOpen = (severity, text) => {
      setMessage({ text, severity })
      setOpenAlert(true);
    };

    const handleAlertClose = (value) => {
      setOpenAlert(false);
      setMessage({ text: "", severity: "" })
    };

    const saveTodo = async () => {
        const response = await fetch("http://localhost:5000/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: uuidv4(), isCompleted: false, name}),
        });
        handleAlertOpen("success", "Added Successfully");
        setName("");
        getTodos();
    }

    const editTodo = async (item, isCompleted, value) => {
        if (isCompleted !== null) {
            item.isCompleted = isCompleted;
        }
        if (value !== null) {
            item.name = value;
        }
        const response = await fetch(`http://localhost:5000/todos/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({isCompleted: item.isCompleted, name: item.name}),
        });
        handleAlertOpen("primary", "Updated Successfully");
        getTodos();
    }

    const handleDeleteModalClose = async (value) => {
        if (value && currentTodo !== null) {
            const response = await fetch(`http://localhost:5000/todos/${currentTodo.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            getTodos();
        }
        handleAlertOpen("warning", "Deleted Successfully");
        setOpenDeleteDialoge(false);
        setCurrentTodo(null);
    };

    const fetchTodos = async () => {
        const response = await fetch("http://localhost:5000/todos");
        return await response.json();
    }

    const getTodos = async () => {
        const list = await fetchTodos();
        setList(list);
        //handleAlertOpen("secondary", "Fetched Successfully");
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <Container maxWidth="sm">
            <Box >
                <Typography sx={{p: '1em', fontWeight: 'bold', fontSize: 'h5.fontSize'}}>Todo List </Typography>

                <Paper component="form" sx={{ p: '.5em', display: 'flex'}} >
                    <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Add Todo" value={name} onChange={(e) => setName(e.target.value)}/>
                    <IconButton type="button" size="large" sx={{p: 0}} onClick={saveTodo}>
                        <AddCircle color="primary" sx={{ fontSize: 35 }}></AddCircle>
                    </IconButton>
                </Paper>
                {
                    list.length > 0 ? 
                    list.map((item, index) =>
                        <Stack spacing={2} direction="row" justifyContent="space-between"
                             sx={{m: '1em'}} key={item.id}>
                            <Stack spacing={2} direction="row" alignItems="center">
                                <Checkbox defaultValue={item.isCompleted} checked={item.isCompleted}
                                    onChange={e => editTodo(item, e.target.checked, null)} />
                                <Typography sx={{ textDecoration : item.isCompleted ? 'line-through' : 'none' }} >{item.name}</Typography>
                            </Stack>
                            <Stack spacing={2} direction="row" alignItems="center">
                                <EditIcon color="primary" onClick={() => handleEditModalOpen(item)} />
                                <DeleteIcon color="error" onClick={() => handleDeleteModalOpen(item)} />
                            </Stack>
                        </Stack>
                    ) : <Typography sx={{m: '1em'}}>No Todo Added..!</Typography>
                    
                }
                {
                    openDeleteDialoge && (
                        <DeleteDialog selectedValue={currentTodo.name}
                            open={openDeleteDialoge} onClose={handleDeleteModalClose} />
                    )
                }
                {
                    openEditDialoge && (
                        <EditDialog value={currentTodo.name}
                            open={openEditDialoge} onClose={handleEditModalClose} />
                    )
                }
            </Box>
            <Notification
                open={openAlert}
                message={message}
                onClose={handleAlertClose}
            />
        </Container>
    );
}
