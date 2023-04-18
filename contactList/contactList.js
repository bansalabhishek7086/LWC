// import { LightningElement, wire } from 'lwc';
// import { reduceErrors } from 'c/ldsUtils';
// import FirstName_FIELD from '@salesforce/schema/Contact.FirstName';
// import LastName_FIELD from '@salesforce/schema/Contact.LastName';
// import Email_FIELD from '@salesforce/schema/Contact.Email';
// import getContacts from '@salesforce/apex/ContactController.getContacts';

// const COLUMNS = [
//     { label: 'Contact FirstName', fieldName: FirstName_FIELD.fieldApiName, type: 'text' },
//     { label: 'Contact LastName', fieldName: LastName_FIELD.fieldApiName, type: 'text' },
//     { label: 'Email', fieldName: Email_FIELD.fieldApiName, type: 'text' }
// ];
// export default class contactList extends LightningElement {
//     columns = COLUMNS;
//     @wire(getContacts)
//     contacts;

//     get errors() {
//         return (this.contacts.error) ? reduceErrors(this.contacts.error) : [];
//     }
// }





 import { LightningElement, wire , track} from 'lwc';
 import getContacts from '@salesforce/apex/ContactController.getContacts';
 import LightningModal from 'lightning/modal';


//import LightningModal from 'lightning/modal';
//export default class contactList extends LightningModal(NavigationMixin(LightningElement)) {

//export default class contactList extends (LightningElement) {

export default class contactList extends LightningElement (LightningModal) {

    //@api recordId;
    @ track datas ;
    @track errors;

     @track isShowModal = false;

     columns = [
    // {label: 'Order Number', fieldName: 'ObjectURL', type: 'url', sortable : true, 
    //     typeAttributes: { label: { fieldName: 'Name' }, target: '_blank' }
    // },
    {
        label: 'FirstName',
        fieldName: 'FirstName',
        type: 'text',
        sortable: true
    },
    
    {
        label: 'LastName',
        fieldName: 'LastName',
        type: 'text',
        sortable: true
    }
];
    @wire(getContacts)
    wiredContacts({ error, data }) {
        if (data) {
           
            // let tempOrderList = [];            
            // data.forEach((record) => {
            //     let tempOrderRec = Object.assign({}, record);  
            //     tempOrderRec.ObjectURL = '/' + tempOrderRec.Id;
            //     tempOrderList.push(tempOrderRec);               
            // });
            
        
            console.log('Stringify data  is =>> '+JSON.stringify(data));
           // if(this.data !=='' && this.data!=null){
                this.datas = data;
                this.error = undefined;
                //this.isShowModal = true;
           // }
            
        } else if (error) {
            this.errors = error;
            this.datas = undefined;
        }
    }

    // navigateToUrl(){
    //      // Navigate to a URL
    //      this[NavigationMixin.Navigate]({
    //         type: 'standard__webPage',
    //         attributes: {
    //             url: '/apex/XX_ORD1__EC_CreateOrderFromQuote?accId='+this.recordId 
    //            // target: '_blank'
    //         }
    //     },
    //     true 
    //   );        
    // }
 
    handleClick(){
        this.isShowModal = true;
    }

    handleModal(){
        this.isShowModal = false;
    }
}