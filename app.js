document.getElementById('button1').addEventListener('click',getText());
document.getElementById('button2').addEventListener('click',getJsonText());
document.getElementById('button3').addEventListener('click',getExtJsonText());

// fetch text 
function getText(){
    if (confirm('sure')){

    fetch("text.txt")
        .then((res)=>{
            // console.log(res);
            return res.text();
        }).then((data)=>{
            // console.log(data);
            document.getElementById('output').innerHTML= data;
        }).catch((err)=>{
            console.log(err)
        })
    }

}
// fetch JSON
function getJsonText(){
    fetch('aray.json')
    .then((res)=>{
        return res.json();
    }).then((data)=>{
        let output = '';
        data.forEach(element => {
            output += `<li>${element.body}</li>`;
        });
        document.getElementById('output').innerHTML = output;
    })
}
// fetch external api
function getExtJsonText(){
    fetch('https://api.github.com/users')
    .then((res)=>{
        return res.json();
    }).then((data)=>{
        let output = '';
        data.forEach(element => {
            output += `<li>${element.login}</li>`;
        });
        document.getElementById('output').innerHTML = output;
    })
}