export interface CreateOrganisationDto {
  name: string;
  description: string;
  logo: string;
}

export interface InviteUserDto {
  email: string;
  orgId: string;
  RoleInOrg: string;
}