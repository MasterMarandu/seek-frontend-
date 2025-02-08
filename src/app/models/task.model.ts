export interface Task {
  id?: number;
  title: string;
  description: string;
  status: 'por_hacer' | 'en_progreso' | 'completada'; // Enumeración de estados
}
