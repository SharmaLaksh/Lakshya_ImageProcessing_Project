const uploadInput = document.getElementById('upload');
const uploadLabel = document.getElementById('uploadLabel');
const originalImage = document.getElementById('original');
const processedImage = document.getElementById('processed');
const sliders = document.querySelector('.sliders');
const dropdown = document.querySelector('.dropdown');
const operationSelect = document.getElementById('operation');
const resetButton = document.getElementById('reset');
const brightnessSlider = document.getElementById('brightness');
const contrastSlider = document.getElementById('contrast');
const saturationSlider = document.getElementById('saturation');
const container = document.getElementById('container');

const lightGradients = [
  "linear-gradient(45deg, #ffecd2, #fcb69f)",
  "linear-gradient(45deg, #d4fc79, #96e6a1)",
  "linear-gradient(45deg, #cfd9df, #e2ebf0)",
  "linear-gradient(45deg, #ffdde1, #ee9ca7)",
  "linear-gradient(45deg, #a1c4fd, #c2e9fb)"
];

function changeBackgrounds() {
  const randomGradient = lightGradients[Math.floor(Math.random() * lightGradients.length)];
  document.body.style.background = randomGradient;
  container.style.background = randomGradient;
}

setInterval(changeBackgrounds, 10000);

uploadInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      originalImage.src = e.target.result;
      processedImage.src = e.target.result;
      originalImage.style.display = 'block';
      processedImage.style.display = 'block';
      sliders.style.display = 'flex';
      dropdown.style.display = 'flex';
      uploadLabel.style.display = 'none';
      resetButton.style.display = 'block';
      container.classList.add('compact');
    };
    reader.readAsDataURL(file);
  }
});

brightnessSlider.addEventListener('input', applyFilter);
contrastSlider.addEventListener('input', applyFilter);
saturationSlider.addEventListener('input', applyFilter);
operationSelect.addEventListener('change', applyFilter);

function applyFilter() {
  const brightness = brightnessSlider.value;
  const contrast = contrastSlider.value;
  const saturation = saturationSlider.value;
  const operation = operationSelect.value;

  let filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;

  if (operation === 'grayscale') filter += ' grayscale(100%)';
  else if (operation === 'invert') filter += ' invert(100%)';
  else if (operation === 'blur') filter += ' blur(5px)';
  else if (operation === 'gaussian-blur') filter += ' blur(10px)';
  else if (operation === 'sharpen') filter += ' contrast(150%)';
  else if (operation === 'edge-detection') filter += ' contrast(200%) grayscale(100%)';
  else if (operation === 'sepia') filter += ' sepia(100%)';

  processedImage.style.filter = filter;
}

resetButton.addEventListener('click', function() {
  uploadInput.value = "";
  originalImage.style.display = 'none';
  processedImage.style.display = 'none';
  sliders.style.display = 'none';
  dropdown.style.display = 'none';
  processedImage.style.filter = "none";
  uploadLabel.style.display = 'block';
  resetButton.style.display = 'none';
  container.classList.remove('compact');
});
