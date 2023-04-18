import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';

export default class CreateRecordWithoutApex extends LightningElement {
    accountId;
    record={};
    handleChange(event){
       this.record[this.target.name]=event.target.value;
    }
    handleCreateAccount(){
        const fields={};
        fields[NAME_FIELD.fieldApiName]=this.record.Name;
        // console.log("name"+JSON.stringify(fields));
        const recordInput={apiName:ACCOUNT_OBJECT.objectApiName,fields}; 
        createRecord(recordInput)
        .then(account=>{
            // console.log("name"+JSON.stringify(account));
            this.accountId=account.id;  
        })
        .catch(error=>{
             console.error("error:"+JSON.stringify(error))
        })
    }

}