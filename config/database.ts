import { Sequelize } from "sequelize";
const sequelize = new Sequelize(
 process.env.DATABASE_NAME!, // database name
 process.env.DATABASE_USERNAME!, // Username login
 process.env.DATABASE_PASSWORD!, // Password (default = '')
  {
    host: process.env.DATABASE_HOST!, // Link hosting of database
    dialect: 'mysql' //  
  }
);

sequelize.authenticate().then(() => {
   console.log('Connect success');
}).catch((error) => {
   console.error('Connect error', error);
});
export default sequelize