export type UserTableFilterValue = string;

export type UserTableFilters = {
  name: string;
};

// ----------------------------------------------------------------------

export type CreateUserDto = {
  username: string;
  password: string;
  roleId: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  isActive: boolean;
  avatar: string;
  ambulanceId: string;
};

export type User = {
  userId: string;
  roleId: string;
  ambulanceId: string;
  phone: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
  isActive: boolean;
  createdAt: string;
  username?: string;
  password?: string;
};
