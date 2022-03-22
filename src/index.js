const {boot} = require("./boot");

const app = boot();

app.listen(3000, ()=>{
    console.log("IS STARTING");
})