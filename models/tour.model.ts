import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import slugify from "slugify"
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
    allowNull: true
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
}) 
// Tour.beforeCreate((tour)=>{
//   tour["slug"] = slugify(`${tour["title"]}-${Date.now()}`,{
//     lower:true,
//     strict: true,
//   })
// }) 
// phần code này lỗi  sửa thành code dưới đây
Tour.beforeCreate((tour) => {
  const title = tour.getDataValue("title") as string;
  tour.setDataValue(
    "slug",
    slugify(`${title}-${Date.now()}`, {
      lower: true,
      strict: true,
    })
  );
});
export default Tour
