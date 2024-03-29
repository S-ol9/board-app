import { EntityManager, Repository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { InjectEntityManager } from "@nestjs/typeorm";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {
        super(User, entityManager);
    }
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({ username, password: hashedPassword }); //typeorm에서 제공해주는 메소드
        
        try {
            await this.save(user);
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('Existing usesname');
            } else {
                throw new InternalServerErrorException();
            }
            console.log('error', error);
        }
    }
}