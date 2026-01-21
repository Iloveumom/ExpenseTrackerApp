// const token = localStorage.getItem("token");

// if (!token) {
//   alert("Please login first");
//   window.location.href = "login.html";
// }
initilize();
async function initilize()
{
  try
  {
      const token = localStorage.getItem("token");
   
    const response=await axios.get("http://localhost:4000/expenses/getExpenses", {
      headers: {
        Authorization:token   
      }
    })
    
      console.log(response.data);
      response.data.data.forEach(expense => {
        display(expense);
      });
  } 
  catch(error) 
  {
      console.log(error);
  }
}
async function addExpense(event)
{
  try
  {
    event.preventDefault();
    const amount = event.target.amount.value;
    const desc = event.target.description.value;
    const category = event.target.category.value;
    if(!amount || !desc || !category){
        alert("All fields required");
        return;
    }
    let data={
      amount,description:desc,category
    }
    const token = localStorage.getItem("token");
    const response=await axios.post("http://localhost:4000/expenses",data, {
      headers: {
        Authorization:token   
      }})
    //console.log(response);
    const msg=document.getElementById("Msg");
    msg.innerText =response.data.message;
    msg.style="color:green";
    display(data);
     event.target.reset();
    //document.getElementById("signupForm").reset();
    //alert("Expense add successs");
    }
    catch(err)
    {
        console.log(err);
        if(err.response.data.message)
        {
          const msg=document.getElementById("Msg");
          msg.innerText =err.response.data.message;
          msg.style="color:red";
        }
        else
        {
          alert("server error");
        }
      
    //console.log(error.response.data.message);
     //const msg=document.getElementById("Msg");
     //msg.innerText =error.response.data.message
     //msg.style="color:red";
     //document.getElementById("loginForm").reset();
  }

   
   
}
function display(data)
{
  
    const li = document.createElement('li');

    li.innerHTML = `
        <div class="expense-row">
            <span class="expense-amount-text">₹${data.amount}</span>
        </div>

        <div class="expense-desc-text">
            ${data.description}
        </div>

        <div class="expense-category-text">
            <strong>${data.category}</strong>
        </div>
         <button class="expense-delete">Delete</button>
    `;

    li.querySelector('.expense-delete').onclick = () => {
        deleteExpense(li,data.id);
    };

    document.querySelector('.expense-list').appendChild(li);

}
async function deleteExpense(li, id)
{
   try
   {
            const token = localStorage.getItem("token");
            const res=await axios.delete(`http://localhost:4000/expenses/${id}`,{
              headers: {
                Authorization:token   
              }
            })
        
            if (res.data.success) {
                li.remove();   // direct remove
                const msg=document.getElementById("Msg");
                 msg.innerText =res.data.message;
            } else {
                alert("Delete failed");
            }
  }
  catch(err){
            console.error(err.message);

            alert("Server error");
  };
}
//showLeaderBoard
async function showLeaderBoard() {
    try{
      const res=await axios.get("http://localhost:4000/premium/showLeaderboard")
      if (res.data.success) {
        const leaderboard = document.getElementById("leaderboard");
        // keep heading, remove old rows
        leaderboard.innerHTML = `
          <li class="heading">
            <span>Name</span>
            <span>Total Amount</span>
          </li>
        `;
        res.data.data.forEach((user) => {
          const li = document.createElement("li");

          li.innerHTML = `
            <span>${user.name}</span>
            <span>₹${user.total_expense}</span>
          `;

          leaderboard.appendChild(li);
        });
      } else {
        console.log("No data");
      }
    }
    catch(err) {
      console.error(err);
      alert("Server error");
    }
}
//Ai genrate category
async function findCategoryByAi(event)
{
  try{
    let data={description:event.target.value};
    const res=await axios.post("http://localhost:4000/Ai/getCategoryByAi",data)
    
      if(res.data.answer)
      {
        document.getElementById("category").innerHTML=res.data.answer;
        console.log(res.data.answer);
      }
    } 
    catch(err) 
    {
      console.error(err);
       document.getElementById("category").innerHTML=` 
                <option value="">Select Category</option>
                    <option>Food</option>
                    <option>Oil</option>
                    <option>Travel</option>
                    <option>Shopping</option>
                    <option>Other</option>`;
     // alert("Server error");
    }
}
