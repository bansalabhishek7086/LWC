import { LightningElement, track} from 'lwc';
// import CONTACT_OBJECT from '@salesforce/schema/Contact';
// import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
// import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
// import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

import createContact from '@salesforce/apex/ContactsForLWC.createContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class createRecordWithApex extends LightningElement {

    // @track fname = FIRSTNAME_FIELD;
    // @track lname = LASTNAME_FIELD;
    // @track email = EMAIL_FIELD;
    therecord={};
    handleChange(event){
       this.therecord[event.target.name]= event.target.value ;
    }
        handleSubmit() {
            
            createContact({ con : this.therecord })
                .then(result => {
                    this.message = result;
                    this.error = undefined;
                    if(this.message !== undefined) {
                        this.record.FirstName = "";
                        this.record.LastName = "";
                        this.record.Email = "";
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Success',
                                message: 'Contact Created successfully',
                                variant: 'success',
                            }),
                            
                        );
                        
                    }
                    
                    console.log(JSON.stringify(result));
                    console.log("result", this.message);
                })
        .catch(error => {
            this.message = undefined;
            this.error = error;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
            console.log("error", JSON.stringify(this.error));
        });
    }

    handleReset(event) {
        const inputFields = this.template.querySelectorAll(
            'lightning-input'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
     }
}
