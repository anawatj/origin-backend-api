import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class HashUtil{
    async hash(password:string):Promise<string>{
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password,salt)
        console.log(hash);
        return hash;
    }
    async compare(password:string,hash:string):Promise<boolean>{
        console.log(hash);
        const isMatch =await  bcrypt.compare(password,hash);
        console.log(isMatch);
        return isMatch
    }
}