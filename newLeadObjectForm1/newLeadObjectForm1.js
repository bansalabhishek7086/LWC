import { LightningElement,track,wire,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createLead from '@salesforce/apex/CreateLeadForLWC.createLead1';

import { getPicklistValues, getObjectInfo} from 'lightning/uiObjectInfoApi';
import Status from '@salesforce/schema/Lead.Status';
import Lead_OBJECT from '@salesforce/schema/Lead';

import storeDataController from '@salesforce/apex/CreateLeadForLWC.storeDataController';
import retrieveDataCacheController from '@salesforce/apex/CreateLeadForLWC.retrieveDataCacheController';

export default class NewLeadObjectForm1 extends LightningElement {

    @track currentStep = 1;
    @track displayForm = true;
    @track recordId ='';
    @track currentPage = 1;
    @track thankyouScreen;
    // @track spin = false;
    @track therecord={
        // writable: true
    };
   
//  This is used for picklist values for lead object ---------------------------------------- ----------------------- 
    // get options() {
    //     return [
    //         { label: 'Open - Not Contacted', value: 'Open - Not Contacted' },
    //         { label: 'Working - Contacted', value: 'Working - Contacted' },
    //         { label: 'Closed - Converted', value: 'Closed - Converted' },
    //         { label: 'Closed - Not Converted', value: 'Closed - Not Converted' },
    //     ];
    // }
// Ends here ------------------------------------------------------------------------------------------------------
//  This is used for picklist values for lead object --------------------------------------------------------------  

@wire(getObjectInfo, { objectApiName: Lead_OBJECT })
  objectInfo;
  
@track defaultRecordTypeId="0125i000000UtLXAA0";
  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: Status
  })
  levelPicklistValues;

// Ends here ------------------------------------------------------------------------------------------------------
    handleChange(event){
        console.log('firstchange');
        console.log( 'previous record  is  - > '+JSON.stringify(this.therecord)) ;
      if(this.therecord!=null)
        this.therecord[event.target.name]=event.target.value;
        console.log('2ndchange');

        // console.log('1111'+JSON.stringify(this.rec2));

        console.log('2222'+JSON.stringify(this.therecord));
        storeDataController({ newLeadVar : this.therecord })
        .then(()=> {
            });
            console.log('storedataController');
    }

      connectedCallback() {
        retrieveDataCacheController().then((data)=> {
            console.log( 'retrieve data is - > '+JSON.stringify(data)) ;
            if(data!=null)
            this.therecord=JSON.parse(JSON.stringify(data));
            console.log( 'therecord  is  - > '+JSON.stringify(this.therecord)) ;

            });
     }     
//------------------------------------------------------------------------------------------------------------------
// @wire(retrieveDataCacheController)
// RetrivedData({
// data,
// error
// }) {   
// if (data) {
//     this.therecord = data;
//     this.error = undefined;
//     console.log( 'therecord is  - > '+JSON.stringify(this.therecord)) ;
//     // this.currentPage=this.currentPage+1;
//     //            if(this.currentPage==5){

//     //            }

// }  
//     else{
//         this.error = error;
//         this.therecord=undefined;
//         }
// }
//-------------------------------------------------------------------------------------------------------------------
// Validate code starts here ---------------------------------------------------------------------------------------------------
//    contact = {};
isInputValid() {
    let isValid = true;
    let inputFields = this.template.querySelectorAll('.validate');
    inputFields.forEach(inputField => {
        if(!inputField.checkValidity()) {
            inputField.reportValidity();
            isValid = false;
        }
        // this.contact[inputField.name] = inputField.value;
    });
    return isValid;
}
// Validate code ends here ---------------------------------------------------------------------------------------------------

    handleNext(event)
    {

        // this.spin = false;
// Progress bar code Starts ------------------------------------------->>>>>>>>>>>>>

        if(this.isInputValid()) {

            if(this.currentPage ==1){
                this.template.querySelector(".bullet1").style.backgroundColor="green";
            this.template.querySelector(".step1").style.backgroundColor="green";
            }
            if(this.currentPage ==2){
                this.template.querySelector(".bullet2").style.backgroundColor="green";
            this.template.querySelector(".step2").style.backgroundColor="green";
            }

            if(this.currentPage ==3){
                this.template.querySelector(".bullet3").style.backgroundColor="green";
            this.template.querySelector(".step3").style.backgroundColor="green";
            }
            if(this.currentPage<=4){
                this.currentPage = this.currentPage + 1;
                if(this.currentPage== 5){
                    this.thankyouScreen = true;
                    this.displayForm = false;
                    // this.therecord='';
                    //this.currentPage = false;
                //  this.spin = false;
                }
            }
        }
    }
// not required 4th we use in submit method-----------------------------------------------------------------
        // if(this.currentPage ==4){
        //     this.template.querySelector(".bullet4").style.backgroundColor="green";
        // }
//This is for onclick on step -------------------------------------------------------------------------->>
// if(this.currentPage==1)
// {
//     this.currentStep="2";
// }
// else if(this.currentPage==2)
// {
//     this.currentStep="3";
// }
// else if(this.currentPage==3)
// {
//     this.currentStep="4";
// }
//progress bar code ends ------------------------------------------>>>>>>>>>>>>>>>>>>
        //this.showMessage('Record Saved Successfully','success');
        // this.recordId = event.detail.id;
        

    
    @track rec={};

handleSubmit(){
    if(this.isInputValid()) {
        if(this.currentPage ==4){
                this.template.querySelector(".bullet4").style.backgroundColor="green";
        }
        if(this.rec!=null){
            storeDataController({ newLeadVar : this.rec }).then(()=> {
                console.log('storedataControlleronsubmittt');
                    });
        }
                createLead({ leadVar : this.therecord })
                .then(result => {
                    this.message = result;
                    this.error = undefined;
                    if(this.message !== undefined) {
                       this.currentPage=this.currentPage+1;
                       if(this.currentPage==5){
                            this.thankyouScreen=true;
                            this.displayForm=false;
                        }
                            this.dispatchEvent(
                                new ShowToastEvent({
                                    title: 'Success',
                                    message: 'lead Created successfully',
                                    variant: 'success',
                                }),
                            );
                    }
                    
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
       
}
//---------------------------------------------------------------------------------------------------------------------------------
 // retrieveDataCacheController().then((data)=> {
    //     console.log( 'retrieve data onsubmitt- > '+JSON.stringify(data)) ;
    //    this.therecord= JSON.parse(JSON.stringify(data));
    //     console.log( 'therecord  is after onsubmit - > '+JSON.stringify(this.therecord)) ;
    //     });

//     if(this.currentPage==5)
// {
//     storeDataController('')
//         .then(()=> {
//             })
// }

// this.currentPage=this.currentPage+1;
//-------------------------------------------------------------------------------------------------------------------------
    handleError(e){   
        this.showMessage(e.detail.detail,'error');
    }

    showMessage(message,variant){
        const event = new ShowToastEvent({
            title: 'Record Save',
            variant: variant,
            mode: 'dismissable',
            message: message
        });
        this.dispatchEvent(event);
    }

     handlePrevious(){
//Progress bar code starts here ------------------------------------------------------------======================
        if(this.currentPage == 2){
            this.template.querySelector(".bullet1").style.backgroundColor="white";
        this.template.querySelector(".step1").style.backgroundColor="lightgrey";
        }

        if(this.currentPage == 3){
            this.template.querySelector(".bullet2").style.backgroundColor="white";
        this.template.querySelector(".step2").style.backgroundColor="lightgrey"; 

        }

        if(this.currentPage == 4){
            this.template.querySelector(".bullet3").style.backgroundColor="white";
        this.template.querySelector(".step3").style.backgroundColor="lightgrey";
        }
        // if(this.currentPage==4){
        // this.currentStep="3";
        // }
        // else if(this.currentPage==3){
        // this.currentStep="2";
        // }
        // else if(this.currentPage==2){
        // this.currentStep="1";
        // }
//Progress bar code ends here  - --------------------------------------------------  ================================   
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