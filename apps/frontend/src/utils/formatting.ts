export const formatCurrency = (value: number): string => {
    const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return `${formattedValue} ₽`;
};


export const formatDate = (date: string): string => {
    const formattedDate = date.split('.').reverse().join('-');
    return formattedDate
}