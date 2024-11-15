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
  Button,
  Chip,
  Badge,
  Box,
  Paper,
  ListItemButton,
  ListItemIcon,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
} from "@mui/material";

import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardDoubleArrowDown as KeyboardDoubleArrowDownIcon,
  TaskAlt as TaskAltIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  FormatListBulleted as FormatListBulletedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
  Send as SendIcon,
} from "@mui/icons-material";

import useTaskManager from "./TaskManager";

type SubmitFunction = () => void;

// UI components
function MyFormHelperText({ isFocused }: { isFocused: boolean }) {
  return isFocused ? (
    <KeyboardDoubleArrowDownIcon
      sx={{ color: "primary.main", ml: 1.7, mr: 4, my: 1.5 }}
    />
  ) : (
    <KeyboardArrowDownIcon
      sx={{ color: "action.active", ml: 1.7, mr: 4, my: 1.5 }}
    />
  );
}

function SendButton({
  taskExist,

  submitFunction,
}: {
  taskExist: boolean;

  submitFunction: SubmitFunction;
}) {
  return taskExist ? (
    <SendIcon
      sx={{ color: "primary.main", ml: 4, mr: 1.7, my: 1.5, cursor: "pointer" }}
      onClick={submitFunction}
    />
  ) : (
    <SendIcon sx={{ color: "action.active", ml: 4, mr: 1.7, my: 1.5 }} />
  );
}

const App: React.FC = () => {
  const { taskList, addTask, removeCompletedTasks, toggleCompletedTasks } =
    useTaskManager();

  const [display, setDisplay] = React.useState("all");
  const [newTask, setNewTask] = React.useState<string>("");
  const [focused, setFocused] = useState(false);
  const isSmallScreen = useMediaQuery("(min-width:600px)");

  const filteredTasks = taskList.filter((task) => {
    if (display === "completed") return task.completed;
    if (display === "active") return !task.completed;
    return true; // "all"
  });
  const sortedTasks = [...filteredTasks].reverse();

  return (
    <Paper
      square
      sx={{
        minHeight: "100vh",
        width: "100%",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h1"
        align="center"
        color="secondary.main"
        style={{ opacity: 0.4 }}
      >
        todos
      </Typography>
      <Card
        sx={{
          maxWidth: "600px",
          width: isSmallScreen ? "100%" : "auto",
          margin: "10px auto",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <MyFormHelperText isFocused={focused} />
          <TextField
            id="new-todo"
            label="What needs to be done?"
            variant="standard"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                if (newTask !== "") {
                  addTask(newTask);
                  setNewTask("");
                }
              }
            }}
            fullWidth
            margin="dense"
            multiline
            minRows={1}
            maxRows={4}
            type="text"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <SendButton
            taskExist={newTask !== ""}
            submitFunction={() => {
              addTask(newTask);
              setNewTask("");
            }}
          />
        </Box>

        <List
          sx={{ width: "100%", bgcolor: "background.paper", marginTop: "10px" }}
          disablePadding
        >
          {sortedTasks.length === 0 ? (
            <Typography
              variant="subtitle1"
              align="center"
              color="text.primary"
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                opacity: "0.8",
              }}
            >
              You can start with something simple 🎯
            </Typography>
          ) : (
            // <></>
            sortedTasks.map((task) => {
              const labelId = `checkbox-list-label-${task.id}`;

              return (
                <>
                  <ListItem key={task.id} disablePadding>
                    <ListItemButton
                      role={undefined}
                      onClick={() => toggleCompletedTasks(task.id)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={
                            <TaskAltIcon sx={{ color: "success.main" }} />
                          }
                          edge="start"
                          checked={task.completed}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={task.text}
                        style={{
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                          color: task.completed ? "grey" : "inherit",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              );
            })
          )}
        </List>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          {isSmallScreen ? (
            <>
              <Chip
                label={
                  sortedTasks.length
                    ? `${sortedTasks.length} items left`
                    : `you haven't tasks`
                }
                variant="outlined"
                size="small"
              />
              <ToggleButtonGroup
                color="primary"
                value={display}
                exclusive
                onChange={(
                  event: React.MouseEvent<HTMLElement>,
                  value: string
                ) => setDisplay(value)}
                aria-label="Platform"
                defaultValue={"all"}
              >
                <ToggleButton value="all" size="small">
                  All
                </ToggleButton>
                <ToggleButton value="active" size="small">
                  Active
                </ToggleButton>
                <ToggleButton value="completed" size="small">
                  Complited
                </ToggleButton>
              </ToggleButtonGroup>
              <Button
                sx={{ color: "primary.main" }}
                variant="outlined"
                onClick={() => removeCompletedTasks()}
              >
                Clear completed
              </Button>
            </>
          ) : (
            <>
              <ToggleButtonGroup
                color="primary"
                value={display}
                exclusive
                onChange={(
                  event: React.MouseEvent<HTMLElement>,
                  value: string
                ) => setDisplay(value)}
                aria-label="Platform"
                defaultValue={"all"}
              >
                <ToggleButton value="all" size="small">
                  <Badge
                    badgeContent={display === "all" ? sortedTasks.length : 0}
                    color="primary"
                  >
                    <FormatListBulletedIcon />
                  </Badge>
                </ToggleButton>
                <ToggleButton value="active" size="small">
                  <Badge
                    badgeContent={display === "active" ? sortedTasks.length : 0}
                    color="primary"
                  >
                    <RadioButtonUncheckedIcon />
                  </Badge>
                </ToggleButton>
                <ToggleButton value="completed" size="small">
                  <Badge
                    badgeContent={
                      display === "completed" ? sortedTasks.length : 0
                    }
                    color="primary"
                  >
                    <TaskAltIcon />
                  </Badge>
                </ToggleButton>
              </ToggleButtonGroup>
              <Button
                sx={{ color: "primary.main" }}
                variant="outlined"
                onClick={() => removeCompletedTasks()}
              >
                <DeleteOutlinedIcon />
              </Button>
            </>
          )}
        </div>
      </Card>

      <footer
        style={{
          textAlign: "center",
          padding: "10px",
          background: "transparent",
          marginTop: "auto",
        }}
      >
        <p style={{ margin: 0, opacity: 0.6 }}>@DarkDomian</p>
      </footer>
    </Paper>
  );
};

export default App;
