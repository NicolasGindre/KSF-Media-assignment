# Installation

Install node and npm

Clone or download the project
```shell
git clone https://github.com/NicolasGindre/KSF-Media-assignment.git
```

Go to the root directory
```shell
cd KSF-Media-assignment
```

Install the dependencies
```shell
npm install
```

Then you can launch the server with
```shell
node index.js
```

Access http://127.0.0.1:3000/article/dede0629-79d6-456e-ab0a-dfbf9e836763 to see it works.

# Comments

The idea was to keep this as minimal as possible. Even though it would have been a very good idea to use a client framework like React or Vue, I didn't do it here because I do not know if the person evaluating this knows about Vue, and I did not want to spend too much time learning about React just for this project. The advantage is that there are very few dependencies used, and that it is easy to understand the project.

The dependencies I used are :
 - Express : the most used Node.js framework. I chose it because it is very stable and I know it.
 - Axios : a good HTTP client
 - cookie-parser : required for parsing cookie.

I did not use the persona and lettera clients because there was an error when I tried to use them (self is not defined). It was anyway not difficult to make my own api to communicate with these apis.

We set up 4 routes for our application to work :
 - POST /login Requires username and password in the body. It will set cookies in the answer with the token and other user informations : uuid, firstName and lastName.
 - DELETE /login This deletes the token in the persona API. It will set the same cookies with a max-age of 0 so that they are deleted in the browser. 
 - GET /article/:uuid Returns the base html view with the js script and css. 
 - GET /article/:uuid/ Returns the data of an article as JSON.

There is no processing of the views at all on the server side. The server is simply returning the static skeleton of our view, then the client asks for the article data which the server gives, and finally the client processes the data and turns it into html. Doing it that way makes our application scale better.

For the design, I did not want to spend hours on it just to make something still buggy. I could have used Bulma which is a framework I know and make something decent. But since I think (at least I hope !) it is not the purpose of this exercise to make a good design, I simply copied the css files from the hbl.fi website (article.css, main.css and critical.css) and applied the same classes in my application than in hbl.fi. That way it was much faster to make something looking good because I just had to follow and copy what was done. I also used the w3css framework just for the top bar and some css of my own for the login overlay in style.css. The downside of it is that it is very messy and most of what we copied is useless. But a proper solution would anyway use a client framework which would also change the way we design things.
