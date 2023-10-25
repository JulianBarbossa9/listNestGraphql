import { registerEnumType } from "@nestjs/graphql";

export enum ValidRoles {
  user        = 'user',
  admin       = 'admin',
  superUser   = 'superUser',
}

const props = Object.keys(ValidRoles)

registerEnumType( ValidRoles, { name: 'ValidRoles', description:`This is are the only args allowed: ${props.join(', ')}`}, )//The second arg is the name that appear in graphql

