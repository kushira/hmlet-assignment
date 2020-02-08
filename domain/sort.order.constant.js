const ASC = 'asc';
const DESC = 'desc';

isValidSortOrder = sortOrder => [ASC, DESC].includes(sortOrder);

module.exports = {ASC, DESC, isValidSortOrder};
