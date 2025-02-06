const flashSaleProducts = [
    { name: 'Awesome Brand - Cool product', price: '$85.00', rating: 4.5 },
    { name: 'Stylish Sneakers - Limited Edition', price: '$120.00', rating: 4.8 },
    { name: 'Wireless Headphones - Premium', price: '$99.00', rating: 4.6 },
    { name: 'Smartwatch Pro - Next Gen', price: '$150.00', rating: 4.7 },
    { name: 'Ultra HD Smart TV 55"', price: '$499.00', rating: 4.9 },
    { name: 'Gaming Laptop - High Performance', price: '$1,499.00', rating: 4.9 },
    { name: 'Noise Cancelling Earbuds', price: '$89.00', rating: 4.3 },
    { name: 'Mechanical Keyboard RGB', price: '$109.00', rating: 4.7 },
    { name: 'Smartphone Pro Max', price: '$999.00', rating: 4.8 },
    { name: 'Smartphone Pro Max', price: '$999.00', rating: 4.8 },
    { name: 'Fitness Tracker - Waterproof', price: '$59.00', rating: 4.6 }
];

const flashSaleContainer = document.getElementById('flashSaleProducts');
const flashSaleWrapper = document.querySelector('.flash-sale-wrapper');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

const SLIDE_WIDTH = 197; // Chiều rộng mỗi product-card
let slideIndex = 0;

// Render danh sách sản phẩm
flashSaleContainer.innerHTML = flashSaleProducts.map(product => `
    <div class="product-card">
        <div class="product-image"></div>
        <div class="product-title">${product.name}</div>
        <div class="product-price">${product.price}</div>
        <div class="product-rating">⭐ ${product.rating}</div>
    </div>
`).join('');

// ✅ Hàm tính số sản phẩm hiển thị trên màn hình
function getVisibleItems() {
    return Math.floor(flashSaleWrapper.offsetWidth / SLIDE_WIDTH);
}

// ✅ Hàm tính số bước trượt tối đa
function getMaxSteps() {
    const visibleItems = getVisibleItems();
    const totalItems = flashSaleProducts.length;
    return Math.max(0, totalItems - visibleItems - 1 );
}

// ✅ Cập nhật trạng thái nút điều hướng
function updateButtons() {
    const maxSteps = getMaxSteps();
    prevButton.style.display = (slideIndex === 0) ? 'none' : 'block';
    nextButton.style.display = (slideIndex >= maxSteps) ? 'none' : 'block';
}

// ✅ Hàm điều hướng slide
function changeSlide(n) {
    const maxSteps = getMaxSteps();
    slideIndex = Math.max(0, Math.min(slideIndex + n, maxSteps));

    flashSaleContainer.style.transform = `translateX(${-slideIndex * SLIDE_WIDTH}px)`;
    updateButtons();
}

// Sự kiện click vào nút điều hướng
prevButton.addEventListener('click', () => changeSlide(-1));
nextButton.addEventListener('click', () => changeSlide(1));

// ✅ Cập nhật giao diện khi resize màn hình
window.addEventListener('resize', () => {
    updateButtons();
    changeSlide(0); // Reset slideIndex nếu cần
});

// ✅ Ẩn nút prev khi trang vừa tải
updateButtons();
