export interface UserAPI {
  id: string;
  updated_at: string;
  deleted_at: string;
  is_deleted: boolean;
  username: string;
  full_name: string;
  avatar_url: string;
  dob: string;
  gender: string;
  height: number;
  weight: number;
  cal_goal: number;
  protein_goal: number;
  carbs_goal: number;
  fat_goal: number;
  email: string;
}

export interface User {
  id: string;
  updatedAt: string;
  deletedAt: string;
  isDeleted: boolean;
  username: string;
  fullName: string;
  avatarUrl: string;
  dob: string;
  gender: string;
  height: number;
  weight: number;
  calGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
  email: string;
}

export type UpdateUserParams = Partial<UserAPI>;
