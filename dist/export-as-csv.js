/**
 * Creates a function that exports data as CSV file.
 * @param fileName - The name of the CSV file to download
 * @returns A function that takes CSV data (string) and triggers download
 * @example
 * const exportCsv = exportAsCsv('data.csv');
 * exportCsv('Name,Age\nJohn,30\nJane,25');
 */
export const exportAsCsv = (fileName) => (data) => {
    const encodedUri = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(data);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
    link.click();
    link.remove();
};
