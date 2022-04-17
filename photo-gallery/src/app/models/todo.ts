/* eslint-disable @typescript-eslint/naming-convention */
export interface Todo {
  id: string;
  user_id: string;
  task: string;
  is_complete: boolean;
  inserted_at: Date;
}
