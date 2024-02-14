import { LightningElement, api } from 'lwc';

export default class StudentTile extends LightningElement {
    //@api isSelected = false;
    @api selectedStudentId = '';

    @api student={
        Name: '[sanghoon kang]',
        PhotoUrl: '/services/images/photo/003B0FakePictId',
    };

    get tileSelected(){
        return (this.selectedStudentId===this.student.Id) ? "tile selected" : "tile";
    }
    
    studentClick(){
        const evt = new CustomEvent('studentselected', {
            bubbles: true, composed: true,
            detail: { studentId: this.student.Id }
            });
            this.dispatchEvent(evt);
    }
}