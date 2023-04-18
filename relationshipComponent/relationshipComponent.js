import { LightningElement,track,api } from 'lwc';

export default class RelationshipComponent extends LightningElement {

    @track countvalue=0;
    handleDecrement(){
        this.countvalue -- ;
        //console.log('hello'+this.countvalue);
    }
    handleIncrement(){
      //  console.log('helloww '+countvalue);

        this.countvalue ++ ;
    }
    handleMultiply(event){
        const multiplyingNumber=event.detail;
        this.countvalue=multiplyingNumber*this.countvalue;
    }

    @api startCounter=0;
    handleStartChange(event){
        this.startCounter=parseInt(event.target.value);
    }
    handleMaximizeCounter(){
        // const updateCounter=this.template.querySelector('c-child-comp2');
        // updateCounter.maximizeCounter();
        this.template.querySelector('c-child-comp2').maximizeCounter();
    }

@track counterForChild ; 
        fetchValue(event){
            this.counterForChild=event.detail;
        console.log('helloo'+this.counterForChild);
    }
}