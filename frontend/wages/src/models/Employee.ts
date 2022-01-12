import { guid } from "../shared/guid";

export type Employee = {
    "Id": guid,
    "PersonalFile": number,
    "LastName": string,
    "FirstName": string,
    "MiddleName": string,
    "Position": string,
    "Salary": number,
    "DateOfBirth": string,
    "MaritalStatus": string,
    "Children": number
};