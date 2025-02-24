import { Gender } from "@prisma/client";
import prisma from "../repository/attendanceRepository";

export const createAttendance = async (employeeId : string, date : Date, checkInTime : Date, checkOutTime : Date) => {
    const attendance = await prisma.attendance.create({
        data: {
            employeeId, 
            date : new Date(date), 
            checkInTime : new Date(checkInTime), 
            checkOutTime : new Date(checkOutTime), 
            
        },
      })
      return attendance; 
}


export const getAttendance = async () => {
    return await prisma.attendance.findMany();
}

export const getAttendanceFromId = async (employeeId : string) => {
    return await prisma.attendance.findMany({
        where : {employeeId : employeeId},
    });
}