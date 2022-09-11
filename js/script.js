const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const formSubmit = (e) => {
  e.preventDefault();
  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  // Validation
  if (url == "") {
    alert("Enter a url");
  } else {
    showSpinner();
    setTimeout(() => {
      hideSpinner();
      qrGenerator(url, size);

      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        createSaveBtn(saveUrl);
        let scrollSave = document
          .getElementById("qrcode")
          .scrollIntoView(false);
      }, 50);
    }, 1000);
  }
};

const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

const qrGenerator = (url, size) => {
  const qrcode = new QRCode(qr, {
    text: url,
    width: size,
    height: size,
  });
};

const clearUI = () => {
  qr.innerHTML = "";
  const saveLink = document.getElementById("save-link");

  if (saveLink) {
    saveLink.remove();
  }
};

const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-green-700 text-center hover:bg-green-500 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = saveUrl;

  link.download = "qrcode";
  link.innerHTML = "Save Image";

  document.getElementById("generated").appendChild(link);
};

hideSpinner();

form.addEventListener("submit", formSubmit);
