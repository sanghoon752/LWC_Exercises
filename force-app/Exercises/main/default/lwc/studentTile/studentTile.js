import { LightningElement, api } from 'lwc';

export default class StudentTile extends LightningElement {
    @api isSelected = false;

    @api student={
        Name: '[sanghoon kang]',
        PhotoUrl: '/services/images/photo/003B0FakePictId',
    };

    get tileSelected(){
        return this.isSelected ? "tile selected" : "tile";
    }
    
    studentClick(){
        alert(this.student.Name);
    }
}