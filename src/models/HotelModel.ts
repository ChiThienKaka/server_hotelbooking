import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize'

class Hotel extends Model {
  public id!: number;
  public name?: string;
  public description?: string;
  public address?: string;
  public policies?: string;//chính sách
  public arrAmenities?: string;
  public checkIn?: string;
  public checkOut?: string;
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
  checkIn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  checkOut: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  arrAmenities: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
    sequelize:sequelize,
    modelName:'Hotel',//Tên model này sẽ ánh xạ đến bảng dữ liệu trên database
    tableName:'Hotel',//Tên được đặt trên database
    timestamps:true, //Thời gian tạo
});

export default Hotel;
