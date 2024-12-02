// API URL - Düzgün endpointinizi buraya yazın
const API_URL = "https://fakestoreapi.com/products"; // Öz API URL-inizi daxil edin

let products = []; // Məhsul siyahısı

// Məhsulları serverdən götürmək
async function fetchProducts() {
  try {
    const response = await fetch(API_URL); // Serverdən məlumat almaq
    if (!response.ok) throw new Error("Məlumatları əldə etmək mümkün olmadı.");
    products = await response.json(); // JSON formatında məlumatları əldə etmək
    renderProducts(); // Məhsulları DOM-a yerləşdirmək
  } catch (error) {
    console.error("Xəta:", error.message);
  }
}

// Məhsulları cədvələ render etmək
function renderProducts() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = ""; // Mövcud siyahını təmizləyək

  products.forEach((product) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${product.id}</td>
      <td><img src="${product.image}" class="product-image" alt="Image"></td>
      <td>${product.title}</td>
      <td>${product.category}</td>
      <td>${product.price}</td>
      <td>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;

    // Redaktə düyməsi
    row.querySelector(".edit-btn").addEventListener("click", () => {
      openEditModal(product);
    });

    // Sil düyməsi
    row.querySelector(".delete-btn").addEventListener("click", async () => {
      try {
        await deleteProduct(product.id); // API vasitəsilə məhsulu silmək
        products = products.filter((p) => p.id !== product.id); // Məhsulu siyahıdan çıxarmaq
        renderProducts(); // Cədvəli yenidən render etmək
      } catch (error) {
        console.error("Silinmə xətası:", error.message);
      }
    });

    tableBody.appendChild(row);
  });
}

// Yeni məhsul əlavə etmək
async function addProduct(product) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error("Məhsul əlavə etmək mümkün olmadı.");
    const newProduct = await response.json();
    products.push(newProduct); // Yeni məhsulu siyahıya əlavə etmək
    renderProducts();
  } catch (error) {
    console.error("Əlavə etmə xətası:", error.message);
  }
}

// Məhsulu yeniləmək
async function updateProduct(id, updatedProduct) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    if (!response.ok) throw new Error("Məhsulu yeniləmək mümkün olmadı.");
    const updatedData = await response.json();

    products = products.map((p) => (p.id === id ? updatedData : p));
    renderProducts();
  } catch (error) {
    console.error("Yeniləmə xətası:", error.message);
  }
}

// Məhsulu silmək
async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Məhsul silmək mümkün olmadı.");
    return response.json();
  } catch (error) {
    console.error("Silinmə xətası:", error.message);
  }
}

// Modalı açmaq üçün funksiya
function openModal() {
    const modal = document.querySelector(".row");
    modal.style.display = "flex";
  }
  
  // Modalı bağlamaq üçün funksiya
  function closeModal() {
    const modal = document.querySelector(".row");
    modal.style.display = "none";
  }
  
  // "Create" düyməsinə basıldıqda modalın açılması
  document.querySelector(".add-btn").addEventListener("click", () => {
    const form = document.querySelector(".form");
    form.dataset.mode = "create"; // Yeni məhsul əlavə edəcəyimizi bildiririk
    form.reset(); // Formu təmizləyirik
    openModal(); // Modalı açırıq
  });
  
  // Modalın bağlanması üçün "close" düyməsi
  document.querySelector(".close").addEventListener("click", closeModal);
  
  // Form submit edildikdə
  document.querySelector(".form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
  
    // Formdan məlumatları götürmək
    const product = {
      image: form.image.value,
      title: form.title.value,
      category: form.category.value,
      price: form.price.value,
    };
  
    // Yeni məhsulu əlavə et
    if (form.dataset.mode === "create") {
      addProduct(product); // Yeni məhsulu əlavə edən funksiya
    } else {
      updateProduct(form.dataset.editId, product); // Mövcud məhsulu yeniləyən funksiya
    }
  
    closeModal(); // Modalı bağlayırıq
  });
  


// Başlanğıcda məhsulları yükləyək
fetchProducts();
