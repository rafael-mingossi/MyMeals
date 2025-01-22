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
async function deleteUserById(userId: string): Promise<void> {
  // Delete from profiles table
  const {error} = await supabaseClient
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (error) {
    throw new Error(`Failed to delete user profile: ${error.message}`);
  }

  // Delete from auth.users (Supabase authentication)
  const {error: authDeleteError} =
    await supabaseClient.auth.admin.deleteUser(userId);

  if (authDeleteError) {
    throw new Error(
      `Failed to delete user authentication: ${authDeleteError.message}`,
    );
  }
}

export const userApi = {
  getUserDetailsById,
  deleteUserById,
};
