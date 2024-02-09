import { Body, Controller, Get, Param, Post, Delete, Patch, UseGuards } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { CreateSchedulingDto } from './dtos/create-scheduling.dto';
import { UpdateSchedulingDto } from './dtos/update-scheduling.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('scheduling')
export class SchedulingController {
    constructor(private readonly schedulingService: SchedulingService) {}

    @Get()
    getList() {
        return this.schedulingService.getAllSchedulings();
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.schedulingService.getSchedulingById(Number(id));
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createSchedulingDto: CreateSchedulingDto) {
        return this.schedulingService.createScheduling(createSchedulingDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateSchedulingDto: UpdateSchedulingDto) {
        return this.schedulingService.updateScheduling(id, updateSchedulingDto)
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.schedulingService.deleteScheduling(id)
    }

}
