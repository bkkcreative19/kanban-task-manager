// import { Task, Board, Subtask, ColumnType } from "../entities";
import { Board, ColumnType, Subtask, Task } from "../entities";
import { createEntity } from "../utils/typeorm";
import fs from "fs";

const rawData = fs.readFileSync("data.json").toString();
const data = JSON.parse(rawData);

// console.log(data);

const seedBoards = (): Promise<Board[]> => {
  //   const boards = data.boards.map((item: any) => {
  //     createEntity(Board, {
  //       name: item.name,
  //     });
  //   });
  const boards = [
    createEntity(Board, {
      name: "Platform Launch",
    }),
    createEntity(Board, {
      name: "Marketing Plan",
    }),
    createEntity(Board, {
      name: "Roadmap",
    }),
  ];
  return Promise.all(boards);
};
const seedColumns = (boards: any): Promise<ColumnType[]> => {
  const columns = [
    createEntity(ColumnType, {
      name: "Todo",
      board: boards[0].id,
    }),
    createEntity(ColumnType, {
      name: "Doing",
      board: boards[0].id,
    }),
    createEntity(ColumnType, {
      name: "Done",
      board: boards[0].id,
    }),
    createEntity(ColumnType, {
      name: "Todo",
      board: boards[1].id,
    }),
    createEntity(ColumnType, {
      name: "Doing",
      board: boards[1].id,
    }),
    createEntity(ColumnType, {
      name: "Done",
      board: boards[1].id,
    }),
    createEntity(ColumnType, {
      name: "Now",
      board: boards[2].id,
    }),
    createEntity(ColumnType, {
      name: "Next",
      board: boards[2].id,
    }),
    createEntity(ColumnType, {
      name: "Later",
      board: boards[2].id,
    }),
  ];
  //   console.log(boards);
  return Promise.all(columns);
};

const seedTasks = (columns: any): any => {
  const tasksForDB: any[] = [];
  let tasks: any[] = [];
  for (let i = 0; i < data.boards.length; i++) {
    // for (let j = 0; j < data.boards[i].columns; j++) {
    //   console.log(data.boards[i][j]);
    // }
    data.boards[i].columns.forEach((item: any) => {
      // console.log(item);
      tasks.push(item.tasks);
    });
    // tasks.push();
  }

  function flatten(items: any): any {
    var ret: any = [];
    for (var i = 0; i < items.length; i++) {
      if (Array.isArray(items[i])) {
        ret = ret.concat(flatten(items[i]));
      } else {
        ret.push(items[i]);
      }
    }

    return ret;
  }

  function determineColumnId(idx: any) {
    if (idx < 4) {
      return columns[0].id;
    } else if (idx < 10 && idx > 3) {
      return columns[1].id;
    } else if (idx < 17 && idx > 9) {
      return columns[2].id;
    } else if (idx < 20 && idx > 16) {
      return columns[3].id;
    } else if (idx < 22 && idx > 19) {
      return columns[6].id;
    }
  }

  flatten(tasks).forEach((item: any, idx: any) => {
    tasksForDB.push(
      createEntity(Task, {
        title: item.title,
        description: item.description,
      })
    );
  });
  //   console.log(flatten(tasks));

  return tasksForDB;
};

const seedSubtasks = (_tasks: any): any => {
  let tasks: any[] = [];
  let subtasksForDB: any[] = [];
  for (let i = 0; i < data.boards.length; i++) {
    // for (let j = 0; j < data.boards[i].columns; j++) {
    //   console.log(data.boards[i][j]);
    // }
    data.boards[i].columns.forEach((item: any) => {
      // console.log(item);
      tasks.push(item.tasks);
    });
    // tasks.push();
  }

  function flatten(items: any): any {
    var ret: any = [];
    for (var i = 0; i < items.length; i++) {
      if (Array.isArray(items[i])) {
        ret = ret.concat(flatten(items[i]));
      } else {
        ret.push(items[i]);
      }
    }

    return ret;
  }

  flatten(tasks).forEach((item: any, idx: any) => {
    // for (let i = 0; i < item.subtasks.length; i++) {
    //   console.log(item);

    // }
    item.subtasks.forEach((item: any) => {
      subtasksForDB.push(
        createEntity(Subtask, {
          title: item.title,
          isCompleted: item.isCompleted,
          task: idx + 1,
        })
      );
    });
  });
  //   console.log(flatten(tasks));
  //   console.log(flatten(tasks));
  return Promise.all(subtasksForDB);

  //   console.log(subtasks);
};

const insertData = async (): Promise<any> => {
  const boards = await seedBoards();
  const columns = await seedColumns(boards);
  const tasks = await seedTasks(columns);
  const subtasks = await seedSubtasks([]);
  console.log(subtasks);

  return boards;
};

export default insertData;
