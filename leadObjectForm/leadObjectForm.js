import { LightningElement, track, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import leadForm from '@salesforce/apex/FieldSetCC.leadForm';
//import getPickListValuesIntoList from '@salesforce/apex/fieldSetController.getPickListValuesIntoList';
import persnalInfo from '@salesforce/apex/FieldSetCC.persnalInfoFieldSet';
// import { getPicklistValues } from 'lightning/uiObjectInfoApi';
// import { getObjectInfo } from 'lightning/uiObjectInfoApi';
// import LEAD_OBJECT from '@salesforce/schema/Lead';
// import STATUS_FIELD from '@salesforce/schema/Lead.Status';
import accountLookup from '@salesforce/apex/FieldSetCC.accountLookup';
import contactLookup from '@salesforce/apex/FieldSetCC.contactLookup';

export default class leadObjectForm extends LightningElement {

    @track currentStep = 1;
    @track displayForm = true;
    @track recordId = '';
    @track currentPage = 1;
    @track thankYouScreen;
    @track spin = false;
    @track therecord = {};
   // @track StatusOptions = [];
    // @track abcd='therecord.FirstName';
    // @track inputLabel;
    // @track inputType;
    // @track inputValue;
    @track inputData;
    @track inputError;
   // @api resultdata;
    lookupSelected = {};
    lookupName = {};
    @track AccountOptions = [];
    @track ContactOptions = [];
    @track filterConOptions = [];
    
    @wire(persnalInfo) getPersonalInfoList({ error, data }) {
        if (data){
            this.inputData =  JSON.parse(data);
            this.inputData.forEach(element =>{
                if(element.islookup){
                    this.lookupSelected[element.fieldApiName] = false;
                    this.lookupName[element.fieldApiName] = undefined;
                }
            });

            this.inputError = undefined;
        } else if (error){
            this.inputError = error;
            this.inputData = undefined;
        }
    }

    // @wire(getObjectInfo, { objectApiName: LEAD_OBJECT })
    // objectInfo;

    // @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: STATUS_FIELD})
    // StatusPicklistValues;
    //this.statusOptions = StatusPicklistValues.data.value;

    // get StatusOptions() {
    //         return [
    //             { label: 'Open - Not Contacted', value: 'Open - Not Contacted' },
    //             { label: 'Working - Contacted', value: 'Working - Contacted' }
    //         ];
    //     }


    // connectedCallBack() {
    //     this.getYourPicklist();
    //   }

    //    async getYourPicklist() {
    //        let theOptions = await getPickListValuesIntoList();
    //        for (const [i, j] of Object.entries(theOptions)) {
    //            this.StatusOptions.push({label: i, value: j});
    //        }
    //    }



    connectedCallback() {
       // this.getOptions();
        this.accountWrapper();
        this.contactWrapper();
    }


    accountWrapper() {
        accountLookup({})
                .then((result) => {
                    this.AccountOptions = result;
                })
                .catch((error) => {
                    console.log('error123 ' + error);
                });
        }

        contactWrapper() {
            contactLookup({})
                    .then((result) => {
                        this.ContactOptions = result;
                        this.filterConOptions = this.ContactOptions;     
                    })
                    .catch((error) => {
                        console.log('error123 ' + error);
                    });
            }

    // wrapperList() {
    //     persnalInfo({})
    //         .then((result) => {
    //             console.log('hello123 ' + result);
    //             console.log('hello ' + JSON.stringify(result));
    //             this.inputData = JSON.parse(result);
    //             this.resultdata = result;
    //             console.log('helloaaaaaaa ' + this.inputData);
    //             console.log('result ' + result);
    //             console.log('fieldValue ' + this.inputData.fieldValue);
    //             //console.log(typeof this.inputData);
    //             result.forEach(element => {
    //                 console.log('result ' + element.fieldValue);
    //             });
    //         })
    //         .catch((error) => {
    //             // handle Error
    //             console.log('error123 ' + error);
    //         });
    // }

    // getOptions() {
    //     getPickListValuesIntoList({})
    //         .then((result) => {
    //             console.log('result123 ' + result);
    //             let options = [];
    //             if (result) {
    //                 result.forEach(r => {
    //                     options.push({
    //                         label: r,
    //                         value: r
    //                     });

    //                 });
    //             }
    //             this.StatusOptions = options;
    //         })
    //         .catch((error) => {
    //             // handle Error
    //             console.log('error123 ' + error);
    //         });
    // }

    handleChange(event) {
        this.therecord[event.target.name] = event.target.value;
        console.log('check value '+event.target.value);
        console.log('55555c ' + JSON.stringify(this.therecord));
        this.inputData.forEach(element => {
            if (element.fieldApiName == event.target.name) {
                element.fieldValue = event.target.value;
            }
        });

        if(event.target.name =="Account__c"){
            console.log('chck value ');
            this.filterConOptions = [];
            this.ContactOptions.forEach(element => {
                console.log('element '+element);
                console.log('element1 '+JSON.stringify(element));
                console.log('element2 '+element.accId);
                if(element.accId == event.target.value){

                    this.filterConOptions.push(element);
                }

            });

        }
        // const indNo  = this.inputData.findIndex(object => {
        //     return object.fieldApiName == event.target.name;
        // });
        // this.inputData[indNo].fieldValue = event.target.value;
        // console.log('jjjjj  '+this.inputData[indNo].fieldValue);

        //this.inputData.fieldValue= event.target.value;
        //console.log('change '+event.target.value);
        //console.log(this.inputData);
        // for (let index = 0; index < this.inputData.length; index++) {
        //     const element = this.inputData[index];
        //    // console.log('jai maa '+element.fieldValue);
        //    // console.log(element.fieldLabel);
        //    // element.fieldValue = event.target.value;
        //     console.log('jai mata '+element.fieldValue);

        // }
        // console.log('inputData'+this.inputData);

    }

    handleSubmit(event) {
        this.spin = true;
        leadForm({ con: this.therecord })
            .then(result => {
                this.message = result;
                this.error = undefined;
                if (this.message !== undefined) {
                    this.currentPage = this.currentPage + 1;
                    if (this.currentPage == 5) {
                        this.thankyouScreen = true;
                        this.displayForm = false;
                        this.spin = false;
                    }
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Lead created Succesfully',
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
                        title: 'Failed to Insert record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }

    handleNext(event) {

             if(this.currentPage ==1){
            this.template.querySelector(".bullet1").style.backgroundColor="green";
        this.template.querySelector(".bullet5").style.backgroundColor="green";
        }
        if(this.currentPage ==2){
            this.template.querySelector(".bullet2").style.backgroundColor="green";
        this.template.querySelector(".bullet6").style.backgroundColor="green";
        }

        if(this.currentPage ==3){
            this.template.querySelector(".bullet3").style.backgroundColor="green";
        this.template.querySelector(".bullet7").style.backgroundColor="green";
        }

        if(this.currentPage ==4){
            this.template.querySelector(".bullet4").style.backgroundColor="green";
        }

        // event.preventDefault(); 
        // this.inputData.fieldValue = 'test';
        // console.log('hiiiiioo '+this.inputData.fieldValue);
        //console.log('hiiiii ' + this.inputData);
        //console.log('hiiiii ' + JSON.stringify(this.inputData));

        // if (this.currentPage == 1) {
        //     this.currentStep = "2";
        // }
        // else if (this.currentPage == 2) {
        //     this.currentStep = "3";
        // }
        // else if (this.currentPage == 3) {
        //     this.currentStep = "4";
        // }

        // Progress bar code Ends 

        //this.showMessage('Record Saved Successfully','success');
        // this.recordId = event.detail.id;
        if (this.currentPage <= 4) {
            this.currentPage = this.currentPage + 1;
            console.log('gggggg ' + this.currentPage);
            if (this.currentPage == 5) {
                this.thankYouScreen = true;
                this.displayForm = false;

            }
        }

    }
    // handleError(e) {
    //     this.showMessage(e.detail.detail, 'error');
    // }

    // showMessage(message, variant) {
    //     const event = new ShowToastEvent({
    //         title: 'Record Save',
    //         variant: variant,
    //         mode: 'dismissable',
    //         message: message
    //     });
    //     this.dispatchEvent(event);
    // }

    handlePrevious() {

                if(this.currentPage == 2){
            this.template.querySelector(".bullet1").style.backgroundColor="white";
        this.template.querySelector(".bullet5").style.backgroundColor="lightgrey";
        }

        if(this.currentPage == 3){
            this.template.querySelector(".bullet2").style.backgroundColor="white";
        this.template.querySelector(".bullet6").style.backgroundColor="lightgrey"; 

        }

        if(this.currentPage == 4){
            this.template.querySelector(".bullet3").style.backgroundColor="white";
        this.template.querySelector(".bullet7").style.backgroundColor="lightgrey";
        }

        // if (this.currentPage == 4) {
        //     this.currentStep = "3";
        // }
        // else if (this.currentPage == 3) {
        //     this.currentStep = "2";
        // }
        // else if (this.currentPage == 2) {
        //     this.currentStep = "1";
        // }
        this.currentPage = this.currentPage - 1;
    }

    get expression1() {
        return this.currentPage == 1;
    }

    get expression2() {
        return this.currentPage == 2;
    }

    get expression3() {
        return this.currentPage == 3;
    }

    get expression4() {
        return this.currentPage == 4;
    }

    formatPhoneNumber(event){
        var phoneNumber = event.target.value;
        var s = (""+phoneNumber).replace(/\D/g, '');
        var m = s.match(/^(\d{3})(\d{3})(\d{4})$/);
        var formattedPhone = (!m) ? null :   m[1] + "-" + m[2] + "-" + m[3];
        this.therecord.Phone=formattedPhone;
    }

    // handleAccountSelection(event){
    //     console.log("the selected record id is"+event.detail);
    // }

    //selectedAccount;

    handleAccountSelection(event){
        let currentApiName = event.target.name;
        this.lookupSelected[currentApiName] = true;
        //this.selectedAccount = event.detail.id;
        this.lookupName[currentApiName] = event.detail.name;
        this.therecord[currentApiName] = event.detail.id;

        // this.inputData.forEach(element => {
        //     if (element.fieldApiName == event.target.name) {
        //         element.fieldValue = event.target.value;
        //     }
        // });
        //alert("The selected Accout id is"+this.selectedAccount+'\n'+JSON.stringify(this.therecord));
    }

    removeAccount(event){
        let currentApiName = event.target.name;
        this.lookupSelected[currentApiName] = false;
        this.therecord[currentApiName] = undefined;
        this.lookupName[currentApiName] = undefined;
    }

    accountId;

    handleSelectedLookup(event) {   
        this.accountId = event.detail;
    }

}