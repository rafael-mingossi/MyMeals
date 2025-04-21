import {User, UserAPI} from '@domain';

function toUser(user: UserAPI): User {
  return {
    id: user.id,
    updatedAt: user.updated_at,
    deletedAt: user.deleted_at,
    isDeleted: user.is_deleted,
    username: user.username,
    fullName: user.full_name,
    avatarUrl: user.avatar_url,
    dob: user.dob,
    gender: user.gender,
    height: user.height,
    weight: user.weight,
    calGoal: user.cal_goal,
    proteinGoal: user.protein_goal,
    carbsGoal: user.carbs_goal,
    fatGoal: user.fat_goal,
    email: user.email,
  };
}

export const userAdapter = {
  toUser,
};
