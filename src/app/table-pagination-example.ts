import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {AngularFirestore} from '@angular/fire/compat/firestore'

/**
 * @title Table with pagination
 */
@Component({
  selector: 'table-pagination-example',
  styleUrls: ['table-pagination-example.css'],
  templateUrl: 'table-pagination-example.html',
})
export class TablePaginationExample implements OnInit {

  // Columns to show in table
  displayedColumns: string[] = ['name', 'email', 'personalInfo', 'editObj'];

  // For referencing a local dataset
  //dataSource = new MatTableDataSource<Users>(this.dataSourceInfo);

  // Fot referencing a Firebase dataset
  dataSource: any;
  id: any;
  name: any;
  email: any;
  personalInfo: any;
  editObj: any;
  actions: any;

  @ViewChild('btnShow')
  btnShow!: ElementRef;
  @ViewChild('btnClose')
  btnClose!: ElementRef;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private store: AngularFirestore
  ){}

  ngOnInit() {
    this.getAll();
  }

  openDialog(){
    this.btnShow.nativeElement.click();
  }

  closeDialog(){
    this.btnClose.nativeElement.click();
  }

  goBack() {
    window.history.go(-1);
  }

  clearEdit(){
    this.editObj = null;
    this.name = "";
    this.personalInfo = "";
    this.email = "";
  }

  add(){
    if(this.editObj){
      this.store.collection('list')
        .doc(this.editObj.id)
        .update({name: this.name, personalInfo: this.personalInfo, email: this.email});
    } else {
      this.store.collection('list')
        .add({name: this.name, personalInfo: this.personalInfo, email: this.email});
    }
    this.closeDialog();
  }

  edit(id: string){
    this.store.collection('list')
      .doc(id).get()
      .subscribe((response) => {
        this.editObj = Object.assign({id: response.id}, response.data());
        this.name = this.editObj.name;
        this.personalInfo = this.editObj.personalInfo;
        this.email = this.editObj.email;
        this.openDialog();
      })
  }

  delete(id: string){
    const result = confirm('Are you sure you wish to delete?');
    if (result) {
      this.store.collection('list').doc(id).delete();
    }
  }

  getAll(){
    this.store.collection('list')
      .snapshotChanges()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource(response.map(item => {
          return Object.assign({id: item.payload.doc.id}, item.payload.doc.data())
        }))
        this.dataSource.paginator = this.paginator;
      });
  }
}





// ngOnInit() {
// this.moviesService.getPopularTVShows().subscribe(res => {
//   this.dataSource = new MatTableDataSource(res.results);
//   ^^^^^^^^^^^^^^^^^^
//   this.dataSource.paginator = this.paginator;
//   this.dataSource.sort = this.sort;
//   });
//   }

// export interface Users {
//   id: string;
//   name: string;
//   email: string;
//   personalInfo: string;
// }

// //const ELEMENT_DATA: Users[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];


/**  Copyright 2021 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */