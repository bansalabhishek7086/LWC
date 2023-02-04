import { LightningElement , track} from 'lwc';

export default class HelloWorld extends LightningElement {
    
// variables ------------------>
@track Variable1 ='deepak' ;
functionVar ; 
 @track greeting ;
 @track showvar='show' ;
 @track showvar1='show' ;
@track expression1 =false;
@track expression2 =false;


 changeHandler(event) {
  this.greeting = event.target.value;
   //console.log((this.greeting));
  //console.log('convert into string ' +JSON.stringify(this.greeting));
}
handleClick(){
  // this.ArrayOfobject=event.target.label;
  console.log('hello');
   this.Variable1='name change to rahul kumar on click';
  console.log('output is '+this.ArrayOfobject);
  console.log('output is after string'+JSON.stringify(this.ArrayOfobject));
         this.function1();
}

handleClick1(event){
//this.showvar=event.target.label;
if(this.showvar==='show')
{
  this.showvar='hide';
  this.expression1=true;
}
else 
{
  this.showvar='show';
  this.expression1=false;
}
}
// variables ------------------------>
@track arr1=['abhi','bony','hello'];
handleClick2(){
  if(this.showvar1==='show')
{
  this.showvar1='hide';
  this.expression2=true;
}
else 
{
  this.showvar1='show';
  this.expression2=false;
}
}
function1()
{
   this.functionVar='i am calling by function1 on click button event ' ;
}


}