import { router } from "../router.js";
import {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../services/product.service.js";
import productsTemplate from "../../templates/products.html?raw";

export function renderProductsView(container) {
    container.innerHTML = productsTemplate;

    const tbody = container.querySelector("#product-tbody");
    const formWrapper = container.querySelector("#product-form-wrapper");
    const form = container.querySelector("#product-form");
    const formTitle = container.querySelector("#form-title");
    const errorBox = container.querySelector("#product-error");
    const successBox = container.querySelector("#product-success");
    const productId = container.querySelector("#product-id");
    const inputName = container.querySelector("#product-name");
    const inputPrice = container.querySelector("#product-price");
    const inputStock = container.querySelector("#product-stock");

    // --- Helpers ---
    function showError(msg) {
        errorBox.textContent = msg;
        errorBox.style.display = "block";
        successBox.style.display = "none";
    }

    function showSuccess(msg) {
        successBox.textContent = msg;
        successBox.style.display = "block";
        errorBox.style.display = "none";
        setTimeout(() => (successBox.style.display = "none"), 3000);
    }

    function formatRupiah(value) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    }

    function resetForm() {
        form.reset();
        productId.value = "";
        formTitle.textContent = "Tambah Produk";
        formWrapper.style.display = "none";
        errorBox.style.display = "none";
    }

    async function loadProducts() {
        try {
            const products = await getAllProducts();
            if (products.length === 0) {
                tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#999;">Belum ada produk.</td></tr>`;
                return;
            }

            tbody.innerHTML = products
                .map(
                    (p) => `
                    <tr data-id="${p.id}">
                        <td>${p.name}</td>
                        <td>${formatRupiah(p.price)}</td>
                        <td>${p.stock}</td>
                        <td class="action-cell">
                        <button class="btn-edit btn-icon" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-stock="${p.stock}">✏️</button>
                        <button class="btn-delete btn-icon btn-icon-danger" data-id="${p.id}">🗑️</button>
                        </td>
                    </tr>`
                )
                .join("");

            // Bind edit
            tbody.querySelectorAll(".btn-edit").forEach((btn) => {
                btn.addEventListener("click", () => {
                    productId.value = btn.dataset.id;
                    inputName.value = btn.dataset.name;
                    inputPrice.value = btn.dataset.price;
                    inputStock.value = btn.dataset.stock;
                    formTitle.textContent = "Edit Produk";
                    formWrapper.style.display = "block";
                    errorBox.style.display = "none";
                });
            });

            // Bind delete
            tbody.querySelectorAll(".btn-delete").forEach((btn) => {
                btn.addEventListener("click", async () => {
                    if (!confirm("Yakin ingin menghapus produk ini?")) return;
                    try {
                        await deleteProduct(btn.dataset.id);
                        showSuccess("Produk berhasil dihapus.");
                        await loadProducts();
                    } catch (err) {
                        showError(typeof err === "string" ? err : "Gagal menghapus produk.");
                    }
                });
            });
        } catch (err) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#d32f2f;">Gagal memuat data.</td></tr>`;
        }
    }

    // --- Tombol tampilkan form tambah ---
    container.querySelector("#btn-show-form").addEventListener("click", () => {
        resetForm();
        formWrapper.style.display = "block";
    });

    // --- Tombol batal ---
    container.querySelector("#btn-cancel").addEventListener("click", resetForm);


    // --- Submit form (create / update) ---
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        errorBox.style.display = "none";
        const payload = {
            name: inputName.value.trim(),
            price: parseFloat(inputPrice.value),
            stock: parseInt(inputStock.value, 10),
        };
        try {
            if (productId.value) {
                await updateProduct(productId.value, payload);
                showSuccess("Produk berhasil diperbarui.");
            } else {
                await createProduct(payload);
                showSuccess("Produk berhasil ditambahkan.");
            }
            resetForm();
            await loadProducts();
        } catch (err) {
            showError(typeof err === "string" ? err : "Terjadi kesalahan.");
        }
    });

    // --- Tombol kembali ---
    container.querySelector("#btn-back").addEventListener("click", () => {
        router.navigate("dashboard");
    });

    // Load awal
    loadProducts();
}