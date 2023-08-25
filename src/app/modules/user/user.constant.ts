const role: string[] = ['seller', 'buyer'];

const userFilterableFields: string[] = [
  'searchTerm',
  'phoneNumber',
  'role',
  'minBudget',
  'maxBudget',
];

const userSearchableFields: string[] = [
  'name.firstName',
  'name.lastName',
  'phoneNumber',
  'address',
  // 'budget',
  // 'income',
];

export const UserConstant = {
  role,
  userFilterableFields,
  userSearchableFields,
};
