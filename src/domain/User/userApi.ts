import {supabaseClient} from '@api';
import {UpdateUserParams, UserAPI} from '@domain';

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
async function updateUser(userData: UpdateUserParams): Promise<UserAPI> {
  const {data, error} = await supabaseClient
    .from('profiles')
    .update(userData)
    .eq('id', userData.id)
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }

  if (!data) {
    throw new Error('Failed to update user: No data returned');
  }

  return data;
}

// Delete user account
async function deleteUserById(userId: string): Promise<void> {
  try {
    console.log('Starting user deletion process for ID:', userId);

    // Delete profile (this will cascade to all related data)
    const {error: profileError} = await supabaseClient
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (profileError) {
      console.log('Profile deletion error:', profileError);
      throw new Error(`Failed to delete user profile: ${profileError.message}`);
    }

    // Delete auth user through Edge Function
    const {error: authError} = await supabaseClient.functions.invoke(
      'delete-user',
      {
        body: {userId},
      },
    );

    if (authError) {
      throw new Error(`Failed to delete user authentication: ${authError}`);
    }
  } catch (error) {
    console.log('Error in deleteUserById:', error);
    throw error;
  }
}

export const userApi = {
  getUserDetailsById,
  deleteUserById,
  updateUser,
};
