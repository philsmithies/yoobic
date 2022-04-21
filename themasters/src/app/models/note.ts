/* eslint-disable @typescript-eslint/naming-convention */
export interface Note {
  id: string;
  user_id: string;
  task: string;
  is_complete: boolean;
  inserted_at: Date;
}
