<?php
function convertBase64Image(string $img) {
	$pathImg = __DIR__ . "/../assets/images/apartments/" . $img;
	$imgSize = getimagesize($pathImg);
	$imgData = base64_encode(file_get_contents($pathImg, true));
	$imgSrc = "data:{$imgSize['mime']};base64,{$imgData}";
	return $imgSrc;
}