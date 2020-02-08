const DRAFT = 'draft';
const POST = 'post';

const isValidType = type => [DRAFT, POST].includes(type);

module.exports = {DRAFT, POST, isValidType};
