export const exportAsCsv = (fileName: string) => (data: any) => {
  const encodedUri = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(data);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', fileName);
  link.click();
  link.remove();
}