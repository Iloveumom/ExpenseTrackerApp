  
const token = localStorage.getItem("token");
window.onload = function ()
{
if(!token)
{
  window.location="login.html";
}
axios.get("http://localhost:4000/api/me", {
    headers: {
      Authorization:token
    }
  })
  .then(res => {
    const btn = document.getElementById("buyPremiumBtn");
  //  this.alert(res.data.isPremium);
    if (res.data.isPremium) {
      btn.innerText = "You are Premium User";
      btn.disabled = true;          // click disable
      btn.style.cursor = "default";
      document.querySelector(".premiumuser").innerHTML=`
    
      <button onclick="showLeaderBoard();" id="leaderbtn">Show LeaderBoard</button>
      <button onclick="download()" id="downloadexpense">Download File</button>
      `;
    } else {
      btn.innerText = "Buy Premium";
      
      btn.onclick = () => {
       buyPremiumBtn();
      };
    }
  })
  .catch((err) => {
    console.log(err);
    //location.href = "login.html";
  });
}

async function buyPremiumBtn()
{
 //const token = localStorage.getItem("token");

      try {
        const response = await axios.post("/payment/pay",{}, {
      headers: {
        Authorization:token   
      }});
        console.log(response.data.sessionId);
        const paymentSessionId = response.data.sessionId;
        
        if (!paymentSessionId) {
          alert("Payment session not created!");
          return;
        }

        const cashfree = Cashfree({ mode: "sandbox" });
        cashfree.checkout({
          paymentSessionId,
          redirectTarget: "_self"
        });

        
      } catch (error) {
        console.error(error);
        alert("Error creating payment session. Check console.");
      }
 


    
}

//showLeaderBoard
async function showLeaderBoard() {
    try{
   //   const token = localStorage.getItem("token");
  
      const res=await axios.get("http://localhost:4000/premium/showLeaderboard",{
      headers: {
    Authorization: token
  }});
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
      console.error(err.response.data.message);
      if(err.response.data.message)
      {
        alert(err.response.data.message)
      }
      else
      {
        alert("Server error");
      }
    }
}
async function download(){
  try
  {
    const response=await axios.get('http://localhost:4000/premium/download', { headers: {"Authorization" : token} })
    if(response.status === 201)
    {
            var a = document.createElement("a");
            a.href = response.data.fileUrl;
            a.download = 'myexpense.csv';
            a.click();
    } else 
    {
            throw new Error(response.data.message)
    }
  }
    catch(err)
    {
        console.log(err);
    }
}