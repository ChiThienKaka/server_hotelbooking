import express, { NextFunction, Request, Response} from 'express'
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import cors from 'cors';
import {User, Role,
    Hotel, Amenities_Hotel, Type_Hotel,
    TypeRoom,Bed, Room_Bed,
    Room, RoomPrice,
    BookingDetail, BookingHistory, BookingHotel
} from './models';
import { manageRouter,
    typeHotelRouter, amenitiesHotelRouter, hotelRouter, roomRouter, roompriceRouter, userRouter
 } from './routes';

const app = express();

//cấu hình dịch request json từ client hoặc body-parser
app.use(express.json());

// Cấu hình các middeware bảo mật cơ bản 
app.use(hpp()); //bảo vệ khỏi các cuộc tấn công http
app.use(helmet()); //Bảo mật HTTP Headers
app.use(morgan("combined")); //Log các request HTTP gửi đến server

// Sử dụng middleware CORS
app.use(cors({
    origin: '*', // Tạm thời cho phép tất cả origin để kiểm tra
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // credentials: true
}));

//phân tích các đối tượng phức tạp, như các đối tượng lồng nhau hoặc mảng
//ví dụ khi sử dụng với formsubmit
app.use(express.urlencoded({extended: true}));

//Đồng bộ Model lên CSDL
User.sync();
Role.sync();
Hotel.sync();
Amenities_Hotel.sync();
Type_Hotel.sync();
TypeRoom.sync();
Bed.sync();
Room_Bed.sync();
Room.sync();
RoomPrice.sync();

BookingHotel.sync();
BookingDetail.sync();
BookingHistory.sync();
//cấu hình các router cần thiết
app.use('/auth', manageRouter);
//Hotel - Properties - CRUD

app.use('/hotel-properties', typeHotelRouter);
app.use('/hotel-properties', amenitiesHotelRouter);
app.use('/hotel-properties', hotelRouter);
app.use('/hotel-properties', roomRouter);
app.use('/hotel-properties', roompriceRouter);
app.use('/hotel-properties', userRouter)

export default app;