import { guid } from "../shared/guid";

export type Wage = {
    "EmployeeId": guid,
    "LastName": string,
    "FirstName": string,
    "MiddleName": string,
    "Amount": number
};