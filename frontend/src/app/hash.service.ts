import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class HashService {

  constructor() { }

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 8);
  }
}
