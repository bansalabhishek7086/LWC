import { LightningElement,api } from 'lwc';

export default class ChildComp2 extends LightningElement {
    @api counter=0 ;
    @api maximizeCounter(){
        this.counter+=100;
        this.dispatchEvent( new CustomEvent( 'pass', {
            detail: this.counter 
        } ) );
    }
    
    // handleChildCount(){
    //     this.dispatchEvent(new CustomEvent('count'));
    // }
    
}