// Get user details by user
import {supabaseClient} from '@api';
import {UserAPI} from '@domain';

async function getUserDetailsById(userId: string): Promise<UserAPI> {
  const {data, error} = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch user details: ${error.message}`);
  }

  return data;
}

// Update user details

// Delete user account

export const userApi = {
  getUserDetailsById,
};
