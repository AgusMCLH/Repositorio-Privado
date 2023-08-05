export const generateUserErrorInfo = ({ name, lastName, email }) => {
  console.log(name, lastName, email);
  return `User 
  Name> ${name} 
  lastName> ${lastName}
  email> ${email}`;
};
