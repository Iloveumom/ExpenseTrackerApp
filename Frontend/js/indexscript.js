
let currentPage = 1; 
window.addEventListener("DOMContentLoaded", () => {
    const limitSelect = document.getElementById("limitSelect");

    // restore saved li
    const savedLimit = getLimit();
    limitSelect.value = savedLimit;
    limitSelect.addEventListener("change", () => {
        localStorage.setItem("expenseLimit", limitSelect.value);
        currentPage = 1;              // imp  edge fix
        loadExpenses(currentPage);
    });
    loadExpenses(currentPage);
});
async function loadExpenses(page) {
    try {
        const token = localStorage.getItem("token");
        const limit = getLimit();

        const response = await axios.get(
          `http://localhost:4000/expenses/getExpenses?page=${page}&limit=${limit}`,
          {
            headers: { Authorization: token }
          }
        );
           if (currentPage > response.data.totalPages) {
            currentPage = response.data.totalPages || 1;
            return loadExpenses(currentPage);
        }
        const expensesContainer = document.querySelector(".expense-list");
        expensesContainer.innerHTML = "";

        if (response.data.data.length === 0) {
            expensesContainer.innerHTML = "<li>No expenses found</li>";
            return;
        }

        response.data.data.forEach(expense => {
            display(expense);
        });

        renderPagination(response.data.page, response.data.totalPages);

    } catch (error) {
        console.log("Error fetching expenses:", error);
    }
}
function getLimit() {
  let limit = parseInt(localStorage.getItem("expenseLimit"));
  if (![5, 10, 20, 40].includes(limit)) {
    limit = 10; // default
  }
  return limit;
}function renderPagination(current, totalPages) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    if (totalPages <= 1) return; // 🔴 edge case

    const prevBtn = document.createElement("button");
    prevBtn.innerText = "Previous";
    prevBtn.disabled = current === 1;
    prevBtn.onclick = () => {
        currentPage--;
        loadExpenses(currentPage);
    };
    pagination.appendChild(prevBtn);

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
    await loadExpenses(currentPage);
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
                //li.remove();   // direct remove
                await loadExpenses(currentPage);
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



