import { LightningElement,api,track,wire } from 'lwc';
import lwcComponent1 from '@salesforce/apex/WrapperController.lwcComponent1';
import getSObjectFields from '@salesforce/apex/WrapperController.getSObjectFields';

export default class WrapperTestComponent extends LightningElement {


//     @track columns = [{
//         label: 'Contact name',
//         fieldName: 'Name',
//         type: 'text',
//         sortable: true
//     },
//     {
//         label: 'Email Id',
//         fieldName: 'Email',
//         type: 'Email',
//         sortable: true
//     },
//     {
//         label: 'Contact ID',
//         fieldName: 'Id',
//         type: 'text',
//         sortable: true
//     }
// ];

// @track error;
// @track conList ;

// @wire(ListOfContacts)
// wiredContacts({
//     error,
//     data
// }) {
//     if (data) {
//         this.conList = data;
//     } else if (error) {
//         this.error = error;
//     }
// }

@track allData={};
@track error ;
@track theRecord ;
@track StatusOptions = [];
@ track objData ;
@ track objNameVar ='';
@track columns =[];

@wire(lwcComponent1) getObjectsList({ error, data }) {
    if (data){
        let options = [];
         //this.allData =  JSON.parse(JSON.stringify(data));
        // this.allData =  JSON.stringify((data));
            data.forEach(r => {options.push({
                                    label: r,
                                    value: r
                                });
                            });
                        
        this.StatusOptions = options;         
        this.error = undefined;
    } else if (error){
        this.error = error;
        this.allData = undefined;
    }

   // console.log('helo' + JSON.stringify(( this.allData)));
}

@wire(getSObjectFields,{objName : '$objNameVar'}) 
wiredObjFields({ error, data }) {
    if (data){
         //this.allData =  JSON.parse(JSON.stringify(data));
        // this.allData =  JSON.stringify((data));
            // data.forEach(r => {options.push({
            //                         label: r,
            //                         value: r
            //                     });
            //                 });
        this.objData=data;               
        this.error = undefined;
    } else if (error){
        this.error = error;
        this.objData = undefined;
    }
    console.log(' Object fields are : ' + ( this.objData));
    //console.log(' Object fields are : ' + JSON.stringify(( this.objData)));
}

@track columns = [{
            label: 'Field Names',
           // fieldName: this.objData ,
            sortable: true 
        }];
    

handleChange(event){
   // this.theRecord[event.target.name] = event.target.value;
        this.objNameVar=event.target.value ;
        console.log('objNameVar is ' + JSON.stringify(( this.objNameVar)));
}

}