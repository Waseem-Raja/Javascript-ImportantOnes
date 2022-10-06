// Topic: callback function's

//Look at Scenerio first

// function A() {
//     console.log("hello");
// }

// function B() {
//     console.log("world");
// }


//calling
// A();
// B();

//output : hello world

//now look at scenerio second

// function A() {

//     setTimeout(function () {    
//         console.log("hello");
//     }, 3000);

// }

// function B() {
//     console.log("world");
// }

//calling 
// A();
// B();
//output: 'world' then after three seconds 'hello'

//this is known as asynchronous execution here javascript does't wait for the function 
//A to finish its execution and then starts the execution of function B 
//as js is an event driven language that is, instead of waiting for a response from function A
//it will keep executing while listening for other events


//now whats the solution to it ya you know it (Callback), callbacks are a way to make
//sure certein code does't execute until other code has already finished execution

//Callback: A callback is a function that is passed as an argument to another 
// function and is to be executed after another function has finished execution

//now the above code using callback


function A(callback) {     //Reciving function as an argument

    setTimeout(function () {    
        console.log("hello");
        callback();             //calling the function which is passed as an argument
    }, 3000);
  

}

function B() {
    console.log("world");
}

//calling 
A(B);   //passing function B as an argument to function A

//output:  hello world



//to understand callbacks in a better way look at  the below stuff
/*
Asynchronous callbacks
An asynchronous callback is executed after the execution of the high-order function that uses the callback.

Asynchronicity means that if JavaScript has to wait for an operation to complete, it will execute the rest of the code while waiting.

Note that JavaScript is a single-threaded programming language. It carries asynchronous operations via the callback queue and event loop.

Suppose that you need to develop a script that downloads a picture from a remote server and process it after the download completes:
*/
function download(url) {
    // ...
}

function process(picture) {
    // ...
}

download(url);
process(picture);

// However, downloading a picture from a remote server takes time depending on the network speed and the size of the picture.

// The following download() function uses the setTimeout() function to simulate the network request:

function download(url) {
    setTimeout(() => {
        // script to download the picture here
        console.log(`Downloading ${url} ...`);
    },1000);
}

// And this code emulates the process() function:

function process(picture) {
    console.log(`Processing ${picture}`);
}

// When you execute the following code:

let urll = 'https://www.javascripttutorial.net/pic.jpg';

download(urll);
process(urll);

// you will get the following output:

// Processing https://javascripttutorial.net/pic.jpg
// Downloading https://javascripttutorial.net/pic.jpg ...
/*
This is not what you expected because the process() function executes before the download() function. The correct sequence should be:

Download the picture and wait for the download completes.
Process the picture.
To resolve this issue, you can pass the process() function to the download() function and execute the process() function inside the download() function once the download completes, like this:
*/
function download(url, callback) {
    setTimeout(() => {
        // script to download the picture here
        console.log(`Downloading ${url} ...`);
        
        // process the picture once it is completed
        callback(url);
    }, 1000);
}

function process(picture) {
    console.log(`Processing ${picture}`);
}

let url = 'https://wwww.javascripttutorial.net/pic.jpg';
download(url, process);

// Output:

// Downloading https://www.javascripttutorial.net/pic.jpg ...
// Processing https://www.javascripttutorial.net/pic.jpg

// Now, it works as expected.
/*
In this example, the process() is a callback passed into an asynchronous function.

When you use a callback to continue code execution after an asynchronous operation,
 the callback is called an asynchronous callback.*/


 /*
Summary
A callback is a function passed into another function as an argument to be executed later.
A high-order function is a function that accepts another function as an argument.
Callback functions can be synchronous or asynchronous.

Nesting callbacks and the Pyramid of Doom:
How do you download three pictures and process them sequentially? A typical approach is to call the download() function inside the callback function, like this:
*/
function download(url, callback) {
  setTimeout(() => {
    console.log(`Downloading ${url} ...`);
    callback(url);
  }, 1000);
}

const url1 = 'https://www.javascripttutorial.net/pic1.jpg';
const url2 = 'https://www.javascripttutorial.net/pic2.jpg';
const url3 = 'https://www.javascripttutorial.net/pic3.jpg';

download(url1, function (url) {
  console.log(`Processing ${url}`);
  download(url2, function (url) {
    console.log(`Processing ${url}`);
    download(url3, function (url) {
      console.log(`Processing ${url}`);
    });
  });
});

// Output:

// Downloading https://www.javascripttutorial.net/pic1.jpg ...
// Processing https://www.javascripttutorial.net/pic1.jpg
// Downloading https://www.javascripttutorial.net/pic2.jpg ...
// Processing https://www.javascripttutorial.net/pic2.jpg
// Downloading https://www.javascripttutorial.net/pic3.jpg ...
// Processing https://www.javascripttutorial.net/pic3.jpg

// The script works perfectly fine.

// However, this callback strategy does not scale well when the complexity grows significantly.

// Nesting many asynchronous functions inside callbacks is known as the pyramid of doom or the callback hell:

/*
asyncFunction(function(){
    asyncFunction(function(){
        asyncFunction(function(){
            asyncFunction(function(){
                asyncFunction(function(){
                    ....
                });
            });
        });
    });
});
*/

// To avoid the pyramid of doom, you use promises or async/await functions.
