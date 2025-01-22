export interface UserAPI {
  id: string;
  updated_at: string;
  username: string;
  full_name: string;
  avatar_url: string;
  dob: string;
  gender: string;
  height: number;
  weight: number;
  cal_gol: number;
  protein_goal: number;
  carbs_goal: number;
  fat_goal: number;
}

export interface User {
  id: string;
  updatedAt: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  dob: string;
  gender: string;
  height: number;
  weight: number;
  calGol: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
}
