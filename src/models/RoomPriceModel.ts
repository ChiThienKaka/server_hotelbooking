import { DataTypes, DATE, Model } from 'sequelize';
import sequelize from '../config/sequelize'

class RoomPrice extends Model {
  public id!: number;
  room_id?:string;
  public ngays?: Date;
  public price?: number;
  public status?: boolean;
}
RoomPrice.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,//Tự động tăng
    primaryKey: true,
  },
  room_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ngays: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true, //Mặc đ��nh là true (trạng thái active)
  }
}, {
    sequelize:sequelize,
    modelName:'RoomPrice',//Tên model này sẽ ánh xạ đến bảng dữ liệu trên database
    tableName: 'RoomPrice',//Tên được đặt trên database
    createdAt: false,
    timestamps:false, //Thời gian tạo
});

export default RoomPrice;
