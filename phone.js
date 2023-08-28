const loadPhone = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await res.json();
  // console.log(data.data)
  const phones = data.data;
  displayPhones(phones);
  // console.log(phones);
};

const displayPhones = (phones) => {
  // console.log(phones);
  const phoneContainer = document.getElementById("phone-container");

  phones.forEach(phone => {
    console.log(phone);
   const phoneCard = document.createElement('div');
   phoneCard.classList = `card w-96 bg-gray-100 shadow-xl`
   phoneCard.innerHTML =
   ` <figure><img src="${phone.image}" alt="Shoes" /></figure>
   <div class="card-body">
       <h2 class="card-title">Shoes!</h2>
       <p>If a dog chews shoes whose shoes does he choose?</p>
       <div class="card-actions justify-end">
           <button class="btn btn-primary">Buy Now</button>
       </div>
   </div>
   `;
   phoneContainer.appendChild(phoneCard);
  });
};

loadPhone();
