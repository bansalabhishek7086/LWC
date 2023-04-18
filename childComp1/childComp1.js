import { LightningElement } from 'lwc';

export default class ChildComp1 extends LightningElement {
    handleSubtract(){
        this.dispatchEvent(new CustomEvent('subtract'));
    }
    handleAdd(){
        this.dispatchEvent(new CustomEvent('add'));
    }
    handleMultiply(event){
        const valueForMultiply=event.target.value;
        this.dispatchEvent(new CustomEvent('multiply',{
            detail:valueForMultiply
        }));
    }
}