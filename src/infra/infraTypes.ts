export enum QueryKeys {
  PostList = 'PostList',
  PostCommentList = 'PostCommentList',
  PostGetById = 'PostGetById',
  FavouriteList = 'FavouriteList',
  UserGetById = 'UserGetById',
  UserList = 'UserList',
  IsUsernameAvailable = 'IsUsernameAvailable',
  IsEmailAvailable = 'IsEmailAvailable',
  CameraRollList = 'CameraRollList',
  AsyncValidation = 'AsyncValidation',
}

export interface MutationOptions<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (errorMessage: string) => void;
  errorMessage?: string;
}
