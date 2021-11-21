import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Mongo object id scalar type */
  ObjectId: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Application = {
  __typename?: 'Application';
  _id: Scalars['ObjectId'];
  logoUrl: Scalars['String'];
  longName: Scalars['String'];
  shortName: Scalars['String'];
  vendor: Vendor;
};

export type ApplicationResponse = {
  __typename?: 'ApplicationResponse';
  Application?: Maybe<Application>;
  Errors?: Maybe<Array<ErrorMessage>>;
};

export type ChannelName = {
  __typename?: 'ChannelName';
  _id: Scalars['ObjectId'];
  application: Application;
  channelNumber: Scalars['String'];
  connectionType: ConnectionType;
  dataArea: DataArea;
  dataTopic: DataTopic;
  dataType: DataType;
  environment: Environment;
  name: Scalars['String'];
  vendor: Vendor;
  version: Scalars['Int'];
};

export type ChannelNameResponse = {
  __typename?: 'ChannelNameResponse';
  ChannelName?: Maybe<ChannelName>;
  Errors?: Maybe<Array<ErrorMessage>>;
};

export type ConnectionType = {
  __typename?: 'ConnectionType';
  _id: Scalars['ObjectId'];
  longName: Scalars['String'];
  shortName: Scalars['String'];
};

export type ConnectionTypeResponse = {
  __typename?: 'ConnectionTypeResponse';
  ConnectionType?: Maybe<ConnectionType>;
  Errors?: Maybe<Array<ErrorMessage>>;
};

export type DataArea = {
  __typename?: 'DataArea';
  _id: Scalars['ObjectId'];
  longName: Scalars['String'];
  shortName: Scalars['String'];
};

export type DataAreaResponse = {
  __typename?: 'DataAreaResponse';
  DataArea?: Maybe<DataArea>;
  Errors?: Maybe<Array<ErrorMessage>>;
};

export type DataTopic = {
  __typename?: 'DataTopic';
  _id: Scalars['ObjectId'];
  longName: Scalars['String'];
  shortName: Scalars['String'];
};

export type DataTopicResponse = {
  __typename?: 'DataTopicResponse';
  DataTopic?: Maybe<DataTopic>;
  Errors?: Maybe<Array<ErrorMessage>>;
};

export type DataType = {
  __typename?: 'DataType';
  _id: Scalars['ObjectId'];
  longName: Scalars['String'];
  shortName: Scalars['String'];
};

export type DataTypeResponse = {
  __typename?: 'DataTypeResponse';
  DataType?: Maybe<DataType>;
  Errors?: Maybe<Array<ErrorMessage>>;
};

export type DeletionMessage = {
  __typename?: 'DeletionMessage';
  Errors?: Maybe<Array<ErrorMessage>>;
  deletion?: Maybe<Scalars['Boolean']>;
};

export enum Environment {
  Poc = 'POC',
  Prd = 'PRD',
  Tst = 'TST'
}

export type ErrorMessage = {
  __typename?: 'ErrorMessage';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  AddApplikationToVendor: VendorResponse;
  AddVendorToApplication: ApplicationResponse;
  ChannelnameExist: Scalars['Boolean'];
  CreateApplication: ApplicationResponse;
  CreateChannelName: ChannelNameResponse;
  CreateConnectionType: ConnectionTypeResponse;
  CreateDataArea: DataAreaResponse;
  CreateDataTopic: DataTopicResponse;
  CreateDataType: DataTypeResponse;
  CreateVendor: VendorResponse;
  DeleteApplication: DeletionMessage;
  DeleteLogoFromApp: Scalars['Boolean'];
  LogOut: Scalars['Boolean'];
  Login: UserResponse;
  RegisterUser: UserResponse;
  UpdateApplication: ApplicationResponse;
  UpdateVendor: VendorResponse;
  addAppLogo: Scalars['Boolean'];
};


export type MutationAddApplikationToVendorArgs = {
  ApplicationID: Scalars['String'];
  VendorID: Scalars['String'];
};


export type MutationAddVendorToApplicationArgs = {
  ApplicationID: Scalars['ObjectId'];
  VendorID: Scalars['ObjectId'];
};


export type MutationChannelnameExistArgs = {
  name: Scalars['String'];
};


export type MutationCreateApplicationArgs = {
  VendorId: Scalars['ObjectId'];
  logo?: Maybe<Scalars['Upload']>;
  longName: Scalars['String'];
  shortName: Scalars['String'];
};


export type MutationCreateChannelNameArgs = {
  appID: Scalars['ObjectId'];
  channelNumber: Scalars['String'];
  conTypeID: Scalars['ObjectId'];
  dataAreaID: Scalars['ObjectId'];
  dataTopicID: Scalars['ObjectId'];
  dataTypeID: Scalars['ObjectId'];
  env: Environment;
  vendorID: Scalars['ObjectId'];
  version: Scalars['Int'];
};


export type MutationCreateConnectionTypeArgs = {
  longName: Scalars['String'];
  shortName: Scalars['String'];
};


export type MutationCreateDataAreaArgs = {
  longName: Scalars['String'];
  shortName: Scalars['String'];
};


export type MutationCreateDataTopicArgs = {
  longName: Scalars['String'];
  shortName: Scalars['String'];
};


export type MutationCreateDataTypeArgs = {
  longName: Scalars['String'];
  shortName: Scalars['String'];
};


export type MutationCreateVendorArgs = {
  appLongname?: Maybe<Scalars['String']>;
  longName: Scalars['String'];
  shortName: Scalars['String'];
};


export type MutationDeleteApplicationArgs = {
  id: Scalars['ObjectId'];
};


export type MutationDeleteLogoFromAppArgs = {
  id: Scalars['ObjectId'];
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationRegisterUserArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdateApplicationArgs = {
  VendorLongname?: Maybe<Scalars['String']>;
  id: Scalars['ObjectId'];
  logo?: Maybe<Scalars['Upload']>;
  longName?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
};


export type MutationUpdateVendorArgs = {
  id: Scalars['ObjectId'];
  longName: Scalars['String'];
  shortName: Scalars['String'];
};


export type MutationAddAppLogoArgs = {
  logo: Scalars['Upload'];
};

export type Query = {
  __typename?: 'Query';
  GetAllApplikations: Array<Application>;
  GetAllChannelNames: Array<ChannelName>;
  GetAllConnectionTypes: Array<ConnectionType>;
  GetAllDataAreas: Array<DataArea>;
  GetAllDataTopics: Array<DataTopic>;
  GetAllDataTypes: Array<DataType>;
  GetAllVendors: Array<Vendor>;
  GetApplicationByID: ApplicationResponse;
  GetApplicationByLongName: ApplicationResponse;
  GetApplicationByShortName: ApplicationResponse;
  GetChannelNameByFullName: ChannelNameResponse;
  GetChannelNameByID: ChannelNameResponse;
  GetConnectionTypeByID: ConnectionTypeResponse;
  GetConnectionTypeByLongName: ConnectionTypeResponse;
  GetConnectionTypeByShortName: ConnectionTypeResponse;
  GetDataAreaByID: DataAreaResponse;
  GetDataAreaByLongName: DataAreaResponse;
  GetDataAreaByShortName: DataAreaResponse;
  GetDataTopicByID: DataTopicResponse;
  GetDataTopicByLongName: DataTopicResponse;
  GetDataTopicByShortName: DataTopicResponse;
  GetDataTypeByID: DataTypeResponse;
  GetDataTypeByLongName: DataTypeResponse;
  GetDataTypeByShortName: DataTypeResponse;
  GetVendorByID: VendorResponse;
  GetVendorByLongName: VendorResponse;
  GetVendorShortName: VendorResponse;
  Me?: Maybe<User>;
};


export type QueryGetApplicationByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetApplicationByLongNameArgs = {
  longName: Scalars['String'];
};


export type QueryGetApplicationByShortNameArgs = {
  shortName: Scalars['String'];
};


export type QueryGetChannelNameByFullNameArgs = {
  name: Scalars['String'];
};


export type QueryGetChannelNameByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetConnectionTypeByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetConnectionTypeByLongNameArgs = {
  longName: Scalars['String'];
};


export type QueryGetConnectionTypeByShortNameArgs = {
  shortName: Scalars['String'];
};


export type QueryGetDataAreaByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetDataAreaByLongNameArgs = {
  longName: Scalars['String'];
};


export type QueryGetDataAreaByShortNameArgs = {
  shortName: Scalars['String'];
};


export type QueryGetDataTopicByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetDataTopicByLongNameArgs = {
  longName: Scalars['String'];
};


export type QueryGetDataTopicByShortNameArgs = {
  shortName: Scalars['String'];
};


export type QueryGetDataTypeByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetDataTypeByLongNameArgs = {
  longName: Scalars['String'];
};


export type QueryGetDataTypeByShortNameArgs = {
  shortName: Scalars['String'];
};


export type QueryGetVendorByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetVendorByLongNameArgs = {
  longName: Scalars['String'];
};


export type QueryGetVendorShortNameArgs = {
  shortName: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  Username: Scalars['String'];
  _id: Scalars['ObjectId'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  Errors?: Maybe<Array<ErrorMessage>>;
  User?: Maybe<User>;
};

export type UsernamePasswordInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Vendor = {
  __typename?: 'Vendor';
  _id: Scalars['ObjectId'];
  applications: Array<Application>;
  longName: Scalars['String'];
  shortName: Scalars['String'];
};

export type VendorResponse = {
  __typename?: 'VendorResponse';
  Errors?: Maybe<Array<ErrorMessage>>;
  Vendor?: Maybe<Vendor>;
};

export type RegularUserFragment = { __typename?: 'User', _id: any, Username: string };

export type ChannelnameExistMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type ChannelnameExistMutation = { __typename?: 'Mutation', ChannelnameExist: boolean };

export type CreateApplicationMutationVariables = Exact<{
  vendorId: Scalars['ObjectId'];
  longName: Scalars['String'];
  shortName: Scalars['String'];
  logo?: Maybe<Scalars['Upload']>;
}>;


export type CreateApplicationMutation = { __typename?: 'Mutation', CreateApplication: { __typename?: 'ApplicationResponse', Errors?: Array<{ __typename?: 'ErrorMessage', field: string, message: string }> | null | undefined, Application?: { __typename?: 'Application', _id: any } | null | undefined } };

export type CreateDataAreaMutationVariables = Exact<{
  longName: Scalars['String'];
  shortName: Scalars['String'];
}>;


export type CreateDataAreaMutation = { __typename?: 'Mutation', CreateDataArea: { __typename?: 'DataAreaResponse', Errors?: Array<{ __typename?: 'ErrorMessage', field: string, message: string }> | null | undefined, DataArea?: { __typename?: 'DataArea', _id: any } | null | undefined } };

export type CreateDataTopicMutationVariables = Exact<{
  longName: Scalars['String'];
  shortName: Scalars['String'];
}>;


export type CreateDataTopicMutation = { __typename?: 'Mutation', CreateDataTopic: { __typename?: 'DataTopicResponse', Errors?: Array<{ __typename?: 'ErrorMessage', field: string, message: string }> | null | undefined, DataTopic?: { __typename?: 'DataTopic', _id: any } | null | undefined } };

export type CreateDataTypeMutationVariables = Exact<{
  longName: Scalars['String'];
  shortName: Scalars['String'];
}>;


export type CreateDataTypeMutation = { __typename?: 'Mutation', CreateDataType: { __typename?: 'DataTypeResponse', Errors?: Array<{ __typename?: 'ErrorMessage', field: string, message: string }> | null | undefined, DataType?: { __typename?: 'DataType', _id: any } | null | undefined } };

export type LogInMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LogInMutation = { __typename?: 'Mutation', Login: { __typename?: 'UserResponse', Errors?: Array<{ __typename?: 'ErrorMessage', field: string, message: string }> | null | undefined, User?: { __typename?: 'User', _id: any, Username: string } | null | undefined } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', LogOut: boolean };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', RegisterUser: { __typename?: 'UserResponse', Errors?: Array<{ __typename?: 'ErrorMessage', field: string, message: string }> | null | undefined, User?: { __typename?: 'User', _id: any, Username: string } | null | undefined } };

export type CreateVendorMutationVariables = Exact<{
  longName: Scalars['String'];
  shortName: Scalars['String'];
  appLongname?: Maybe<Scalars['String']>;
}>;


export type CreateVendorMutation = { __typename?: 'Mutation', CreateVendor: { __typename?: 'VendorResponse', Errors?: Array<{ __typename?: 'ErrorMessage', field: string, message: string }> | null | undefined, Vendor?: { __typename?: 'Vendor', _id: any } | null | undefined } };

export type GetAllApplikationsBasicQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllApplikationsBasicQuery = { __typename?: 'Query', GetAllApplikations: Array<{ __typename?: 'Application', _id: any, shortName: string, longName: string }> };

export type GetAllApplikationsRichQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllApplikationsRichQuery = { __typename?: 'Query', GetAllApplikations: Array<{ __typename?: 'Application', _id: any, shortName: string, longName: string, logoUrl: string, vendor: { __typename?: 'Vendor', _id: any } }> };

export type GetApplicationByLongNameQueryVariables = Exact<{
  longName: Scalars['String'];
}>;


export type GetApplicationByLongNameQuery = { __typename?: 'Query', GetApplicationByLongName: { __typename?: 'ApplicationResponse', Errors?: Array<{ __typename?: 'ErrorMessage', message: string, field: string }> | null | undefined, Application?: { __typename?: 'Application', _id: any, shortName: string, longName: string, logoUrl: string, vendor: { __typename?: 'Vendor', _id: any } } | null | undefined } };

export type GetAllConnectionTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllConnectionTypesQuery = { __typename?: 'Query', GetAllConnectionTypes: Array<{ __typename?: 'ConnectionType', _id: any, shortName: string, longName: string }> };

export type GetAllDataAreasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDataAreasQuery = { __typename?: 'Query', GetAllDataAreas: Array<{ __typename?: 'DataArea', _id: any, longName: string, shortName: string }> };

export type GetAllDataTopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDataTopicsQuery = { __typename?: 'Query', GetAllDataTopics: Array<{ __typename?: 'DataTopic', shortName: string, _id: any, longName: string }> };

export type GetAllDataTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDataTypesQuery = { __typename?: 'Query', GetAllDataTypes: Array<{ __typename?: 'DataType', _id: any, shortName: string, longName: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', Me?: { __typename?: 'User', _id: any, Username: string } | null | undefined };

export type GetAllVendorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllVendorsQuery = { __typename?: 'Query', GetAllVendors: Array<{ __typename?: 'Vendor', _id: any, shortName: string, longName: string }> };

export type GetVendorByIdQueryVariables = Exact<{
  getVendorById: Scalars['String'];
}>;


export type GetVendorByIdQuery = { __typename?: 'Query', GetVendorByID: { __typename?: 'VendorResponse', Errors?: Array<{ __typename?: 'ErrorMessage', field: string, message: string }> | null | undefined, Vendor?: { __typename?: 'Vendor', shortName: string, longName: string } | null | undefined } };

export type GetVendorByLongNameQueryVariables = Exact<{
  longName: Scalars['String'];
}>;


export type GetVendorByLongNameQuery = { __typename?: 'Query', GetVendorByLongName: { __typename?: 'VendorResponse', Errors?: Array<{ __typename?: 'ErrorMessage', field: string, message: string }> | null | undefined, Vendor?: { __typename?: 'Vendor', shortName: string, _id: any, longName: string } | null | undefined } };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  _id
  Username
}
    `;
export const ChannelnameExistDocument = gql`
    mutation ChannelnameExist($name: String!) {
  ChannelnameExist(name: $name)
}
    `;

export function useChannelnameExistMutation() {
  return Urql.useMutation<ChannelnameExistMutation, ChannelnameExistMutationVariables>(ChannelnameExistDocument);
};
export const CreateApplicationDocument = gql`
    mutation CreateApplication($vendorId: ObjectId!, $longName: String!, $shortName: String!, $logo: Upload) {
  CreateApplication(
    VendorId: $vendorId
    longName: $longName
    shortName: $shortName
    logo: $logo
  ) {
    Errors {
      field
      message
    }
    Application {
      _id
    }
  }
}
    `;

export function useCreateApplicationMutation() {
  return Urql.useMutation<CreateApplicationMutation, CreateApplicationMutationVariables>(CreateApplicationDocument);
};
export const CreateDataAreaDocument = gql`
    mutation CreateDataArea($longName: String!, $shortName: String!) {
  CreateDataArea(longName: $longName, shortName: $shortName) {
    Errors {
      field
      message
    }
    DataArea {
      _id
    }
  }
}
    `;

export function useCreateDataAreaMutation() {
  return Urql.useMutation<CreateDataAreaMutation, CreateDataAreaMutationVariables>(CreateDataAreaDocument);
};
export const CreateDataTopicDocument = gql`
    mutation CreateDataTopic($longName: String!, $shortName: String!) {
  CreateDataTopic(longName: $longName, shortName: $shortName) {
    Errors {
      field
      message
    }
    DataTopic {
      _id
    }
  }
}
    `;

export function useCreateDataTopicMutation() {
  return Urql.useMutation<CreateDataTopicMutation, CreateDataTopicMutationVariables>(CreateDataTopicDocument);
};
export const CreateDataTypeDocument = gql`
    mutation CreateDataType($longName: String!, $shortName: String!) {
  CreateDataType(longName: $longName, shortName: $shortName) {
    Errors {
      field
      message
    }
    DataType {
      _id
    }
  }
}
    `;

export function useCreateDataTypeMutation() {
  return Urql.useMutation<CreateDataTypeMutation, CreateDataTypeMutationVariables>(CreateDataTypeDocument);
};
export const LogInDocument = gql`
    mutation LogIn($username: String!, $password: String!) {
  Login(options: {username: $username, password: $password}) {
    Errors {
      field
      message
    }
    User {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useLogInMutation() {
  return Urql.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument);
};
export const LogOutDocument = gql`
    mutation LogOut {
  LogOut
}
    `;

export function useLogOutMutation() {
  return Urql.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  RegisterUser(options: {username: $username, password: $password}) {
    Errors {
      field
      message
    }
    User {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const CreateVendorDocument = gql`
    mutation CreateVendor($longName: String!, $shortName: String!, $appLongname: String) {
  CreateVendor(
    longName: $longName
    shortName: $shortName
    appLongname: $appLongname
  ) {
    Errors {
      field
      message
    }
    Vendor {
      _id
    }
  }
}
    `;

export function useCreateVendorMutation() {
  return Urql.useMutation<CreateVendorMutation, CreateVendorMutationVariables>(CreateVendorDocument);
};
export const GetAllApplikationsBasicDocument = gql`
    query GetAllApplikationsBasic {
  GetAllApplikations {
    _id
    shortName
    longName
  }
}
    `;

export function useGetAllApplikationsBasicQuery(options: Omit<Urql.UseQueryArgs<GetAllApplikationsBasicQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllApplikationsBasicQuery>({ query: GetAllApplikationsBasicDocument, ...options });
};
export const GetAllApplikationsRichDocument = gql`
    query GetAllApplikationsRich {
  GetAllApplikations {
    _id
    shortName
    longName
    logoUrl
    vendor {
      _id
    }
  }
}
    `;

export function useGetAllApplikationsRichQuery(options: Omit<Urql.UseQueryArgs<GetAllApplikationsRichQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllApplikationsRichQuery>({ query: GetAllApplikationsRichDocument, ...options });
};
export const GetApplicationByLongNameDocument = gql`
    query GetApplicationByLongName($longName: String!) {
  GetApplicationByLongName(longName: $longName) {
    Errors {
      message
      field
    }
    Application {
      _id
      shortName
      longName
      logoUrl
      vendor {
        _id
      }
    }
  }
}
    `;

export function useGetApplicationByLongNameQuery(options: Omit<Urql.UseQueryArgs<GetApplicationByLongNameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetApplicationByLongNameQuery>({ query: GetApplicationByLongNameDocument, ...options });
};
export const GetAllConnectionTypesDocument = gql`
    query GetAllConnectionTypes {
  GetAllConnectionTypes {
    _id
    shortName
    longName
  }
}
    `;

export function useGetAllConnectionTypesQuery(options: Omit<Urql.UseQueryArgs<GetAllConnectionTypesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllConnectionTypesQuery>({ query: GetAllConnectionTypesDocument, ...options });
};
export const GetAllDataAreasDocument = gql`
    query GetAllDataAreas {
  GetAllDataAreas {
    _id
    longName
    shortName
  }
}
    `;

export function useGetAllDataAreasQuery(options: Omit<Urql.UseQueryArgs<GetAllDataAreasQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllDataAreasQuery>({ query: GetAllDataAreasDocument, ...options });
};
export const GetAllDataTopicsDocument = gql`
    query GetAllDataTopics {
  GetAllDataTopics {
    shortName
    _id
    longName
  }
}
    `;

export function useGetAllDataTopicsQuery(options: Omit<Urql.UseQueryArgs<GetAllDataTopicsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllDataTopicsQuery>({ query: GetAllDataTopicsDocument, ...options });
};
export const GetAllDataTypesDocument = gql`
    query GetAllDataTypes {
  GetAllDataTypes {
    _id
    shortName
    longName
  }
}
    `;

export function useGetAllDataTypesQuery(options: Omit<Urql.UseQueryArgs<GetAllDataTypesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllDataTypesQuery>({ query: GetAllDataTypesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  Me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const GetAllVendorsDocument = gql`
    query GetAllVendors {
  GetAllVendors {
    _id
    shortName
    longName
  }
}
    `;

export function useGetAllVendorsQuery(options: Omit<Urql.UseQueryArgs<GetAllVendorsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllVendorsQuery>({ query: GetAllVendorsDocument, ...options });
};
export const GetVendorByIdDocument = gql`
    query GetVendorByID($getVendorById: String!) {
  GetVendorByID(id: $getVendorById) {
    Errors {
      field
      message
    }
    Vendor {
      shortName
      longName
    }
  }
}
    `;

export function useGetVendorByIdQuery(options: Omit<Urql.UseQueryArgs<GetVendorByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetVendorByIdQuery>({ query: GetVendorByIdDocument, ...options });
};
export const GetVendorByLongNameDocument = gql`
    query GetVendorByLongName($longName: String!) {
  GetVendorByLongName(longName: $longName) {
    Errors {
      field
      message
    }
    Vendor {
      shortName
      _id
      longName
    }
  }
}
    `;

export function useGetVendorByLongNameQuery(options: Omit<Urql.UseQueryArgs<GetVendorByLongNameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetVendorByLongNameQuery>({ query: GetVendorByLongNameDocument, ...options });
};