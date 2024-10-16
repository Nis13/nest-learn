import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { Logger, NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;
  let logger: Logger;

  const mockUserRepo = {
    getAll: jest.fn(),
    getById: jest.fn(),
    saveUser: jest.fn(),
  };

  const mockLogger = {
    log: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockUserRepo },
        { provide: Logger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    logger = module.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(logger).toBeDefined();
  });

  describe('getAll', () => {
    it('should return array of users', async () => {
      const users = [
        {
          _id: '670f2474ce77ff0fb9af5929',
          name: 'UserNew41331',
          email: 'User@new1331.com',
          password:
            '$2b$10$v3b4orqkEUSufLYFJ5NbjO5efHGNrk6194f73UhLZJdmP4ND4y9ii',
          role: 'admin',
        },
        {
          _id: '670f298ab595490250717d5c',
          name: 'UserNew41331',
          email: 'User@new1331.com',
          password:
            '$2b$10$/mVfAc.v0W84hOGhkVM9eewOPJXWtBegpEuoKG7bwYfYEGJgGPS8i',
          role: 'user',
        },
      ];
      mockUserRepo.getAll.mockResolvedValue(users);

      const result = await service.getall();

      expect(result).toEqual(users);
      expect(mockUserRepo.getAll).toHaveBeenCalled();
    });
    it('should call logger', async () => {
      await service.getall();
      expect(logger.log).toHaveBeenCalledWith(
        'Fetching all the users',
        service.SERVICE,
      );
    });
  });

  describe('getById', () => {
    it('should return the user using their id', async () => {
      const userId = '1';
      const user = {
        id: '1',
        name: 'User3',
        email: 'User3@mail.com',
        password:
          '$2b$10$YdORervMSphK3orylfiT/Os3fbnTi9MenfMUS7Tu0HaF2aqYuwcQ2',
        role: 'user',
      };

      mockUserRepo.getById.mockResolvedValue(user);
      const result = await service.getById(userId);

      expect(result).toEqual(user);
      expect(mockUserRepo.getById).toHaveBeenCalled();
      expect(logger.log).toHaveBeenCalled();
    });
    it('should throw user not found excetion', async () => {
      const userId = '2';
      mockUserRepo.getById.mockResolvedValue(null);

      await expect(service.getById(userId)).rejects.toThrow(NotFoundException);
      await expect(service.getById(userId)).rejects.toThrow(
        `User of Id:${userId} not found`,
      );
      expect(logger.log).toHaveBeenCalledWith(
        `Getting the user of Id: ${userId}`,
      );
    });
  });

  describe('saveUser', () => {
    it('Should create a user', async () => {
      const userToCreate = {
        name: 'User1',
        email: 'User@123.com',
        password: 'User@123',
      };
      const encryptedPassword = 'passwordEncrypt';
      const expectedResult = {
        id: 1,
        ...userToCreate,
        password: encryptedPassword,
      };

      jest
        .spyOn(service, 'encryptPassword')
        .mockResolvedValue(encryptedPassword);

      mockUserRepo.saveUser.mockResolvedValue(expectedResult);

      const result = await service.saveUser(userToCreate);

      expect(result).toEqual(expectedResult);
      expect(mockUserRepo.saveUser).toHaveBeenCalledWith({
        ...userToCreate,
        password: encryptedPassword,
      });
      expect(logger.log).toHaveBeenCalledWith(
        `creating user with name: ${userToCreate.name}`,
      );
    });
  });
});
