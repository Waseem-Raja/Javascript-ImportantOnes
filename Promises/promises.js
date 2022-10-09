// Topic: Promises

//Promise is a special js object.

//below mentioned link  was so helpfull 
//https://www.freecodecamp.org/news/javascript-promise-tutorial-how-to-resolve-or-reject-promises-in-js/


//lets start now
/*
What is a Promise in JavaScript?
A Promise is a special JavaScript object. It produces a value 
after an asynchronous (aka, async) operation completes successfully, 
or an error if it does not complete successfully due to time out, network
 error, and so on.

Successful call completions are indicated by the resolve function 
call, and errors are indicated by the reject function call.

You can create a promise using the promise constructor like this:
*/


//producing
/*
let promise = new Promise(function (resolve, reject) { //this argument function is called as executor function
    // Make an asynchronous call and either resolve or reject

    //Note: A Promise executor should call only one resolve or one reject.if we still write some resolve or reject in it they will be ignored
    // resolve("i am done");
    reject(new Error("something went wrong"));
});

//.then is a method(Handler ) that gets executed if promis gets fulfilled 
//consuming
promise.then(
    (value) => {
        console.log(value)
    },
    (error) => { //we can handle error's over here like this or using catch 
        console.log("error handled in .then using arrow function");
    }
).catch((error) => { //or using catch like this
    console.log("error handled using catch handler");
}).finally(console.log("i am finally "));*/
//we can use finally like this it
//will be executed irrespective if an error occure or promsie is resolved or rejected
/*A finally handler doesn’t get the outcome of the previous handler (it has no arguments). This outcome is passed through instead, to the next suitable handler.
If a finally handler returns something, it’s ignored.
When finally throws an error, then the execution goes to the nearest error handler.*/

// *if a promise is rejected or resolved, we say a promise is settled


//Promise states
/*
A promise object has the following internal properties:

1.    state – This property can have the following values:
         pending: Initially when the executor function starts the execution.
         fulfilled: When the promise is resolved.
         rejected: When the promise is rejected.


2.  result – This property can have the following values:

         undefined: Initially when the state value is pending.
         value: When resolve(value) is called.
         error: When reject(error) is called.
These internal properties are code-inaccessible but they are inspectable
*/


//some examples of how to use promises
/*
let success = false;

function getUsers() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve([{
                        username: 'john',
                        email: 'john@test.com'
                    },
                    {
                        username: 'jane',
                        email: 'jane@test.com'
                    },
                ]);
            } else {
                reject("something went wrong");
            }
        }, 1000);
    });
}


const hello=()=>{
    console.log("i am being called from finally method");
}

const promise = getUsers();
promise.then((users)=>{
    console.log(users);
}).catch((error)=>{
    console.log(error);
}).finally(()=>{ //Place the code that you want to execute 
                  //in the finally() method whether the promise is
                  //fulfilled or rejected.

    hello();
})*/


//Promise chaining
/*
The  promise.then() call always returns a promise. This promise will 
have the state as pending and result as undefined. It allows us to call
the next .then method on the new promise.
When the first .then method returns a value, the next .then method can 
receive that. The second one can now pass to the third .then() and so on. 
This forms a chain of .then methods 
to pass the promises down. This phenomenon is called the Promise Chain.


*/

//example
/* 
let success = true;

function getUsers() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve([{
                        username: 'john',
                        email: 'john@test.com'
                    },
                    {
                        username: 'jane',
                        email: 'jane@test.com'
                    },
                ]);
            } else {
                reject("something went wrong");
            }
        }, 1000);
    });
}


const hello = () => {
    console.log("i am being called from finally method");
}

const promise = getUsers();
promise.then((users) => {
        console.log(users);
        return users;
    }).then((finduser) => { //The .then method can return either:
        // A value (we have seen this already)
        //or  A brand new promise.
        if (finduser[0].username == 'john')
            console.log("john is present");
        else
            console.log("john is absent");
    })
    .catch((error) => {
        console.log(error);
    }).finally(() => { //Place the code that you want to execute 
        //in the finally() method whether the promise is
        //fulfilled or rejected.

        hello();
    })*/



//How to Handle Multiple Promises?

// Apart from the handler methods (.then, .catch, and .finally), there 
// are six static methods available in the Promise API. 
// The first four methods accept an array of promises and run them in parallel.
/*
Promise.all
Promise.any
Promise.allSettled
Promise.race
Promise.resolve
Promise.reject
*/

//01: 
// The Promise.all() method
// Promise.all([promises]) accepts a collection
//  (for example, an array) of promises as an argument and executes them in parallel.
// This method waits for all the promises to resolve and returns the array of promise results. If any of the promises reject or execute
//  to fail due to an error, all other promise results will be ignored

/*
let p1 = new Promise((resolve, reject) => {
    resolve("i am promise first");

})
let p2 = new Promise((resolve, reject) => {

    // resolve("i am promise second");


    reject("oops something went wrong");

})

Promise.all([p1, p2]).then((value) => { //execution depends here how you write promises in the collection
    console.log(value);

}).catch((error) => {
    console.log(error);
})
*/
/*
The Promise.any() method:-
Promise.any([promises]) - Similar to the all() method, .any()
 also accepts an array of promises to execute them in parallel. 
 This method doesn't wait for all
 the promises to resolve. It is done when any one of the promises is settled.
*/
//same example
let p3 = new Promise((resolve, reject) => {
    resolve("i am promise first");

})
let p4 = new Promise((resolve, reject) => {

    //now this promise will be resolved after two seconds and it will not be seen
    //in the output as the promise p3 will get executed before this one
    setTimeout(() => {
        resolve("i am promise second");
    }, 2000);

 

})

Promise.any([p4, p3]).then((value) => { //execution depends here how you write promises in the collection
    console.log(value);

}).catch((error) => {
    console.log(error);
})