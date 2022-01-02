import { Employee } from "../models/Employee";
import { guid } from "../shared/guid";

export const testEmpoyees: Employee[] = [
    { 
        id: guid('8E6A739A-66C0-4435-8DDA-05610FB49FBC'),
        personalFile: 8,
        lastName: 'Мазур',
        firstName: 'Тарас',
        middleName: 'Васильович',
        position: 'Accountant',
        salary: 48351.87,
        dateOfBirth: new Date('1981-12-31'),
        maritalStatus: 'Single',
        children: 0
     },
     { 
        id: guid('CD71412A-3FE0-406D-9EA5-BA6512FA5EA2'),
        personalFile: 9,
        lastName: 'Шевченко',
        firstName: 'Костянтин',
        middleName: 'Борисович',
        position: 'HR specialist',
        salary: 56450.00,
        dateOfBirth: new Date('1991-01-17'),
        maritalStatus: 'Divorced',
        children: 0
     }
];

