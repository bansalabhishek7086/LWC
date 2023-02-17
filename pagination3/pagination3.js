import { LightningElement,api } from 'lwc';

export default class pagination3 extends LightningElement {
    
    @api pageSize ;
    @api noOfTotalPages;
    totalRecordsCount = 0;
    pageList = [] ;
    index = 0;
    clickedPage = 1;
    totalPages = 0;
    pagesDynamic = 10;
    pagesShown = this.pagesDynamic ;
    disableRightArrow = false ;
    disableLeftArrow = false ;

    connectedCallback(){
        this.disableLeftArrow = true ;
        if(this.totalRecordsCount && this.pageSize){
            console.log('this.totalRecordsCount  = >> '+this.totalRecordsCount);
            console.log('this.pageSize  ==>>  '+this.pageSize);

            this.totalPages = Math.ceil(Number(this.totalRecordsCount)/Number(this.pageSize));
            console.log('@@##total pages are : ' + this.totalPages);
            let default_list=[];

            if(this.totalPages<=this.pagesShown){
                for(let i=1;i<=this.totalPages;i++){
                    default_list.push(i);
                }
                this.pageList = default_list ;
                this.disableRightArrow = true ;
            }
            else{
                for(let i=1; i<=this.pagesShown; i++){
                    default_list.push(i);
                }
                this.pageList = default_list ;
            }
            // let pgl_default = this.totalPages > 10 ? [1,2,3,4,5,6,7,8,9,10] : default_list;
            // this.pageList = pgl_default;
        }
    }


    renderedCallback(){
        this.changeColorOnClick();
    }

    changeColorOnClick(){
        this.template.querySelectorAll('lightning-button').forEach(e=>{
            if(Number(e.label) === this.clickedPage){
                e.classList.add('currentpage');
                e.blur();
            }else{
                e.classList.remove('currentpage');
            }
        });
    }


    @api 
    get totalrecords(){
        return this.totalRecordsCount;
    }
    
    set totalrecords(value){
        this.totalRecordsCount = value;
        this.connectedCallback();
    }

    get startrange(){
        return (((this.clickedPage-1)*this.pageSize)+1);
    }

    get endrange(){
        return ((this.pageSize*this.clickedPage));
    }


    handlePrevious(){
        console.log('------------------START-----prev---------------');
        console.log('pages shown are : '+this.pagesShown);

        this.pagesShown = this.pagesShown - this.pagesDynamic ;
            let decrement = this.pagesShown - this.pagesDynamic ;
            let prevArr = [];

            if(this.pagesShown <= this.totalPages){
                this.disableRightArrow = false ;
                console.log('Entered here in else ');
                console.log('Entered =>> this.pagesShown is ' + this.pagesShown);
                if(this.pagesShown === this.pagesDynamic){
                    console.log('Entered this.pagesShown === 10 ==>.  ');
                    this.disableLeftArrow = true ;
                }
    
                    for(let i=(decrement+1); i<=(this.pagesDynamic + decrement) ;i++){
                        console.log('Enterend in else condition ');
                        prevArr.push(i);
                    }
                    this.pageList = prevArr ;
                    this.clickedPage = prevArr[0];
                    this.dispatchPaginationevent();
                    console.log('new page list after previous click is  : ' + this.pageList);
            } 
    }


    handleNext(){
        console.log('------------------START---next-----------------');
        console.log('this.pageList arr is : ' +this.pageList);
        console.log('this.pageList arr length  is : ' +this.pageList.length);
        console.log('this.totalPages  are  : ' +this.totalPages);
        console.log('this.noOftotalPages  are  : ' +this.noOfTotalPages);


            this.pagesShown = this.pagesShown + this.pagesDynamic ;
            let incremnt = this.pagesShown - this.pagesDynamic ;
            let nextArr = [];

        if(this.pagesShown <= this.totalPages){
            console.log('Enterend in if condition');
            if(this.pagesShown === this.totalPages){
                console.log('Entered in if inside if  condition');
                this.disableRightArrow = true ;
            }
                this.disableLeftArrow = false ;
            for(let i=(1+incremnt) ; i<=(this.pagesDynamic+incremnt) ; i++){
                nextArr.push(i);
            }
                this.pageList = nextArr;
                this.clickedPage = nextArr[0];
                this.dispatchPaginationevent();
                console.log('new page list after next click is  : ' + this.pageList);
        }
        else{
            console.log('Enterend in else condition');
            this.disableLeftArrow = false ;
            this.disableRightArrow = true ;

            for(let j=(1+incremnt) ; j<=this.totalPages ; j++){
                nextArr.push(j);
            }
            this.pageList = nextArr;
            this.clickedPage = nextArr[0];
            this.dispatchPaginationevent();
            console.log('new page list after next click in else condition is  : ' + this.pageList);
        }
        console.log('-------------------END----next----------------');
    }

    handleClick(event){
        console.log('------------------START Handle click--------------------');
        this.index = event.target.dataset.index;
        console.log('index is : ' + this.index);
        this.clickedPage = Number(event.target.label);
        console.log('clickedPage is : ' + this.clickedPage ); 
        this.dispatchPaginationevent();
        console.log('-------------------END Handle click--------------------');
    }

    dispatchPaginationevent(){
        this.dispatchEvent(new CustomEvent('pagination', {
                "detail": this.clickedPage,
                bubbles: true,
                composed: true
            }));
    }

}











//=========================================Important code ========================================================================================






// handlePrevious(){
    //     console.log('------------------START-----prev---------------');
    //     console.log('pages shown are : '+this.pagesShown);

    //     this.pagesShown = this.pagesShown - 10 ;
    //         let decrement = this.pagesShown - 10 ;
    //         let prevArr = [];

    //         if(this.pagesShown <= this.totalPages){
    //             this.disableRightArrow = false ;
    //             console.log('Entered here in else ');
    //             console.log('Entered =>> this.pagesShown is ' + this.pagesShown);
    //             if(this.pagesShown === 10){
    //                 console.log('Entered this.pagesShown === 10 ==>.  ');
    //                 this.disableLeftArrow = true ;
    //             }
    
    //                 for(let i=(decrement+1); i<=(10+decrement) ;i++){
    //                     console.log('Enterend in else condition ');
    //                     prevArr.push(i);
    //                 }
    //                 this.pageList = prevArr ;
    //                 this.clickedPage = prevArr[0];
    //                 this.dispatchPaginationevent();
    //                 console.log('new page list after previous click is  : ' + this.pageList);
    //         } 
    // }

    // handleNext(){
    //     console.log('------------------START---next-----------------');
    //     console.log('this.pageList arr is : ' +this.pageList);
    //     console.log('this.pageList arr length  is : ' +this.pageList.length);
    //     console.log('this.totalPages  are  : ' +this.totalPages);

    //         this.pagesShown = this.pagesShown + 10 ;
    //         let incremnt = this.pagesShown - 10 ;
    //         let nextArr = [];

    //     if(this.pagesShown <= this.totalPages){
    //         console.log('Enterend in if condition');
    //         if(this.pagesShown === this.totalPages){
    //             console.log('Enterend in if inside if  condition');
    //             this.disableRightArrow = true ;
    //         }
    //             this.disableLeftArrow = false ;
    //         for(let i=(1+incremnt) ; i<=(10+incremnt) ; i++){
    //             nextArr.push(i);
    //         }
    //             this.pageList = nextArr;
    //             this.clickedPage = nextArr[0];
    //             this.dispatchPaginationevent();
    //             console.log('new page list after next click is  : ' + this.pageList);
    //     }
    //     else{
    //         console.log('Enterend in else condition');
    //         this.disableLeftArrow = false ;
    //         this.disableRightArrow = true ;

    //         for(let j=(1+incremnt) ; j<=this.totalPages ; j++){
    //             nextArr.push(j);
    //         }
    //         this.pageList = nextArr;
    //         this.clickedPage = nextArr[0];
    //         this.dispatchPaginationevent();
    //         console.log('new page list after next click in else condition is  : ' + this.pageList);
    //     }
    //     console.log('-------------------END----next----------------');
    // }











//=========================================Important code ========================================================================================


