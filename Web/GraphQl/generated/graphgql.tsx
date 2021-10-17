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
};

export type Application = {
  __typename?: 'Application';
  _id: Scalars['ObjectId'];
  longName: Scalars['String'];
  shortName: Scalars['String'];
  vendor: Vendor;
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

export type ConnectionType = {
  __typename?: 'ConnectionType';
  _id: Scalars['ObjectId'];
  longName: Scalars['String'];
  shortName: Scalars['String'];
};

export type DataArea = {
  __typename?: 'DataArea';
  _id: Scalars['ObjectId'];
  longName: Scalars['String'];
  shortName: Scalars['String'];
};

export type DataTopic = {
  __typename?: 'DataTopic';
  _id: Scalars['ObjectId'];
  longName: Scalars['String'];
  shortName: Scalars['String'];
};

export type DataType = {
  __typename?: 'DataType';
  _id: Scalars['ObjectId'];
  longName: Scalars['String'];
  shortName: Scalars['String'];
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
  AddApplikationToVendor: Vendor;
  AddVendorToApplication: Application;
  CreateApplication: Application;
  CreateChannelName: ChannelName;
  CreateConnectionType: ConnectionType;
  CreateDataArea: DataArea;
  CreateDataTopic: DataTopic;
  CreateDataType: DataType;
  CreateVendor: VendorResponse;
  Login: UserResponse;
  RegisterUser: UserResponse;
  UpdateApplication: Application;
  UpdateVendor: Vendor;
};


export type MutationAddApplikationToVendorArgs = {
  ApplicationID: Scalars['ObjectId'];
  VendorID: Scalars['ObjectId'];
};


export type MutationAddVendorToApplicationArgs = {
  ApplicationID: Scalars['ObjectId'];
  VendorID: Scalars['ObjectId'];
};


export type MutationCreateApplicationArgs = {
  VendorID: Scalars['ObjectId'];
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


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationRegisterUserArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdateApplicationArgs = {
  VendorID: Scalars['ObjectId'];
  id: Scalars['ObjectId'];
  longName: Scalars['String'];
  shortName: Scalars['String'];
};


export type MutationUpdateVendorArgs = {
  id: Scalars['ObjectId'];
  longName: Scalars['String'];
  shortName: Scalars['String'];
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
  GetApplicationByID: Application;
  GetApplicationByLongName: Application;
  GetApplicationByShortName: Application;
  GetChannelNameByID: ChannelName;
  GetConnectionTypeByLongName: ConnectionType;
  GetConnectionTypeByShortName: ConnectionType;
  GetConnectionTypesByID: ConnectionType;
  GetDataAreaByID: DataArea;
  GetDataAreaByLongName: DataArea;
  GetDataAreaByShortName: DataArea;
  GetDataTopicByID: DataTopic;
  GetDataTopicByLongName: DataTopic;
  GetDataTopicByShortName: DataTopic;
  GetDataTypeByID: DataType;
  GetDataTypeByLongName: DataType;
  GetDataTypeByShortName: DataType;
  GetVendorByID: Vendor;
  GetVendorByLongName: Vendor;
  GetVendorShortName: Vendor;
};


export type QueryGetApplicationByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetApplicationByLongNameArgs = {
  longName: Scalars['String'];
};


export type QueryGetApplicationByShortNameArgs = {
  shortName: Scalars['String'];
};


export type QueryGetChannelNameByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetConnectionTypeByLongNameArgs = {
  longName: Scalars['String'];
};


export type QueryGetConnectionTypeByShortNameArgs = {
  shortName: Scalars['String'];
};


export type QueryGetConnectionTypesByIdArgs = {
  id: Scalars['ObjectId'];
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
  id: Scalars['ObjectId'];
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

export type LogInMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LogInMutation = { __typename?: 'Mutation', Login: { __typename?: 'UserResponse', Errors?: Array<{ __typename?: 'ErrorMessage', field: string, message: string }> | null | undefined, User?: { __typename?: 'User', Username: string } | null | undefined } };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', RegisterUser: { __typename?: 'UserResponse', Errors?: Array<{ __typename?: 'ErrorMessage', field: string, message: string }> | null | undefined, User?: { __typename?: 'User', Username: string } | null | undefined } };

export type CreateVendorMutationVariables = Exact<{
  longName: Scalars['String'];
  shortName: Scalars['String'];
  appLongname?: Maybe<Scalars['String']>;
}>;


export type CreateVendorMutation = { __typename?: 'Mutation', CreateVendor: { __typename?: 'VendorResponse', Errors?: Array<{ __typename?: 'ErrorMessage', field: string, message: string }> | null | undefined, Vendor?: { __typename?: 'Vendor', _id: any } | null | undefined } };

export type AppByLongNameQueryVariables = Exact<{
  longName: Scalars['String'];
}>;


export type AppByLongNameQuery = { __typename?: 'Query', GetApplicationByLongName: { __typename?: 'Application', _id: any, longName: string, shortName: string, vendor: { __typename?: 'Vendor', _id: any } } };


export const LogInDocument = gql`
    mutation LogIn($username: String!, $password: String!) {
  Login(options: {username: $username, password: $password}) {
    Errors {
      field
      message
    }
    User {
      Username
    }
  }
}
    `;

export function useLogInMutation() {
  return Urql.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  RegisterUser(options: {username: $username, password: $password}) {
    Errors {
      field
      message
    }
    User {
      Username
    }
  }
}
    `;

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
export const AppByLongNameDocument = gql`
    query AppByLongName($longName: String!) {
  GetApplicationByLongName(longName: $longName) {
    _id
    longName
    shortName
    vendor {
      _id
    }
  }
}
    `;

export function useAppByLongNameQuery(options: Omit<Urql.UseQueryArgs<AppByLongNameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AppByLongNameQuery>({ query: AppByLongNameDocument, ...options });
};