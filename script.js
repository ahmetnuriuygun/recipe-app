const mealsContainer = document.querySelector(".meals")
const mealsInput = document.querySelector(".input")
const mealsButton = document.querySelector(".button")
let mealsList = []



const getMeals = async (meals)=> {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    if(!res.ok){
        throw new Error(`${res.status}`);
        document.querySelector(".meals").innerHTML = 
        `
        <img src="./404.png" alt="error-image">
        <h3>Oops! Something is wrong </h3>
        `
    }
    const data = await res.json()
    
    mealsList = await data;
    console.log(data.meals);
    
    updateScreen(data.meals);
}
getMeals("Kumpir")

const updateScreen=(info)=>{
     
    mealsContainer.innerHTML = ""

    info.forEach((w)=>{
        mealsContainer.innerHTML += 
       `
        <div class="col-md-3 m-4 border border-1">
        <img class="malzeme" style=width:320px  src=${w.strMealThumb} class="card-img-top" >
        <h3  >${w.strMeal}</h3>
        <a href=${w.strSource} target="_blank"  class="btn btn-warning">Show Detail</a>
        
        </div>
        `
    })
  
    
} 



mealsInput.oninput=(letter)=>{
    var text = letter.target.value.toLowerCase();
    var data2 = mealsList.meals.filter((w)=>w.strMeal.toLowerCase().includes(text))
    // console.log(data2);
    updateScreen(data2)
}

const areas = [{
     turkey: "Turkish", india: "Indian", france : "French", canada: "Canadian", abd: "American"
}]

for(let i in areas[0]){
    document.getElementById(i).onclick=()=>{

        fetch( `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areas[0][`${i}`]}`)
        .then((resp)=>resp.json())
        .then((data)=>{
            mealsList = data
            updateScreen(data.meals)
        })
    }
}



