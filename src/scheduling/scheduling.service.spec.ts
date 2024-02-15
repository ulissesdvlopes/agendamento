import { Test, TestingModule } from '@nestjs/testing';
import { SchedulingService } from './scheduling.service';
import { Scheduling } from './scheduling.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { CreateSchedulingDto } from './dtos/create-scheduling.dto';

describe('SchedulingService', () => {
  let service: SchedulingService;
  let save: jest.Mock;
  let findOne: jest.Mock;

  beforeEach(async () => {
    save = jest.fn();
    findOne = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulingService,
        {
          provide: getRepositoryToken(Scheduling),
          useValue: {
            save,
            findOne,
          },
        }
      ],
    }).compile();

    service = module.get<SchedulingService>(SchedulingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when creating a Scheduling', () => {
    let createSchedulingDto: CreateSchedulingDto
    let user: User
    let scheduling: Scheduling
    beforeEach(() => {
      createSchedulingDto = new CreateSchedulingDto();
      user = new User();
      scheduling = new Scheduling()
      save.mockReturnValue(Promise.resolve(scheduling));
    })
    it('should return the created Scheduling', async () => {
      let createdScheduling = await service.createScheduling(createSchedulingDto, user)
      expect(createdScheduling).toEqual(scheduling);
    })
  })

  describe('when getting a scheduling by id', () => {
    let scheduling: Scheduling;
    let user: User
    const id = 1;
    const userId = 1;
    beforeEach(() => {
      user = new User();
      user.id = userId;
      scheduling = new Scheduling();
      scheduling.id = id;
      scheduling.client = user;
      findOne.mockReturnValue(Promise.resolve(scheduling));
    })
    it('should return the scheduling', async () => {
      let fetchedScheduling = await service.getSchedulingById(id, user);
      expect(fetchedScheduling).toEqual(scheduling);
    })
  })

});
