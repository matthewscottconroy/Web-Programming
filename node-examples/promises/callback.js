function example(name, f){
  console.log("We are inside the example function");
  console.log(name);
  f();
  return;
}

function myCallback(){
    console.log("The callback is called");
}


console.log("The program has started");
example("Godzilla", myCallback);
console.log("The program has ended");
