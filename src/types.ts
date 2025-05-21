import { STATUS } from "./lib/utils";

/* Type schema for Select Input Options */
 export type SelectOption = {
  value: string | number;
  label: string;
};


export interface IApplication {
  id: number
  reference: string
  nin: string
  firstName: string
  middleName: string | null
  lastName: string
  createdAt: string 
  email: string
  phone: string
  placeOfBirth: string
  dateOfBirth: string
  nationalityId: number
  address: string
  status:boolean
  applicationNo:any
  
};

export interface IStudent{
  id: number
  name: string
  studentNo: any
  createdAt: string 
  status: STATUS
  application:IApplication
  graduated:boolean

};

export interface IPermit {
  id: number;
  name: string;
  studentNo: any 
  createdAt: string;
  status: STATUS;
  student: IStudent;
  graduated: boolean;
  firstName: string;
  lastName: string;
  permitNo: any;
  phone: string;
  email: string;
  permitClassId: any;
}






export type TLGA = {
  id: number;
  state_id: number;
  name: string;
  code: string;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
};