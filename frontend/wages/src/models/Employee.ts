import { guid } from "../shared/guid";

export interface Employee {
    id: guid,
    personalFile: number,
    lastName: string,
    firstName: string,
    middleName: string,
    position: string,
    salary: number,
    dateOfBirth: Date,
    maritalStatus: string,
    children: number
}