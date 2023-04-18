import { LightningElement } from 'lwc';
import LoginUser from '@salesforce/apex/LoginUser.login';

export default class AmazonClone extends LightningElement {


email;
password;
isError = false ;
errorMessage='';

    handleUsername(event){
        this.email=event.target.value ;
    }

    handlePassword(event){
        this.password=event.target.value ;
    }

    handleLogin(){
        console.log("Inside login");
        console.log("Email :"+this.email);
        console.log("Password :" +this.password);

        if(this.email!=null && this.password!=null){
            LoginUser({userName:this.email,password:this.password}).then((result)=>{
                this.isError=false ;
                console.log('Result is :' + result);
            })
            .catch((error)=>{
                console.log('Error is : '+error);
                this.isError=true ;
                this.errorMessage = error.body.message ;
            })
        }
     
    }

}