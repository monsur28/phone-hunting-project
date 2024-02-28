const loadPhone = async (searchText=13, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // display just first 9 itmes
  if (!isShowAll) {
    phones = phones.slice(0, 9);
  }
  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList =
      "card m-3 p-8 bg-gray-50 border border-black-500 shadow-xl";
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}"/></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick=handlePhonesDetails('${phone.slug}') class="btn btn-primary">Show Details</button>
          </div>
        </div>`;
    phoneContainer.appendChild(phoneCard);
  });
  toglleLoadingSpinner(false);
};


const handlePhonesDetails = async(id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    console.log(phone);
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    show_modal_5.showModal();
    const showDetailsontainer = document.getElementById('show-details-container');
    showDetailsontainer.innerHTML = 
    `<img class= "text-center" src="${phone.image}" alt="">
    <h1 class="text-3xl">${phone.name}</h1>
    <p class="mt-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p><span class= "font-bold">Storage: </span>${phone.mainFeatures.storage}</p>
    <p><span class= "font-bold">Display Size: </span>${phone.mainFeatures.displaySize}</p>
    <p><span class= "font-bold">Chipset: </span>${phone.mainFeatures.chipSet}</p>
    <p><span class= "font-bold">Memory: </span>${phone.mainFeatures.memory}</p>
    <p><span class= "font-bold">Slug: </span>${phone.slug}</p>
    <p><span class= "font-bold">Release Date: </span>${phone.releaseDate}</p>
    <p><span class= "font-bold">Brand: </span>${phone.brand}</p>
    <p><span class= "font-bold">GPS: </span>${phone.others?.GPS ? phone.others.GPS : 'No GPS available in this device'}</p>
    <div class="modal-action">
    <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn bg-red-500">Close</button>
    </form>
    </div>
    `;
}



const searchHandler = (isShowAll) => {
  toglleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};





const toglleLoadingSpinner = (isLoading) => {
  const loadSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadSpinner.classList.remove("hidden");
  } else {
    loadSpinner.classList.add("hidden");
  }
};

const handleShowAll = () => {
  searchHandler(true);
};

loadPhone();
