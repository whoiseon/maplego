import { ApiBaseResponseType } from "..";

// auth
export interface SignUpResponseType extends ApiBaseResponseType
{
  payload: null | SignUpExistedPayloadType;
}

interface SignUpExistedPayloadType
{
  field: 'username' | 'displayName';
}