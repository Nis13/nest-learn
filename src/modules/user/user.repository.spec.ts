import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { DataSource } from 'typeorm';
import { User } from './user.entity';

describe('UserRepository', () => {
  let repository: UserRepository;
  const datasource = {
    createEntityManager: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: DataSource,
          useValue: datasource,
        },
      ],
    }).compile();

    repository = module.get(UserRepository);
  });

  describe('getAll', () => {
    const users = [
      {
        _id: '1',
        name: 'UserNew41331',
        email: 'User@new1331.com',
        password: 'abc',
        role: 'admin',
      },
      {
        _id: '2',
        name: 'UserNew41331',
        email: 'User@new1331.com',
        password: 'abc',
        role: 'user',
      },
    ];
    it('should get all the users', async () => {
      const findSpy = jest
        .spyOn(repository, 'find')
        .mockResolvedValue(users as unknown as User[]);
      const result = await repository.getAll();

      expect(result).toEqual(users);
      expect(findSpy).toHaveBeenCalled();
    });
  });
  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
