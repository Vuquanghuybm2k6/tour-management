import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Tour = sequelize.define("Tour", {
  id: {
    type: DataTypes.INTEGER, 
    autoIncrement: true,
    allowNull: false, // không được phép để null
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  code: {
    type: DataTypes.STRING(10)
  },
  images:{
    type: DataTypes.TEXT('long') // tương đương với LONGTEXT trong SQL
  },
  price:{
    type: DataTypes.INTEGER
  },
  discount:{
    type: DataTypes.INTEGER
  },
  information:{
    type: DataTypes.TEXT('long')
  },
  schedule:{
    type: DataTypes.TEXT('long')
  },
  timeStart:{
    type: DataTypes.DATE
  },
  stock:{
    type: DataTypes.INTEGER
  },
  status:{
    type: DataTypes.STRING(20)
  },
  position:{
    type: DataTypes.INTEGER
  },
  slug:{
    type: DataTypes.STRING(255),
    allowNull: false
  },
  deleted:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deletedAt:{
    type: DataTypes.DATE
  }
}, {
  tableName: "tours",
  timestamps: true
}) // Tên model muốn đặt, Danh sách các kiểu dữ liệu, Tên bảng
export default Tour