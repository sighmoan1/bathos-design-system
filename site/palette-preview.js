const root = document.documentElement;
const picker = document.querySelector("#palette-preview");
const status = document.querySelector("#palette-preview-status");
const reset = document.querySelector("#reset-palette");
const publishedPalette = root.dataset.bathosPalette;

function paletteName(id) {
  return picker.options[picker.selectedIndex]?.textContent ?? id;
}

function previewPalette(id) {
  if (![...picker.options].some(option => option.value === id)) return;
  picker.value = id;
  root.dataset.bathosPalette = id;
  status.textContent = `Previewing ${paletteName(id)} across this site. This preview is not saved.`;
}

picker.addEventListener("change", () => previewPalette(picker.value));
document.querySelectorAll("[data-preview-palette]").forEach(button => {
  button.addEventListener("click", () => previewPalette(button.dataset.previewPalette));
});
reset.addEventListener("click", () => {
  previewPalette(publishedPalette);
  status.textContent = `Published palette: ${paletteName(publishedPalette)}. Choose an option to preview it across this site.`;
});
