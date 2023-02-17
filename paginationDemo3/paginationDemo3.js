import { LightningElement ,track} from 'lwc';
import getAccounts from'@salesforce/apex/AccountController.getAccountList';

export default class paginationDemo3 extends LightningElement {
    accounts;
    allAccounts;
    totalAccounts = 0;
    pageSize = 6;
    @ track noOfPages = 10 ;
    columns =[
                { 'label' : 'ID', 'fieldName' : 'Id'},
                { 'label' : 'Name', 'fieldName' : 'Name'},
                { 'label' : 'Phone', 'fieldName' : 'Phone'}
            ];

    connectedCallback(){
        this.init();
    }

    init(){
        getAccounts().then(res=>{
            console.log('@@@####### init function first line');
            let accounts = res;
            console.log('getAccount accounts   >>  ' + JSON.stringify(accounts));
            let accArr = [];
            if(accounts){
                this.totalAccounts = accounts.length;
                accounts.forEach(acc => {
                    let a ={};
                    a.Id = acc.Id;
                    a.Name = acc.Name;
                    a.Phone = acc.Phone;
                    accArr.push(a);
                });
                this.allAccounts = accArr;
                console.log('getAccount this.allAccounts   >>  ' + JSON.stringify(this.allAccounts));
                this.accounts = this.allAccounts.slice(0,this.pageSize);
            }
        });
    }

    handlePagination(event){
        const start = (event.detail-1)*this.pageSize;
        const end = this.pageSize*event.detail;
        this.accounts = this.allAccounts.slice(start, end);
    }
}













// init(){
    //     getAccounts().then(res=>{
    //         console.log('@@@####### init function first line');
    //         let accounts = res;
    //         console.log('getAccount accounts   >>  ' + accounts);
    //         let acc_a = [];
    //         if(accounts){
    //             this.totalAccounts = accounts.length;
    //             accounts.forEach(acc => {
    //                 let a ={};
    //                 a.Id = acc.Id;
    //                 a.name = acc.Name;
    //                // a.accountnumber = acc.AccountNumber;
    //                // a.source = acc.AccountSource;
    //                // a.active = acc.Active__c;
    //                 a.phone = acc.Phone;
    //                 acc_a.push(a);
    //             });
    //             this.allaccounts = acc_a;
    //             console.log(this.accounts);
    //             this.accounts = this.allaccounts.slice(0,this.pageSize);
    //         }
    //     });
    // }

    // handlePagination(event){
    //     const start = (event.detail-1)*this.pageSize;
    //     const end = this.pageSize*event.detail;
    //     this.accounts = this.allaccounts.slice(start, end);
    // }

    // init(){
    //     getAccounts().then(res=>{
    //         console.log('@@@####### init function first line');
    //         let accounts1 = res;
    //         this.allAccounts=JSON.stringify(accounts1);
    //         console.log('@@@@##### getAccount allAccounts   >>  ' + this.allAccounts);
    //         this.accounts = this.allAccounts.slice(0,this.pageSize);
    //     });
    // }