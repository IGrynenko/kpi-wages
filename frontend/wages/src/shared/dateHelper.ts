function formatedDate(date: string): string {

    const sysDate = new Date(date);
    const month = sysDate.getMonth() + 1;
    const year = sysDate.getFullYear();
    const day = sysDate.getDay();

    return `${day}/${month}/${year}`;
}

export { formatedDate };