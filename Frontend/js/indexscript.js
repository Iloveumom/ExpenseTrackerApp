
let currentPage = 1; 
window.addEventListener("DOMContentLoaded", () => {
    loadExpenses(currentPage);
});
async function loadExpenses(page) {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:4000/expenses/getExpenses?page=${page}`, {
            headers: {
                Authorization:token  
            }
        });
        const expensesContainer = document.querySelector(".expense-list");
        expensesContainer.innerHTML = ""; // purani expenses clear
        response.data.data.forEach(expense => {
            display(expense); // aapka display function
        });
        renderPagination(response.data.page, response.data.totalPages);
    } catch (error) {
        console.log("Error fetching expenses:", error);
    }
}

function renderPagination(current, totalPages) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    // Previous button
    const prevBtn = document.createElement("button");
    prevBtn.innerText = "Previous";
    prevBtn.disabled = current === 1;
    prevBtn.onclick = () => {
        currentPage--;
        loadExpenses(currentPage);
    };
    pagination.appendChild(prevBtn);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.innerText = i;
        pageBtn.disabled = i === current;
        pageBtn.onclick = () => {
            currentPage = i;
            loadExpenses(currentPage);
        };
        pagination.appendChild(pageBtn);
    }

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.innerText = "Next";
    nextBtn.disabled = current === totalPages;
    nextBtn.onclick = () => {
        currentPage++;
        loadExpenses(currentPage);
    };
    pagination.appendChild(nextBtn);
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
  console.log(document.querySelector('.expense-list'));
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
