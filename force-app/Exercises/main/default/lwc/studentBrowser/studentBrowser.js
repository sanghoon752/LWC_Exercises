import { LightningElement, wire } from 'lwc';
import getStudents from '@salesforce/apex/StudentBrowser.getStudents';
import { publish, MessageContext } from 'lightning/messageService';
import SELECTED_STUDENT_CHANNEL from '@salesforce/messageChannel/SelectedStudentChannel__c';
import { NavigationMixin } from 'lightning/navigation';

export default class StudentBrowser extends NavigationMixin(LightningElement) {
  students = [];
  @wire(getStudents, {instructorId: '$selectedInstructorId', courseDeliveryId: '$selectedDeliveryId'})
  wired_getStudents(result){
    if((result.data) || (result.error)){
      this.students = result;
      this.dispatchEvent(new CustomEvent("doneloading", {bubbles: true, composed: true}));
    }
  }

  selectedDeliveryId = '';
  selectedInstructorId = '';

  handleFilterChange(event){
    this.selectedDeliveryId = event.detail.deliveryId;
    this.selectedInstructorId = event.detail.instructorId;
    this.dispatchEvent(new CustomEvent('loading', {bubbles:true, composed:true}));
  }

  @wire(MessageContext) messageContext;
  
  handleStudentSelected(event){
    const studentId = event.detail.studentId;
    this.updateSelectedStudent(studentId);
  }

  updateSelectedStudent(studentId){
    const grid = this.template.querySelector('c-responsive-datatable');
    const gallery = this.template.querySelector('c-student-tiles');

    if(gallery){
      gallery.setSelectedStudent(studentId);
    }
    if(grid){
      grid.setSelectedRecord(studentId);
    }
    publish(this.messageContext, SELECTED_STUDENT_CHANNEL, {studentId: studentId});
  }

  cols = [
    {
      fieldName:"Name",
      label: "Name"
    },
    {
      fieldName:"Title",
      label: "Title",
      hiddenOnMobile: true
    },
    {
      fieldName:"Phone",
      label: "Phone",
      type: "phone"
    },
    {
      fieldName:"Email",
      label: "E-Mail",
      type: "email"
    }
  ];
  
  handleRowDblClick(event){
    const studentId = event.detail.pk;
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
        recordId: studentId,
        objectApiName: 'Contact',
        actionName: 'edit'
      }
    });
  }
  handleRowClick(event){
    const studentId = event.detail.pk;
    this.updateSelectedStudent(studentId);
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