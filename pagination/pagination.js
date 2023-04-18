// import { LightningElement ,api} from 'lwc';

// export default class Pagination extends LightningElement {
//     currentPage = 1
//     totalRecords
//     @api recordSize = 5

//     @api pageSize ;
//     totalrecordscount = 0;
//     pageList =[] ;
//     startforShift= 8;
//     index = 0;
//     clickedPage = 1;
//     allowedshiftno=[];
//     totalpages=0;


//     get records(){
//         return this.visibleRecords;
//     }
    
//     @api 
//     set records(data){
//         if(data){ 
//             console.log('@@@@'+JSON.stringify(data));
//             this.totalRecords = data;
//             this.recordSize = Number(this.recordSize);
//             this.totalPages = Math.ceil(data.length/this.recordSize);  
//             let default_list=[];
//             if(this.totalpages<=10){
//                 for(let i=1;i<=this.totalpages;i++){
//                     default_list.push(i);
//                 }
//             }
//             let pgl_default = this.totalpages >10 ? [1,2,3,4,5,6,7,8,'...',this.totalpages] : default_list;
//             this.pageList = pgl_default;           
//             this.updateRecords()     
//         }
//     }

//     renderedCallback(){
//         this.changeColorOnClick();
//     }

//     changeColorOnClick(){
//         this.template.querySelectorAll('.button').forEach(e=>{
//             if(Number(e.label) === this.clickedPage){
//                 e.classList.add('currentpage');
//                 e.blur();
//             }else{
//                 e.classList.remove('currentpage');
//             }
//         });
//     }

//     get disableleftarrow(){
//         return (this.clickedPage === 1)
//     }

//     get disablerightarrow(){
//         return (this.clickedPage === this.totalpages);
//     }

//     get rightshift(){
//         return Number(this.index)===2;
//     }

//     get leftshift(){
//         return (Number(this.index)===7 || Number(this.index)===8);
//     }

//     get isStartNoClicked(){
//         return (this.clickedPage - 1 === 4 || this.clickedPage<8 );
//     }

//     get isLastNoClcked (){  
//         return (this.totalpages - this.clickedPage >=4 &&  this.totalpages - this.clickedPage <8);
//     }
    
//     get isLastPageClicked(){
//         let last8array = [];
//         for(let i=this.totalpages-6;i<=this.totalpages;i++){
//             last8array.push(i);
//         }
//         console.log(last8array);
//         return (last8array.includes(this.clickedPage));
//         //return (this.clickedPage === this.totalpages);
//     }

//     getallowedshiftno(){
//         if(this.allowedshiftno){
//             if(!this.allowedshiftno.includes(8)){
//                 this.allowedshiftno.push(8);
//             }
//             if(!this.allowedshiftno.includes(this.totalpages)){
//                 this.allowedshiftno.push(this.totalpages);
//             }
//         }
//         console.log('Allowed nos are->');
//         console.log(this.allowedshiftno);
//     }

//     handlePrevious(event){
//         console.log('------------------START--------------------');
//         this.clickedPage = this.clickedPage-1;
//         this.dispatchPaginationevent();
//         this.getallowedshiftno();
//         if(this.clickedPage !== '...' && this.totalpages >10) this.displayePages(this.clickedPage);
//         console.log('-------------------END--------------------');
//     }

//     handleNext(event){
//         console.log('------------------START--------------------');
//         this.clickedPage = this.clickedPage+1;
//         this.dispatchPaginationevent();
//         this.getallowedshiftno();
//         if(this.clickedPage !== '...' && this.totalpages >10) this.displayePages(this.clickedPage);
//         console.log('-------------------END--------------------');
//     }

//     handleClick(event){
//         console.log('------------------START--------------------');
//         this.index = event.target.dataset.index;
//         this.clickedPage = Number(event.target.label);
//         this.getallowedshiftno();
//         if(event.target.label !== '...') this.dispatchPaginationevent();
//         if(event.target.label !== '...' && this.totalpages >10){
//             this.displayePages(this.clickedPage);
//         }
//         console.log('-------------------END--------------------');
//     }

//     displayePages(clickedPage){
//         if(clickedPage === this.startforShift){
//             this.pageList[1] = '...';
//         }
        
//         if(this.allowedshiftno && !this.isStartNoClicked && !this.isLastPageClicked && (this.allowedshiftno.includes(clickedPage) || this.isLastNoClcked)){
//             console.log('IN HERE 1');
//             this.pageList[2] = clickedPage-3;
//             this.pageList[3] = clickedPage-2;
//             this.pageList[4] = clickedPage-1;
//             this.pageList[5] = clickedPage;
//             this.pageList[6] = clickedPage+1;
//             this.pageList[7] = clickedPage+2;
//             this.pageList[8] = clickedPage+3;
//             if(this.isLastNoClcked){
//                 this.pageList[9] = this.pageList[9] !== '...' ? this.totalpages : '...';
//                 if(this.pageList[9] && this.pageList[9] === this.totalpages){
//                     this.pageList.pop();
//                 }
//             }
//             this.allowedshiftno = [];
//             this.allowedshiftno.push(this.pageList[2],this.pageList[8]);
//         }
        
//         if((!this.isLastNoClcked || this.rightshift) && !this.isLastPageClicked && !this.isStartNoClicked){
//             console.log('IN HERE 2');
//             this.pageList[9] = '...';
//             this.pageList[10] = this.totalpages;
//         }
        
//         if((this.isStartNoClicked && this.allowedshiftno.includes(this.clickedPage)) || this.clickedPage === 1){
//             console.log('IN HERE 3');
//             this.pageList = this.totalpages <= 8 ? [1,2,3,4,5,6,7,8] : [1,2,3,4,5,6,7,8,'...',this.totalpages];
//         }

//         if(this.isLastPageClicked && this.allowedshiftno.includes(this.clickedPage)){
//             console.log('IN HERE 4');
//             this.pageList[1] = '...';
//             this.pageList[2] = this.totalpages-7;
//             this.pageList[3] = this.totalpages-6;
//             this.pageList[4] = this.totalpages-5;
//             this.pageList[5] = this.totalpages-4;
//             this.pageList[6] = this.totalpages-3;
//             this.pageList[7] = this.totalpages-2;
//             this.pageList[8] = this.totalpages-1;
//             this.pageList[9] = this.totalpages;
//             if(this.pageList[10]){
//                 this.pageList.pop();
//             }
//             this.allowedshiftno = [];
//             this.allowedshiftno.push(this.pageList[2]);
//         }
//         this.pageList = [...this.pageList];
//         console.log('***Final display arra***');
//         console.log(this.pageList);
//     }


//     updateRecords(){ 
//         const start = (this.currentPage-1)*this.recordSize
//         const end = this.recordSize*this.currentPage
//         this.visibleRecords = this.totalRecords.slice(start, end)
//         this.dispatchEvent(new CustomEvent('update',{ 
//             detail:{ 
//                 records:this.visibleRecords
//             }
//         }))
//     }
// }











import { LightningElement ,api} from 'lwc';

export default class Pagination extends LightningElement {
    currentPage =1
    totalRecords
    @api recordSize = 5
    totalPage = 0
    get records(){
        return this.visibleRecords
    }
    @api 
    set records(data){
        if(data){ 
           // console.log('@@@@ contacts are '+JSON.stringify(data));
            this.totalRecords = data;
            // eslint-disable-next-line @lwc/lwc/no-api-reassignments
            this.recordSize = Number(this.recordSize)
            this.totalPage = Math.ceil(data.length/this.recordSize)
            this.updateRecords()
        }
    }

    get disablePrevious(){ 
        return this.currentPage<=1
    }
    get disableNext(){ 
        return this.currentPage>=this.totalPage
    }
    previousHandler(){ 
        if(this.currentPage>1){
            this.currentPage = this.currentPage-1;
            this.updateRecords();
           // console.log('@@##'+JSON.stringify(this.records));
           // console.log('@@visibleRecords##'+JSON.stringify(this.visibleRecords));
        }
    }

    first(){
        this.currentPage=1;
        this.updateRecords();
    }
    second(){
        this.currentPage=2;
        this.updateRecords();
    }
    third(){
        this.currentPage=3;
        this.updateRecords();
    }
    fourth(){
        this.currentPage=4;
        this.updateRecords();
    }
    fifth(){
        this.currentPage=5;
        this.updateRecords();
    }
    six(){
        this.currentPage=6;
        this.updateRecords();
    }
    seven(){
        this.currentPage=7;
        this.updateRecords();
    }
    eight(){
        this.currentPage=8;
        this.updateRecords();
    }
    nine(){
        this.currentPage=9;
        this.updateRecords();
    }
    ten(){
        this.currentPage=10;
        this.updateRecords();
    }

    nextHandler(){
        if(this.currentPage < this.totalPage){
            this.currentPage = this.currentPage+1;
            this.updateRecords();
           // console.log('@@##'+JSON.stringify(this.records));
           // console.log('@@visibleRecords##'+JSON.stringify(this.visibleRecords));

        }
    }
    updateRecords(){ 
        const start = (this.currentPage-1)*this.recordSize
        const end = this.recordSize*this.currentPage
        this.visibleRecords = this.totalRecords.slice(start, end)
        this.dispatchEvent(new CustomEvent('update',{ 
            detail:{ 
                records:this.visibleRecords
            }
        }))
    }
}
