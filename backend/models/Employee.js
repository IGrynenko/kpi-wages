class Employee {
    constructor(
        id, personalFile, lastName, firstName, middleName, position, salary,
        dateOfBirth, maritalStatus, children
    ) {
        this.id = id,
        this.personalFile = personalFile,
        this.lastName =  lastName,
        this.firstName = firstName,
        this.middleName = middleName,
        this.position = position,
        this.salary = salary,
        this.dateOfBirth = dateOfBirth,
        this.maritalStatus = maritalStatus,
        this.children = children
    }
}

module.exports = Employee;