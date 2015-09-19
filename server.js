var koa = require('koa');
// var lodash = require('lodash');

var app = koa();

app.use(function* (next) {
    //do something before yielding/passing to next generator function in line which will be 1st event in downstream
    console.log("A");
    yield next;

    // do something when the execution returns upstream, this will be last event in upstream
    console.log("B");
});

app.use(function* (next) {
    // do something before yielding/passing to the next generator function in line, this shall be 2nd event downstream
    console.log("C");

    yield next;

    // do something when the execution returns upstream and this would be 2nd event upstream
    console.log("D");
});

app.use(function* () { // do something before yielding/passing to next generator function in line. Here it would be last function downstream
    console.log("E");
    this.body = "hey guys";
    console.log("F"); // First event of upstream (from the last to first)

});

app.listen(3000);
