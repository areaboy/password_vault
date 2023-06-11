# Password Vault

A Chrome Extension app that allows **Users, Teams,Organizations etc.** to securely store and manage their various Login Passwords Credentials across various Sites, Platforms etc. all in one Place powered by **Pangea Authn and Vault API** respectively.
 

# How To Test the Application:

The application contain 2 major folder.  The main folder **password_vault** which contains php backend Codes and **Chrome_password_vault** which is located inside the main application folder.  The **Chrome_password_vault**  folder is the chrome Extension front end



# Setting Chrome Extension Front End


1.) Once You Download the Code from Github, copy **chrome_password_vault** folder which contains frontend Chrome Extension Codes to any folder/directory of your choice.

At **chrome_password_vault** folder. goto **script** folder, then open **app_script.js** and edit the web URL(Eg. http://localhost/password_vault/) in each Jquery-Ajax Code 
to ensure it points to the actual php backend Codes based on your site URL.

2.) open chrome browser. goto **Manage Extension --Click on Load Unpacked --> Select chrome_password_vault** folder. Ensure that its loaded properly. You will see
the Chrome extension app(**password_vault**) within the Chrome Extension Dashboard


Alternatively,You can go directly to Chrome extension Page/dashboard by typing **chrome://extensions/** at the chrome browser url


 # Setting up backend was written in PHP etc.



3.)You will need to install **Xampp Server**. After installation, ensure that **Apache Server** has been started and Running from Xampp Control Panel.


4.) copy main application folder **password_vault** which contains the backend Code to **htdocs** of the Xammp server. Eg. **C:\xampp\htdocs\password_vault**



5.) Edit **Settings.php** to update your **Pangea Authn and Vaults  Access Token**  where appropriates and you are done with backend.  Its is time to test the app.


6.) Callup the Chrome Browser, Locate Chrome Extension Icon and click on **Password Vault** Apps on Chrome and application will start running. Thanks.. 





Just a Tip.

# How I Integrate Pangea Authn and Vault API respectively within Password Vault System

1.) Signup Form/Create User leverages Pangea Authn Intel -->Create User API.

https://pangea.cloud/docs/api/authn#create-user

2.) Login System leverages Pangea Authn Intel --> Login Password API.

https://pangea.cloud/docs/api/authn#login-with-a-password

3.) Reset Password System leverages Pangea Authn Intel --> Password Reset and Get User API.

https://pangea.cloud/docs/api/authn#get-user

https://pangea.cloud/docs/api/authn#password-reset

4.) Create New Password Vault leverages Pangea Vault Intel ---> Secret Store API

https://pangea.cloud/docs/api/vault#import-a-secret

5.) List Password Vault Data leverages Pangea Vault Intel ---> List API

https://pangea.cloud/docs/api/vault#list

6.)Retrieve Password Vault Secret leverages Pangea Vault Intel ---> Retrieve API

https://pangea.cloud/docs/api/vault#retrieve

7.)Delete Password Vault data leverages Pangea Vault Intel ---> Delete API

https://pangea.cloud/docs/api/vault#delete





