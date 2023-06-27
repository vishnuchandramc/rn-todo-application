export const formatDate = inputDate => {
  const [dateString] = inputDate.split(' ');
  const [year, month, day] = dateString.split('-').map(Number);

  // Format the date
  const options = {day: 'numeric', month: 'long', year: 'numeric'};
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
    'en-us',
    options,
  );

  return formattedDate;
};
