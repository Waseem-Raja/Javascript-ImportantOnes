// Async/await
// There’s a special syntax to work with promises in a more comfortable
//  fashion, called “async/await”. It’s surprisingly easy to understand and use.

// Let’s start with the async keyword. 
// It can be placed before a function, like this:

async function f() {
    return 1;
}
// The word “async” before a 
// function means one simple thing: a function always
//  returns a promise. Other values are wrapped in a resolved promise automatically.

// For instance, this function returns a resolved promise with the result of 1; let’s test it:
/*
async function f() {
  return 1;
}

f().then((value)=>{
    console.log(value); // 1
}); 
*/
// …We could explicitly return a promise, which would be the same:

//Await:
// The keyword await makes JavaScript
//  wait until that promise settles and returns its result.
/*
async function f1() {

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 1000)
    });

    let result = await promise; // wait until the promise resolves (*)

    console.log(result); // "done!"
   
}

f1();
*/
//The function execution “pauses” at the line (*) and resumes when the promise settles, 
//   with result becoming its result. So the code above shows “done!” in one second.

//i can return the result and handle it then like this
/*
async function f2() {

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 1000);
    });

    let result = await promise; // wait until the promise resolves (*)

    return result;
}

f2().then((value)=>{
    console.log(value); // 1
}); 
*/

//example one
/*
let pro1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(10);
    }, 2000)
})

async function addTip() {

    let bill = 1000;

    let tip = await pro1; //halt execution of this function until pro1 promise is resolved

    //these lines won't  get executed until the promise gets fulfilled:

    let total = bill + tip;

    return total;


}

addTip().then((total) => {
    console.log("total bill(including tip) : " + total);
})
*/


//use of try catch


//now what if  promise gets rejected 

let pro2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve(10);
        reject(new Error);
    }, 2000)
})

async function addTip2() {

    try {
        let bill = 1000;

        let tip = await pro2; //halt execution of this function until pro1 promise is resolved

        let total = bill + tipp;

        return total;
    } catch (err) {
          console.log(err);
    }




}

addTip2().then((total) => {
    console.log("total bill(including tip) : " + total);
});