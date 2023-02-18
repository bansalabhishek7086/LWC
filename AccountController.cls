public class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account>  getAccountList(){
         List<Account> accList=[select id ,name,Phone from Account];
        return accList ;
    }
}