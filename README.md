My Simple Nestjs RestAPI Server - using Guard to Authorization user  

# Entry point 1: /product

## GET request: /public:
return public content
## GET request: /protected:
return private content of userID, must provide header {Authorization:"Bearer _token_"}, if not will block and return 403 http code


# Entry point 2: /auth

## POST request: /register
Provide JSON :{ name, username, password } to create new user, return 204 HTPP code
## POST request: /login
Provide JSON :{  username, password } to login, return token to access protected content

# Entry point 3: /user

## GET request: /:username
return username info (not in real world app)
