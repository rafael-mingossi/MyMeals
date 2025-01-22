import {User, UserAPI} from '@domain';

function toUser(user: UserAPI): User {
  return {
    id: user.id,
    updatedAt: user.updated_at,
    username: user.username,
    fullName: user.full_name,
    avatarUrl: user.avatar_url,
    dob: user.dob,
    gender: user.gender,
    height: user.height,
    weight: user.weight,
    calGol: user.cal_gol,
    proteinGoal: user.protein_goal,
    carbsGoal: user.carbs_goal,
    fatGoal: user.fat_goal,
  };
}

export const userAdapter = {
  toUser,
};
