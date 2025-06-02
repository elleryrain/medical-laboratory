import { create } from "zustand";

type Task = {
  taskName: string;
  time: string;
  date: string;
  isCompleted: boolean;
  id: number;
  color: string;
};

type Store = {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTaskCompletion: (taskId: number) => void;
};

const useStore = create<Store>((set) => ({
  tasks: [
    {id: 0, color: "#BDFF67", taskName: "Попить кофе", time: "09:00", date: "2024-11-07", isCompleted: false},
    {id: 1, color: "#3A9BD2", taskName: "Подготовить документы, отвезти в налоговую", time: "10:00", date: "2024-11-07", isCompleted: false},
    {id: 2, color: "#8504D4", taskName: "Забрать посылку из БьютиМед", time: "10:30", date: "2024-11-07", isCompleted: false},
    {id: 3, color: "#3A9BD2", taskName: "Отправить работы в стоматологию", time: "11:00", date: "2024-11-07", isCompleted: false},
    {id: 4, color: "#BDFF67", taskName: "Время обеда", time: "12:00", date: "2024-11-07", isCompleted: false},
    {id: 5, color: "#3A9BD2", taskName: "Подготовить документы, отвезти в налоговую", time: "15:00", date: "2024-11-07", isCompleted: false},
    {id: 6, color: "#8504D4", taskName: "Забрать посылку из БьютиМед", time: "17:30", date: "2024-11-07", isCompleted: false},
  ],

  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, task], 
  })),

  toggleTaskCompletion: (taskId) => set((state) => ({
    tasks: state.tasks.map(task =>
      task.id === taskId
        ? { ...task, isCompleted: !task.isCompleted } 
        : task
    ),
  })),
}));

export default useStore;