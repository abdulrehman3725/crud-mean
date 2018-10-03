import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import {map } from 'rxjs/operators';

import {Employee} from './employee.model';

@Injectable()
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];

  readonly baseUrl = 'http://localhost:3000/employees';


  constructor(private http: HttpClient) { }

  postEmployee(emp:Employee){
    return this.http.post(this.baseUrl, emp);
  }

  getEmployeeList()
  {
    return this.http.get(this.baseUrl);
  }

  putEmployee(emp:Employee)
  {
    return this.http.put(this.baseUrl + `/${emp._id}`,emp);
  }

  deleteEmployee(_id:string)
  {
    return this.http.delete(this.baseUrl + `/${_id}`);
  }
}
