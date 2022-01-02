function formatedDate(date: Date): string {

    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDay();

    return `${day}/${month}/${year}`;
}

export { formatedDate };