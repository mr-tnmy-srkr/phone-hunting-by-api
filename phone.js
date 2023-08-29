const phoneContainer = document.getElementById("phone-container");
const loadingSpinner = document.getElementById("loading-spinner");
const showAllContainer = document.getElementById("show-all-container");
const noData = document.getElementById("no-data");

const loadPhone = async (searchText="iphone", isShowAll) => {
  phoneContainer.textContent = "";
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  // console.log(data.data)
  const phones = data.data;
  // displayPhones(phones, isShowAll);
  // console.log(data.status);
  if (data.status) {
    noData.textContent = "";
    displayPhones(phones, isShowAll);
  } else {
    loadingSpinner.classList.add("hidden");
    showAllContainer.classList.add("hidden");
    noDataFound();
  }
};

const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  // const phoneContainer = document.getElementById("phone-container");

  // clear phone container cards
  phoneContainer.textContent = "";

  //display show all button if there are more than 12 phones
  // const showAllContainer = document.getElementById("show-all-container");

  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  // console.log(isShowAll)
  // console.log(phones.length);

  // display only 12 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-white shadow-xl p-4`;
    phoneCard.innerHTML = ` <figure><img src="${phone.image}" alt="Shoes" /></figure>
   <div class="card-body">
       <h2 class="card-title">${phone.phone_name}</h2>
       <p>If a dog chews shoes whose shoes does he choose?</p>
       <div class="card-actions justify-center">
           <button onclick="handelShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
       </div>
   </div>
   `;
    phoneContainer.appendChild(phoneCard);
  });

  // hide loading spinner
  toggleLoadingSpinner(false);
};

handelSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
    loadPhone(searchText, isShowAll);
};

// toggle spinner
const toggleLoadingSpinner = (isLoading) => {
  // const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

loadPhone();

// handel show all
const handelShowAll = () => {
  handelSearch(true);
};

// modal
const handelShowDetails = async (id) => {
  // console.log(id)
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  // console.log(data)
  showPhoneDetails(data.data);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("show-detail-phone-name");
  phoneName.innerText = phone.name;
  console.log(phone.name);
  const showDetailsContainer = document.getElementById("show-detail-container");
  showDetailsContainer.innerHTML = `
<img src ="${phone.image}" alt ="" />
<p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
<p><span>GPS:</span>${phone.others?.GPS || "No GPS available"}</p>
<p><span>GPS:</span>${
    phone.others?.GPS ? phone.others.GPS : "No GPS available in this device"
  }</p>
`;

  show_modal.showModal();
};

// no data available
const noDataFound = () => {
  // const noData = document.getElementById("no-data");
  noData.textContent = "";
  const p = document.createElement("p");
  p.innerText = "no data available";
  p.classList = `text-center py-10`;
  noData.appendChild(p);
};
