import { Todo } from './../../model/index';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import { TodoService } from './todo.service';
import { MatSelectionListChange, MatSnackBar } from '@angular/material';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    desc = '';

    todos: Todo[] = [];

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private todoService: TodoService,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.todoService.list().subscribe((todos) => {
          this.todos = todos;
        });
    }

    onChangeSelection($event: MatSelectionListChange) {
      const selected = $event.option.selected;
      const id = $event.option.value;
      const todo = this.todos.find((_todo) => _todo.id === id);
      this.todoService.update({...todo, finished: selected}).subscribe((_todo) => {
        todo.finished = _todo.finished;
        if (_todo.finished !== selected) {
          this.snackBar.open('Error: Change failed');
        }
      });
    }

    add() {
      const newTodo: Todo = { description: this.desc, time: '', finished: false };
      this.todoService.create(newTodo).subscribe((todo) => {
        this.todos.push(todo);
        this.desc = '';
      });
    }

    delete(e: MouseEvent, id: number) {
      e.stopPropagation();
      this.todoService.delete(id).subscribe(() => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
      });
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
