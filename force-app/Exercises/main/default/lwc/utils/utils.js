import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Utils extends LightningElement {
    static showToast = (firingComponent, toastTitle, toastBody, variant => {
        const evt = new ShowToastEvent({
            title: toastTitle,
            message: toastBody,
            variant: variant
        });
        firingComponent.dispatchEvent(evt);
    })
}