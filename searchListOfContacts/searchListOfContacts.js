import { LightningElement, track, wire } from 'lwc';
// import ListOfContactsSearch from '@salesforce/apex/ContactsForLWC.ListOfContactsSearch';
import ListOfContacts from '@salesforce/apex/ContactsForLWC.ListOfContacts';

export default class SearchListOfContacts extends LightningElement {

@track columns = [
    {
    label: 'First Name',    
    fieldName: 'FirstName',
    type: 'text',
    sortable: true
},
{
    label: 'Last Name',
    fieldName: 'LastName',
    type: 'Email',
    sortable: true
},
{
    label: 'Email Id',
    fieldName: 'Email',
    type: 'Email',
    sortable: true
},
{
    label: 'Contact ID',
    fieldName: 'Id',
    type: 'text',
    sortable: true
}
];

@track error;
@track conList ;
searchName;
@track currentContactName ;
@track conVar;
@track conVar2;
@track disablePrevious=false ;
@track disableNext =false ;

// sorting variables - >  
@track sortBy='lastName';
@track sortDirection='asc';
// @track sortBy='firstName';

@wire(ListOfContacts,{field : '$sortBy',sortOrder : '$sortDirection'})
wiredContacts({
data,
error
}) {   
if (data) {
    this.conList = data;
    this.conVar = this.conList;
    this.conVar2 = this.conList;
    this.conVar=this.conList.slice(0,this.pageSize); 
    this.totalRecordCount=data.length ;
    this.totalPage=Math.ceil( this.totalRecordCount/this.pageSize);
    this.endingRecord=this.pageSize;
    this.disablePrevious=true;
} 
    
    else{
        this.error = error;
        this.data=undefined;
        }
}

doSorting(event) {
    this.startingRecord=1;
this.endingRecord=5;
this.page=1;
// calling sortdata function to sort the data based on direction and selected field
this.sortBy = event.detail.fieldName;
this.sortDirection = event.detail.sortDirection;
}

// variables and array used for search change  
@track dataNotFound;
@track arr=[];  
handleChangeConName(event){
this.startingRecord=1;
this.endingRecord=5;
this.page=1;

    this.arr = [];
    this.currentContactName = event.target.value;
    this.searchName  = event.target.value.toLowerCase();
    // console.log('currentContactName is ' + this.currentContactName) ;
    console.log('searchName is ' + this.searchName ) ;
    this.conList.forEach(conItem => {
        // console.log('conItem iterate is ' + conItem.Name);
        if(conItem.Name.toLowerCase().includes(this.searchName))
        {
                //console.log('conitem is ' + conItem);
                this.arr.push(conItem);
            //   console.log('arr is ' + this.arr);
        } 
            
    });
    // console.log('arr after loop is ' + this.arr);
    //  console.log(JSON.stringify(' arr - after loop is'  + this.arr));

    if(this.arr)
    {
        this.dataNotFound = '';
    }
            if(this.arr == ''){
            this.dataNotFound = 'There is no Contact found ';
                }

    this.conVar2 = this.arr; 
    this.conVar = this.arr.slice(0,this.pageSize); 
    this.totalRecordCount=this.arr.length ;
    this.totalPage=Math.ceil( this.totalRecordCount/this.pageSize);
    if(this.page==1)
{
    this.disablePrevious=true;
}
if(this.page==this.totalPage)
{
    this.disableNext=true ;
}

    //console.log(JSON.stringify('conList is '  + this.conVar));
}

//Pagination variables.

@track startingRecord = 1 ;
@track endingRecord ;
@track page = 1;
@track totalRecordCount ; 
@track totalPage ;
@track pageSize = 5 ;

// Apply pagination ------------------------------------------>

previousHandler(event)
{
    this.disableNext=false ;
    if(this.page==2)
    {
        this.disablePrevious=true;
    }
//    this.conVar=this.conList.slice(0,this.pageSize);
if(this.page>1){
this.page=this.page-1 ;
this.displayRecordperPage(this.page);
}
}

nextHandler(event)
{
    this.disablePrevious=false;
if(this.page==this.totalPage-1)
{
    this.disableNext=true ;
}
// this.conVar=this.conList.slice(0,this.pageSize);
if(this.page<this.totalPage && this.page !==this.totalPage){
    this.page=this.page+1 ;
    this.displayRecordperPage(this.page);
}
}

displayRecordperPage(page){
if(page==1)
{
    this.startingRecord=1;
    this.endingRecord=page * this.pageSize;
    this.conVar=this.conVar2.slice(this.startingRecord-1,this.endingRecord);
}
else{
    this.startingRecord = ((page-1)*this.pageSize)+1;
    this.endingRecord=page * this.pageSize;
    this.endingRecord = (this.endingRecord > this.totalRecordCount )? this.totalRecordCount: this.endingRecord ;
    this.conVar=this.conVar2.slice(this.startingRecord-1,this.endingRecord);
}

// this.startingRecord = (page-1)*this.pageSize;
// this.endingRecord=page * this.pageSize;
// this.endingRecord = (this.endingRecord > this.totalRecordCount )? this.totalRecordCount: this.endingRecord ;
// this.conVar=this.conList.slice(this.startingRecord,this.endingRecord);

}

}

// handleChangeConName(event){
//     this.currentContactName = event.target.value;
//     const searchKey  = event.target.value.toLowerCase();
//     console.log('search key is ' + searchKey ) ;
// if(searchKey)
// {
//     console.log('check 1 ') ;

//     if(this.conList)
//     {
//         console.log('check 2 ') ;

//         let recs = [];
            
//                 for ( let rec of this.conList.values ){
//                     let strVal = String( rec );
//                     if ( strVal ) {

//                         if ( strVal.toLowerCase().includes(searchKey) ) {

//                             recs.push( rec );
//                             break;
                
//                         }

//                     }

//                 }

//                 this.conList = recs;

//     }
// }
// }
// }


// search (searchName) {

//     let filtered = this.conList.filter (source => {
//         if (source.includes(searchName) ) {
//             return true;
//         }
//         return this.dataNotFound = 'There is no Contact found ';
//     })

//     return filtered;
// }



// @track dataNotFound;
// @wire (ListOfContactsSearch,{keySearch:'$searchName'})
// wireRecord({data,error}){
// if(data){
//     this.conList = data;
//     this.error = undefined;
// this.dataNotFound = '';
// if(this.conList == ''){
// this.dataNotFound = 'There is no Contact found ';
// }
// }else{
// this.error = error;
// this.data=undefined;
// }
// }


// @track currentContactName;
// @track searchName;
// handleChangeConName(event){
// this.currentContactName = event.target.value;
// this.searchName = this.currentContactName;
// }

// handleAccountSearch(){
// this.searchName = this.currentContactName;
// }

// @track records;
// @track dataNotFound;
// @wire (ListOfContactsSearch,{keySearch:'$searchName'})
// wireRecord({data,error}){
// if(data){
// this.records = data;
// this.error = undefined;
// this.dataNotFound = '';
// if(this.records == ''){
// this.dataNotFound = 'There is no Contact found ';
// }
// }else{
// this.error = error;
// this.data=undefined;
// }
// }
