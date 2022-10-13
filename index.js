const $fileInput = $(".file-input");
const $droparea = $(".file-drop-area");
const $delete = $(".item-delete");

$fileInput.on("dragenter focus click", function () {
  $droparea.addClass("is-active");
});

$fileInput.on("dragleave blur drop", function () {
  $droparea.removeClass("is-active");
});

$fileInput.on("change", function () {
  let filesCount = $(this)[0].files.length;
  let $textContainer = $(this).prev();

  if (filesCount === 1) {
    let fileName = $(this).val().split("\\").pop();
    $textContainer.text(fileName);
    $(".item-delete").css("display", "inline-block");
  } else if (filesCount === 0) {
    $textContainer.text("or drop files here");
    $(".item-delete").css("display", "none");
  } else {
    $textContainer.text(filesCount + " files selected");
    $(".item-delete").css("display", "inline-block");
  }
});

$delete.on("click", function () {
  $(".file-input").val(null);
  $(".file-msg").text("or drop files here");
  $(".item-delete").css("display", "none");
});

//image logic
const imageSrc3 = 'ATIKUOKOWA RADIO DP.png';

let container = document.getElementById('container');
let containerCtx = container.getContext('2d');

let preview = document.getElementById('preview');
let previewCtx = preview.getContext('2d');

let containerDownload = document.getElementById('container-download');
let downloadCtx = containerDownload.getContext('2d');

const reader = new FileReader();
const img = new Image();


const img2 = new Image();
img2.src = imageSrc3;
img2.onload = function() {
  previewCtx.drawImage(img2, 0, 0, 400, 400)
}

const uploadImage = (e) => {
  reader.onload = () => {
    img.onload = function() {
      //get image ratio
      const mainRatio = 6000 / 400;

      var imageHeight = img.height;
      var imageWidth = img.width;
      var imageHeightDownload = img.height;
      var imageWidthDownload = img.width;
      var imgLeft = 227;
      var imgTop = 31;
      var imgLeftDownload = 227;
      var imgTopDownload = 31;

      console.log('imageHeight = ', imageHeight, 'imageWidth = ', imageWidth);
      
      //for downloadable image
      if (imageHeightDownload > imageWidthDownload) {
        var ratio = imageHeightDownload / imageWidthDownload;
        imageWidthDownload = 115 * mainRatio;
        imageHeightDownload = imageWidthDownload * ratio;

        // var imgRestoreDownload = (imageHeightDownload - 115)/2;
        // imgTopDownload = imgTopDownload - imgRestoreDownload;
      } else {
        var ratio = imageWidthDownload / imageHeightDownload;
        imageHeightDownload = 115 * mainRatio;
        imageWidthDownload = imageHeightDownload * ratio;

        // var imgRestoreDownload = (imageWidthDownload - 115)/2;
        // imgLeftDownload = imgLeftDownload - imgRestoreDownload;
      }

      //for container image
      if (imageHeight > imageWidth) {
        var ratio = imageHeight / imageWidth;
        imageWidth = 115;
        imageHeight = imageWidth * ratio;

        imgRestore = (imageHeight - 115)/2;
        imgTop = imgTop - imgRestore;
      } else {
        var ratio = imageWidth / imageHeight;
        imageHeight = 115;
        imageWidth = imageHeight * ratio;
        imgRestore = (imageWidth - 115)/2;
        imgLeft = imgLeft - imgRestore;
      }

      console.log('imageHeightDownload = ', imageHeightDownload, 'imageWidthDownload = ', imageWidthDownload);
      downloadCtx.drawImage(img, imgLeft * mainRatio, imgTop * mainRatio, imageWidthDownload, imageHeightDownload);

      console.log('imageHeight = ', imageHeight, 'imageWidth = ', imageWidth);
      console.log('imgTop = ', imgTop, 'imgLeft = ', imgLeft);
      containerCtx.drawImage(img, imgLeft, imgTop, imageWidth, imageHeight);

      const img2 = new Image();
      img2.src = imageSrc3;
      img2.onload = function() {
        var imageHeight = img2.height;
        var imageWidth = img2.width;
        var imageHeightDownload = img2.height;
        var imageWidthDownload = img2.width;

        console.log('w = ', img2.width, 'h = ', img2.height);
        var ratio_1 = imageWidthDownload / imageHeightDownload;
        
        console.log('w = ', img2.width, 'h = ', img2.height);
        var ratio = imageWidth / imageHeight;

        imageHeightDownload = 400 * mainRatio;
        imageWidthDownload = imageHeightDownload * ratio_1;
        downloadCtx.drawImage(img2, 0, 0, imageWidthDownload, imageHeightDownload);

        imageHeight = 400;
        imageWidth = imageHeight * ratio;
        containerCtx.drawImage(img2, 0, 0, imageWidth, imageHeight);

        container.style.display = "block";
      }
    }
    img.src = reader.result;
  };
  reader.readAsDataURL(e.target.files[0]);
};

const imageLoader = document.getElementById("uploader");
const downloadButton = document.querySelector("button")
imageLoader.addEventListener("change", uploadImage);

function download() {
  downloadButton.innerHTML = "Downloading...";
  const image = containerDownload.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  const currentDate = new Date();
  const time = currentDate.getTime();
  console.log('time = ', time);
  link.download = `image_${time}.png`;
  link.click();
  
  setTimeout(() => {
    downloadButton.innerHTML = "Download";
  }, 2000);
}

downloadButton.addEventListener("click", download);