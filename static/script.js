const api = "https://engineering-task.elancoapps.com/api/";
const api_applications = api + "applications/";
const api_raw = api + "raw/";
const api_resources = api + "resources/";
  


// Defining async function
async function getdata(url) {
    
    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
    
    return data
}

async function show_data(data) {
    //tabs variable is to show all the data inside table and trends is to show trends inside a table e.g max cost, min cost
    trend = `<tr>
    <th>Total Cost</th>
    <th>Max Cost</th>
    <th>Min Cost</th>
    <th>Average Cost</th>
    <th>Total Consumed Quantity</th>
    </tr>`

    //returns all the keys of the object
    let key = Object.keys(data[0]);
    let total = data.length
    let totalCost = 0, maxCost = data[0][key[1]], minCost = data[0][key[1]], averageCost = 0, totalConsumed = 0
    let tab = `<tr><th>S.no</th>`

    for(let i of key){
        if(i=="Tags"){
            tab += `<th> Tags: {${Object.keys(data[0].Tags)}}</th>`
            continue
        }
        tab += `<th> ${i} </th>`
    }      
    tab += `</tr>`;

    //loop through the entire object 
    for (let r=0; r < data.length ; r++) {
        tab += `<tr><td>${r+1}</td>`   
        for(let i=0; i<key.length; i++){  
            if(key[i] == "Tags"){
                tab += `<td>${Object.values(data[r][key[i]])}</td>`
                continue
            }
            tab += `<td>${data[r][key[i]]}</td>`;
        }
        tab+=`</tr>` 

        //convert the string to a float
        let cost = parseFloat(data[r][key[1]])
        totalCost += cost
        if(cost < minCost){
            minCost = cost
        }
        if(cost > maxCost){
            maxCost = cost
        }
        totalConsumed += parseFloat(data[r][key[0]])
        
    }
    averageCost = totalCost / total
    
    trend += `<tr>
    <th>${totalCost}</td>
    <th>${maxCost}</td>
    <th>${minCost}</td>
    <th>${averageCost}</td>
    <th>${totalConsumed}</td>
    </tr>`

    // Setting innerHTML as tab and trends variable 
    document.getElementById("trends").innerHTML = trend
    document.getElementById("tab").innerHTML = tab; 
}


async function show_raw(){
    const data = await getdata(api_raw)
    show_data(data)
}

async function show_applications(){
    const data = await getdata(api_applications)
    let tab = `<tr><th>S.no</th> <th>Application Names</th></tr>`
    let j=0
    for(let i in data){
        tab += `<tr> <td>${j+1}</td> <td><button class="btn btn-outline-light" onClick="setApiApp(this)">${data[i]}</button></td> </tr>`
        j += 1
    }
    document.getElementById("applications").innerHTML = tab; 
}


async function show_resources(){
    const data = await getdata(api_resources)
    let tab = `<tr><th>S.no</th> <th>Resource Names</th></tr>`
    let j=0
    for(let i in data){
        tab += `<tr> <td>${j+1}</td> <td><button class="btn btn-outline-light" onClick="setApiRes(this)">${data[i]}</button></td> </tr>`
        j += 1
    }
    document.getElementById("resources").innerHTML = tab; 
}

//get the input from user and concatenates it with the address and then transfers it to appName.html file (will run when user searches for application name)
async function getApp(){
    const userInput = document.getElementById("app").value
    if(userInput == ""){
        return 0
    }
    const newapi = api_applications + userInput
    localStorage.setItem("data",newapi);
    window.location.href = "./appName.html";
}

//get the input from user and concatenates it with the address and then transfers it to resource.html file 
function getRes(){
    const userInput = document.getElementById("res").value
    if(userInput == ""){
        return 0
    }
    const newapi = api_resources + userInput
    localStorage.setItem("data",newapi);
    window.location.href = "./resourceName.html";
}


async function show_(){
    const newapi = localStorage.getItem("data") 
    const data = await getdata(newapi)
    
    show_data(data)
}

// there are buttons inside the tables on home screen theses 2 function will run when the buttons are clicked
// this will just append the value of address with the link that user clicked on
function setApiApp(a){
    const newapi = api_applications + a.innerHTML 
    localStorage.setItem("data",newapi);
    window.location.href = "./appName.html";
}


function setApiRes(a){
    const newapi = api_resources + a.innerHTML 
    localStorage.setItem("data",newapi);
    window.location.href = "./resourceName.html";
}