const root = document.documentElement;
const picker = document.querySelector("#palette-preview");
const status = document.querySelector("#palette-preview-status");
const reset = document.querySelector("#reset-palette");
const publishedPalette = root.dataset.bathosPalette;
const previewKey = "bathos-design-system-preview-palette";

function paletteName(id) {
  return picker.options[picker.selectedIndex]?.textContent ?? id;
}

function savePreview(id) {
  try {
    localStorage.setItem(previewKey, id);
  } catch {
    // Keep the live preview even when browser storage is unavailable.
  }
}

function previewPalette(id) {
  if (![...picker.options].some(option => option.value === id)) return;
  picker.value = id;
  root.dataset.bathosPalette = id;
  savePreview(id);
  status.textContent = `Previewing ${paletteName(id)} across this site. The preview is saved in this browser only.`;
}

picker.addEventListener("change", () => previewPalette(picker.value));
document.querySelectorAll("[data-preview-palette]").forEach(button => {
  button.addEventListener("click", () => previewPalette(button.dataset.previewPalette));
});

try {
  const savedPalette = localStorage.getItem(previewKey);
  if ([...picker.options].some(option => option.value === savedPalette)) {
    picker.value = savedPalette;
    root.dataset.bathosPalette = savedPalette;
    status.textContent = `Previewing ${paletteName(savedPalette)} across this site. The preview is saved in this browser only.`;
  }
} catch {
  // The published palette remains usable when browser storage is unavailable.
}

reset.addEventListener("click", () => {
  try {
    localStorage.removeItem(previewKey);
  } catch {
    // Reset the live page even when browser storage is unavailable.
  }
  picker.value = publishedPalette;
  root.dataset.bathosPalette = publishedPalette;
  status.textContent = `Published palette: ${paletteName(publishedPalette)}. Choose an option to preview it across this site.`;
});
