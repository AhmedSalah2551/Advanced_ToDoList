import { moveItemInArray} from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

declare var window:any;
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone:true,
  imports:[
    MatIconModule,
    CdkDropList,
    NgFor,
    CdkDrag,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ]
})
export class TasksComponent implements OnInit{
  updateForm!:FormGroup;
  tasks:any[] = [];
  ind:number=0;
  inpValue:string='';
  inpUpdate :string ='';
  status:boolean=false;
  formModal:any;

  constructor(private fb:FormBuilder){}

    ngOnInit(): void {
    this.updateForm = this.fb.group({
      task:['',Validators.required]
    });

    const storedArray = localStorage.getItem('myArray');
    if (storedArray) {
      this.tasks = JSON.parse(storedArray);
    }

    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModalCenter")
    )
  }


  drop(event: any) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.saveArray();
  }

  saveArray() {
    localStorage.setItem('myArray', JSON.stringify(this.tasks));
  }

  add(){
    this.tasks.push({content:this.inpValue,bool:false});
    this.saveArray();
    this.inpValue='';
  }

  delete(index:number){
    this.tasks.splice(index,1);
    this.saveArray();
  }

  check(event:any,index:number){
    if(event == true){
      this.status=true;
      this.tasks[index].bool=this.status;
      this.saveArray()
    }
    else{
      this.status=false;
      this.tasks[index].bool=this.status;
      this.saveArray()
    }
  }

  openModal(index:number){
    this.formModal.show();
    this.updateInput(index)
  }

  updateInput(index: number){
    this.inpUpdate=this.tasks[index].content;
    this.ind = index;
  }
  update(){
    this.tasks[this.ind].content=this.inpUpdate;
    this.saveArray();
    this.doSomethiing();
  }
  doSomethiing(){
    this.formModal.hide()
  }
}
