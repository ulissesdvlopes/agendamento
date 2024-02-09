import { Body, Controller, Get, Param, Post, Delete, Patch, UseGuards, Req, Query, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { CreateSchedulingDto } from './dtos/create-scheduling.dto';
import { UpdateSchedulingDto } from './dtos/update-scheduling.dto';
import { AuthGuard } from '@nestjs/passport';
import RequestWithUser from 'src/auth/requestWithUser.interface';

@Controller('scheduling')
export class SchedulingController {
    constructor(private readonly schedulingService: SchedulingService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    getList(@Req() request: RequestWithUser, @Query('vehicle') vehicle: string, @Query('serviceType') serviceType: string) {
        return this.schedulingService.getAllSchedulings(request.user, vehicle, serviceType);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(ClassSerializerInterceptor)
    getById(@Param('id') id: string, @Req() request: RequestWithUser) {
        console.log('aqui');
        
        return this.schedulingService.getSchedulingById(Number(id), request.user);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createSchedulingDto: CreateSchedulingDto, @Req() request: RequestWithUser) {
        return this.schedulingService.createScheduling(createSchedulingDto, request.user);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    update(@Param('id') id: number, @Body() updateSchedulingDto: UpdateSchedulingDto, @Req() request: RequestWithUser) {
        return this.schedulingService.updateScheduling(id, updateSchedulingDto, request.user)
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    delete(@Param('id') id: number, @Req() request: RequestWithUser) {
        return this.schedulingService.deleteScheduling(id, request.user)
    }

}
