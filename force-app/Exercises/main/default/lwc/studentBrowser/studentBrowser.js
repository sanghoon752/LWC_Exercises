import { LightningElement, wire } from 'lwc';
import getStudents from '@salesforce/apex/StudentBrowser.getStudents';


export default class StudentBrowser extends LightningElement {
  @wire(getStudents, {instructorId: '$selectedInstructorId', courseDeliveryId: '$selectedDeliveryId'}) students;

  selectedDeliveryId = '';
  selectedInstructorId = '';

  handleFilterChange(event){
    this.selectedDeliveryId = event.detail.deliveryId;
    this.selectedInstructorId = event.detail.instructorId;
  }


    /*constructor() {
        super();
        const studentNames = ['Rad', 'Stuart', 'Andres', 'Rahul', 'Amit', 'Simon'];
        this.studentList = studentNames.map( (studentName, index) => {
          return {
            'sobjectType': 'Contact',
            'Name': studentName,
            'PhotoUrl': '/services/images/photo/003B0FakePictId',
            'Id': index
          };
        });
      }*/
}