// import {  LightningElement, track, wire } from 'lwc';
// import getContactList from '@salesforce/apex/ContactsForLWC.getContactList';

// export default class PaginationDemo extends LightningElement {
//     totalContacts ;
//     visibleContacts;
//     pageSize = 5;

//     @wire(getContactList)
//     wiredContact({error, data}){
//         if(data){ 
//             this.totalContacts = data
//             console.log(this.totalContacts);
//         }
//         if(error){
//             console.error(error);
//         }
//     }
    
//     updateContactHandler(event){
//         this.visibleContacts=[...event.detail.records]
//         console.log(event.detail.records)
//     }


// }












import {  LightningElement, track, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactsForLWC.getContactList';

export default class PaginationDemo extends LightningElement {
    totalContacts ;
    visibleContacts;

    @wire(getContactList)
    wiredContact({error, data}){
        if(data){ 
            this.totalContacts = data
            console.log(this.totalContacts);
        }
        if(error){
            console.error(error);
        }
    }

    updateContactHandler(event){
        this.visibleContacts=[...event.detail.records]
        console.log(event.detail.records)
    }


}