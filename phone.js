const loadPhone = async (searchText,isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  // console.log(data.data)
  const phones = data.data;
  displayPhones(phones, isShowAll);
  // console.log(phones);
};

const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  const phoneContainer = document.getElementById("phone-container");

  // clear phone container cards
  phoneContainer.textContent = "";

  //display show all button if there are more than 12 phones
const showAllContainer = document.getElementById("show-all-container");

if(phones.length > 12 && !isShowAll){
  showAllContainer.classList.remove("hidden");
}else{
  showAllContainer.classList.add("hidden");
}
// console.log(isShowAll)
// console.log(phones.length);

// display only 12 phones if not show all
if(!isShowAll){
  phones = phones.slice(0,12);
}

  phones.forEach(phone => {
    // console.log(phone);
   const phoneCard = document.createElement('div');
   phoneCard.classList = `card bg-white shadow-xl p-4`
   phoneCard.innerHTML =
   ` <figure><img src="${phone.image}" alt="Shoes" /></figure>
   <div class="card-body">
       <h2 class="card-title">${phone.phone_name}</h2>
       <p>If a dog chews shoes whose shoes does he choose?</p>
       <div class="card-actions justify-end">
           <button class="btn btn-primary">Buy Now</button>
       </div>
   </div>
   `;
   phoneContainer.appendChild(phoneCard);
  });

  // hide loading spinner
  toggleLoadingSpinner(false);
};


handelSearch = (isShowAll)=>{
  toggleLoadingSpinner(true);
const searchField = document.getElementById("search-field");
const searchText = searchField.value;
// console.log(searchText);
loadPhone(searchText, isShowAll);
}

// toggle spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
if(isLoading){
  loadingSpinner.classList.remove("hidden")
}else{
  loadingSpinner.classList.add("hidden")
}}

// loadPhone();

// handel show all
const handelShowAll = () =>{
  handelSearch(true)
}