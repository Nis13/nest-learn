import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { MockUserData } from 'src/mockData/user-data';
import { EXCEPTION_MESSAGE } from 'src/constants/exception-message';
import ENTITY_NAME from 'src/constants/Entity';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;
  let logger: Logger;

  const mockUserRepo = {
    getAll: jest.fn(),
    getById: jest.fn(),
    saveUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
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

    service = module.get(UserService);
    userRepository = module.get(UserRepository);
    logger = module.get(Logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(logger).toBeDefined();
  });

  describe('getAll', () => {
    it('should return array of users', async () => {
      const users = [MockUserData.userToCreate];
      mockUserRepo.getAll.mockResolvedValue(users);

      const result = await service.getall();

      expect(result).toEqual(users);
      expect(mockUserRepo.getAll).toHaveBeenCalled();
      expect(logger.log).toHaveBeenCalledWith(
        'Fetching all the users',
        service.SERVICE,
      );
    });
  });

  describe('getById', () => {
    it('should return the user using their id', async () => {
      mockUserRepo.getById.mockResolvedValue(MockUserData.user);
      const result = await service.getById(MockUserData.userId);

      expect(result).toEqual(MockUserData.user);
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
        service.SERVICE,
      );
    });
  });

  describe('saveUser', () => {
    it('Should create a user', async () => {
      const userToCreate = MockUserData.userToCreate;
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
        service.SERVICE,
      );
    });

    it('should throw error while creating user', async () => {
      const userToCreate = MockUserData.userToCreate;
      const encryptedPassword = 'passwordEncrypt';
      jest
        .spyOn(service, 'encryptPassword')
        .mockResolvedValue(encryptedPassword);

      mockUserRepo.saveUser.mockRejectedValue(new Error('Database Error'));

      await expect(service.saveUser(userToCreate)).rejects.toThrow(Error);
      expect(logger.log).toHaveBeenCalledWith(
        `creating user with name: ${userToCreate.name}`,
        service.SERVICE,
      );
    });
  });

  describe('update', () => {
    it('should call encryptPassword, and update name and email and password when provided', async () => {
      const userToUpdate = MockUserData.updateUserWithPassword;
      const userId = MockUserData.userId;

      const encryptedPassword = 'encryptedPassword';
      jest
        .spyOn(service, 'encryptPassword')
        .mockResolvedValueOnce(encryptedPassword);

      await service.update(userId, userToUpdate);

      console.log(userToUpdate.password);
      expect(service.encryptPassword).toHaveBeenCalledWith('password');
      expect(userRepository.updateUser).toHaveBeenCalledWith(userId, {
        ...userToUpdate,
        password: encryptedPassword,
      });
      expect(logger.log).toHaveBeenCalledWith(
        `Updating the user of Id: ${userId}`,
        service.SERVICE,
      );
    });

    it('should not call encryptPassword and update only name and email if password is not provided', async () => {
      const userToUpdate = MockUserData.updateUserWithOutPassword;
      const userId = MockUserData.userId;

      jest.spyOn(service, 'encryptPassword');
      await service.update(userId, userToUpdate);

      expect(service.encryptPassword).not.toHaveBeenCalled();
      expect(userRepository.updateUser).toHaveBeenCalledWith(
        userId,
        userToUpdate,
      );
    });
  });

  describe('delete', () => {
    it('should return a success message if the user is successfully deleted', async () => {
      const userId = MockUserData.userId;

      mockUserRepo.deleteUser.mockResolvedValue(
        MockUserData.successDeleteResult,
      );

      const result = await service.delete(userId);

      expect(result).toEqual(
        EXCEPTION_MESSAGE.ENTITY_DELETED(ENTITY_NAME.USER, userId),
      );
      expect(logger.log).toHaveBeenCalledWith(
        `Deleting the user of Id: ${userId}`,
        service.SERVICE,
      );
    });

    it('should return failure message if the user deletion failed', async () => {
      const userId = MockUserData.userId;
      mockUserRepo.deleteUser.mockResolvedValue(
        MockUserData.failureDeleteResult,
      );
      const result = await service.delete(userId);

      expect(logger.log).toHaveBeenCalledWith(
        `Deleting the user of Id: ${userId}`,
        service.SERVICE,
      );
      expect(result).toEqual(
        EXCEPTION_MESSAGE.DELETION_FAILED(ENTITY_NAME.USER, userId),
      );
    });
  });
});
