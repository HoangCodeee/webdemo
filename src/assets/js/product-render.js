const productsPerPage = 12;
let currentPage = 1;
let filteredProducts = products; // dùng khi filter, mặc định là toàn bộ sản phẩm

// Đọc tham số từ URL để biết đang filter loại nào
const params = new URLSearchParams(window.location.search);
const typeFromURL = params.get("type");

// Nếu có type trên URL thì lọc
if (typeFromURL && ["ring", "necklace", "bracelet", "earring"].includes(typeFromURL)) {
  filteredProducts = products.filter(p => p.type === typeFromURL);
}

function renderProducts(page) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const pageProducts = filteredProducts.slice(start, end);

  pageProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "products__card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="products__image">
      <h3 class="products__name">${product.name}</h3>
      <p class="products__price">$${product.price.toFixed(2)}</p>
      <button class="products__button">Buy Now</button>
    `;
    grid.appendChild(card);
  });
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = "products__page-btn";
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", () => {
      currentPage = i;
      renderProducts(currentPage);
      renderPagination();
    });

    pagination.appendChild(btn);
  }
}

// Khởi tạo
renderProducts(currentPage);
renderPagination();
document.getElementById("filter-type").addEventListener("change", function () {
  const selected = this.value;
  filteredProducts = selected === "all" ? products : products.filter(p => p.type === selected);
  currentPage = 1;
  renderProducts(currentPage);
  renderPagination();
});
