import { LightningElement ,track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import createContact from '@salesforce/apex/ContactsForLWC.createContact';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import Email from '@salesforce/schema/Contact.Email';
import AccountId from '@salesforce/schema/Contact.AccountId';
import Phone from '@salesforce/schema/Contact.Phone';
import MobilePhone from '@salesforce/schema/Contact.MobilePhone';
import Domain_Of_Email__c from '@salesforce/schema/Contact.Domain_Of_Email__c';
import Description from '@salesforce/schema/Contact.Description';

export default class RecordEditForm1 extends LightningElement {
    @track currentPage = 1;
    @track displayForm = true;
    @track thankyouScreen;
    @track therecord={};
    @track contactId="Created contact Id will be displayed here " ;
    @track recordId ='';

    objectApiName=CONTACT_OBJECT;
    lnamefield=LAST_NAME;
    email=Email;
    accId=AccountId;
    phonefield=Phone;
    mobilefield=MobilePhone;
    domainfield=Domain_Of_Email__c;
    descrptiofield=Description;

    handleSuccess(event)
    {
        if(this.currentPage===5){
            this.showMessage('Record Saved Successfully','success');
            this.thankyouScreen = true;
            this.displayForm = false;
            //this.currentPage = false;
          //this.spin = false;
        }
    }

    handleChange(event){
        this.therecord[event.target.fieldName]=event.target.value ;
        console.log('output is 1111111 '+JSON.stringify(this.therecord));
     }

    handleSubmit(event){
        if(this.currentPage<=3){
            event.preventDefault();       // stop the form from submitting
        console.log('output is 222222222 '+JSON.stringify((this.therecord)));
        }
        if(this.currentPage==4){
                this.template.querySelector('lightning-record-edit-form').submit(this.therecord);
                console.log('output is 333333333 '+JSON.stringify(this.therecord)); 
        }
                this.currentPage = this.currentPage + 1 ;
    }

    handleError(e){   
        this.showMessage(e.detail.detail,'error');
    }

    showMessage(message,variant){
        const event = new ShowToastEvent({
            title: '',
            variant: variant,
            mode: 'dismissable',
            message: message
        });
        this.dispatchEvent(event);
    }
   

    handlePrevious(){
        this.currentPage = this.currentPage - 1;
    }

    
    get expression1() {
        return this.currentPage == 1 ;
    }

     get expression2() {
        return this.currentPage == 2 ;
    }

    get expression3() {
        return this.currentPage == 3 ;
    }

    get expression4() {
        return this.currentPage == 4 ;
    }

}

// handleNext(event){
    //     // if(this.currentPage===1)
    //     // {
    //     //     this.contactId=event.detail.id ;
    //     // }
    //     this.currentPage = this.currentPage + 1;
    // }


// handleSubmit(event)
    // {
    //     const evt = new ShowToastEvent({
    //         title: "Succesful",
    //         message: "Contact Created",
    //         variant: 'success' 
    //     });
    //     this.dispatchEvent(evt);

    //     if(this.currentPage<=4){
    //         this.currentPage = this.currentPage + 1;
    //         if(this.currentPage== 5){
    //             this.thankyouScreen = true;
    //             this.displayForm = false;
    //         }
    //     }
               
    // }