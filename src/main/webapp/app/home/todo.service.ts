import { Todo } from './../../model/index';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TodoService {

  todoServiceUrl = '/service/todoservice/api';

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Array<Todo>>(`${this.todoServiceUrl}/todo`);
  }

  create(todo: Todo) {
    return this.http.post<Todo>(`${this.todoServiceUrl}/todo`, todo);
  }

  update(todo: Todo) {
    return this.http.patch<Todo>(`${this.todoServiceUrl}/todo/${todo.id}`, todo);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.todoServiceUrl}/todo/${id}`);
  }
}
