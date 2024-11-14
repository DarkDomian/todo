import React, { useState } from "react";
import {
  Card,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Divider,
  ButtonGroup,
  Button,
  Badge,
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from "@mui/material"
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

// import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
// import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  // const [todos, setTodos] = useState<Todo[]>([
  //   { id: 1, text: "Тестовое задание", completed: false },
  //   { id: 2, text: "Прекрасный код", completed: true },
  //   { id: 3, text: "Покрытие тестами", completed: false },
  // ]);

  // const handleToggle = (id: number) => {
  //   setTodos((prevTodos) =>
  //     prevTodos.map((todo) =>
  //       todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //     )
  //   );
  // };

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <Typography
        variant="h1"
        align="center"
        color="textSecondary"
        style={{ opacity: 0.8 }}
      >
        todos
      </Typography>
      <Card style={{ maxWidth: 400, margin: "0 auto", padding: "20px" }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <KeyboardArrowDownIcon sx={{ color: 'action.active', mx: 1, my: 1 }} />
          <TextField
            id="new-todo"
            label="What needs to be done?"
            variant="standard"
            // variant="outlined"
            fullWidth
            margin="dense"
            multiline
            minRows={1}
            maxRows={4}
          />          
        </Box>

        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              disablePadding
            >
              {/* <ListItemButton role={undefined} onClick={handleToggle(value)} dense> */}
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense >
                <ListItemIcon>
                  <Checkbox
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<TaskAltIcon />}
                    edge="start"
                    checked={checked.includes(value)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`loremx100 ${value + 1}`} />
                
              </ListItemButton>
            </ListItem>
          );
        })}
        </List>
          
        {/* <List >
          {todos.map((todo) => (
            <div key={todo.id}>
              <ListItem>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />
                <ListItemText
                  primary={todo.text}
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "grey" : "inherit",
                  }}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List> */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Badge
            // color="primary"
            // badgeContent={`${
            //   todos.filter((todo) => !todo.completed).length
            // } items left`}
          />
          <ButtonGroup variant="text" color="primary">
            <Button>All</Button>
            <Button>Active</Button>
            <Button>Completed</Button>
          </ButtonGroup>
          <Button color="secondary">Clear completed</Button>
        </div>
      </Card>
    </>
  );
};

export default App;
