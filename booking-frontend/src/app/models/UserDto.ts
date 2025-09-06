export interface User {
  id ?: string;
  userName: string;
  email:string;
  phone: string;
  address: string;
  userRoles: { role: { name: string } }[];
}
