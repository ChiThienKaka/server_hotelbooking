import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize'

class Hotel extends Model {
  public id!: number;
  public name?: string;
  public description?: string;
  public address?: string;
  public policies?: string;//chính sách
  public arrAmenities?: string;
  public type?: string;
  public apartment?: string;
  public city?: string;
  public zipcode?: string;
  public country?: string;
  public rate?: number;
  public checkinfrom?: string;
  public checkinto?: string;
  public checkoutfrom?: string;
  public checkoutto?: string;
  public ischildren?: boolean;
  public isAnimal?: boolean;
  public isRegister?: boolean;
}
Hotel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,//Tự động tăng
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  policies: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  arrAmenities: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  apartment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  zipcode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  rate:{
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0, 
  },
  checkinfrom:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  checkinto:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  checkoutfrom:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  checkoutto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ischildren: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true,  
  },
  isAnimal: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  isRegister:{
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,  
  }
}, {
    sequelize:sequelize,
    modelName:'Hotel',//Tên model này sẽ ánh xạ đến bảng dữ liệu trên database
    tableName:'Hotel',//Tên được đặt trên database
    timestamps:true, //Thời gian tạo
});

export default Hotel;
