# Vue Factory

### Getting Started
Simply```npm start``` and it'll automatically launch your web browser, showing your super-basic vue application.

### Vue Components
For better readability and organization, we're using ```.vue``` files to define our Vue Components. What's great about our ```.vue``` files, is that they encapsulate our html, localized css, and relevant scripting around that one component.

### Vue Routes
Check out ```app/vue.js``` to see your Vue application routes. 

### Vuex Data Store
Vue has something called Vuex that serves as its data store. (In Angular terms, this is the closest thing you'll get to services.) Vuex is the way to keep stateful information and data with your Vue application, and we've provided a super basic example in this project. 

Once you've ```npm start``` your project, simply navigate to http://localhost:8080/#/items and you'll see Vuex in action. Also stemming from ```app/vue.js```, you'll see that we're loading our ```app/store-items.js``` file that defines our items Vuex object that our ```app/items.vue``` Vue Component is then accessing.

Happy coding! HQ
