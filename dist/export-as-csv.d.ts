/**
 * Creates a function that exports data as CSV file.
 * @param fileName - The name of the CSV file to download
 * @returns A function that takes CSV data (string) and triggers download
 * @example
 * const exportCsv = exportAsCsv('data.csv');
 * exportCsv('Name,Age\nJohn,30\nJane,25');
 */
export declare const exportAsCsv: (fileName: string) => (data: string) => void;
//# sourceMappingURL=export-as-csv.d.ts.map